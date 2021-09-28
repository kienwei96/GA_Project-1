let readySentence = ["hey start to type this sentence", "yeah keep going", "lets go"];


const split = (data) => {
    let lowerCase = data.value.toLowerCase();
        let removeSpecialChar = lowerCase.replace(/[^a-zA-Z ]/g, "");
        readySentence.push(removeSpecialChar);
}


const getData = () => {
    $.ajax({
        url: `https://api.chucknorris.io/jokes/random`
    }).then(successHandler, errHandler)
}

const successHandler = (data) => {
    renderSentence(data)
    split(data)
    console.log(readySentence)
}

const errHandler = (err) => {
    console.log('Error!', err)
};

const renderSentence = (data) => {
    console.log(data.value)
}


