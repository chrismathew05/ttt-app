import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [connStatus, setConnStatus] = useState(0); // 0 = Disconnected, 1 = Pending, 2 = Connected

  useEffect(() => {
    if (socket == null) {
      let webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      setSocket(webSocket)
      setConnStatus(1);

      webSocket.onopen = () => {
        let test = { "action": "getInfo" }
        webSocket.send(JSON.stringify(test));
      };

      webSocket.onmessage = event => {
        console.log(event.data);
        console.log("CONNECTED");
        setConnStatus(2);
      };
    }
  }, [socket]);

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
    </div>
  );
}

export default App;
