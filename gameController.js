import { BallState } from "./ballState";
import * as THREE from 'three'


export class GameController {
    constructor(scene) {
        const whiteBall = constructPlayerBall()
        this.playerBall = whiteBall.mesh;
        this.playerBallState = whiteBall.ballState
        this.scene = scene

        const redBall = constructRedBall(scene)
        this.redBall = redBall.mesh;
        this.redBallState = redBall.ballState

        const blueBall = constructBlueBall(scene)
        this.blueBall = blueBall.mesh;
        this.blueBallState = blueBall.ballState
        this.score = 0
    }

    detectCollision() {
        const xDiffRed = Math.abs(Math.abs(this.playerBall.position.x) - Math.abs(this.redBall.position.x))
        const yDiffRed = Math.abs(Math.abs(this.playerBall.position.y) - Math.abs(this.redBall.position.y))
        const xDiffBlue = Math.abs(Math.abs(this.playerBall.position.x) - Math.abs(this.blueBall.position.x))
        const yDiffBlue= Math.abs(Math.abs(this.playerBall.position.y) - Math.abs(this.blueBall.position.y))
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
            this.score -= 1
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

}

function constructPlayerBall() {
    const ballState = new BallState()
    const geometry = new THREE.SphereGeometry( 3, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { color: 0xfffff0 } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(ballState.position[0], ballState.position[1], 0)
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

function constructBlueBall(scene) {
    const ballState = new BallState(true)
    const geometry = new THREE.SphereGeometry( 3, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { color: 0x0000FF} );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(ballState.position[0], ballState.position[1], 0)
    scene.add(sphere)
    return {mesh: sphere, ballState}
}

