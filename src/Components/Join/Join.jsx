import React, {useState} from 'react';
import Socket from "../../Socket/Socket";
import axios from "axios";


const Join = () => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    
    const onEnter = () => {
        if (!roomId || !userName) {
            alert('no')
        } else {
            axios.post('/rooms', {
                roomId,
                userName,
            });
        }
    }
    return (
        <div>
            <input type="text" placeholder='Room ID' value={roomId}
                   onChange={(e) => {setRoomId(e.target.value)}}
            />
            <input type="text" placeholder='Ваше имя' value={userName}
                   onChange={(e) => {setUserName(e.target.value)}}
            />
            <button onClick={onEnter}>Войти</button>
        </div>
    );
};

export default Join;