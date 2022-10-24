
const _CONN_STATUS = ["Disconnected - refresh to re-connect.", "Pending...", "Connected"];

export const Status = ({ connectionId, connStatus }) => {

    return (
        <div>
            <div>Connection Status: {_CONN_STATUS[connStatus]}</div>
            <div>{connStatus === 2 ? `User ID: ${connectionId}` : ""}</div>
        </div>
    );
}
