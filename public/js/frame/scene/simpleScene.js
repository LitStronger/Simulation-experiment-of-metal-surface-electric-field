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
        "1.正方体",
        "2.圆柱体",
        "3.球体",
        "4.无人机（单雷达）",
        "5.无人机（双雷达）"
    ]
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); 


    let Form=upFormitem(columns,"RCS雷达散射截面测量",onRadtioClick=(value)=>{
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