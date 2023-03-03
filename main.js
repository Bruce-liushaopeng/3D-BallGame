import './style.css'
import * as THREE from 'three'
import { pointLight, pointLight2, pointLight3, pointLight4 } from './pointLight';
import { BallState } from './ballState';
import { handleKeypress } from './keypress';
import { GameController } from './gameController';
var scoreDiv = document.querySelector("div");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

const gameController = new GameController(scene)

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(60) 

scene.add( pointLight, pointLight2, pointLight3, pointLight4 );
const lineMaterial = new THREE.LineBasicMaterial({
	color: 0xffffff
});

const points = [];
points.push( new THREE.Vector3( - 43, 43, 0 ) );
points.push( new THREE.Vector3( 43, 43, 0 ) );
points.push( new THREE.Vector3( 43, -43, 0 ) );
points.push( new THREE.Vector3( - 43, -43, 0 ) );
points.push( new THREE.Vector3( - 43, 43, 0 ) );


const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( lineGeometry, lineMaterial );
scene.add( line );
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );
function animate() {
  requestAnimationFrame( animate );
  gameController.moveWhiteBall();
  gameController.moveBlueBall()
  gameController.moveYellowBall();
  gameController.detectCollision();
  renderer.render(scene, camera)
  scoreDiv.innerHTML = gameController.getScore();
}
document.onkeydown = handleKeypress(gameController.getPlayerBallState());
animate()

