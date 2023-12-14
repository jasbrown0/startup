import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-light text-center text-dark">
        <div>
        <h1>Welcome</h1>
        
        <div id="loginControls" style="display: none">
            <input className="form-control" type="text" id="userName" placeholder="your@email.com" />
            <input className="form-control" type="password" id="userPassword" placeholder="password" />
            <button type="button" className="btn btn-primary" onclick="loginUser()">Login</button>
            <button type="button" className="btn btn-primary" onclick="createUser()">Create</button>
        </div>
        <div id="playControls" style="display: none">
            <div id="playerName"></div>
            <button type="button" className="btn btn-primary" onclick="play()">Play</button>
            <button type="button" className="btn btn-secondary" onclick="logout()">Logout</button>
        </div>
        </div>

        <div className="modal fade" id="msgModal" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-dark">
            <div className="modal-body">error message here</div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    </main>
  );
}