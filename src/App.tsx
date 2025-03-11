import {FaPen, FaClipboardList } from "react-icons/fa"
import TodoList from "./components/TodoList"

function App() {

  return (
    <div className="App">
      <div className="header">
        <div className="logoside">
          <FaPen />
          <h1>To-Do List</h1>
          <FaClipboardList />
        </div>
    </div>
    <TodoList />
  </div>
  )
}

export default App
