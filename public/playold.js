function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
}


var blue = 5;
var red = 3;
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



function getPiChart(){
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
}


async function saveVotes(reds, blues) {
    const userName = getPlayerName();
    const date = new Date().toLocaleDateString();
    const newVotes = {name: userName, red: reds, blue: blues, date: date};

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newVotes),
      });

      const votes = await response.json();
      localStorage.setItem('votes', JSON.stringify(votes));
    } catch {
      // If there was an error then just track scores locally
      updateVotesLocal(cReds, cBlues);
      cReds = 0;
      cBlues = 0;
    }
  }

function updateVotesLocal(playerReds, playerBlues) {
    const redst = localStorage.getItem('red');
    const bluest = localStorage.getItem('blue');


    let foundr = false;
    let foundb = false;
    if (redst < redst + playerReds) {
        foundr = true;
    }

    if (bluest + playerBlues > bluest) {
        foundb = true;
    }

    localStorage.setItem('red', redst + playerReds);
    localStorage.setItem('blue', bluest + playerBlues);
  }