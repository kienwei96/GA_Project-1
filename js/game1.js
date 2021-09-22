console.log("game1.js is linked!")
let ct = 8
let sentences = [
	"start",
	"great now keep typing",
	"save the city from the bomb",
	"the city is being evacuated right now",
	"so each keystroke is saving lives",

	"oh we have zome kommuncation ichues",
	"can yu styll haer us",
	"ze bomb iz cosyng interrrfrances",
	"kip tyipng ur diong a good zob",
	"yuo svaed allmoost eevrinoe",

	"quysd skjlij qsiap apzokh z",
	"faondzakjazhedluyedanljlcquef lol",
	"- you are not supposed to see this -",
	" - are you a hacker? - "
];


class Game {
    constructor(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        this._width = width;
        this._height = height;
        this._alpha = 0.1;
        this.bombY = (canvas.height)-500;
        this.bombX = (canvas.width)/2;
        this.bombDx = 2;
        this.bombDy = -10;
        this._ctx = canvas.getContext('2d');
        this.dead = false;
        this.level = 0;
        this.score = 0;
        this.word = ""
    }

    drawBomb() {
        // let bombSize = 10;
        // this._ctx.beginPath();
        // this._ctx.arc(this.bombX, this.bombY, bombSize, 0, Math.PI*2);
        // this._ctx.fillStyle = "black";
        // this._ctx.fill();
        // this._ctx.closePath();  
        const image = document.createElement("img")
        image.src = "http://www.lessmilk.com/game/save-the-city/images/bomb.png";
        image.width = 50
        image.height = 50
        image.addEventListener('load', e => {
            this._ctx.drawImage(image, (this.bombX-25), this.bombY)
        })
    }

    drawExplosion() {
        let explodeSize = 200;
        this._ctx.beginPath();
        this._ctx.globalAlpha = 0
        this._ctx.arc(x, y, explodeSize, 0, Math.PI*2);
        this._ctx.fillStyle = "red";
        this._ctx.fill();
        this._ctx.closePath();
    }

    explosionEffect() {
        this._alpha += 0.2
        if(alpha > 2) {
        alpha = 2 }
    }

    clear() {
        this._ctx.clearRect(-150, -150, canvas.width, canvas.height-200);
    }

    start() {
        this.clear()
        this.drawBomb()
        if(this.bombY < canvas.height)
        this.bombY -= this.bombDy
        if(this.bombY == canvas.height - 200)
        this.dead = true
        console.log(this.dead)
    }

    displayScore() {
        this._ctx.clearRect(0, -150, canvas.width, canvas.height);
        this._ctx.font = "18px Arial";
        this._ctx.fillStyle = 'black';
        this._ctx.fillText("SCORE:" + this.score, canvas.width-150, canvas.height-450);
        this.score +=5
    }
    
    drawSentence() {
        this.text = [];
        this.word = sentences[this.level]
        

    }

    displaySentence() {
        this._ctx.clearRect(0, 100, canvas.width, canvas.height);
        this._ctx.font = "22px verdana";
        this._ctx.fillStyle = 'white';
        this._ctx.fillText(wordObject.arr[0], canvas.width-400, canvas.height-50);
    }

    updateWord() {
        let _this = this
        window.addEventListener("keyup", function(event){
            let char = String.fromCharCode(event.keyCode).toLowerCase();
            if (_this.word.substring(0, 1) === char){
                let alphabet = _this.word.substring(0, 1);
                _this.word = (_this.word).replace(alphabet, "");
                _this.displaySentence(event)
            }
        })
    }

    run() {
        let bombStart = setInterval(() => {
            this.start()
            this.displayScore()
            this.drawSentence()
            this.displaySentence()
            this.updateWord()
            console.log('start')
            if(this.dead) {
                clearInterval(bombStart)
                this.dead = false
                console.log('end')
                this.clear()
            }
        }, 100)
    }

    
}


$(() => {
    $("#start").on("click", function() {
        $('#gameContainer').append($('<canvas/>',{'id':'canvas'}));
        const game1 = new Game($('#canvas')[0], 500,500);
        game1.run()
    })
        
    
    })