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

function increaseRed(){
    red++;
    playerRed++;
    cReds++;
    return getPiChart();
}

function increaseBlue(){
    blue++;
    playerBlue++;
    cBlues++;
    return getPiChart();
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
