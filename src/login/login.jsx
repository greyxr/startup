import React from 'react';
import './login.css';
import { login, createUser } from '../storage.js'

export function Login() {
  return (
    <main>
      <section id="loginSection">
        <p className="loginLabel">username</p>
        <input className="form-control bg-dark text-white loginBox" placeholder="username" id="username" />
        <p className="loginLabel">password</p>
        <input className="form-control bg-dark text-white loginBox" type="password" placeholder="password" id="password" />
        <div>
          <button type="button" className="rounded" style={{ backgroundColor: '#212529', color: 'white', marginRight: '5px' }} onClick={createUser}>
            Register
          </button>
          <button type="button" className="rounded" style={{ backgroundColor: '#212529', color: 'white', marginLeft: '5px' }} onClick={login}>
            Login
          </button>
        </div>
        <div id="loginErrorMessage" style={{ color: 'darkred', marginTop: '20px' }}></div>
      </section>
    </main>
  );
}