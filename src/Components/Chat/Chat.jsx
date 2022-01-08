import React, { useEffect, useRef, useState } from 'react'
import socket from '../../Socket/Socket'

const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
  const [valueTextarea, setValueTextarea] = useState('')
  const messagesRef = useRef(null)

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      text: valueTextarea,
      roomId,
    })
    onAddMessage({
      userName,
      text: valueTextarea,
    })
    setValueTextarea('')
  }

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999999)
  }, [messages])

  return (
    <div className='chat'>
      <div className='chat-users'>
        Room: <b>{roomId}</b>
        <hr />
        <b>Online: {users.length}</b>
        <ul>
          {users.map((user, index) => (
            <li key={index + 1}>{user}</li>
          ))}
        </ul>
      </div>
      <div className='chat-messages'>
        <div className='messages' ref={messagesRef}>
          {messages.map((message, index) => (
            <div className='message' key={index + 1}>
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            name='message'
            placeholder='Enter new message'
            className='form-control'
            style={{ resize: 'none' }}
            value={valueTextarea}
            required
            onChange={(e) => {
              setValueTextarea(e.target.value)
            }}
          />
          <button
            onClick={onSendMessage}
            disabled={valueTextarea === ''}
            type='button'
            className='btn btn-primary'
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
