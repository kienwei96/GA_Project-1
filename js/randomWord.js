let randomSentence = [];
let readySentence = ["hey start to type this sentence", "lets go"];

const split = () => {
    for(let i=0; i<randomSentence.length; i++) {
        let lowerCase = randomSentence[i].toLowerCase();
        let removeSpecialChar = lowerCase.replace(/[^a-zA-Z ]/g, "");
        readySentence.push(removeSpecialChar);
    }

}


const getData = () => {
    $.ajax({
        url: `https://api.chucknorris.io/jokes/random`
    }).then(successHandler, errHandler)
}

const successHandler = (data) => {
    renderSentence(data)
    split()
}

const errHandler = (err) => {
    console.log('Error!', err)
};

const renderSentence = (data) => {
    randomSentence.push(data.value)
}


console.log(randomSentence)