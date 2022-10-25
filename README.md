# Tic-tac-toe App

Real-time tic-tac-toe app with chat functionality.

# Links

- Link to Web App: [https://master.d40a59sddy1g1.amplifyapp.com/](https://master.d40a59sddy1g1.amplifyapp.com/)
- Link to Lambda repo: [https://github.com/chrismathew05/ttt-lambda](https://github.com/chrismathew05/ttt-lambda)

# Requirements

- Two players playing against each other in real-time. Only one game for the whole application at a time!
- Players arriving after can only spectate the game.
- When a game is won/tied, a message is sent to chat and the game is reset.
- Everyone can communicate in real-time in the chat.
- Backend must be in python/stateless/hosted on AWS Lambda
- Frontend must use SPA framework and also hosted on AWS

# Process Flow

1. This React web application is hosted on Amplify which is synced to this Github repo.
2. When the user opens the app, a `$connect` request is sent to the Websocket API (`ttt-websocket`) hosted on AWS Gateway.
3. This request triggers a Lambda function `ttt-handler` which stores `connectionId` and designated `connType` (defaults to "2" which denotes spectator) into the `connections` table on DynamoDB.
4. The lambda function returns a successful response code which triggers the client's `onconnect` handler, which now sends a `getInfo` route request to `ttt-websocket`.
5. This request again triggers `ttt-handler`, which in turn broadcasts game info to all clients (such as whether the game is available to be joined).
6. When a user clicks 'Join Game', this sends a `joinGame` route request to `ttt-websocket`. This triggers `ttt-handler` which updates the `connType` of the user from "2" (spectator) to "0;" (Player One) or "1;" (Player Two). A broadcast is sent to all clients notifying them of the ID of the player.
7. Once two players join the game, the tic-tac-toe grid becomes active and the 'Join Game' button is no longer available until one of the players leave or the game reaches a decision.
8. When a player clicks the grid on their turn, a `makePlay` route request is sent to `ttt-websocket`, which again triggers `ttt-handler` to update the moves recorded in the `connections` table (appends index of square clicked to `connType`, e.g. "0;0" indicates Player One selected the first square). This updated moveset is again broadcast to all clients.
9. This request also checks whether a user has won/if there is a tie. In this case, the game is reset:
   - The players `connType` is reset to "2", thereby making them spectators again. Anyone is now able to join the game as a player.
   - A message is sent to all clients, notifying them of the win/tie.
10. At any time, any user can click 'Post Message' which opens up a prompt and allows them to send a `sendMessage` route request with a message. This message is broadcast to all users and shows up in their chat window.

# Architecture

- ReactJS front-end client hosted on Amplify
- The client sends requests to Websocket API routes on AWS API Gateway.
- This triggers an integration request to an AWS Lambda function which houses back-end logic.
- The Lambda function transmits information back to the websocket which in turn broadcasts it to all clients.
- The Lambda function also updates/reads from an AWS DynamoDB database for persistent data.
- An IAM role (`ttt-role`) is granted permissions via an IAM policy (`ttt-policy`) under the least-privelege principle.
- The Lambda functiona and Websocket API print logs to AWS CloudWatch.

![Architecture Diagram](https://lucid.app/publicSegments/view/9460cbf5-a62b-4b6f-814b-3890796c57dc/image.png)
