import React, { useState } from 'react';
import { animateText } from '../runGame.js'

export function Game() {
  const handleLoad = (event) => {
    configureWebSocket()
  };

  const [seedValue, setSeedValue] = useState('');
  const [hideSeedInput, setHideSeedInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [socket, setSocket] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [prompt] = useState(`You are a sarcastic, caustic narrator in a classic text adventure game. You will never break
  character and you will only respond with the appropriate output for the command given. If I enter a new room, give a detailed description
  of the new room. Each response will contain directions of where the user can go. If a user cannot reasonably perform a
  command given, respond with the reason why.
  Here is the context of previous messages:`)

  let outputHistory = ''
  
    window.addEventListener('load', handleLoad);
  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'
    const newSocket = new WebSocket(`${protocol}://${window.location.host}/ws`)
    newSocket.onopen = (event) => {
      //socket.send(JSON.stringify({from:'admin', type:'GameStartEvent', value:'test'}))
      displayMsg('game connected.')
    }
    newSocket.onclose = (event) => {
      displayMsg('game disconnected.')
    }
    newSocket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text())
      if (msg.type === 'GameStartEvent') {
        displayMsg(msg.from + ` started a new game with seed '${msg.value}'.`)
      } else if (msg.type === 'GameLoadEvent') {
        displayMsg(msg.from + ` started playing a saved game.`)
      }
    }
    setSocket(newSocket)
}
function displayMsg(msg) {
  const chatText = document.getElementById('websocketDisplay')
  animateText(msg, 'websocketDisplay')
  chatText.scrollTop = chatText.scrollHeight
}

async function broadcastEvent(from, type, value) {
  console.log('broadcastEvent hit')
  console.log(from)
  const event = {
    from: from,
    type: type,
    value: value,
  };
  socket.send(JSON.stringify(event));
}


const handleSeedKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleSeed();
  }
};

const handleInputKeyPress = (event) => {
  console.log("Pressed!")
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    handleInput()
  }
}

// Get the input field
var input = document.getElementById("input");

function toggleLoading() {
  //let loading = document.getElementById('loading')
  //loading.style.color = (loading.style.display === 'none' ? loading.style.display = 'flex' : loading.style.display = 'none')
  setLoading(!loading)
}

async function toggleBeginButton() {
    let userName = document.getElementById('userNameSpan').innerText
    let response = await fetch('/api/auth/loadGame?userName=' + userName)
    console.log(response.status)
    if (response.status === 401) {
      window.location.href = 'login.html'
    }
    console.log(response)
    let currentGame = await response.json()
    console.log(currentGame)
    console.log('here!')
    if (userName == 'guest' || currentGame.gameData == 'none') {
      console.log('Starting new game')
      document.getElementById('beginButton').style.display = "none"
      document.getElementById('seed').style.display = "block"
      document.getElementById('seedP').style.display = "block"
      document.getElementById('seed').value = ''
    }
    else {
      console.log('Retrieving saved game')
      broadcastEvent(userName, 'GameLoadEvent', {});
      //console.log(currentGame)
      document.getElementById('beginButton').style.display = "none"
      output = document.getElementById('output')
      input = document.getElementById('input')
      output.style.display = "block"
      document.getElementById('invDiv').style.display = "block"
      setHideSeedInput(true)
      document.getElementById('seedP').style.display = "none"
      toggleLoading() // So that the loading div starts in the correct state
      //await callGPT(currentGame, "Where am I?")
      //printToOutput(currentGame.game)
      outputHistory = currentGame.gameData
      printCurrentGame(currentGame.gameData)
      setInputVisible(true)
      setGameStarted(true)
    }
}

function printCurrentGame(game) {
  const outputDiv = document.getElementById("output");
  // console.log("Current game is:" + game)
  let newDiv = document.createElement('div')
  newDiv.innerText = game + '\n'
  outputDiv.appendChild(newDiv)
  outputDiv.scrollTop = output.scrollHeight
}

async function handleSeed() {
  output = document.getElementById('output')
  input = document.getElementById('input')
  output.style.display = "block"
  document.getElementById('invDiv').style.display = "block"
  broadcastEvent(localStorage.getItem("userName"), 'GameStartEvent', seedValue);
  setHideSeedInput(true)
  document.getElementById('seedP').style.display = "none"
  let prompt = 'The genre for this text adventure is inspired by ' + seedValue
  toggleLoading() // So that the loading div starts in the correct state
  await callGPT(prompt, "Where am I?")
  setInputVisible(true)
  setGameStarted(true)
}

