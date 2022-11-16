import * as React from 'react';
import './style.css';

export default function Counter() {
  const [counter, setCounter] = React.useState(0);
  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => setCounter((old) => old + 1)}>increment</button>
      <br />
      <br />
      <Todos />
    </div>
  );
}

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export function Todos(): JSX.Element {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = React.useState('');
  const onChangeTodoWithId = (id: number) => (partial: Partial<Todo>) =>
    setTodos(todos.map((x) => (x.id === id ? { ...x, ...partial } : x)));
  console.log({ todos });
  return (
    <React.Fragment>
      <input
        type="text"
        value={currentTodo}
        onChange={(e) => setCurrentTodo(e.target.value)}
      />
      <button
        onClick={() =>
          setTodos([
            ...todos,
            { id: Math.random() * 1000, title: currentTodo, done: false },
          ])
        }
      >
        Add todo
      </button>
      {todos.map((x) => {
        if (x.done) {
          return null;
        }
        return (
          <SingleTodo
            todo={x}
            key={x.id}
            onChangeTodo={onChangeTodoWithId(x.id)}
          />
        );
      })}
    </React.Fragment>
  );
}

function SingleTodo({
  todo,
  onChangeTodo,
}: {
  todo: Todo;
  onChangeTodo(x: Partial<Todo>): void;
}): JSX.Element {
  return (
    <div>
      <input
        type="checkbox"
        defaultChecked={todo.done}
        onChange={() => onChangeTodo({ done: !todo.done })}
      />

      {todo.title}
    </div>
  );
}
