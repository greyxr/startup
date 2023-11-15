const express = require('express');
const database = require('./database.js')
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

// loadGame
apiRouter.get('/loadGame', async (req, res) => {
  // console.log('In loadGame')
  let userName = req.query.userName
  let game = await database.loadGameFromDB(userName)
  // console.log("Results:")
  // console.log(game)
  res.send(game)
});

// savegame
apiRouter.post('/saveGame', async (req, res) => {
  //game = saveGame(req.body);
  // console.log('Retrieved from saveGame:')
  let results = await database.saveGame(req.body)
  res.send(results);
});

// restart
apiRouter.delete('/restart', async (req, res) => {
  console.log("In restart route")
  let results = await database.deleteGame(req.query.userName)
  console.log(results)
  res.send(results);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
