import './style.css'
import * as THREE from 'three'
import { pointLight, pointLight2, pointLight3, pointLight4 } from './pointLight';
import { BallState } from './ballState';
import { handleKeypress } from './keypress';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

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

const ballState1 = new BallState()
const geometry = new THREE.SphereGeometry( 3, 32, 32 );
const material = new THREE.MeshStandardMaterial( { color: 0xfffff0 } );
const sphere = new THREE.Mesh( geometry, material );
console.log(ballState1.position[0]);
sphere.position.set(ballState1.position[0], ballState1.position[1], 0)
scene.add( sphere );

function animate() {
  requestAnimationFrame( animate );
  ballState1.moveBall(sphere)
  renderer.render(scene, camera)
}

document.onkeydown = handleKeypress(ballState1);
animate()
