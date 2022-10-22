import './App.css';

const WEBSOCKET_URL = "wss://u6meuv9d2l.execute-api.us-east-2.amazonaws.com/production";

const App = () => {

  const connect = () => {
    const WS = new WebSocket(WEBSOCKET_URL);

    WS.onopen = () => {
      console.log("CONNECTED.")
    }

    WS.onclose = () => {
      console.log("DISCONNECTED.")
    }
  }

  return (
    <div className="App">
      <button onClick={connect}>Testing</button>
    </div>
  );
}

export default App;
