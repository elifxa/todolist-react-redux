import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  toggle,
  destroy,
  selectedFilteredTodos,
} from '../redux/todos/todosSlice';

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectedFilteredTodos);

  const handleDestroy = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(destroy(id));
    }
  };

  return (
    <div>
      <ul className="todo-list">
        {filteredTodos.map((item) => (
          <li key={item.id} className={item.completed ? 'completed' : ''}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={item.completed}
                onChange={() => dispatch(toggle({ id: item.id }))}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => handleDestroy(item.id)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
