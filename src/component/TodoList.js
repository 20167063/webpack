import React from "react";
import "./TodoList.css";
import classnames from "classnames";

function TodoList(props) {
  const setcomplete = (todo, idx) => {
    const { onsetcomplete } = props;
    if (!onsetcomplete) return;
    onsetcomplete(todo, idx);
  };
  const { todo } = props;
  return (
    <div>
      <ul>
        {todo.map((todo,idx) => {
          return (
            <li
              key={idx}
              className={classnames({
                "todo-list-item": false,
                complete: todo.complete === true
              })}
              onClick={() => setcomplete(todo, idx)}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default TodoList;
