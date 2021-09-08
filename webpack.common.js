const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: {
  //   main: './src/index.js',
  //   bar: './src/App.js'
  // },
  entry:['./src/index.js','./src/App.js','./src/component/TodoList.js'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'./src/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}