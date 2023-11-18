let loggedIn = false

async function login() {
    loginOrCreate(`/api/auth/login`)
}

async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  
  async function loginOrCreate(endpoint) {
    console.log('in login')
    const userName = document.querySelector('#username')?.value;
    const password = document.querySelector('#password')?.value;
    if (userName == '' || password == '') {
      document.getElementById('loginErrorMessage').textContent = `⚠ Error: Please enter a valid username and password`;
    }
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ userName: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('userName', userName);
      document.getElementById('loginErrorMessage').textContent = ``;
      loggedIn = true
      window.location.href = 'index.html';
    } else {
      const body = await response.json();
      document.getElementById('loginErrorMessage').textContent = `⚠ Error: ${body.msg}`;
    }
  }

function saveUsername() {
    const username = document.querySelector("#username");
    localStorage.setItem("userName", username.value);
}

async function getUsername() {
        let userName = localStorage.getItem("userName")
        if (userName == null)
        {
          userName = 'guest'
          return userName
        }
         else {
          const results = await fetch (`/api/user/${userName}`)
          if (results.status == 401 || results.status == 404) {
            userName = 'guest'
            return userName
          }
          else if (results.status == 200) {
            loggedIn = true
          }
         }
        return userName
  }

async function loadUsername() {
    let userNameSpan = document.getElementById('userNameSpan')
    userNameSpan.innerText = await getUsername()
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