import './App.css'
import Join from './Components/Join/Join'
import socket from './Socket/Socket'
import {useEffect, useReducer} from 'react'
import reducer from './Reducer/Reducer'
import Chat from './Components/Chat/Chat'
import axios from 'axios'

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  })
  
  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    })
  }
  
  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    })
    socket.emit('ROOM:JOIN', obj)
    const {data} = await axios.get(`/rooms/${obj.roomId}`)
    dispatch({
      type: 'SET_DATA',
      payload: data,
    })
  }
  
  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    })
  }
  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers)
    socket.on('ROOM:NEW_MESSAGE', addMessage)
  }, [])
  
  return (
    <div className='wrapper'>
      {!state.joined ? (
        <Join onLogin={onLogin}/>
      ) : (
        <Chat {...state} onAddMessage={addMessage}/>
      )}
    </div>
  )
}

export default App
