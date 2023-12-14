import React from 'react';
import './vote.css'

export function Vote(props) {
  const userName = props.userName;
  const [redCounter, setRedCounter] = React.useState(1);
  const incrementRedCounter = () => {
    setRedCounter(redCounter + 1);
    saveVotes(1,0);
    VoteNotifier.broadcastEvent('RedVote',0,1);
  }
  const [blueCounter, setBlueCounter] = React.useState(1);
  const incrementBlueCounter = () => {
    setBlueCounter(blueCounter + 1);
    saveVotes(0,1);
    VoteNotifier.broadcastEvent('BlueVote',0,1);
  };

  class VoteEventNotifier {
    events = [];
    handlers = [];
    socket;
    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      this.socket.onopen = (event) => {
        //this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'connected' }));
      };
      this.socket.onclose = (event) => {
        //this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'disconnected' }));
      };
      this.socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        if (msg.type === 'RedVote') {
            setRedCounter(redCounter+1);
        } else if (msg.type === 'BlueVote') {
          setBlueCounter(blueCounter+1);
        }
      };
    }
  
    broadcastEvent(type, redVote, blueVote) {
            const event = {
              type: type,
              red: redVote,
              blue: blueVote
            };
            this.socket.send(JSON.stringify(event));
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
  
      this.events.forEach((e) => {
        this.handlers.forEach((handler) => {
          handler(e);
        });
      });
    }
  }
  
  const VoteNotifier = new VoteEventNotifier();


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
        updateTotalVotes(votes);
      }
    loadVotes();
    
    function updateTotalVotes(votes){
        for (const [i,vote] of votes.entries()){
          setRedCounter(vote.red);
          setBlueCounter(vote.blue);
        }
    }
    
    var cReds = 0;
    var cBlues = 0;
  
    
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
    
    
    

  return (
    <main className="bg-light text-dark">
    <div className="users">
      User:
      <span id="username"> {userName}</span>



      <div className="notification">
        <div className="connection"></div>
        <div className="past-notif">Voted for <span className="blue-vote">Batman</span> 4 times 1 week ago</div>
        <div className="past-notif">New poll!</div>
      </div>
  </div>
    <br />
      <div>Red Votes = {redCounter}</div>
      <div>Blue Votes = {blueCounter}</div>
      <br/>
      <br/>
    <br />


    <div className="text-center">
      <button id="pictureRed" 
      className="picture-box-red text-light" 
      onClick={incrementRedCounter}>Dark Chocolate
          <img src="https://t4.ftcdn.net/jpg/02/04/31/93/360_F_204319311_NwspQuun2GWdO5KnA8Grgg5CpPczQXPd.jpg" alt="Dark Chocolate"
              width="200em"/>
      </button>
      <button id="pictureBlue" className="picture-box-blue text-light" onClick={incrementBlueCounter}> Milk Chocolate
          <img src="https://media.gettyimages.com/id/1224882699/photo/milk-chocolate-isolated-on-white-background.jpg?s=612x612&w=gi&k=20&c=3UUxYSBqbHcDUUZS21OhpbgKM1Bk2f4qq17WwWsHObI=" alt="Dark Chocolate"
              width="200em"/>
      </button>
    </div>
    

  </main>
  );
}

