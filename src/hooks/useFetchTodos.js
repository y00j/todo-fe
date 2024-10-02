import { useState, useEffect } from "react";
import fetchTodos from "./fetchTodos";

export default function useFetchTodos() {
    const [todos, setTodos] = useState(null);

    useEffect(() => {
        const getTodos = async () => {
          const todos = await fetchTodos();
          console.log(todos)
          setTodos([...todos]);
        };
    
        getTodos();
      }, []);

    return [todos, setTodos];
}
