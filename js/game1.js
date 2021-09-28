console.log("game1.js is linked!")

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
        this.bombDy = -4;
        this._ctx = canvas.getContext('2d');
        this.dead = false;
        this.level = 0;
        this.score = 0;
        this.word = "";
        this.text = "";
        this.i = 0;
        this.bombUp = false;
    }

    drawBomb() { 
        const image = document.createElement("img")
        image.src = "../image/bomb3.png";
        image.addEventListener('load', e => {
            this._ctx.drawImage(image, (this.bombX-25), this.bombY)
        })
        this._ctx.clearRect(-150, -150, canvas.width, canvas.height-300);
    }

    drawExplosion() {
        const image = document.createElement("img")
        image.src = "../image/bomb-explosion3.png";
        image.addEventListener('load', e => {

            this._ctx.globalAlpha = 0;
            let i = 0;

            const imgFade = setInterval(() => {
                this._ctx.globalAlpha +=0.1;
                this._ctx.drawImage(image, 100, 200)
                i++;
                if(i>=10) {
                        clearInterval(imgFade)
                    }

                }, 200);
            })
        }

    clear() {
        this._ctx.clearRect(-150, -150, canvas.width, canvas.height-200);
    }

    start() {
        this.drawBomb()

        if(this.i ==0)
        this.drawSentence()

        this.displaySentence()

        if(this.bombY < canvas.height)
        this.bombY -= this.bombDy
        
        this.updateWord()
        this.displayScore()
        
        if(this.bombUp){
            this.bombUp = false;
            this.bombY -= 11
        }
        if(this.bombY >= canvas.height - 150)
        this.dead = true;
    
    }

    end() {
        console.log('end')
        this.drawExplosion()
        bombAudio();
        $('#gameContainer').effect("shake", { direction: "up", times: 6}, 1000);
        this.dead = false
        finalScore.push(this.score)
        this.displayEndScreen()
        store();

    }

    displayScore() {
        this._ctx.clearRect(0, -150, canvas.width, canvas.height);
        this._ctx.font = "oblique 26px Arial";
        this._ctx.fillStyle = 'black';
        this._ctx.fillText("SCORE:" + this.score, canvas.width-170, canvas.height-500);
        
    }

    displaySentence() {
        this._ctx.clearRect(0, 100, canvas.width, canvas.height);
        // draw sentence background
        
        // fill sentence
        this._ctx.font = "bold 18px verdana";
        this._ctx.fillStyle = 'black';
        this._ctx.fillText(this.text, canvas.width-650, canvas.height-30);
        
    }

    displayEndScreen() {
        setTimeout(() => {
            $('#gameContainer').remove();
            EndScreen()
            $('#scoreboard').css("display", "block");
            checkHighScore(this.score)
        }, 2000)

    }

    drawSentence() {
        this.word = readySentence[this.level]
        this.text = this.word;
    
    }

    key() {
        window.addEventListener("keydown", (event) => {
            this.char = String.fromCharCode(event.keyCode).toLowerCase();
            console.log(this.char)
        });

    }

    updateWord() {
        if (this.text.substring(0, 1) === this.char){
            let alphabet = this.text.substring(0, 1);
            this.text = (this.text).replace(alphabet, "");
            typeAudio()
            this.i +=1;
            this.score +=5;
            this.bombUp = true;
            if(this.i == this.word.length) {
                getData()
                this.i = 0;
                this.level +=1;
                this.bombDy -= 0.6
            }
        }
    }

    run() {
        let bombStart = setInterval(() => {
            if(this.dead)
            return;
            this.start()
            if(this.dead) {
                clearInterval(bombStart)
                this.end()
            }
        }, 100)

        this.key()
        
    }

    
}


$("#start").on("click", function() {
    getData()
    $('#gameContainer').empty();
    $('#gameContainer').append($('<canvas/>',{'id':'canvas'}));
    const game1 = new Game($('#canvas')[0], 700,550);
    game1.run()
    })
        
    