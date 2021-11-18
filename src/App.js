import './App.css';
import Join from "./Components/Join/Join";
import {useReducer} from "react";

function App() {
    const [state, dispatch] = useReducer(reducer, {isAuth: false});
  return (
    <div className="App">
        <Join/>
    </div>
  );
}

export default App;
