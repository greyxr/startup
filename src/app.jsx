import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function App() {
    const headerArt = String.raw`
    ____  ___                  ___.          .__   _____      
    \   \/  /___________  _____\_ |__ _____  |  |_/ ____\_ __ 
     \     //  _ \_  __ \/     \| __ \\__  \ |  |\   __\  |  \
     /     |  (_) |  | \/  Y Y  \ \_\ \/ __ \|  |_|  | |  |  /
    /___/\  \____/|__|  |__|_|  /___  /____  /____/__| |____/ 
          \_/                 \/    \/     \/                 
    `;
    const asciiLines = headerArt.split('\n');
    for (const line of asciiLines) {
        console.log(line)
    }
    return (
    <div className="body">
            <header>
            <pre>{headerArt}</pre>
      </header>
    <footer>
      <hr/>
        <MyNavbar/>
    </footer>
</div>
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
            <Nav.Link href="./index.html">Play</Nav.Link>
            <Nav.Link id="loginButton" href="./login.html">Login</Nav.Link>
            <Nav.Link id="logoutButton" onClick={() => logout()}>Logout</Nav.Link>
            <Nav.Link href="./about.html">About</Nav.Link>
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