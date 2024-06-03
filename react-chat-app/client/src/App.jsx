import { useState, useEffect } from "react"
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const App = () => {
  const [messages, setMessage] = useState([]);
  const [messageInput, setMessageInput] = useState();

  useEffect(() => {
    socket.on('message', (message) => {
      setMessage((messages)=>[...messages, message])
    })

    return () => {
      socket.off('message')//it removes the event listener for the 'message' event using socket.off('message')
    }
  }, [messages])

  const sendMessage=()=>{
    if(messageInput.trim()!==''){
      socket.emit('message', messageInput)
      setMessageInput("")
    }
  }
  

  return (
    <div>
      <h1>
        Simple Chat Apps
      </h1>
      <input
        type="text"
        value={messageInput}
        placeholder="Type your message..."
        onChange={(e) => setMessageInput(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      {/* render all messages */}

      <section>
        {messages.map(( message, index)=>(
          <div key={index}>{message}</div>
        ))}
      </section>


    </div>
  )
}

export default App