var firstScene = function () {
    var scene = new BABYLON.Scene(engine);

    video = ""
    type = "side"

    var assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.onTaskError = function (task) {
        console.log("error while loading " + task.name);
    }
    addRadar(assetsManager, new BABYLON.Vector3(260, -10, -100))
    engine.loadingUIBackgroundColor = "Black";
    assetsManager.load();

    var light = setLight(scene)
    var camera = radarCam(scene)
    var ground = frameGround(scene)
    addRadarPanel(assetsManager)

    var tri_panel = addBackButton("微波雷达信号辐射规律")

    scene.onPointerDown = function () {
        scene.onPointerDown = undefined
        camera.attachControl(canvas, true);
    }
    addSkyAndFloor(scene);

    var vrHelper = vr(scene, ground)
    return scene;
};

function addRadarPanel() {
    let frequency = "433MHz"
    let columns = [
        "433MHz",
        "2.4GHz"
    ]
    let wave = ""

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    let clickFlag = true;

    let panel2 = downFormitem(columns, title = "开始实验", subtitle = "设定雷达参数", onRatioClick = (value) => {
        console.log(value)

        if (value >= 0 && value < 20) {
            frequency = "433MHz";
        }
        else if (value >= 20 && value < 40) {
            frequency = "600MHz";
        }
        else if (value >= 40 && value < 60) {
            frequency = "900MHz";
        }
        else if (value >= 60 && value < 80) {
            frequency = "1.2GHz";
        }
        else if (value >= 80 && value <= 100) {
            frequency = "2.4GHz";
        }
        console.log(frequency);

    }, onButtonClick = () => {
        if (clickFlag == true) {
            clickFlag = false;
            console.log("start");
            if (frequency == "433MHz")
                wave = createRadarSphere(scene, 0.8, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
            else if (frequency == "600MHz")
                wave = createRadarSphere(scene, 0.6, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
            else if (frequency == "900MHz")
                wave = createRadarSphere(scene, 0.4, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
            else if (frequency == "1.2GHz")
                wave = createRadarSphere(scene, 0.25, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
            else if (frequency == "2.4GHz")
                wave = createRadarSphere(scene, 0.15, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
            setTimeout(() => {
                clearInterval(wave)
                clickFlag = true;
            }, 5000)
        }
    })

    advancedTexture.addControl(panel2)
}