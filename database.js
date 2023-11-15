const config = require('./dbConfig.json');
const { MongoClient } = require('mongodb');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('xormbalfu');
const savedGamesCollection = db.collection('savedGames');
//const loginCollection = db.collection('loginInfo');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addScore(score) {
    const result = await scoreCollection.insertOne(score);
    return result;
  }
  
  function getHighScores() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
      sort: { score: -1 },
      limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
  }

  async function saveGame(body) {
    console.log("In saveGame")
    console.log(body)
    outputHistory = body.output
    userName = body.userName
    let game = {
        "userName":userName,
        "gameData":outputHistory
    }
    const results = await savedGamesCollection.replaceOne(
        {"userName":userName},
        game,
        {
            upsert:true
        }
    )
    console.log(results.acknowledged)
    //console.log(outputHistory)
    //savedGames[userName] = outputHistory
    return results.acknowledged
  }
  
  async function loadGameFromDB(userName) {
    console.log('loadGame hit with username ' + userName)
    const query = { "userName": userName }
    let cursor = savedGamesCollection.find(query)
    let results = await cursor.toArray()
    console.log(results)
    if (results[0] != null) {
      console.log("Returning game")
      console.log(results[0])
      return results[0]
    } else {
      console.log("No game found")
      return {
        // Returning this because returning null or an empty object caused problems for the response
        gameData: 'none'
      }
    }
}

async function deleteGame(userName) {
    console.log('In delete game with username ' + userName)
    const query = { "userName": userName }
    let results = await savedGamesCollection.deleteOne(query)
    return results
}

module.exports = { saveGame, loadGameFromDB, deleteGame };