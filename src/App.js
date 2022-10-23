import { useState } from 'react';
import './App.css';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [connStatus, setConnStatus] = useState(0); // 0 = Disconnected, 1 = Pending, 2 = Connected

  const connect = () => {
    let socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    setConnStatus(1);

    socket.onopen = () => {
      console.log("CONNECTED.");
      setSocket(socket);
      setConnStatus(2);
    };
  }

  const disconnect = () => {
    if (socket != null) {
      socket.close();
      setConnStatus(1);

      socket.onclose = () => {
        console.log("DISCONNECTED.");
        setSocket(null);
        setConnStatus(0);
      };
    }
  }

  return (
    <div className="App">
      <button onClick={connStatus === 0 ? connect : disconnect} disabled={connStatus === 1}>
        {["Connect", "Pending", "Disconnect"][connStatus]}
      </button>
    </div>
  );
}

export default App;
