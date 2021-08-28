import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import Stats from 'three/examples/jsm/libs/stats.module';

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(400000000000000000000));

const light = new THREE.PointLight();
light.position.set(2.5, 7.5, 15);
scene.add(light);
const camera = new THREE.PerspectiveCamera(
	15,
	window.innerWidth / window.innerHeight,
	0.1,
	10000000000
);
// camera.position.x = 496436.9375 * 1;
// camera.position.y = 5422159.5 * 1;
camera.position.z = 300;

scene.add(camera);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const material = new THREE.MeshNormalMaterial({
	wireframe: false,
});

const gui = new GUI();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x', 495336.9375 * 1, 496436.9375 * 1);
cameraFolder.add(camera.position, 'y', 5421059.5, 5425159.5);
cameraFolder.add(
	camera.position,
	'z',
	5422159.489990234375 * 0.6,
	5422159.489990234375 * 1.4
);
cameraFolder.open();

// const objLoader = new OBJLoader();
// objLoader.load(
// 	'models/monkey.obj',
// 	(object) => {
// 		// (object.children[0] as THREE.Mesh).material = material
// 		object.traverse(function (child) {
// 			if ((child as THREE.Mesh).isMesh) {
// 				(child as THREE.Mesh).material = material;
// 			}
// 		});
// 		scene.add(object);
// 	},
// 	(xhr) => {
// 		console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
// 	},
// 	(error) => {
// 		console.log(error);
// 	}
// );

// objLoader.load(
// 	'models/cube.obj',
// 	(object) => {
// 		object.position.x = 2;
// 		scene.add(object);
// 	},
// 	(xhr) => {
// 		console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
// 	},
// 	(error) => {
// 		console.log(error);
// 	}
// );

// var loader = new PCDLoader();
// loader.load(
// 	'models/map.pcd',
// 	function (points) {
// 		console.log(points);
// 		(points.material as THREE.PointsMaterial).size = 1;
// 		// (points.material as THREE.PointsMaterial).color = new THREE.Color(0xffffff);
// 		// points.scale.multiplyScalar(0.000001);
// 		// console.log(points);
// 		// points.frustumCulled = false;
// 		points.position.x = -512333;
// 		points.position.y = -5403400;
// 		points.position.z = -316;
// 		points.frustumCulled = false;
// 		scene.add(points);
// 	},
// 	(xhr) => {
// 		console.log(`Loading ${Math.ceil((xhr.loaded / xhr.total) * 100)}%`);
// 	}
// );

var loader = new FBXLoader();
loader.load('models/vanguard_t_choonyung.fbx', (model) => {
	model.scale.set(0.01, 0.01, 0.01);
	scene.add(model);
});

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

function animate() {
	requestAnimationFrame(animate);

	controls.update();

	render();

	stats.update();
}

function render() {
	renderer.render(scene, camera);
}

animate();
