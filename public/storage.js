async function login() {
    saveUsername()
    // asynchronous login stuff
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, 2000)
    })
    loggedIn = true
    window.location.href = "index.html";
}

function saveUsername() {
    const username = document.querySelector("#username");
    localStorage.setItem("userName", username.value);
}

function getUsername() {
        let userName = localStorage.getItem("userName")
        if (userName == null) userName = 'guest'
        return userName
  }

function loadUsername() {
    console.log('loadUsername hit!')
    let userNameSpan = document.getElementById('userNameSpan')
    userNameSpan.innerText = getUsername()
}

addEventListener("load", (event) => {});
onload = (event) => onLoadFunctions();

async function loadGame() {
    //let currentGame
    // This will be hooked up the the database. Right now it's just storing and grabbing outputhistory from localstorage.
    // I was messing around with keeping the current game in localStorage, but I'm going to wait until I have database
    // support, which is why this is commented out.
    // console.log('loadGame hit!')
    // let currentGame = localStorage.getItem("outputHistory")
    // let currentGame = await fetch('/api/loadGame?userName=dave')
    // if (currentGame != null) {
    //     console.log('game found')
    //     output = document.getElementById('output')
    //     input = document.getElementById('input')
    //     document.getElementById('beginButton').style.display = "none"
    //     output.style.display = "block"
    //     document.getElementById('invDiv').style.display = "block"
    //     let seed = document.getElementById('seed')
    //     seed.style.display = "none"
    //     document.getElementById('seedP').style.display = "none"
    //     outputHistory = currentGame
    //     input.style.display = "block"
    //     printInventory()
    //     animateText('Game loaded.', 'output')
    //     handleInput()
    // }
}

async function saveGame() {
    // This will be hooked up the the database. Right now it's just storing and grabbing outputhistory from localstorage.
    //localStorage.setItem("outputHistory", outputHistory)
    await fetch('/api/saveGame', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            output: localStorage.getItem("outputHistory"),
            userName: localStorage.getItem("userName")
        })
    })
}

function loadUsersOnline() {
    console.log('loadUsersOnline hit!')
    let usersOnlineSpan = document.getElementById('usersOnline')
    usersOnlineSpan.innerText = getUsersOnline()
}

function getUsersOnline() {
    return Math.floor(Math.random() * 10) + 1
}

function onLoadFunctions() {
    loadGame()
    console.log('On load')
    loadUsername()
    loadUsersOnline()
}

// This simulates the websocket data for now. Every minute the number of users updates.
let interval = setInterval(function () { loadUsersOnline(); }, 60000);