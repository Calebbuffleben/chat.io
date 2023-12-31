
import { useEffect, useRef, useState } from 'react';
import { socket } from './socket';
import { v4 as uuid } from 'uuid'
import './App.css'

function App() {
  const socketInstance = socket();
  const messageContainer = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageContainer.current.scrollTo(
      0,
      messageContainer.current.scrollHeight
    )
  }, []);

  useEffect(() => {
    socketInstance.on("message", message => {
      setMessages(prev => [...prev, message]);
    })

    return () => { socketInstance.off("message") }
  }, [socketInstance]);

  const handleSubmit = (data) => {
    data.preventDefault();
    const newMessage = {
      text: data,
      userName: 'Usuário teste',
      id: uuid()
    };

    socketInstance.emit('message', newMessage);
    setMessages(prev => [...prev, { ...newMessage, isOwner: true }]);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="flex-shrink-0 bg-white border-b-2 border-gray-200">
          <div className="flex justify-between p-4">
            <div className="text-lg font-semibold text-gray-800">Chat App</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-2">
          {/* Messages go here */}
          <div ref={messageContainer} className="flex flex-col items-start space-y-2">
            {messages.map(message => 
              <>
                {message.isOwner ? (
                <div key={message} className="flex items-center">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'%3E%3C/path%3E%3C/svg%3E"
                    alt="User 1"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="bg-blue-500 text-white py-2 px-4 rounded-lg max-w-xs">
                    {message.text}
                  </div>
                </div>
                ) : (!message.isOwner ? (
                <div className="flex items-center">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'%3E%3C/path%3E%3C/svg%3E"
                  alt="User 2"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="bg-gray-300 py-2 px-4 rounded-lg max-w-xs">
                  How can I help you?
                </div>
              </div>
                ): (<div> Problem with messages </div>))} 
            </>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className="flex-shrink-0 bg-white border-t-2 border-gray-200">
          <form onSubmit={handleSubmit} className="flex p-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-md p-2"
            />
            <input type="submit" value="send" className="ml-2 bg-blue-500 text-white p-2 rounded-md" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
