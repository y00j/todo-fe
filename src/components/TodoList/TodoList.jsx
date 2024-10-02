import { useState, useEffect, useContext } from "react";
import fetchTodos from "../../hooks/fetchTodos";
import addTodo from "../../hooks/addTodo";
import TodoListItem from "../TodoListItem/TodoListItem";
import AuthContext from "../../context/auth/AuthContext";
import useFetchTodos from "../../hooks/useFetchTodos";
export default function TodoList() {
  const [todos, setTodos] = useFetchTodos();
  const [text, setText] = useState("");

  const { logout } = useContext(AuthContext);

  const handleDelete = async (id) => {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
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
              <TodoListItem draggable={true} onDragStart={(e) => console.log("hi", e)} key={todo.id} {...{ todo, handleDelete }} />
            ))}
          </ul>
          <button onClick={logout}>logout</button>
        </>
      ) : null}
    </>
  );
}
