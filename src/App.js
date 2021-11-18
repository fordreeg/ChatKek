import './App.css';
import io from 'socket.io-client';

function App() {
    const connectSocket = () => {
        io('http://localhost:8888');
    }
  return (
    <div className="App">
        <div>
            <input type="text" placeholder='Room ID' value=''/>
            <input type="text" placeholder='Ваше имя' value=''/>
            <button onClick={connectSocket}>Войти</button>
        </div>
    </div>
  );
}

export default App;
