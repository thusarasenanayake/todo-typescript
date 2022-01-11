import React, {
  ChangeEvent,
  FormEvent,
  Reducer,
  useReducer,
  useState,
} from 'react';

enum Actions {
  DELETE,
  TOGGLE,
  ADD,
}
interface Props {
  initialTodos: Array<Todo>;
}
interface TodoAction {
  type: Actions;
  payload: {};
}

const Todo: React.FC<Props> = ({ initialTodos }) => {
  // ----- handlers -----

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // newTodo.trim() !== '' &&
    //   dispatch({
    //     action: Actions.ADD,
    //     payload: { title: newTodo, completed: false },
    //   });

    if (newTodo.trim() !== '') {
      dispatch({
        type: Actions.ADD,
        payload: { title: newTodo, completed: false },
      });

      setNewTodo('');
    }
  };

  const handleDelete = (todo: Todo) => {
    dispatch({ type: Actions.DELETE, payload: todo });
  };

  const handleToggle = (index: number) => {
    dispatch({ type: Actions.TOGGLE, payload: index });
  };

  // ----- reducer -----

  const todoReducer: Reducer<any, TodoAction> = (todos: Todo[], action) => {
    const { type, payload } = action;
    switch (type) {
      case Actions.ADD:
        return [...todos, payload];

      case Actions.DELETE:
        const deletedArray = todos.filter((todo) => payload !== todo);
        return deletedArray;

      case Actions.TOGGLE:
        const toggledArray = todos.map((todo, index) => {
          if (payload === index) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }
          return todo;
        });
        return toggledArray;
    }
  };

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [newTodo, setNewTodo] = useState<string>('');

  return (
    <div className="container">
      <div className="todo">
        <h1>Todos</h1>

        <form className="flex" onSubmit={handleSubmit}>
          <input
            className="md"
            type="text"
            value={newTodo}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTodo(e.target.value)
            }
          />
          <button className="btn m-2" type="submit">
            Add todo
          </button>
        </form>
        <ul>
          {todos.map((todo: Todo, index: number) => (
            <li className="p-1 lead grid" key={index}>
              <label className={todo.completed ? 'line-through' : undefined}>
                <input
                  type="checkbox"
                  className="m-1"
                  checked={todo.completed}
                  onChange={() => handleToggle(index)}
                />
                {todo.title}
              </label>
              <button className="btn " onClick={() => handleDelete(todo)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;