import { useEffect } from 'react';

import Loading from './Loading';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggle,
  destroy,
  selectedFilteredTodos,
  getTodoAsync,
} from '../redux/todos/todosSlice';

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectedFilteredTodos);

  const isLoading = useSelector((state) => state.todos.isLoading);

  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  const handleDestroy = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(destroy(id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }
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
