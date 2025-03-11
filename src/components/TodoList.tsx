import React, { useState } from "react";
import TodoTypes from "../todo";
import TodoService from "../TodoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdCheckCircle, MdUndo } from "react-icons/md";
import TodoForm from "./TodoForm";
import classes from "../CSS/TodoList.module.css"

const TodoList = () => {
    const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
    const [editedTodoText, setEditedTodoText] = useState<string>("");

    //handling edit actions
    const handleEditStart = (id: number, text: string) => {
        setEditedTodoId(id);
        setEditedTodoText(text);
    };

    const handleEditCancellation = () => { 
        setEditedTodoId(null);
        setEditedTodoText("");
    };

    const handleEditSave = (id: number) => {
        if (editedTodoText.trim() !== "") {
            const editTodo = TodoService.editTodo({
                id,
                text: editedTodoText,
                completed: false
            });
            setTodos((prevTodos) => prevTodos.map((t) => (t.id === id ? editTodo : t))
            );
            setEditedTodoId(null);
            setEditedTodoText("");
        }
    };

    //handletoggle as done or undone
    const handleToggle = (id: number) => {
        TodoService.toggleTodo(id);
        setTodos((prevTodos) => prevTodos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };

    //handling delete
    const handleDelete = (id: number) => {
        TodoService.deleteTodo(id);
        setTodos((prevTodos) => prevTodos.filter((t) => (t.id !== id))
        );
    };

    return <div className={classes.todoContainer}>

        <div>
            <TodoForm setTodos = {setTodos}/>
        </div>

        {todos.map((t) => (
            <div className={classes.items} key={t.id}>

                <button className={`${classes.toggleBtn} ${t.completed ? classes.completed : ""}`} onClick={() => handleToggle(t.id)}>
                    {t.completed ? <MdUndo /> : <MdCheckCircle />}
                </button>

                {editingTodoId == t.id ? (
                    <div className={classes.editedText}>

                        <input type="text" value={editedTodoText} onChange={(e) => setEditedTodoText(e.target.value)} autoFocus={true} />

                        <button className={classes.saveBtn} onClick={() => handleEditSave(t.id)}>
                            <FaCheck />
                        </button>

                        <button className={classes.cancelBtn} onClick={() => handleEditCancellation()}>
                            <GiCancel />
                        </button>

                    </div>
                ) : (
                    <div className={classes.editBtn}>
                        <span className={`${classes.taskText} ${t.completed ? classes.completedTask : ""}`}>
                            {t.text}
                        </span>

                        <button onClick={() => handleEditStart(t.id, t.text)}>
                            <FaEdit />
                        </button>

                    </div>
                )}
                
                <button className={classes.deleteBtn} onClick={() => handleDelete(t.id)}>
                    <RiDeleteBin5Fill />
                </button>

            </div>
        ))}
    </div>
};

export default TodoList;