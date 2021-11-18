import React, {useEffect, useRef, useState} from 'react';
import socket from "../../Socket/Socket";

const Chat = ({users, messages, userName, roomId, onAddMessage}) => {
    const [valueTextarea, setValueTextarea] = useState('');
    const messagesRef = useRef(null);
    
    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            text: valueTextarea,
            roomId,
        });
        onAddMessage({
            userName,
            text: valueTextarea,
        });
        setValueTextarea('')
    }
    
    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999999)
    }, [messages]);
    
    return (
        <div style={{display: 'flex', height: '200px'}}>
            <div style={{width: '150px', border: '1px solid red'}}>
                <div>Room: {roomId}</div>
                <hr/>
                <div>Online: {users.length}</div>
                <div>Users:</div>
                <div>{users.map((user, index) => <div key={index+1}>{user}</div>)}</div>
                
            </div>
            <div style={{border: '1px solid red',}}>
                <div >
                    <div style={{marginBottom: '20px'}} ref={messagesRef}>
                        {messages.map((message, index) => {
                            return (
                                <div key={index+1}>
                                    <div>{message.text}</div>
                                    <div>{message.userName}</div>
                                    <hr/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <div>
                        <textarea name="message" placeholder='Enter new message'
                                  value={valueTextarea} required onChange={(e) => {setValueTextarea(e.target.value)}}/> <br/>
                        <button onClick={onSendMessage} disabled={valueTextarea === ''}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
