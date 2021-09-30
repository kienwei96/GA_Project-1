const NO_OF_HIGH_SCORES = 5;
const HIGH_SCORES = 'highScores';
const highScoreString = localStorage.getItem(HIGH_SCORES);


function checkHighScore(score) {

    const highScores = JSON.parse(highScoreString) ?? [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
    console.log(lowestScore)

    if(score > lowestScore) {
        setTimeout(() => {
            $('#enterName-modal').css({"display":"block"})
        }, 10)

        $('#playerName').click(() => {
            $('#enterName-modal').css({"display":"none"})
            const name = $('input:text').val();
            const newScore = { name, score };
            saveHighScore(newScore, highScores);
            console.log(highScores)
            showHighScores()
            setTimeout(() => {
                EndScreen()
            }, 30)
         
         });
    }
    else {
        setTimeout(() => {
            EndScreen()
        }, 10)
    }
}



function saveHighScore(player, highScores) {

    // Add to list
    highScores.push(player);

    // Sort the list
    highScores.sort((a,b) => b.score - a.score);

    // Select new list
    highScores.splice(NO_OF_HIGH_SCORES);

    // Save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
};



function showHighScores() {
    const highScores = JSON.parse(highScoreString) ?? [];
    console.log(typeof highScores)
    const highScoreList = $('#highScores');

    for(let obj of highScores) {
        
        highScoreList.append(`<li> <mark>${obj.name}</mark> <small>${obj.score}</small></li>`)
    }
    
    for(let i=0; i<5; i++) {
        $("li").eq(i).attr('id', `boardlist${i}`)
    }
    

}
