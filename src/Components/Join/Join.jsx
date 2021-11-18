import React, {useState} from 'react';
import axios from "axios";

const Join = ({onLogin}) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);
    
    
    const onEnter = async () => {
        if (!roomId || !userName) {
            alert('no')
        } else {
            const obj = {
                roomId,
                userName,
            }
            setLoading(true);
            await axios.post('/rooms', obj);
            onLogin(obj);
        }
    }
    return (
        <div className="join-block">
            <input type="text" placeholder='Room ID' value={roomId}
                   onChange={(e) => {setRoomId(e.target.value)}}
            />
            <input type="text" placeholder='Ваше имя' value={userName}
                   onChange={(e) => {setUserName(e.target.value)}}
            />
            <button onClick={onEnter} disabled={isLoading}
                    className="btn btn-success">
                {isLoading ? 'Вход...' : 'Войти'}
            </button>
        </div>
    );
};

export default Join;