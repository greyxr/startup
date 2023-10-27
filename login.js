async function login() {
    saveUsername()
    // asynchronous login stuff
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, 2000)
    })
    window.location.href = "index.html";
}

function saveUsername() {
    const username = document.querySelector("#username");
    localStorage.setItem("userName", username.value);
}