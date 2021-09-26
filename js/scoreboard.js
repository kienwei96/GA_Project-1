$(document).ready(() => {
    if(typeof localStorage["highScore"] !== 'undefined') {
        $('#scoreboard').text('Highest score:' + " " + localStorage["highScore"]); 
    }
    else {
        localStorage["highScore"] =0;
        $('#scoreboard').text('Highest score: 0');
    }
})


const store = () => {
    if(finalScore[0] > localStorage["highScore"]) {
        localStorage["highScore"] = finalScore[0];
    }

    if(typeof localStorage["highScore"] !== 'undefined') {
        $('#scoreboard').text('Highest score:' + " " + localStorage["highScore"]); 
    }
}