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
        this.score = 0
    }

    detectCollision() {
        const xDiff = Math.abs(Math.abs(this.playerBall.position.x) - Math.abs(this.redBall.position.x))
        const yDiff = Math.abs(Math.abs(this.playerBall.position.y) - Math.abs(this.redBall.position.y))
        if (xDiff < 3 && yDiff < 3) {
                console.log("collision")
                console.log(xDiff)
                console.log(yDiff)
                this.scene.remove(this.redBall)
                const newRedBall = constructRedBall(this.scene)
                this.redBall = newRedBall.mesh
                this.redBallState = newRedBall.ballState
                this.score += 1
            }
    }

    moveWhiteBall() {
        this.playerBallState.moveBall(this.playerBall)
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

