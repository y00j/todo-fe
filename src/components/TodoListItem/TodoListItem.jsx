import { useState, useRef } from "react";
import editTodo from "../../hooks/editTodo";
import "./todoListItem.css"

export default function TodoListItem ({todo, handleDelete}) {
    const [editMode, setEditMode] = useState(false);
    const [todoItem, setTodoItem] = useState(todo);
    const {id, title, completed} = todoItem;
    const oldTodoTitle = useRef(title);
    
    const handleFocus = () => {
        setEditMode(true);
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            e.target.blur()
        }
    }
    const handleCheck = async (id) => {
        const result = await fetch(
          `${import.meta.env.VITE_API_URL}/todo/${id}/toggle`,
          {
            method: "PATCH",
            credentials: "include",
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const newTodo = await result.json();
        setTodoItem({...todoItem, completed: newTodo.completed})
      };
    

    const handleBlur = async () => {
        console.log(oldTodoTitle.current, todoItem.title)
        if (oldTodoTitle.current !== todoItem.title) {
            let newTodo = await editTodo(id, todoItem.title);
            oldTodoTitle.current = newTodo.title;
        }
        setEditMode(false);
    }

    const handleTitleChange = async (e) => {
        setTodoItem({...todoItem, title: e.target.value})
    }

    return (
        <div className="todoListItem">
            <input 
                type="text" 
                style={{textDecoration: completed ? 'line-through' : 'none'}}
                readOnly={!editMode} 
                onClick={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleEnter}
                onChange={handleTitleChange} 
                value={todoItem.title} 
            />
            <input onChange={() => handleCheck(id)} type="checkbox" checked={completed}/>
            <button onClick={() => handleDelete(id)}>delete</button>
        </div>
    )
}