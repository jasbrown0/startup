import React from 'react';
import './vote.css'

export function Vote() {
  return (
    <main className="bg-light text-dark">
    <div className="users">
      User:
      <span id="username"></span>
      <script>
        document.getElementById("username").innerHTML = " " +getPlayerName();
      </script>


      <div className="notification">
        <div className="connection"></div>
        <div className="past-notif">Voted for <span className="blue-vote">Batman</span> 4 times 1 week ago</div>
        <div className="past-notif">New poll!</div>
      </div>
  </div>
    <br />

    <div className="current-vote text-center">
      <label for="vote">Current Vote</label>
      <input className="text-center" type="text" id="vote" value="Haven't Voted" readonly />
    </div>

    <div className="voterpie text-center" id="piechart">
      <br/>
      <br/>
      <br/>
      <br/>
      <label for="curr" className="text-light" id="pieText">Milk Chocolate <br/> 75%</label>
    </div>
    <br />

    <script>
      getPiChart();
    </script>

    <div className="text-center">
      <button id="pictureRed" className="picture-box-red text-light" onclick="clickRed()">Dark Chocolate
          <img src="https://t4.ftcdn.net/jpg/02/04/31/93/360_F_204319311_NwspQuun2GWdO5KnA8Grgg5CpPczQXPd.jpg" alt="Dark Chocolate"
              width="200em"/>
      </button>
      <button id="pictureBlue" className="picture-box-blue text-light" onclick="clickBlue()"> Milk Chocolate
          <img src="https://media.gettyimages.com/id/1224882699/photo/milk-chocolate-isolated-on-white-background.jpg?s=612x612&w=gi&k=20&c=3UUxYSBqbHcDUUZS21OhpbgKM1Bk2f4qq17WwWsHObI=" alt="Dark Chocolate"
              width="200em"/>
      </button>
    </div>
    

  </main>
  );
}

function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
}

async function loadVotes() {
    let votes = [];
    try {
      // Get the latest high scores from the service
      const response = await fetch('/api/votes');
      votes = await response.json();
      //alert("try")
      // Save the scores in case we go offline in the future
      localStorage.setItem('votes', JSON.stringify(votes));
    } catch {
      //alert("catch")
      // If there was an error then just use the last saved scores
      const votesText = localStorage.getItem('votes');
      if (votesText) {
        votes = JSON.parse(votesText);
      }
    }
    //alert(votes[0]);
    updateTotalVotes(votes);
    getPiChart();
  }

loadVotes();

function updateTotalVotes(votes){
    for (const [i,vote] of votes.entries()){
      red = Number(vote.red);
      blue = Number(vote.blue);
    }

}

var red = 0;
var blue = 0;
var playerRed = 0;
var playerBlue = 0;
var cReds = 0;
var cBlues = 0;

let pieChart = document.getElementById("piechart");

function clickRed(){
  broadcastEvent(1,0,'RedVote');
  increaseRed();
}

function clickBlue(){
  broadcastEvent(0,1,'BlueVote');
  increaseBlue();
}


function increaseRed(){
    red++;
    playerRed++;
    cReds++;
    broadcastEvent(1,0);
    getPiChart();
}

function increaseBlue(){
    blue++;
    playerBlue++;
    cBlues++;
    broadcastEvent(0,1);
    getPiChart();
}



async function getPiChart(){
    const pieEl = document.querySelector('#piechart');
    const pietxt = document.querySelector('#pieText');
    var ratio = red/(blue+red);
    var redDeg = 360-(360*ratio);
    var str1 = 'conic-gradient(rgb(19, 5, 100)';
    var str2 = redDeg.toString();
    var str3 = 'deg, rgb(172, 9, 9)';
    var str4 = 'deg)'
    var conic = str1.concat(str2,str3,str2,str4);
    var percentage = Math.round(ratio * 100);
    var winner = 'Blue'
    if(percentage > 50){
        winner = 'Red'
    }
    if(percentage == 50){
        winner = 'Tie'
    }
    pieEl.style.background = conic.toString();
    pietxt.innerHTML = percentage.toString().concat("% \n", winner);

    localStorage.setItem('red', red);
    localStorage.setItem('blue', blue);
    localStorage.setItem('playerRed', playerRed);
    localStorage.setItem('playerBlue', playerBlue);

    const playerVotes = document.querySelector('#vote');
    playerVotes.value = "Red - ".concat(" ", playerRed, " times. Blue - ", playerBlue, " times.");
    await saveVotes(cReds, cBlues);
}


async function saveVotes(reds, blues) {
    const newVotes = {name: "Master", red: reds, blue: blues};

    try {
      const response = await fetch('/api/update', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newVotes),
      });

      const votes = await response.json();
      localStorage.setItem('votes', JSON.stringify(votes));
      //alert("try");
    } catch {
      // If there was an error then just track scores locally
      updateVotesLocal(cReds, cBlues);
    }
    cReds = 0;
    cBlues = 0;
  }

function updateVotesLocal(playerReds, playerBlues) {
    const redst = localStorage.getItem('red');
    const bluest = localStorage.getItem('blue');

    localStorage.setItem('red', redst + playerReds);
    localStorage.setItem('blue', bluest + playerBlues);
  }


var socket;

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onopen = (event) => {
    displayMsg(0, 0, 'connected');
  };
  socket.onclose = (event) => {
    displayMsg(0, 0, 'disconnected');
  };
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    if (msg.type === 'RedVote') {
      increaseRed();
    } else if (msg.type === 'BlueVote') {
      increaseBlue();
    }
  };
}

configureWebSocket();

function displayMsg(cls, from, msg) {
  const chatText = document.querySelector('#connection');
  chatText.innerHTML =
    `<div class="event">${msg}</div>` + chatText.innerHTML;
}


function broadcastEvent(redVote, blueVote, type) {
  const event = {
    type: type,
    red: redVote,
    blue: blueVote
  };
  socket.send(JSON.stringify(event));
}