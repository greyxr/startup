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

  function logout() {
    loggedIn = false
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/login.html'));
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
          if (results.status == 200) {
            let body = await results.json()
            if (body.authenticated === true) loggedIn = true
            return userName
          }
          else {
            userName = 'guest'
            return userName
          }
         }
  }

async function loadUsername() {
    let userNameSpan = document.getElementById('userNameSpan')
    userNameSpan.innerText = await getUsername()
}

addEventListener("load", (event) => {});
onload = (event) => onLoadFunctions();

async function saveGame() {
    await fetch('/api/auth/saveGame', {
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

function setLoginButton() {
  let loginButton = document.getElementById('loginButton')
  let logoutButton = document.getElementById('logoutButton')
  let loginStyle = loggedIn ? 'none' : 'block'
  let logoutStyle = loggedIn ? 'block' : 'none'
  
  // Show or hide login/out buttons as appropriate
  loginButton.style.display = loginStyle
  logoutButton.style.display = logoutStyle
}

async function onLoadFunctions() {
    await loadUsername()
    loadUsersOnline()
    setLoginButton()
}

// This simulates the websocket data for now. Every minute the number of users updates.
let interval = setInterval(function () { loadUsersOnline(); }, 60000);