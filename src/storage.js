

async function login() {
    loginOrCreate(`/api/auth/login`)
}

async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  export {loginUser, login, createUser}
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  
  async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#username')?.value;
    const password = document.querySelector('#password')?.value;
    if (userName == '' || password == '') {
      document.getElementById('loginErrorMessage').textContent = `⚠ Error: Please enter a valid username and password`;
      return
    }
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ userName: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      console.log("logged in")
      localStorage.setItem('userName', userName);
      localStorage.setItem("authenticated", true)
      document.getElementById('loginErrorMessage').textContent = ``;
      setLoggedIn()
      window.location.href = '/#';
    } else {
      console.log("error")
      const body = await response.json();
      document.getElementById('loginErrorMessage').textContent = `⚠ Error: ${body.msg}`;
    }
  }

  export { loginOrCreate }

  function setLoggedIn() {
    localStorage.setItem("authenticated", true)
  }

  function setLoggedOut() {
    console.log("setLoggedOut hit")
    // localStorage.delete("authenticated", false)
    localStorage.removeItem("authenticated")
  }

  function logout() {
    setLoggedOut()
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/login'));
  }

export { logout }

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
            if (body.authenticated === true) setLoggedIn()
            return userName
          }
          else {
            userName = 'guest'
            return userName
          }
         }
  }

export { getUsername }

function getAuthenticated() {
  const auth = localStorage.getItem("authenticated")
  if (auth == null || auth == false) return false
  return true
}

export { getAuthenticated }

// async function loadUsername() {
//     let userNameSpan = document.getElementById('userNameSpan')
//     userNameSpan.innerText = await getUsername()
// }

// export { loadUsername }

// addEventListener("load", (event) => {});
// onload = (event) => onLoadFunctions();

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

// function setLoginButton(loginButton, logoutButton) {
//   // let loginButton = document.getElementById('loginButton')
//   // let logoutButton = document.getElementById('logoutButton')
//   let loginStyle = loggedIn ? 'none' : 'block'
//   let logoutStyle = loggedIn ? 'block' : 'none'
  
//   // Show or hide login/out buttons as appropriate
//   loginButton.style.display = loginStyle
//   logoutButton.style.display = logoutStyle
// }

async function onLoadFunctions(loginButton, logoutButton) {
    // await loadUsername()
    // setLoginButton(loginButton, logoutButton)
}

export { onLoadFunctions }

// This simulates the websocket data for now. Every minute the number of users updates.