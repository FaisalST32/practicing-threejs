import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { AxesHelper } from 'three';

const scene = new THREE.Scene();
scene.add(new AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.z = 2;

// const camera2 = new THREE.OrthographicCamera(-2, 2, 2, -2);
// camera2.position.z = 2;

// const canvas1 = document.getElementById('c1') as HTMLCanvasElement;
// const canvas2 = document.getElementById('c2') as HTMLCanvasElement;
const renderer1 = new THREE.WebGLRenderer();
// const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
renderer1.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer1.domElement);

const controls = new OrbitControls(camera, renderer1.domElement);
controls.addEventListener('change', render);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
	color: new THREE.Color('rgb(255, 255, 255)'),
	wireframe: false,
	opacity: 0.4,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.background = new THREE.Color(0x000000);

const gui = new GUI();
const cubeFolder = gui.addFolder('Cube');
cubeFolder.open();
const cubeRotationFolder = cubeFolder.addFolder('Rotation');
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
cubeRotationFolder.open();

const cubeScaleFolder = cubeFolder.addFolder('Scale');
cubeScaleFolder.add(cube.scale, 'x', 0, 5);
cubeScaleFolder.add(cube.scale, 'y', 0, Math.PI * 2);
cubeScaleFolder.add(cube.scale, 'z', 0, Math.PI * 2);
cubeScaleFolder.open();

const cubePositionFolder = cubeFolder.addFolder('Position');
cubePositionFolder.add(cube.position, 'x', 0, 5);
cubePositionFolder.add(cube.position, 'y', 0, 5);
cubePositionFolder.add(cube.position, 'z', 0, 5);
cubePositionFolder.open();
cubeFolder.add(cube, 'visible');

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 10);
cameraFolder.open();

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer1.setSize(window.innerWidth, window.innerHeight);
	render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

function animate() {
	requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	stats.update();
	render();
}

function render() {
	renderer1.render(scene, camera);
	// renderer2.render(scene, camera2);
}
render();
animate();
