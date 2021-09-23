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
        this.bombDy = -5;
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
        // let bombSize = 10;
        // this._ctx.beginPath();
        // this._ctx.arc(this.bombX, this.bombY, bombSize, 0, Math.PI*2);
        // this._ctx.fillStyle = "black";
        // this._ctx.fill();
        // this._ctx.closePath();  
        const image = document.createElement("img")
        image.src = "../image/bomb.png";
        image.width = 50
        image.height = 50
        image.addEventListener('load', e => {
            this._ctx.drawImage(image, (this.bombX-25), this.bombY)
        })
        this._ctx.clearRect(-150, -150, canvas.width, canvas.height-300);
    }

    drawCity() {
        const image = document.createElement("img")
        image.src = "../image/city.png";
        image.addEventListener('load', e => {
            this._ctx.drawImage(image, 50, 350)
        })
    }

    drawExplosion() {
        const image = document.createElement("img")
        image.src = "../image/explosion.png";
        image.addEventListener('load', e => {

            this._ctx.globalAlpha = 0;
            let i = 0;

            const imgFade = setInterval(() => {
                this._ctx.globalAlpha +=0.1;
                this._ctx.drawImage(image, 50, 250)
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

        this.drawCity()

        if(this.i ==0)
        this.drawSentence()

        this.displaySentence()

        if(this.bombY < canvas.height)
        this.bombY -= this.bombDy
        this.key()
        this.updateWord()
        this.displayScore()
        
        if(this.bombUp){
            this.bombUp = false;
            this.bombY -= 14
        }
        if(this.bombY >= canvas.height - 200)
        this.end()
    }
    end() {

        this.dead = true
        // this.drawExplosion()
        // $('#gameContainer').effect("shake", { direction: "up", times: 6}, 1000);
    }

    displayScore() {
        this._ctx.clearRect(0, -150, canvas.width, canvas.height);
        this._ctx.font = "18px Arial";
        this._ctx.fillStyle = 'black';
        this._ctx.fillText("SCORE:" + this.score, canvas.width-150, canvas.height-450);
        
    }

    displaySentence() {
        this._ctx.clearRect(0, 100, canvas.width, canvas.height);
        this._ctx.font = "18px verdana";
        this._ctx.fillStyle = 'white';
        this._ctx.fillText(this.text, canvas.width-480, canvas.height-20);
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
            this.i +=1;
            this.score +=5;
            this.bombUp = true;
            if(this.i == this.word.length) {
                this.i = 0;
                this.level +=1;
                this.bombDy -= 0.8
            }
        }
    }

    run() {
        let bombStart = setInterval(() => {
            if(this.dead)
            return;
            getData()
            this.start()
            if(this.dead) {
                clearInterval(bombStart)
                this.drawExplosion()
                $('#gameContainer').effect("shake", { direction: "up", times: 6}, 1000);
                this.dead = false
                console.log('end')
            }
        }, 100)
    }

    
}


$("#start").on("click", function() {
    $('#gameContainer').empty()
    $('#gameContainer').append($('<canvas/>',{'id':'canvas'}));
    const game1 = new Game($('#canvas')[0], 500,500);
    game1.run()
    })
        
    