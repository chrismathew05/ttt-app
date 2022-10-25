import "./Grid.css"

/**
 * Displays squares that form tic-tac-toe grid.
 */
export const Grid = ({ socket, isPlayerTurn, p1Moves, p2Moves }) => {

    return (
        <div className="grid">
            {/* Loops through squares and marks them based on player moves */}
            {(p1Moves && p2Moves) ? [...Array(9).keys()].map(idx => {
                const inP1Moves = p1Moves.includes(`${idx}`);
                const inP2Moves = p2Moves.includes(`${idx}`);

                return (
                    <div
                        key={`square-${idx}`}

                        // Adds active clickable class when it's the player's turn
                        className={`square ${isPlayerTurn && !(inP1Moves || inP2Moves) ? "active" : ""}`}
                        onClick={() => {
                            if (isPlayerTurn && !(inP1Moves || inP2Moves)) {
                                socket.send(JSON.stringify({ "action": "makePlay", "message": `${idx}` }));
                            }
                        }}
                    >
                        {inP1Moves ? "X" : (inP2Moves ? "O" : "")}
                    </div>
                );
            }) : ""}
        </div>
    );
}
