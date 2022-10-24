import { useState, useEffect } from "react";

import { Chat } from "./components/Chat";
import { Grid } from "./components/Grid";
import { Status } from "./components/Status";

import "./App.css";

const _CONN_STATUS = ["Disconnected - refresh to re-connect.", "Pending...", "Connected"];

const App = () => {
  const [socket, setSocket] = useState(null);
  const [connStatus, setConnStatus] = useState(0); // 0 = Disconnected, 1 = Pending, 2 = Connected
  const [chatMessages, setChatMessages] = useState([]);

  // tracks state of key backend game info
  const [connectionId, setConnectionId] = useState("");
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
    }

  }, [socket, chatMessages]);

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <h4>Connection Status: {_CONN_STATUS[connStatus]}</h4>

      {connStatus === 2 ? <>
        <Status socket={socket} connectionId={connectionId} connStatus={connStatus} p1Id={p1Id} p2Id={p2Id} />
        <br />

        <Grid socket={socket} p1Moves={p1Moves} p2Moves={p2Moves} />
        <br />

        <Chat socket={socket} chatMessages={chatMessages} />
        <br />
      </> : <span />}

    </div>
  );
}

export default App;
