import './App.css';
import io from 'socket.io-client';

function App() {
    const connectSocket = () => {
        io('http://localhost:8888');
    }
  return (
    <div className="App">
      <button onClick={connectSocket}>Connect socket</button>
    </div>
  );
}

export default App;
