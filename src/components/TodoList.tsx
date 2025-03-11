import React, { useState } from "react";
import TodoTypes from "../todo";
import TodoService from "../TodoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdCheckCircle, MdUndo } from "react-icons/md";
import TodoForm from "./TodoForm";

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
        if (editedTodoText.trim() !== '') {
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

    return <div className="todoContainer">

        <div>
            input from component goes here
            <TodoForm setTodos = {setTodos}/>
        </div>

        {todos.map((t) => (
            <div className="items" key={t.id}>
                {editingTodoId == t.id ? (
                    <div className="editedText">

                        <input type="text" value={editedTodoText} onChange={(e) => setEditedTodoText(e.target.value)} autoFocus={true} />

                        <button className="saveBtn" onClick={() => handleEditSave(t.id)}>
                            <FaCheck />
                        </button>

                        <button className="cancelBtn" onClick={() => handleEditCancellation()}>
                            <GiCancel />
                        </button>

                    </div>
                ) : (
                    <div className="editBtn">
                        <span>{t.text}</span>

                        <button onClick={() => handleEditStart(t.id, t.text)}>
                            <FaEdit />
                        </button>

                    </div>
                )}

                <button className="toggleBtn" onClick={() => handleToggle(t.id)}>
                    {t.completed ? <MdUndo /> : <MdCheckCircle />}
                </button>

                {/*CSS effect
                .completed-task {
                text-decoration: line-through;
                opacity: 0.6; /* Optional: Makes completed tasks slightly faded 
                Dynamic CSS Class for Strikethrough

The <span> containing the task text checks t.completed and applies "completed-task" when true.
The "completed-task" class uses CSS text-decoration: line-through to visually show the completed state.
                
                */}

                <button className="deleteBtn" onClick={() => handleDelete(t.id)}>
                    <RiDeleteBin5Fill />
                </button>

            </div>
        ))}
    </div>
};

export default TodoList;