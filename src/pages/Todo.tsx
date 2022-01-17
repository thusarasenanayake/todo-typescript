import React, {
  ChangeEvent,
  FormEvent,
  Reducer,
  useEffect,
  useReducer,
  useState,
} from 'react';

enum Actions {
  DELETE,
  TOGGLE,
  ADD,
}
interface Props {}
interface TodoAction {
  type: Actions;
  payload: {};
}

function saveToLocalStorage(key: string, value: Array<Todo>) {
  const jsonString = JSON.stringify(value);
  localStorage.setItem(key, jsonString);
}

function getFromLocalStorage(key: string) {
  const todosLocal = localStorage.getItem('todos');
  if (todosLocal) {
    return JSON.parse(todosLocal);
  } else return [];
}

const Todo: React.FC<Props> = () => {
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

  const [todos, dispatch] = useReducer(todoReducer, [], () =>
    getFromLocalStorage('todos')
  );

  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    saveToLocalStorage('todos', todos);
  }, [todos]);

  return (
    <>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card px-3">
            <div className="card-body">
              <h4 className="card-title">Awesome Todo list</h4>
              <form onSubmit={handleSubmit} className="d-flex my-3">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewTodo(e.target.value)
                  }
                  className="form-control"
                  placeholder="What do you need to do today?"
                />
                <button className="btn btn-success" type="submit">
                  Add
                </button>
              </form>
              <ul className="d-flex flex-column-reverse">
                {todos.map((todo: Todo, index: number) => (
                  <li className="list-group-item border-0" key={index}>
                    <div className="d-flex justify-content-between">
                      {todo.completed ? (
                        <label className="form-check-label lead text-decoration-line-through">
                          <input
                            className="checkbox m-2"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggle(index)}
                          />
                          {todo.title}
                        </label>
                      ) : (
                        <label className="form-check-label lead">
                          <input
                            className="checkbox m-2"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggle(index)}
                          />
                          {todo.title}
                        </label>
                      )}
                      <button
                        className="p-2 btn btn-outline-light"
                        onClick={() => handleDelete(todo)}
                      >
                        <span>❌</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
