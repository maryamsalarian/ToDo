import TodoTypes from "./todo";

const LOCAL_STORAGE_KEY = 'todos';

const TodoService = {

    //get todos
    getTodos: (): TodoTypes[] => {
        const todoString = localStorage.getItem(LOCAL_STORAGE_KEY);
        try {
            const todos = todoString ? JSON.parse(todoString) : [];
            return Array.isArray(todos) ? todos : [];
        } catch (e) {
            return [];
        }
    },

    //add todos
    addTodo: (text: string): TodoTypes => {
        const todos = TodoService.getTodos();
        const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
        const newTodo: TodoTypes = {id: newId, text, completed: false};
        const updateTodos = [...todos, newTodo];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return newTodo;
    },

    //edit an existing todo
    editTodo: (todo:TodoTypes): TodoTypes => {
        const todos = TodoService.getTodos();
        const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return todo;
    },

    //toggle todo as done or undone
    toggleTodo: (id:number): void => {
        const todos = TodoService.getTodos();
        const updateTodos = todos.map((t) => (t.id === id ? {...t, completed: !t.completed} : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    },


    //delete todo
    deleteTodo: (id: number): void => {
        const todos = TodoService.getTodos();
        const updateTodos = todos.filter((t) => t.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    }

};

export default TodoService;