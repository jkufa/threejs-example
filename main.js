import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const canvas = document.querySelector('#c');

/**
 *  To actually be able to display anything with three.js, we
 * need three things: scene, camera and renderer, so that we can 
 * render the scene with camera.
 */

// create a scene
const scene = new THREE.Scene();

/** 
 * params -- fov, aspect ratio, near, far
 * fov: field of view, the extent of the scene that is seen on the display at any given moment. Value is in degrees.
 * aspect ratio: usually set to the width of the element divided by the height (window.innerWidth / window.innerHeight)
 * near: objects closer than the near value will not be rendered
 * far: objects farther than the far value will not be rendered
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/**
 * If you wish to keep the size of your app but render it at a lower resolution, 
 * you can do so by calling setSize with false as updateStyle (the third argument). 
 * For example, setSize(window.innerWidth/2, window.innerHeight/2, false) 
 * will render your app at half resolution, given that your <canvas> has 100% width and height.
 */
const renderer = new THREE.WebGLRenderer({antialias: true, canvas}  );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // add canvas to DOM

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// A mesh is an object that takes a geometry, and applies a material to it,
// which we then can insert to our scene, and move freely around.
const cube = new THREE.Mesh(geometry, material); // combine geometry and material to create a mesh
scene.add(cube); // add cube to scene

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

camera.position.z = 5; // move camera back so we can see the cube


/** 
 * Even though this is becoming less and less of a problem, some devices/browsers
 * still don't support WebGL. To check whether or not the current browser supports
 * WebGL, we can use the WebGL support detection module and run the following
 * to check if the current browser supports WebGL:
*/
if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
  console.log(document.getElementById('c'));
	document.getElementById('c').appendChild( warning );

}

// Render loop
function animate() {
	requestAnimationFrame( animate );

  // rotate cube
  cube.rotation.x -= 0.005;
  cube.rotation.y += 0.0075;

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

	renderer.render( scene, camera );
}
