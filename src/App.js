import React, { useState } from "react";
import "./App.css";
import TodoList from "./component/TodoList";

const items = [
  { id: 1, title: "Eat", complete: true },
  { id: 2, title: "Sleep", complete: false },
  { id: 3, title: "Code", complete: false }
];
export default function App() {
  const [List, setList] = useState(items);
  const [Show, setShow] = useState("all");
  const setcomplete = (todo, idx) => {
    const newTodoList = [...List];
    newTodoList[idx] = {
      ...newTodoList[idx],
      complete: newTodoList[idx].complete === true ? false : true
    };
    console.log(newTodoList[idx]);
    setList(newTodoList);
  };
  const filterList = List.filter(item => {
    return Show === "all" || Show === item.complete;
  });

  return (
    <div>
      <h1>This is my TodoList</h1>
      <TodoList todo={filterList} onsetcomplete={setcomplete} />
      <button onClick={() => setShow("all")}>Show All</button>
      <button onClick={() => setShow(true)}> Show Complete</button>
      <button onClick={() => setShow(false)}> Show Not Complete</button>
    </div>
  );
}
