import './App.css';
import Join from "./Components/Join/Join";
import socket from "./Socket/Socket";
import {useEffect, useReducer} from "react";
import reducer from './Reducer/Reducer'

function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
    });
    
    const onLogin = (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        });
        socket.emit('ROOM:JOIN', obj);
    }
    useEffect(() => {
        socket.on('ROOM:JOINED', users => {
            console.log('new user', users)
        })
    }, []);
    
  return (
    <div className="App">
        {!state.joined && <Join onLogin={onLogin}/>}
    </div>
  );
}

export default App;
