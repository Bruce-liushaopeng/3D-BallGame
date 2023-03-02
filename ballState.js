export class BallState {
    constructor(canvasLength) {
        this.canvasLength = canvasLength
        this.xSpeed = Math.random() - 0.5
        this.ySpeed = Math.random() - 0.5
        this.position = Array(2).fill().map(() => Math.random() * 80 - 40)
        console.log(this.position);
    }

    moveBall(sphere) {
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
}