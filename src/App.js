import './App.css';
import io from 'socket.io-client';
import Join from "./Components/Join/Join";

function App() {
    const connectSocket = () => {
        io('http://localhost:8888');
    }
  return (
    <div className="App">
        <Join/>
    </div>
  );
}

export default App;
