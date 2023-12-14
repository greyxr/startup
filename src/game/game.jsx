import React from 'react';
import { animateText } from '../runGame.js'

export function Game() {
  const handleLoad = (event) => {
    // configureWebSocket()
  };

  let socket
  
    window.addEventListener('load', handleLoad);
  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`)
    socket.onopen = (event) => {
      //socket.send(JSON.stringify({from:'admin', type:'GameStartEvent', value:'test'}))
      displayMsg('game connected.')
    }
    socket.onclose = (event) => {
      displayMsg('game disconnected.')
    }
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text())
      if (msg.type === 'GameStartEvent') {
        displayMsg(msg.from + ` started a new game with seed '${msg.value}'.`)
      } else if (msg.type === 'GameLoadEvent') {
        displayMsg(msg.from + ` started playing a saved game.`)
      }
    }
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
  return (
    <main className='container-fluid text-center'>
      <div>game displayed here</div>
    </main>
  );
}