let loggedIn = false

async function login() {
    saveUsername()
    // asynchronous login stuff
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            loggedIn = true
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
        else {
            loggedIn = true
        }
        return userName
  }

function loadUsername() {
    console.log('loadUsername hit!')
    let userNameSpan = document.getElementById('userNameSpan')
    userNameSpan.innerText = getUsername()
}

addEventListener("load", (event) => {});
onload = (event) => onLoadFunctions();

async function saveGame() {
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
    console.log('On load')
    loadUsername()
    loadUsersOnline()
}

// This simulates the websocket data for now. Every minute the number of users updates.
let interval = setInterval(function () { loadUsersOnline(); }, 60000);