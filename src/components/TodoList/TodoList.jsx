import { useState, useEffect, useContext } from "react";
import fetchTodos from "../../hooks/fetchTodos";
import addTodo from "../../hooks/addTodo";
import TodoListItem from "../TodoListItem/TodoListItem";
import AuthContext from "../../context/auth/AuthContext";
export default function TodoList() {
  const [todos, setTodos] = useState(null);
  const [text, setText] = useState("");

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchTodos();
      console.log(todos)
      setTodos([...todos]);
    };

    getTodos();
  }, []);

  const handleDelete = async (id) => {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const json = await result.json();
    if (json.delete) {
      let otherTodos = todos.filter(({ id: deleteId }) => deleteId !== id);
      setTodos([...otherTodos]);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmitTodo = async (e) => {
    if (e.key === "Enter") {
      let newTodo = await addTodo(text);
      setTodos([...todos, newTodo]);
      setText("");
    }
  };


  return (
    <>
      {todos ? (
        <>
          <h1>todos</h1>
          <label>Add Todo</label>
          <input
            type="text"
            onChange={handleTextChange}
            onKeyDown={handleSubmitTodo}
            value={text}
            required
          ></input>
          <ul style={{ listStyleType: "none" }}>
            {todos.map((todo) => (
              <TodoListItem key={todo.id} {...{ todo, handleDelete }} />
            ))}
          </ul>
          <button onClick={logout}>logout</button>
        </>
      ) : null}
    </>
  );
}
