

export const Status = ({ socket, connectionId, p1Id, p2Id }) => {

    return (
        <div style={{ textAlign: "center" }}>
            <b>Game Information:</b>
            <div>{`User ID: ${connectionId}`}</div>
            <div>User Type: {
                connectionId === p1Id ? "Player One (X)" : (
                    connectionId === p2Id ? "Player Two (O)" : "Spectator")}
            </div>
            <div>Match: [{p1Id ? p1Id : "Pending"}] vs. [{p2Id ? p2Id : "Pending"}]</div>
            <div>{(!p1Id || !p2Id) && (connectionId !== p1Id) && (connectionId !== p2Id) ?
                <button
                    style={{ width: "100%" }}
                    onClick={() => socket.send(JSON.stringify({ "action": "joinGame" }))}
                >
                    Spot Available - Join Game!
                </button> : <span />}</div>
        </div>
    );
}
