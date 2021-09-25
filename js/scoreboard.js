$(document).ready(() => {
    if(typeof localStorage["highScore"] !== 'undefined') {
        $('#scoreboard').text('Your highest score is' + " " + localStorage["highScore"]); 
    }
    else {
        localStorage["highScore"] =0;
        $('#scoreboard').text('Your highest score is 0');
    }
})


const store = () => {
    if(finalScore[0] > localStorage["highScore"]) {
        localStorage["highScore"] = finalScore[0];
    }

    if(typeof localStorage["highScore"] !== 'undefined') {
        $('#scoreboard').text('Your highest score is' + " " + localStorage["highScore"]); 
    }
}