# WebPack
- hiểu đơn giản webpack có tác dụng đóng gói các file js và json của cả project thành 1 file duy nhất để import trong html bằng thẻ 
```javascript 
<script src='javascript.js'></script>
```
- Nó cũng có thể convert js -> reactjs.
### Cách cài đặt webpack cho môi trường dev
```javascript
npm install webpack webpack-cli --save-dev
```

Src code sẽ có dạng
```
  webpack-demo
  |- package.json
  |- index.html
  |- src
    |- index.js
```
### Chạy webpack với cấu hình mặc định
```javascript
npx webpack
```
Lúc này webpack sẽ tổng hợp các file js có trong **src** và tạo ra 1 file **main.js** thư mục mới sẽ như sau:
```
  webpack-demo
  |- main.js
  |- package.json
  |- index.html
  |- src
    |- index.js
  ```
Để config theo ý muốn của chúng ta thì ta sẽ phải tạo 1 file **webpack.config.js** ở ngoài cùng thư mục cùng cấp với **package.json**

Trong file này ta có các module như:
1. Entry
2. Output
3. Loaders
4. Plugins
5. Mode
6. Browser Compatibility
7. Environment
#### Entry
- Là các file là đầu vào để bundle ra 1 file js duy nhất.
- Entry có thể nhận vào 1 string, obj hoặc 1 mảng.
```javascript
entry: 'string.js',
```
```javascript
entry: {
  name:'src/to/index.js',
},
```
```javascript
entry:['src/to/index1.js','src/to/index2.js'],
```
#### Output
- Là nơi thư mục lưu trữ và định nghĩa tên file js sẽ đượ tạo ra sau khi bundle.
```javascript
 output: {
    filename: '[name].js',//tên thư mục sẽ được tạo ra.
    path: path.resolve(__dirname, 'dist') //đây là thư mục sẽ lưu file bundle được tạo ra.
  },
```
#### Loader
-  import - require một file, file-loader có nhiệm vụ phân tích và ouput ra trong thư mục dist. Thường là file css,image,...

Cách cài đặt
```
npm install --save-dev css-loader
```
**webpack.config.js**
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

#### plugins
- là xương sống của webpack. Nhận vào 1 mảng và trả ra các phần xương của project như file html
ví dụ:

để tạo ra file html ta sẽ sử dụng plus html-webpack-plugin các plugin này chia làm 2 loại
1. loại chính thức
2. loại được tạo từ cộng đồng.

với plugin là loại plugin được tạo từ cộng đồng thì ta cần install
```
npm install --save-dev html-webpack-plugin
```
sau đó file webpack.config.js  sẽ như sau
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    hihi: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'web-test',
      filename: 'page.html'
    }),
  ]
}
```
trong thư mục dist sẽ tạo ra 2 file là hihi.js và page.html vs title là web-test.
### Mode
- Là môi trường chạy của webpack. Được chia làm 2 loại
1. Development (chạy cho nhà phát triển)
2. Production (chạy cho ứng dụng thực tế)
|sự khác nhau của các mode|Development|Production|
|---|--|--|
|Source map| chỉ rõ ra file bị lỗi nếu có lỗi| không hiển thị ra file nào bị lỗi mà chỉ hiển thị ra file đã bundle|

```javascript
module.exports = {
  mode: 'development'
}

module.exports = {
  mode: 'production'
}
```
- Thông thường hay chia 1 file **webpack.config.js** thành 3 file
1. webpack.comon.js (chứa entry,output,plugin,..)
```javascript
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Production',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 };
 ```
2. webpack.dev.js (chứa các dev tool, dev serve,..)
```javascript
 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
     static: './dist',
   },
 });
 ```
3. webpack.prod.js 
```javascript
 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'production',
 });
```
- khi chạy ở mode nào sẽ merge file **webpack.comon.js** với mode đó.
#### Browser Compatibility
- Webpack hỗ trợ tất cả các trình duyệt tuân theo ES5 (IE8 trở xuống không được hỗ trợ). Webpack cần Promise cho import () và Requiure.ensure (). Nếu muốn hỗ trợ các trình duyệt cũ hơn, cần tải polyfill trước khi sử dụng các biểu thức này.
- Webpacker sử dụng Babel và Webpack để chuyển JavaScript hiện đại xuống EcmaScript 5. Tùy thuộc vào trình duyệt mà dự án cần hỗ trợ, đầu ra Webpack cuối cùng cần phải khác nhau.
#### Environment
- Webpack 5 chạy trên phiên bản Node.js 10.13.0+.# webpack-demo
