# Tic-tac-toe App

Real-time tic-tac-toe app with chat functionality.

# Links

- Link to Web App: [https://master.d40a59sddy1g1.amplifyapp.com/](https://master.d40a59sddy1g1.amplifyapp.com/)
- Link to Lambda repo: [https://github.com/chrismathew05/ttt-lambda](https://github.com/chrismathew05/ttt-lambda)

# Requirements

- Two players playing against each other in real-time. Only one game at a time!
- Players arriving after can spectate the game.
- When a game is won/tied, a message is sent to chat and the game is reset.
- Everyone can communicate in real-time in the chat.

# Process Flow

1. This React web application is hosted on AWS Amplify which is synced to this Github repo.
2. When the user opens the app, a `$connect` request is sent to the Websocket API (`ttt-websocket`) hosted on AWS Gateway.
3. This request triggers a AWS Lambda function `ttt-handler` which stores `connectionId` and designated `connType` (defaults to "2" which denotes spectator) into the `connections` table on AWS DynamoDB.
4. The lambda function returns a successful response code which triggers the client's `onconnect` handler, which now sends a `getInfo` route request to `ttt-websocket`.
5. This request again triggers `ttt-handler`, which in turn broadcasts game info to all clients (such as whether the game is available to be joined).
6. When a user clicks 'Join Game', this sends a `joinGame` route request to `ttt-websocket`. This updates the `connType` of the user from "2" (spectator) to "0;" (Player One) or "1;" (Player Two). A broadcast is sent to all clients notifying them of the ID of the player.
7. Once two players join the game, the tic-tac-toe grid becomes active and the 'Join Game' button is no longer available until one of the players leave or the game reaches a decision.
8.

# Architecture
