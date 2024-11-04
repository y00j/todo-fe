import { useState, useEffect, Dispatch, SetStateAction } from "react";
import fetchTodos from "./fetchTodos";

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function useFetchTodos() : [Todo[], Dispatch<SetStateAction<Todo[]>>] {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const getTodos = async () : Promise<void> => {
          const todos = await fetchTodos();
          console.log({todos})
          setTodos([...todos]);
        };
    
        getTodos();
      }, []);

    return [todos, setTodos];
}
