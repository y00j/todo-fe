import { useContext } from "react";
import LoginSignup from "./components/LoginSignup";
import TodoList from "./components/TodoList";
import AuthContext from "./context/auth/AuthContext";
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      {/* {user ? <TodoList /> : <LoginSignup />} */}
      <TodoList></TodoList>
    </div>
  );
}

export default App;
