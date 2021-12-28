let container;
let camera;
let renderer;
let scene;
let obj;
let obj2;

container = document.querySelector('.scene');
scene = new THREE.Scene();

const fov = 75;
// const asp = container.clientWidth / container.clientHeight;
const asp = document.body.clientWidth/document.body.clientHeight;
const near = 1;
const far = 100;
camera = new THREE.PerspectiveCamera(fov, asp, near, far);
camera.position.set(0, 0, 40);

renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
renderer.setSize(document.body.clientWidth, document.body.clientHeight);
// renderer.setSize(container.clientWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

async function main(){

    // const ambient = new THREE.AmbientLight(0x404040, 3);
    const ambient = new THREE.AmbientLight(0xffffff)
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0,1,1).normalize();
    scene.add(directionalLight);

    //Credit to Sebastian Sosnowski from Sketchfab
    sun = await loader.loadAsync("./public/sun/scene.gltf");
    sun = sun.scene
    //Credit to Scrunchy32205 from Sketchfab
    earth = await loader.loadAsync("./public/earth/scene.gltf");
    earth = earth.scene;
    // obj2 = obj2.scene.children[0];

    scene.add(sun);
    scene.add(earth);
    sun = sun.children[0];
    sun.angle = 0;
    earth = earth.children[0];
    earth.angle = 0;

    spin(sun, 0.005);
    earth.scale.multiplyScalar(3);
    earth.position.set(20,0,0);
    spin(earth, 0.03);
    orbit(earth, 20);
    renderer.render(scene, camera);

    function spin(objeto, vel){
        requestAnimationFrame(() => {spin(objeto, vel);});
        objeto.rotation.z += vel;
        renderer.render(scene, camera);
    }

    function orbit(objeto, dist) {
        requestAnimationFrame(() => {orbit(objeto, dist);});
        objeto.angle += 0.005;
        const polar = [Math.cos(objeto.angle) * dist, Math.sin(objeto.angle) * -dist];
        objeto.position.x = polar[0];
        objeto.position.z = polar[1];
        renderer.render(scene, camera);
    }

}
main();

document.addEventListener('mousedown', () => {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(scene.children);
    if(hits.length > 0) {
        console.log(hits[0].object.name);
    }
    renderer.render(scene, camera);
});

document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX/renderer.domElement.clientWidth)*2 -1;
    mouse.y = -(e.clientY/renderer.domElement.clientHeight)*2 + 1;
});