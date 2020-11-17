
var sceneAircraft = function (aeroplane = "aircraft", type = "single") {
    /* aeroplane飞行器种类  type仿真种类 */
    var scene = new BABYLON.Scene(engine);

    addSkyAndFloor(scene);
    setLight(scene)

    frontCamera = frontCam(scene)
    sideCamera = sideCam(scene)
    scene.activeCamera = sideCamera

    var ground = frameGround(scene)
    addBackButton("表面电场分布（频率）")
    var assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.onTaskError = function (task) {
        console.log("error while loading " + task.name);
    }
    assetsManager.onFinish = function (tasks) {
        engine.runRenderLoop(function () {
            scene.render();
        });
    };
    addRadar(assetsManager, new BABYLON.Vector3(260, 0, -25), 0.72);
    if (type == "double") {
        addRadar(assetsManager, new BABYLON.Vector3(260, -10, 100), 0.3)
    }
    addAircraft(assetsManager, new BABYLON.Vector3(0.05, 0.05, 0.05), 100, 80); //new BABYLON.Vector3(0, 100, 80);
    addAircraftPanel(aeroplane);

    assetsManager.load();
    return scene;
};
var clickFlag = true;

function addAircraftPanel(aeroplane) {
    wave = ""
    angle = "0"  
    radar = "433MHz"

    var columns_angle = [
        "0°方向",
        "45°方向",
        "90°方向",
        "135°方向",
        "180°方向",
    ]
    var columns_radar = [
        "433MHz",
        "2.4GHz"
    ]
    let columns_power = [
        "0dBm",
        "10dBm"
    ]

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("plane_r");

    let panel_2 = addAngleSlider_2(columns_angle, "选 择 角 度", 30, 320, "left", "top", onRatioClick = (index) => {

        let radar = getMeshByState("radar");
        let obj = getMeshByState("aircraft")

        if (clickFlag == true)
            if (index == 0) {
                angle = "0"
                obj.rotation.x = -Math.PI * 0.5;
            } else if (index == 1) {
                angle = "45"
                obj.rotation.x = -Math.PI * 0.5 + Math.PI / 4;
            } else if (index == 2) {
                angle = "90"
                obj.rotation.x = -Math.PI * 0.5 + Math.PI / 2;
            } else if (index == 3) {
                angle = "135"
                obj.rotation.x = -Math.PI * 0.5 + Math.PI * (3 / 4);
            } else if (index == 4) {
                obj.rotation.x = -Math.PI * 0.5 + Math.PI;
            }
    })

    advancedTexture.addControl(panel_2);

    var advancedTexture_l = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("plane_l");
    let panel_l = downFormitem_s(clickFlag, columns_radar, "开始实验", "雷 达 类 型", 30, 505, "300px", "175px", "left", "top", onRatioClick = (value) => {
        radar = "433MHz";
        if (value >= 0 && value < 20) {
            radar = "433MHz"
        } else if (value >= 20 && value < 40) {
            radar = "600MHz"
        } else if (value >= 40 && value < 60) {
            radar = "900MHz"
        } else if (value >= 60 && value < 80) {
            radar = "1.2GHz"
        } else if (value >= 80 && value <= 100) {
            radar = "2.4GHz"
        }
        console.log("value:" + value);
        console.log("radar" + radar);
    }, onButtonClick = () => {
        if (clickFlag == true) {
            clickFlag = false;
            console.log(clickFlag);

            let obj = getMeshByState("aircraft")

            createWave(radar, obj)
            setTimeout(() => {
                //video = addPicture("exp_2", aeroplane, radar, angle);
                console.log("forth?")
                video_2 = addPicture("exp_5", aeroplane, radar, angle, x = 300, y = 80, z = 40);
                clickFlag = true;
                console.log("出现图片后的flag :" + clickFlag);
            }, 10000)

        }
    })
    advancedTexture_l.addControl(panel_l)



}
function createWave(frequency, obj) {

    let wave;
    if (frequency == "433MHz")
        wave = createRadarSphere(scene, 0.8, new BABYLON.Vector3(257, 25, -23), new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.75, Math.PI * 0))
    else if (frequency == "600MHz")
        wave = createRadarSphere(scene, 0.65, new BABYLON.Vector3(257, 25, -23), new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.72, Math.PI * 0))
    else if (frequency == "900MHz")
        wave = createRadarSphere(scene, 0.5, new BABYLON.Vector3(257, 25, -23), new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.7, Math.PI * 0))
    else if (frequency == "1.2GHz")
        wave = createRadarSphere(scene, 0.35, new BABYLON.Vector3(257, 25, -23), new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.7, Math.PI * 0))
    else if (frequency == "2.4GHz")
        wave = createRadarSphere(scene, 0.2, new BABYLON.Vector3(257, 25, -23), new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.7, Math.PI * 0))
    setTimeout(() => {
        clearInterval(wave)
        clickFlag = true;
    }, 5000)
}