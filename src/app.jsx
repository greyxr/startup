import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { About } from './about/about';


export default function App() {
    const headerArt = String.raw`
    ____  ___                  ___.          .__   _____      
    \   \/  /___________  _____\_ |__ _____  |  |_/ ____\_ __ 
     \     //  _ \_  __ \/     \| __ \\__  \ |  |\   __\  |  \
     /     |  (_) |  | \/  Y Y  \ \_\ \/ __ \|  |_|  | |  |  /
    /___/\  \____/|__|  |__|_|  /___  /____  /____/__| |____/ 
          \_/                 \/    \/     \/                 
    `;
    return (
        <BrowserRouter>
    <div className="body">
            <header>
            <pre>{headerArt}</pre>
      </header>
      <Routes>
  <Route path='/' element={<Play />} exact />
  <Route path='/about' element={<About />} />
  <Route path='/login' element={<Login />} />
  <Route path='*' element={<NotFound />} />
</Routes>
    <footer>
    <hr/>
        <MyNavbar/>
    </footer>
</div>
</BrowserRouter>
);
}

function MyNavbar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" fixed="bottom">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="./images/xorm1.png"
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
            <NavLink className='nav-link loginButton' to='login'>Login</NavLink>
            <Nav.Link id="logoutButton" onClick={() => logout()}>Logout</Nav.Link>
            <NavLink className='nav-link' to='about'>About</NavLink>
            <Nav.Link href="https://github.com/greyxr/startup">GitHub</Nav.Link>
            <Nav.Link onClick={() => handleSave()}>Save</Nav.Link>
            <Nav.Link onClick={() => {
              if (gameStarted) {
                restartGame();
              } else {
                console.log('No game found to restart');
              }
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
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }