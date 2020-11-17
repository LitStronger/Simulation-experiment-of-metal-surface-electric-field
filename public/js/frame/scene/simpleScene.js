var simpleScene =  function () {
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

    // addF117(assetsManager, new BABYLON.Vector3(0.8, 0.8, 0.8), 30, 0)
    addAircraft(assetsManager, new BABYLON.Vector3(0.1, 0.1, 0.1), 100, 100)
    
    engine.loadingUIBackgroundColor = "Black";
    assetsManager.load();
    // assetsManager.loadAsync()


    scene.onPointerDown = function () {
        scene.onPointerDown = undefined
        camera.attachControl(canvas, true);
    }
    return scene;
}

function createPanel() {
    let columns = [
        "1. 正方体",
        "2. 圆柱体",
        "3. 球体",
        "4. 无人机(单雷达)",
        "5. 无人机(双雷达)"
    ]
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");


    let Form = upFormitem(columns, "产品外形隐身性能分析", onRadtioClick = (value) => {

        let index = indexItem(columns, value)
        console.log("index:" + index)
        console.log()
        if (index >= 0) {
            if (index == 0) {
                scene.dispose()
                scene = sceneBaseObj('cube')
            }else if(index == 1){
                scene.dispose()
                scene = sceneBaseObj('column')
            }else if(index == 2){
                scene.dispose()
                scene = sceneBaseObj('sphere')
            }else if(index == 3){
                scene.dispose()
                scene = sceneAircraft('aircraft', "single")
            }else if(index == 4){
                scene.dispose()
                scene = sceneAircraft('aircraft', "double")
            }
        }

    })
    
    advancedTexture.addControl(Form)
}