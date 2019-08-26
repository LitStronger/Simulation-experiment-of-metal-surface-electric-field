var simpleScene = function () {
    let scene = new BABYLON.Scene(engine);
    setLight(scene)
    let camera = setCamera(scene)
    let ground = frameGround(scene)
    vr(scene, ground)


    addSkyAndFloor(scene);

    addBackButton("")
    createPanel();
    var assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.onTaskError = function (task) {
        console.log("error while loading " + task.name);
    }

    addF117(assetsManager, new BABYLON.Vector3(0.8, 0.8, 0.8), 30, 0)

    engine.loadingUIBackgroundColor = "Black";
    assetsManager.load();

    scene.onPointerDown = function () {
        scene.onPointerDown = undefined
        camera.attachControl(canvas, true);
    }
    return scene;
}

function createPanel(){
    let columns=[
        "微波雷达信号辐射规律",
        "表面电场分布（频率）",
        "表面电场分布（时间）",
        "RCS雷达散射截面测量"
    ]
    let plane=BABYLON.Mesh.CreatePlane("plane",20)
    plane.position.y=20
    plane.position.z=-290
    plane.billboardMode=2

    let advancedTexture=BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane)

    let Form=upFormitem(columns,"金属体电磁散射特性分析仿真软件",onRadtioClick=(value)=>{
        let frames=[
            firstScene,
            secondScene_ball,
            thirdScene,
            forthScene_ball
        ]
        let index=indexItem(columns,value)
        console.log("index:"+ index)
        if(index>=0){
            scene.dispose()
            console.log(frames[index]);
            scene=frames[index]()
        }else{
            console.log(index)
        }

    })
    console.log(Form)

    advancedTexture.addControl(Form)
}