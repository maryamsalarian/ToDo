import TodoList from "./components/TodoList"
import classes from './CSS/App.module.css'
 
function App() {

  return (
    <div className={classes.App}>
      <div className={classes.header}>
        <div className={classes.logoside}>
          <h1>To-Do List</h1>
        </div>
    </div>
    <TodoList />
  </div>
  )
}

export default App
