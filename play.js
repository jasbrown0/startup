function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
}


var blue = 5;
var red = 3;
var playerRed = 0;
var playerBlue = 0;

let pieChart = document.getElementById("piechart");

function increaseRed(){
    red++;
    playerRed++;
    return getPiChart();
}

function increaseBlue(){
    blue++;
    playerBlue++;
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

    const playerVotes = document.querySelector('#vote');
    playerVotes.value = "Red - ".concat(" ", playerRed, " times. Blue - ", playerBlue, " times.");
}