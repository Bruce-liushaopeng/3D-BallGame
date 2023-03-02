import * as THREE from 'three'

const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
const pointLight2 = new THREE.PointLight( 0xffffff, 1, 100 );
const pointLight3 = new THREE.PointLight( 0xffffff, 1, 100 );
const pointLight4 = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight.position.set( -35, 35, 20 );
pointLight2.position.set( -35, -35, 20 );
pointLight3.position.set( 35, 35, 20 );
pointLight4.position.set( 35, -35, 20 );

export {pointLight, pointLight2, pointLight3, pointLight4}