async function handleInput() {

  // Assign variables
  inputBox = document.getElementById('input')
  output = document.getElementById('output')
  
  // Check for empty command
  if(inputBox.value == '') {
      return
  }

  printToOutput('\n' + '> '+ inputBox.value)
  inputBox.value = ''
  await callGPT(inputBox.value, outputHistory)
}

// function toggleLoading() {
//     let loading = document.getElementById('loading')
//     loading.style.color = (loading.style.display === 'none' ? loading.style.display = 'flex' : loading.style.display = 'none')
// }

function toggleLoading() {
//let loading = document.getElementById('loading')
//loading.style.color = (loading.style.display === 'none' ? loading.style.display = 'flex' : loading.style.display = 'none')
setLoading(!loading)
}

function printToOutput(outputText, displayOnly = false) {
  let output = document.getElementById('output')
  outputText += '\n'
  if (!displayOnly) {
      outputHistory += outputText
  }
  animateText(outputText, 'output')
  output.scrollTop = output.scrollHeight
}

async function handleSeed() {
  output = document.getElementById('output')
  input = document.getElementById('input')
  output.style.display = "block"
  document.getElementById('invDiv').style.display = "block"
  let seed = document.getElementById('seed')
  broadcastEvent(localStorage.getItem("userName"), 'GameStartEvent', seed.value);
  seed.style.display = "none"
  document.getElementById('seedP').style.display = "none"
  let prompt = 'The genre for this text adventure is inspired by ' + seed.value
  toggleLoading() // So that the loading div starts in the correct state
  await callGPT(prompt, "Where am I?")
  input.style.display = "block"
  setGameStarted(true)
}

async function callGPT(input, context, tries = '3') {
  toggleLoading()
  let apiKeyRes = await (await fetch("./config.json")).json()
  let apiKey = apiKeyRes.apiKey
  let apiUrl = 'https://api.openai.com/v1/chat/completions'
  const requestData = {
      "model": "gpt-3.5-turbo",
      "messages": [
          {"role": "system", "content": `${prompt + context}`},
          {"role": "user", "content": `${input}`}
      ],
      "temperature": 0.50
    };
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    };
    
    try {
      let response = await fetch(apiUrl, requestOptions)
      let data = await response.json()
      toggleLoading()
      try {
          let message = data.choices[0].message.content
          printToOutput(message)
          // Saves the game locally
          localStorage.setItem("outputHistory", outputHistory)
      }
      catch (e) {
          console.error(e)
          if (tries != 0) {
              console.log(`Automatically retrying... ${tries} left`)
              callGPT(input, context, (tries - 1))
          }
      }
  } catch (error) {
      toggleLoading()
      console.error('API Request Error:', error)
      if (tries != 0) {
          console.log(`Automatically retrying... ${tries} left`)
          callGPT(input, context, (tries - 1))
      }
      else {
          printToOutput(`Network error ${error}. Please try again or refresh if issue persists.`)
      }
  }
}

  return (
    <main className="switch-to-row">
      <section className="invSection">
        <div id="invDiv"></div>
      </section>
      <section className="gameSection">
        <button id="inputButton" type="button" style={{ display: 'none' }} onClick={handleInput}>
          Hidden Input
        </button>
        <button id="seedButton" type="button" style={{ display: 'none' }} onClick={handleSeed}>
          Hidden
        </button>
        <button
          id="beginButton"
          type="button"
          className="rounded"
          style={{ backgroundColor: '#212529', color: 'white' }}
          onClick={toggleBeginButton}
        >
          Begin
        </button>
        <p id="seedP">Enter a word or phrase.</p>
        <input type="input" className="form-control bg-dark text-white"
        id="seed" placeholder="a dark cave" onChange={(e) => setSeedValue(e.target.value)}
        onKeyDown={handleSeedKeyPress}/>

        {/* Output box and input box */}
        <div id="output"></div>
        <input type="input" id="input" className="form-control bg-dark text-white" placeholder="go north..." onKeyDown={handleInputKeyPress} style={{
            display: inputVisible ? 'block' : 'none',
          }}/>
        <div id="loading" className="loader" style={{
            display: loading ? 'flex' : 'none',
          }}>
          <span className="loader__element"></span>
          <span className="loader__element"></span>
          <span className="loader__element"></span>
        </div>
      </section>
      <section className="chatSection hide-on-small-screen">
        <div id="websocketDisplay" style={{ width: '80%', height: '60%', overflow: 'auto' }}></div>
      </section>
    </main>
  );
}