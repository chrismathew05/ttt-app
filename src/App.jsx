import { useState, useEffect } from "react";

import { Chat } from "./components/Chat";

import "./App.css";

const _CONN_STATUS = ["Disconnected - refresh to re-connect.", "Pending...", "Connected"]

const App = () => {
  const [socket, setSocket] = useState(null);
  const [connStatus, setConnStatus] = useState(0); // 0 = Disconnected, 1 = Pending, 2 = Connected
  const [chatMessages, setChatMessages] = useState([]);

  // tracks state of key backend game info
  const [connectionId, setConnectionId] = useState("");
  const [avail, setAvail] = useState([]);
  const [p1Id, setP1Id] = useState("");
  const [p2Id, setP2Id] = useState("");
  const [p1Moves, setP1Moves] = useState([]);
  const [p2Moves, setP2Moves] = useState([]);

  useEffect(() => {
    if (socket == null) {
      let webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      setSocket(webSocket)
      setConnStatus(1);

      webSocket.onopen = () => webSocket.send(JSON.stringify({ "action": "getInfo" }));

      webSocket.onmessage = event => {
        const data = JSON.parse(event.data);
        console.log(data);

        setConnectionId(data["connectionId"]);
        setAvail(data["avail"]);
        setP1Id(data["p1Id"]);
        setP2Id(data["p2Id"]);
        setP1Moves(data["p1Moves"]);
        setP2Moves(data["p2Moves"]);

        const newMessage = data["newMessage"];
        if (Object.keys(newMessage).length !== 0) {
          let messages = chatMessages;
          messages.push(newMessage);
          setChatMessages(messages.slice(-20));
        }

        setConnStatus(2);
      };

      webSocket.onclose = () => setConnStatus(0);
    }
  }, [socket, chatMessages]);

  const sendChatMessage = () => {
    const message = prompt("Enter your message here.");
    if (message) {
      socket.send(JSON.stringify({ "action": "sendMessage", "message": message }));
    }
  }

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <p>Connection Status: {_CONN_STATUS[connStatus]}</p>
      <p>{connStatus === 2 ? `User ID: ${connectionId}` : ""}</p>
      <div className="row">
        <div className="col">
          <b>Chat:</b>
          <Chat chatMessages={chatMessages} />
          <button onClick={sendChatMessage}>Post Message</button>
        </div>
      </div>
    </div>
  );
}

export default App;
