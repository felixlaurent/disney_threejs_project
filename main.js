import * as THREE from "./three.js/build/three.module.js"
import {OrbitControls} from "./three.js/examples/jsm/controls/OrbitControls.js"
import {FontLoader} from "./three.js/examples/jsm/loaders/FontLoader.js"
import {TextGeometry} from "./three.js/examples/jsm/geometries/TextGeometry.js"
import {GLTFLoader} from "./three.js/examples/jsm/loaders/GLTFLoader.js"

const width = window.innerWidth;
const height = window.innerHeight;
let scene = new THREE.Scene();

const fontLoader = new FontLoader()
const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// camera
const perspectiveCamera1 = new THREE.PerspectiveCamera(45, width/height);
perspectiveCamera1.position.set(0,120,300);

const perspectiveCamera2 = new THREE.PerspectiveCamera(45, width/height);
perspectiveCamera2.position.set(150,0,200);

const perspectiveCamera3 = new THREE.PerspectiveCamera(45, width/height);
perspectiveCamera3.position.set(-150,0,200);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.shadowMap.enabled = true

const controls1 = new OrbitControls(perspectiveCamera1, renderer.domElement)
controls1.update()

const controls2 = new OrbitControls(perspectiveCamera2, renderer.domElement)
controls2.update()

const controls3 = new OrbitControls(perspectiveCamera3, renderer.domElement)
controls3.update()

document.body.append(renderer.domElement)

//light
const light = new THREE.SpotLight(0xFFFFFF, 1)
light.position.set(0,200,200)
light.castShadow = true
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7)
scene.add(ambientLight);

// const helper1 = new THREE.SpotLightHelper(light, 2)
// scene.add(helper1)

//sky box texture
const skyBoxTexture = [
    new THREE.MeshBasicMaterial({
        map:textureLoader.load("./assets/skybox/front.png"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map:textureLoader.load("./assets/skybox/back.png"),
        side: THREE.DoubleSide
    }),    
    new THREE.MeshBasicMaterial({
        map:textureLoader.load("./assets/skybox/up.png"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map:textureLoader.load("./assets/skybox/down.png"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map:textureLoader.load("./assets/skybox/right.png"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map:textureLoader.load("./assets/skybox/left.png"),
        side: THREE.DoubleSide
    })
]

// geometry & 3D object
const skyBoxGeometry = new THREE.BoxGeometry(800,800,800);
const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxTexture);
skyBox.position.set(0,0,0);
scene.add(skyBox);

let castle
gltfLoader.load ("./assets/castle/scene.gltf", (model) =>{
    castle = model.scene
    castle.scale.set(1,1,1)
    castle.position.set(0,0,0)
    castle.receiveShadow = true
    scene.add(castle)
})

const texture1 = textureLoader.load('./assets/castle/textures/cobblestone_squares_baseColor.jpeg')

const boxGeometry = new THREE.BoxGeometry(15, 10, 15);
const boxMaterial = new THREE.MeshStandardMaterial({ map: texture1 });
const princessBox = new THREE.Mesh(boxGeometry, boxMaterial);
princessBox.position.set(100,-15,100)
princessBox.receiveShadow = true
scene.add(princessBox)

const cylinderGeometry = new THREE.CylinderGeometry(10,10,10)
const princessCylinder = new THREE.Mesh(cylinderGeometry, boxMaterial)
princessCylinder.position.set(-100,-15,100)
princessCylinder.receiveShadow = true
scene.add(princessCylinder)

let mickey
gltfLoader.load ("./assets/princess/mickey/scene.gltf", (model) =>{
    mickey = model.scene
    mickey.scale.set(6,6,6)
    mickey.position.set(100,-11,100)
    mickey.traverse((child) =>{
        child.castShadow =true
    })
    scene.add(mickey)
    
    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, activeCamera);
        
        const intersects = raycaster.intersectObject(mickey, true);
        
        if (intersects.length > 0) {
            mickey.rotation.y += 0.2;
        }
    })
})

let minnie
gltfLoader.load ("./assets/princess/minnie/scene.gltf", (model) =>{
    minnie = model.scene
    minnie.scale.set(1000,1000,1000)
    minnie.position.set(-100,-10,100)
    minnie.traverse((child) =>{
        child.castShadow =true
    })
    scene.add(minnie)

    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, activeCamera);
        
        const intersects = raycaster.intersectObject(minnie, true);
        
        if (intersects.length > 0) {
            minnie.rotation.y += 0.2;
        }
    })
})

let jasmine
gltfLoader.load ("./assets/princess/princess_jasmine/scene.gltf", (model) =>{
    jasmine = model.scene
    jasmine.scale.set(3,3,3)
    jasmine.position.set(10,-2.1,100)
    jasmine.traverse((child) =>{
        child.castShadow =true
    })
    scene.add(jasmine)
})

let ariel
gltfLoader.load ("./assets/princess/ariel/scene.gltf", (model) =>{
    ariel = model.scene
    ariel.scale.set(50,50,50)
    ariel.position.set(-58,-8,0)
    ariel.traverse((child) =>{
        child.castShadow =true
    })
    scene.add(ariel)
})

let belle
gltfLoader.load ("./assets/princess/belle.gltf", (model) =>{
    belle = model.scene
    belle.scale.set(2,2,2)
    belle.position.set(-10,19,25)
    belle.rotation.y = 90
    belle.traverse((child) =>{
        child.castShadow =true
    })
    scene.add(belle)
})

let cinderella
gltfLoader.load ("./assets/princess/cinderella.gltf", (model) =>{
    cinderella = model.scene
    cinderella.scale.set(2,2,2)
    cinderella.position.set(0,3,25)
    cinderella.rotation.y = 90
    cinderella.traverse((child) =>{
        child.castShadow =true
    })
    scene.add(cinderella)
})

const sphereGeometry = new THREE.SphereGeometry(30,30,30)
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xC9C9C9,
    specular: 0xFFFFFF,
    metalness: 0.7,
    roughness: 0.3,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.2
});

const sphereMoon = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMoon.position.set(-50,120,-120)
scene.add(sphereMoon);

fontLoader.load("./three.js/examples/fonts/droid/droid_serif_bold.typeface.json", (font) => {
    let textGeo = new TextGeometry("Disney 100",{
        font:font,
        size:16,
        height:2
    })
    let textMaterial = new THREE.MeshBasicMaterial();
    let text = new THREE.Mesh(textGeo, textMaterial)
    text.position.set(-60,-25,120)
    scene.add(text)
})

const torusGeometry = new THREE.TorusGeometry(100, 1, 64, 64, Math.PI, Math.PI/2)
const torusMaterial = new THREE.MeshPhongMaterial({
    color: 0xFF9900,
    metalness: 0.7,
    roughness: 0.3,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.5
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// change camera
let activeCamera = perspectiveCamera1;
window.addEventListener("keypress", (e) => {
    if(e.key == "c" && activeCamera === perspectiveCamera1){
        activeCamera = perspectiveCamera2
    }
    else if(e.key == "c" && activeCamera === perspectiveCamera2){
        activeCamera = perspectiveCamera3
    }
    else if(e.key == "c" && activeCamera === perspectiveCamera3){
        activeCamera = perspectiveCamera1
    }
})

const rotationSpeed = 0.01;

function render(){

    princessBox.rotation.y -= rotationSpeed;
    princessCylinder.rotation.y += rotationSpeed;
    torus.rotation.z += rotationSpeed;

    renderer.render(scene,activeCamera);
    requestAnimationFrame(render)
}

render()