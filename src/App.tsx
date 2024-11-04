import { useContext } from "react";
import TodoList from "./components/TodoList";
import AuthContext from "./context/auth/AuthContext";
import LoginSignup from "./components/LoginSignup";
import Timer from "./components/Timer/Timer";
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      {user ? <TodoList /> : <LoginSignup />}
      {/* <TodoList></TodoList> */}
      <Timer />
    </div>
  );
}

export default App;
