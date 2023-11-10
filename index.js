const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/loadGame', (req, res) => {
  let userName = req.query.userName
  res.send(loadGame(userName))
});

// SubmitScore
apiRouter.post('/saveGame', (req, res) => {
  game = saveGame(req.body);
  console.log('Retrieved from saveGame:')
  console.log(game)
  res.send(game);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let savedGames = {}

function saveGame(body) {
  console.log("In saveGame")
  outputHistory = body.output
  userName = body.userName
  console.log(outputHistory)
  savedGames[userName] = outputHistory
  return savedGames[userName]
}

function loadGame(userName) {
  console.log('loadGame hit with username ' + userName)
  console.log(savedGames)
  if (savedGames[userName] != null) {
    console.log("Returning game")
    return {
      game: savedGames[userName]
    }
  } else {
    console.log("No game found")
    return {
      game: 'none'
    }
  }
}
