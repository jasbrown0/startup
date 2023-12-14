import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Prev } from './prev/prev';
import { Vote } from './vote/vote';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';



export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
  return (
    <BrowserRouter>
        <div className="body bg-primary text-light">
    <header className="container-fluid">
      <nav className="navbar fixed-top navbar-dark">
        <a className="navbar-brand" href="#">Head To Head<sup>&reg;</sup></a>
        <menu className="navbar-nav">
            <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                    Login
                </NavLink>
            </li>
            {authState === AuthState.Authenticated && (
            <li className='nav-item'>
                <NavLink className='nav-link' to='Vote'>
                    Vote
                </NavLink>
            </li>)}
            {authState === AuthState.Authenticated && (
            <li className='nav-item'>
                <NavLink className='nav-link' to='prev'>
                    Previous
                </NavLink>
            </li>)}
        </menu>
      </nav>
    </header>



    <Routes>
    <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
    <Route path='/vote' element={<Vote userName={userName}/>} />
    <Route path='/prev' element={<Prev />} />
    <Route path='*' element={<NotFound />} />

    </Routes>


        <footer className="bg-danger text-white">
        <div className="container-fluid">
            <span className="text-reset">Jason Brown</span>
            <div id="quote" className="quote-box text-center"></div>
            <a className="text-reset" href="https://github.com/jasbrown0/startup">GitHub</a>
        </div>
        </footer>
        <script src="login.js"></script>
    </div>
  </BrowserRouter>


  );
}


function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}