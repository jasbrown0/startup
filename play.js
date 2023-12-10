function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
}


var blue = 0;
var red = 0;

let pieChart = document.getElementById("piechart");

function increaseRed(){
    red++;
    return getPiChart();
}

function increaseBlue(){
    blue++;
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
    var winner = 'blue'
    if(percentage > 50){
        winner = 'red'
    }
    pieEl.style.background = conic.toString();
    pietxt.innerHTML = percentage.toString().concat("% \n", winner);
    //pieEl.style.background = 'conic-gradient(rgb(19, 5, 100)'+toString(redDeg)+ 'deg, rgb(172, 9, 9)' +toString(redDeg)+'deg)';
}