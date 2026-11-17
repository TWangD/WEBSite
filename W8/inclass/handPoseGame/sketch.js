let video;
let handPose;
let hands = []
let gameBall, gamePaddle

async function setup() {

    createCanvas(640, 480)

    video = createCapture(VIDEO, {flipped:true})
    video.size(640, 480);
    video.hide();

    gameBall = new Ball(width*0.5, height*0.5)
    gamePaddle = new Paddle
    handPose = await ml5.handPose({flipped:true})
    
    handPose.detectStart(video, gotHands);

}



function draw() {
    background(220)

    image(video, 0, 0)
    gameBall.move(gamePaddle)
    gameBall.display()
    gamePaddle.display()

    if(hands[0]){
    gamePaddle.update(hands[0].index_finger_tip,hands[0].thumb_tip)
    fill(255,0,0)
    circle(hands[0].index_finger_tip.x, hands[0].index_finger_tip.y, 15)
    fill(0,255,0)
    circle(hands[0].thumb_tip.x, hands[0].thumb_tip.y, 15)
    }
}

function gotHands(results) {
console.log(results)
hands = results
}

class Paddle{
    constructor(){
        this.pos = createVector(width - 100, 200)
        this.height = 60
        this.width = 20
        this.clr = color(255,125,125)
    }

    update(point1, point2){
        this.pos.y = point1.y
        this.height = point2.y - point1.y

    }

    display(){
        fill(this.cle)
        rect(this.pos.x, this.pos.y, this.width, this.height)
    }
}




class Ball {
    constructor(_x, _y){
        this.pos = createVector(_x, _y)
        this.size = 15
        this.velocity = createVector(random(-4, 4), random(-3, 3))
        this.clr = color(random(255), random(255), random(255))

        this.friendliness = random(70, 250)
    }

    move(Paddle){
        this.pos.add(this.velocity)
        
        if(this.pos.x - this.size*0.5 <= 0){
            this.velocity.x *= -1
            this.pos.x = this.size*0.5
        }
        if(this.pos.x + this.size*0.5 >= Paddle.pos.x && this.pos.y >= Paddle.pos.y && this.pos.y <= Paddle.pos.y + Paddle.height){
            this.velocity.x *=-1
        }
        if(this.pos.x + this.size*0.5 >= width){
            this.velocity.x *= -1
            this.pos.x = width - this.size * 0.5
        }
        if(this.pos.y - this.size*0.5 <= 0){
            this.velocity.y *= -1
            this.pos.y = this.size * 0.5
        }
        if(this.pos.y + this.size*0.5 >= height){
            this.velocity.y *= -1
            this.pos.y = height - this.size * 0.5
        }
    }

    display(){
        fill(this.clr)
        circle(this.pos.x, this.pos.y, this.size)
    }

}