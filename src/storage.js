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

export { saveGame }