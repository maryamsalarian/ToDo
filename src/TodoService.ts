import TodoTypes from "./todo";

const LOCAL_STORAGE_KEY = 'todos';

const TodoService = {

    //get todos
    getTodos: (): TodoTypes[] => {
        const todoString = localStorage.getItem(LOCAL_STORAGE_KEY);
        return todoString ? JSON.parse(todoString) : []

    },

    //add todos
    addTodo: (text: string): TodoTypes => {
        const todos = TodoService.getTodos();
        const newTodo: TodoTypes = {id: todos.length + 1, text, compeleted: false};
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
        const updateTodos = todos.map((t) => (t.id === id ? {...t, compeleted: !t.compeleted} : t));
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