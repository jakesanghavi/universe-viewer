let container;
let camera;
let renderer;
let scene;
let obj;
let obj2;

function init(){
    container = document.querySelector('.scene');

    scene = new THREE.Scene();

    const fov = 75;
    // const asp = container.clientWidth / container.clientHeight;
    const asp = container.clientWidth / window.innerHeight;
    const near = 1;
    const far = 50;

    camera = new THREE.PerspectiveCamera(fov, asp, near, far);
    camera.position.set(1, 1, 20);

    // const ambient = new THREE.AmbientLight(0x404040, 3);
    const ambient = new THREE.AmbientLight(0xffffff)
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0, 1, 1 ).normalize();
    scene.add( directionalLight );

    renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
    renderer.setSize(document.body.clientWidth, document.body.clientHeight);
    // renderer.setSize(container.clientWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    let loader = new THREE.GLTFLoader();

    //Credit to Sebastian Sosnowski from Sketchfab
    loader.load("./public/modelo/scene.gltf", (gltf) =>{
        scene.add(gltf.scene);
        obj = gltf.scene.children[0];
        obj.position.set(0,0,0);
        // obj.scale.set(0.0001, 0.00001, 0.0001);
        renderer.render(scene, camera);
        animate();
        // console.log(gltf.scene.getWorldPosition(obj.position));
        animar();
    });
    //Credit to Scrunchy32205 from Sketchfab
    loader.load("./public/earth/scene.gltf", (gltf) =>{
        scene.add(gltf.scene);
        obj2 = gltf.scene.children[0];
        obj2.position.set(15,0,8);
        renderer.render(scene, camera);
        // animate();
    });

    function animate(){
        requestAnimationFrame(animate);
        obj.rotation.z += 0.005;
        renderer.render(scene, camera);
    }

    function animar() {
        renderer.render(scene, camera);
        // if(obj2.position.x <= 15) {
        //     obj2.position.x += -0.02;
        // }
        // else {
        //     obj2.position.x += 0.02;
        // }
        obj2.position.x += -0.02;
        requestAnimationFrame(animar);
    }
}

init();