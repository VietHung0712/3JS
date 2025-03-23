import * as THREE from "../build/three.module.js";
import {GLTFLoader} from "../build/GLTFLoader.js";

//-----------------------------------------------------------------------------------------

let c3D = document.getElementById('container3D');

let powerFire = document.getElementById('centerpowerId')

let renderer, scene, camera, ambientLight, directionalLight, axesHelper, axesHelperRotate, loader, model;

function init(){
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(c3D.clientWidth, c3D.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  c3D.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  var path = './Image/terrain/';
  var format = '.jpg';
  var urls = [
    path + 'space-posx' + format, path + 'space-negx' + format,
    path + 'space-posy' + format, path + 'space-negy' + format,
    path + 'space-posz' + format, path + 'space-negz' + format
  ];
  let loaderbackground = new THREE.CubeTextureLoader(); 
  scene.background = loaderbackground.load(urls);

  camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);
  
  directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  scene.add(directionalLight);
  
  axesHelper = new THREE.AxesHelper(50); // 5 là độ dài của trục
  axesHelperRotate = new THREE.AxesHelper(50); // 5 là độ dài của trục
  axesHelperRotate.rotateY(toRadians(180));
  // scene.add(axesHelperscene);
  
  //load the GL object
  loader = new GLTFLoader();
  loader.load('models/xwing-2.glb', function(gltf) {
  model = gltf.scene;
  model.position.set( 0, 0, 0);
  model.scale.set( 1, 1.3, 1);

  model.add(axesHelper);
  model.add(axesHelperRotate);

  model.add(camera);
  scene.add(model);
  
  renderer.render(scene, camera);
  }, undefined, function(error) {
    console.error(error);
  });
  
}
init();

const centerPower = new THREE.Vector3( 0, 0, -50);

var geometry = new THREE.BoxGeometry(0.2, 0.2, 1); //  (x, y, z)
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var laser = new THREE.Mesh(geometry, material);



function shootbullet() {
  const laser_01 = laser.clone();
  laser_01.position.set(0, 1, 0);
  
}
//-----------------------------------------------------------------------------------------

const cameragroup = new THREE.Object3D;
cameragroup.position.set( 0, 1.5, 5);

const cameragroupA = new THREE.Object3D;
cameragroupA.position.set( -5, 1.5, 5);

const cameragroupD = new THREE.Object3D;
cameragroupD.position.set( 5, 1.5, 5);

const cameragroupW = new THREE.Object3D;
cameragroupW.position.set( 0, 5, 5);

const cameragroupS = new THREE.Object3D;
cameragroupS.position.set( 0, -1.5, 5);

const cameragroupQ = new THREE.Object3D;
cameragroupQ.position.set( 1, 1, 5);

const cameragroupE = new THREE.Object3D;
cameragroupE.position.set( -1, 1, 5);

const cameragroupSPACE = new THREE.Object3D;
cameragroupSPACE.position.set( 0, 1.5, 7);

//-----------------------------------------------------------------------------------------

var geometrycube = new THREE.BoxGeometry( 5, 5, 5); //  (x, y, z)
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var cube = new THREE.Mesh(geometrycube, material);
scene.add(cube);
cube.position.set(0, 0, -10);

//-----------------------------------------------------------------------------------------

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

//-----------------------------------------------------------------------------------------

var movePowerFire = false;

window.addEventListener('keydown', function (event) {
  switch (event.key) {
    case ' ':
      movePowerFire = true;
      
      break;
  }
});

window.addEventListener('keyup', function (event) {
  switch (event.key) {
    case ' ':
      movePowerFire = false;
      break;
  }
});

//-----------------------------------------------------------------------------------------

var moveForward = false;

window.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'Shift':
      moveForward = true;
      break;
  }
});

window.addEventListener('keyup', function (event) {
  switch (event.key) {
    case 'Shift':
      moveForward = false;
      break;
  }
});

//-----------------------------------------------------------------------------------------
var moveRightA = false;
var moveRightD = false;

window.addEventListener('keydown', function (event) {
  if(event.key === "a" || event.key === "A"){
    moveRightA = true;
  } else if(event.key === "d" || event.key === "D"){
    moveRightD = true;
  }
});

window.addEventListener('keyup', function (event) {
  if(event.key === "a" || event.key === "A"){
    moveRightA = false;
  }else if(event.key === "d" || event.key === "D"){
    moveRightD = false;
  }
});


//-----------------------------------------------------------------------------------------
var moveRightQ = false;
var moveRightE = false;

window.addEventListener('keydown', function (event) {
  if(event.key === "q" || event.key === "Q"){
    moveRightQ = true;
  } else if(event.key === "e" || event.key === "E"){
    moveRightE = true;
  }
});

window.addEventListener('keyup', function (event) {
  if(event.key === "q" || event.key === "Q"){
    moveRightQ = false;
  }else if(event.key === "e" || event.key === "E"){
    moveRightE = false;
  }
});


//-----------------------------------------------------------------------------------------
var moveRightW = false;
var moveRightS = false;

window.addEventListener('keydown', function (event) {
  if(event.key === "w" || event.key === "W"){
    moveRightW = true;
  }else if(event.key === "s" || event.key === "S"){
    moveRightS = true;
  }
});

window.addEventListener('keyup', function (event) {
  if(event.key === "w" || event.key === "W"){
    moveRightW = false;
  } else if(event.key === "s" || event.key === "S"){
    moveRightS = false;
  }
});
//-----------------------------------------------------------------------------------------

function animate() {
  requestAnimationFrame(animate);
  
  if (moveRightA) {
    model.rotateY(toRadians(1 / 6));
    camera.position.lerp(cameragroupA.position, 0.02);
  } else if (moveRightD) {
    model.rotateY(-toRadians(1 / 6));
    camera.position.lerp(cameragroupD.position, 0.02);
  }
  if (moveRightQ) {
    model.rotateZ(toRadians(1 / 6));
    camera.position.lerp(cameragroupQ.position, 0.02);
  } else if (moveRightE) {
    model.rotateZ(-toRadians(1 / 6));
    camera.position.lerp(cameragroupE.position, 0.02);
  }
  if (moveRightW) {
    model.rotateX(toRadians(1 / 6));
    camera.position.lerp(cameragroupW.position, 0.02);
  } else if (moveRightS) {
    model.rotateX(-toRadians(1 / 6));
    camera.position.lerp(cameragroupS.position, 0.02);
  }
  if (moveForward) {
    model.translateZ(-0.02);
    camera.position.lerp(cameragroupSPACE.position, 0.02);
    
  }
  if(movePowerFire){
    powerFire.style.transform = "scale(0.7)";
  }else{
    powerFire.style.transform = "scale(1)";
  }

  if (model) {
    model.translateZ(-0.01);
    camera.position.lerp(cameragroup.position, 0.04);
  }

  renderer.render(scene, camera);
}


animate();

//
window.onresize = function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
