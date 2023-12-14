import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-primary text-light">
    <header className="container-fluid">
      <nav className="navbar fixed-top navbar-dark">
        <a className="navbar-brand" href="#">Head To Head<sup>&reg;</sup></a>
        <menu className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="index.html">Home</a>
          </li>
        </menu>
      </nav>
    </header>


    <main>App components go here</main>


    <footer className="bg-danger text-white">
      <div className="container-fluid">
        <span className="text-reset">Jason Brown</span>
        <div id="quote" className="quote-box text-center"></div>
        <a className="text-reset" href="https://github.com/jasbrown0/startup">GitHub</a>
      </div>
    </footer>
    <script src="login.js"></script>
  </div>

  );
}