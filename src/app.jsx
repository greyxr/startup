import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { About } from './about/about';
import { getAuthenticated, getUsername, saveGame, logout } from './storage.js'


export default function App() {
  let socket
  let authenticated = getAuthenticated()
  const headerArt = String.raw`
    ____  ___                  ___.          .__   _____      
    \   \/  /___________  _____\_ |__ _____  |  |_/ ____\_ __ 
     \     //  _ \_  __ \/     \| __ \\__  \ |  |\   __\  |  \
     /     (  <_> )  | \/  Y Y  \ \_\ \/ __ \|  |_|  | |  |  /
    /___/\  \____/|__|  |__|_|  /___  (____  /____/__| |____/ 
          \_/                 \/    \/     \/                 
    `;
    return (
        <BrowserRouter>
    <div className="body">
            <header>
            <pre>{headerArt}</pre>
      </header>
      <Routes>
  <Route path='/' element={<Game />} exact />
  <Route path='/about' element={<About />} />
  <Route path='/login' element={<Login />} />
  <Route path='*' element={<NotFound />} />
</Routes>
    <footer>
    <hr/>
        <MyNavbar authenticated={authenticated} onLogout = {logout}/>
    </footer>
</div>
</BrowserRouter>
);
}

function MyNavbar({authenticated, onLogout}) {
  let navAuthenticated = getAuthenticated()

  React.useEffect(() => {
    navAuthenticated = getAuthenticated()
    async function loadUsername() {
      let userNameSpan = document.getElementById('userNameSpan')
      userNameSpan.innerText = await getUsername()
  }
    let userName = loadUsername()
    console.log("Username: " + userName)
  })

  function handleLogout() {
    onLogout()
  }

  async function restartGame() {
    console.log("In restart game")
    let userName = document.getElementById('userNameSpan').innerText
    let response = await fetch('/api/auth/restart?userName=' + userName, {
      method: 'DELETE'
    })
    location.reload()
  }
  
  async function handleSave() {
    if(authenticated) {
      saveGame();
    } else {
      window.location.href = '/login';
    }
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark" fixed="bottom">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="./xorm1.png"
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
          <NavLink className='nav-link' to='/'>Play</NavLink>
            <NavLink className='nav-link loginButton' style={{display: authenticated ? 'none' : 'block'}} to='login'>Login</NavLink>
            <Nav.Link id="logoutButton" style={{display: authenticated ? 'block' : 'none'}}  onClick={() => handleLogout()}>Logout</Nav.Link>
            <NavLink className='nav-link' to='about'>About</NavLink>
            <Nav.Link href="https://github.com/greyxr/startup">GitHub</Nav.Link>
            <Nav.Link onClick={() => handleSave()}>Save</Nav.Link>
            <Nav.Link onClick={() => {
              restartGame()
            }}>Restart</Nav.Link>
            <Nav.Link id="userCount" disabled>
              currently logged in as <span id="userNameSpan"></span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function NotFound() {
    return <main>404: Return to sender. Address unknown.</main>;
  }