export class BallState {
    constructor(canvasLength) {
        this.canvasLength = canvasLength
        this.xSpeed = Math.random() - 0.5
        this.ySpeed = Math.random() - 0.5
        this.friction = 0.004
        this.position = Array(2).fill().map(() => Math.random() * 80 - 40)
        console.log(this.position);
    }

    moveBall(sphere) {
        this.speedDecrease();
        sphere.position.x += this.xSpeed
        sphere.position.y +=this.ySpeed
        this.positionCheck(sphere)
    }

    positionCheck(sphere) {
        if(Math.abs(sphere.position.x) > 40) {
            this.xSpeed = - this.xSpeed
        }
        if(Math.abs(sphere.position.y) > 40) {
            this.ySpeed = - this.ySpeed
        }
    }

    speedDecrease() {
        if (Math.abs(this.xSpeed) < 0.003) {
            this.xSpeed = 0
        }else if(this.xSpeed >= 0) {
            this.xSpeed = this.xSpeed * 0.995 - 0.0001
        } else if (this.xSpeed <= 0) {
            this.xSpeed = this.xSpeed * 0.995 + 0.0001
        }

        if (Math.abs(this.ySpeed) < 0.003) {
            this.ySpeed = 0
        }else if(this.ySpeed >= 0) {
            this.ySpeed = this.ySpeed * 0.995 - 0.0001
        } else if (this.ySpeed <= 0) {
            this.ySpeed = this.ySpeed * 0.995 + 0.0001
        }
    }
}