import { BallState } from "./ballState";
import * as THREE from 'three'


export class GameController {
    constructor(scene) {
        this.reset(scene);
    }

    reset(scene) {
        if (this.playerBall) {
            scene.remove(this.playerBall)
        }
        if (this.redBall) {
            scene.remove(this.redBall)
        }
        if (this.blueBall) {
            scene.remove(this.blueBall)
        }
        const whiteBall = constructBall(scene, 3 , "", false)
        this.playerBall = whiteBall.mesh;
        this.playerBallState = whiteBall.ballState
        this.scene = scene

        const redBall = constructBall(scene, 2, "red", false)
        this.redBall = redBall.mesh;
        this.redBallState = redBall.ballState

        const blueBall = constructBall(scene, 3, "blue", false)
        this.blueBall = blueBall.mesh;
        this.blueBallState = blueBall.ballState
        this.score = 0
        this.bestScore = this.bestScore ? this.score : Math.max(this.bestScore, this.score)
    }

    detectCollision() {
        const xDiffRed = Math.abs(this.playerBall.position.x - this.redBall.position.x)
        const yDiffRed = Math.abs(this.playerBall.position.y - this.redBall.position.y)
        const xDiffBlue = Math.abs(this.playerBall.position.x - this.blueBall.position.x)
        const yDiffBlue= Math.abs(this.playerBall.position.y - this.blueBall.position.y)
        if (xDiffRed < 3 && yDiffRed < 3) {
                this.scene.remove(this.redBall)
                const newRedBall = constructRedBall(this.scene)
                this.redBall = newRedBall.mesh
                this.redBallState = newRedBall.ballState
                this.score += 1
        }
        if (xDiffBlue < 3 && yDiffBlue < 3) {
            this.scene.remove(this.blueBall)
            const newBlueBall = constructBlueBall(this.scene)
            this.blueBall = newBlueBall.mesh
            this.blueBallState = newBlueBall.ballState
            this.score -= 5
            // alert("try not don't BLUE ball XD" + this.playerBall.position.x + " " + this.blueBall.position.x +" " + this.playerBall.position.y + " " + this.blueBall.position.y)
        }
    }

    moveWhiteBall() {
        this.playerBallState.moveBall(this.playerBall)
    }

    moveBlueBall() {
        this.blueBallState.moveBall(this.blueBall)
    }

    getPlayerBall() {
        return this.playerBall
    }

    getPlayerBallState() {
        return this.playerBallState
    }

    getScore() {
        return this.score
    }

    clearScore() {
        this.score = 0;
    }

}

function constructPlayerBall(scene) {
    const ballState = new BallState()
    const geometry = new THREE.SphereGeometry( 3, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { color: 0xfffff0 } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(ballState.position[0], ballState.position[1], 0)
    scene.add(sphere)
    return {mesh: sphere, ballState}
}

function constructRedBall(scene) {
    const ballState = new BallState()
    const geometry = new THREE.SphereGeometry( 2, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(ballState.position[0], ballState.position[1], 0)
    scene.add(sphere)
    return {mesh: sphere, ballState}
}

function constructBall(scene, radius, color, noFriction) {
    const ballState = new BallState(noFriction)
    let colorHex = 0xffffff;
    if(color == "blue") {
        colorHex = 0x0000FF
    } else if (color == "red") {
        colorHex = 0xff0000
    }
    const geometry = new THREE.SphereGeometry( radius, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { color: colorHex} );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(ballState.position[0], ballState.position[1], 0)
    scene.add(sphere)
    return {mesh: sphere, ballState}
}

function constructBlueBall(scene) {
    const ballState = new BallState(true)
    const geometry = new THREE.SphereGeometry( 3, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { color: 0x0000FF} );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(ballState.position[0], ballState.position[1], 0)
    scene.add(sphere)
    return {mesh: sphere, ballState}
}

