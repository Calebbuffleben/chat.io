
import { useEffect, useState } from 'react';
import './App.css'
import { socket } from './socket';

function App() {
  const [socketInstance] = useState(socket());

  useEffect(() => {
    socketInstance.on("message", message => {
      console.log('Mensagem recebida', message);
    })
  }, [socketInstance]);

  const handleSubmit = (data) => {
    console.log(data)
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
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'%3E%3C/path%3E%3C/svg%3E"
                alt="User 1"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="bg-blue-500 text-white py-2 px-4 rounded-lg max-w-xs">
                Hello there!
              </div>
            </div>
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
            <input type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-md">
              Send
            </input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
