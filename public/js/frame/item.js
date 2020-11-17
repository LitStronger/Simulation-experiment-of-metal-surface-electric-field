// environment
function frameGround(scene) {
    var groundTexture = new BABYLON.Texture("textures/sand.jpg", scene);
    groundTexture.vScale = groundTexture.uScale = 20.0;

    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = groundTexture;

    var ground = BABYLON.Mesh.CreateGround("ground", 2000, 2000, 1, scene, false);
    ground.position.y = -10;
    ground.material = groundMaterial;
    return ground
}

function setLight(scene) {
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;
    return light
}
// camera
function radarCam(scene) {
    var camera = new BABYLON.UniversalCamera("flightCam", new BABYLON.Vector3(400, 100, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    return camera
}

function setCamera(scene) {
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 320, new BABYLON.Vector3(0, 20, 0), scene);
    camera.setTarget(new BABYLON.Vector3(0, 20, 0));
    camera.attachControl(canvas, false, false);
    return camera
}

function sideCam(scene) {
    var camera = new BABYLON.UniversalCamera("sideCam", new BABYLON.Vector3(400, 100, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    return camera
}

function frontCam(scene) {
    var camera = new BABYLON.UniversalCamera("frontCam", new BABYLON.Vector3(0, 100, -400), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    return camera;
}

function vr(scene, ground) {
    var vrHelper = scene.createDefaultVRExperience();
    vrHelper.enableTeleportation({
        floorMeshes: [ground]
    });
    vrHelper.displayGaze = true
    vrHelper.displayLaserPointer = true
    vrHelper.enableInteractions();
    return vrHelper
}
function rotateCam(scene) {
    var camera = new BABYLON.ArcRotateCamera("rotateCam", -Math.PI / 2, Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    console.log("ratateCam")
    camera.attachControl(canvas, false, false);
    return camera;
}
// wave
function createBackSphere(scene, position, towards = new BABYLON.Vector3(257, 15, -98)) {
    let material_sphere = new BABYLON.StandardMaterial('spheremat', scene);
    material_sphere.diffuseColor = new BABYLON.Color3(0.2, 0.3, 0.6);
    material_sphere.diffuseColor.hasAlpha = true;
    material_sphere.alpha = 0.3

    let hoop = BABYLON.MeshBuilder.CreateSphere("plane", {
        arc: -0.1,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        diameter: 10,
        slice: 0.5,
    }, scene);
    // let hoop = BABYLON.MeshBuilder.CreateTorus("hoop", {
    //     thickness: 0.1,
    //     tessellation: 32
    // }, scene);
    hoop.scaling = new BABYLON.Vector3(1, 1, 1)
    // hoop.position=towards
    hoop.position = position
    hoop.material = material_sphere
    hoop.outlineColor = new BABYLON.Color3(0.4, 0.4, 0.4)

    hoop.lookAt(towards)
    hoop.rotation.x = +Math.PI * 0.5

    let move = setInterval(() => {
        hoop.lookAt(towards)
        hoop.rotation.x -= Math.PI * 0.5
        hoop.movePOV(0, -30, 0)
        hoop.scaling.z += 0.25
        hoop.scaling.x += 0.25

        if (hoop.position.y <= towards.y + 50) {
            clearInterval(move)
            hoop.dispose()
        }
    }, 100)
}

function createRadarSphere(scene, frequence, position, rotation) {
    let delay = frequence * 1000
    console.log(frequence)
    return setInterval(() => {
        let material_sphere = new BABYLON.StandardMaterial('spheremat', scene);
        material_sphere.diffuseColor = BABYLON.Color3.Gray();
        material_sphere.diffuseColor.hasAlpha = true;
        material_sphere.alpha = 0.3

        let plane = BABYLON.MeshBuilder.CreateSphere("plane", {
            arc: 0.5,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            diameter: 10,
            slice: 1,
        }, scene);
        plane.material = material_sphere;
        plane.rotation = rotation
        plane.position = position

        let keys = []
        keys.push({
            frame: 0,
            value: 1
        })
        keys.push({
            frame: 600,
            value: 150
        })

        let keys_alpha = []
        keys_alpha.push({
            frame: 0,
            value: 0.3
        })
        keys_alpha.push({
            frame: 180,
            value: 0
        })
        var animationX = new BABYLON.Animation("tutoAnimation", "scaling.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var animationY = new BABYLON.Animation("tutoAnimation", "scaling.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var animationZ = new BABYLON.Animation("tutoAnimation", "scaling.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var sphereAlpha = new BABYLON.Animation("tutoAnimation", "material.alpha", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        sphereAlpha.setKeys(keys_alpha)
        animationX.setKeys(keys);
        animationY.setKeys(keys);
        animationZ.setKeys(keys);

        plane.animations.push(animationX);
        plane.animations.push(animationY);
        plane.animations.push(animationZ);
        plane.animations.push(sphereAlpha);
        // console.log(plane)

        setTimeout(async () => {
            let anim = scene.beginAnimation(plane, 0, 180, false);
            // console.log("before");
            await anim.waitAsync();
            // console.log("after");
            plane.dispose()
        });
    }, delay)
}

function addSkyAndFloor(scene) {

    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 5000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/TropicalSunnyDay/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;


    //Creation of a repeated textured material
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new BABYLON.Texture("textures/textures/grass.jpg", scene);

    materialPlane.diffuseTexture.uScale = 200.0;//Repeat 5 times on the Vertical Axes
    materialPlane.diffuseTexture.vScale = 200.0;//Repeat 5 times on the Horizontal Axes
    materialPlane.backFaceCulling = false;//Always show the front and the back of an element

    var glassMesh = BABYLON.Mesh.CreateGround("waterMesh", 2000, 2000, 32, scene, false);
    glassMesh.material = materialPlane;


    var particleSystem;
    var createNewSystem = function (v3) {
        var fountain = BABYLON.Mesh.CreateBox("foutain", .01, scene); //雾气挂载点
        fountain.position = new BABYLON.Vector3(-1000, 0, -1000) //定位到角落
        // fountain.visibility = 0;

        var fogTexture = new BABYLON.Texture("https://minio.cnbabylon.com/public/Assets/smoke_15.png", scene);

        particleSystem = new BABYLON.ParticleSystem("particles", 5000, scene);
        particleSystem.manualEmitCount = particleSystem.getCapacity();
        particleSystem.minEmitBox = new BABYLON.Vector3(2000, 30, 2000); // Starting all from
        // particleSystem.maxEmitBox = new BABYLON.Vector3(25, 2, 25); // To...
        particleSystem.particleTexture = fogTexture.clone();
        particleSystem.emitter = fountain;

        particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.1);
        particleSystem.color2 = new BABYLON.Color4(.95, .95, .95, 0.15);
        particleSystem.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1);
        particleSystem.minSize = 20;
        particleSystem.maxSize = 60.0;
        particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER;
        particleSystem.emitRate = 50000;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
        particleSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
        particleSystem.direction2 = new BABYLON.Vector3(0, 0, 0);
        particleSystem.minAngularSpeed = -2;
        particleSystem.maxAngularSpeed = 2;
        particleSystem.minEmitPower = .5;
        particleSystem.maxEmitPower = 1;
        particleSystem.updateSpeed = 0.005;
        particleSystem.start();
    }
    createNewSystem();
}
