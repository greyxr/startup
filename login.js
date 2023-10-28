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
onload = (event) => loadUsername();