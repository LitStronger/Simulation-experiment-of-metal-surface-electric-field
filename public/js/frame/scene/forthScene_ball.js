var forthScene_ball = function (aeroplane = "square") {
    var scene = new BABYLON.Scene(engine);

    type = "side"
    video = ""
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

    if(aeroplane == "sphere"){
        var sphere = addSphere(scene);
    }else if(aeroplane == "square"){
        var square = addSquare(scene);
    }else if(aeroplane == "column"){
        var column = addColumn(scene);
        console.log("add ok");
    }
    addBallPanelRSC(aeroplane);
    addRadar(assetsManager, new BABYLON.Vector3(260, 0, -25), 0.72);
    assetsManager.load();
    return scene;
};
var clickFlag = true;

function addBallPanelRSC(aeroplane){
    wave = ""
    type = "0"
    radar = "433MHz"
    let columns = [
        "目标一",
        "目标二",
        "目标三",
        "目标四",
        "目标五"
    ]

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

    let columns_power=[
        "0dBm",
        "10dBm"
    ]
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("plane_r");
    let panel = miniFormitem(columns, "目 标 类 型", "300px", "250px", 30, 60, "left", "top", onRatioClick = (aero) => {
        if (aero == "目标一") {
            scene.dispose()
            scene = forthScene_ball("square")
        } else if(aero == "目标二") {
            scene.dispose()
            scene = forthScene_ball("column")
        } else if(aero == "目标三"){
            scene.dispose();
            scene = forthScene_ball("sphere")
        }else if(aero == "目标四"){
            scene.dispose();
            scene = forthScene_b("F117")
        }else if(aero == "目标五"){
            scene.dispose();
            scene = forthScene_b("a380")
        }
    })
    advancedTexture.addControl(panel); 
    //addSphere(scene);
    let panel_2 = addAngleSlider_2(columns_angle,"选 择 角 度", 30 , 320, "left", "top", onRatioClick = (index) =>{
                
        let radar = getMeshByState("radar");

        if(aeroplane == "sphere")
            var obj = getMeshByState("sphere");
        else if(aeroplane == "square") 
            var obj = getMeshByState("square");
        else if(aeroplane == "column")
            var obj = getMeshByState("column");
        
        if(clickFlag == true)
        if(index == 0){
            type = "0"
            obj.rotation.x =  Math.PI * 0.7;
        }else if(index == 1){
            type = "45"
            obj.rotation.x = Math.PI * 0.7 + Math.PI / 4;
        }else if(index == 2){
            type = "90"
            obj.rotation.x =  Math.PI * 0.7 + Math.PI / 2;
        }else if(index == 3){
            type = "135"
            obj.rotation.x =  Math.PI * 0.7 + Math.PI * (3/4);
        }else if(index == 4){
            obj.rotation.x =  Math.PI * 0.7 + Math.PI;
        }
    })
    advancedTexture.addControl(panel_2);

    var advancedTexture_l = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("plane_l");
    let panel_l = downFormitem_s(clickFlag, columns_radar, "开始实验", "雷 达 类 型", 30, 505, "300px","175px", "left", "top", onRatioClick = (value) => {
        radar = "433MHz";
        if (value >= 0 && value < 20) {          
            radar = "433MHz"
        } else if (value >= 20 && value < 40) {
            radar = "600MHz"
        }else if(value >= 40 && value < 60){
            radar = "900MHz"
        }else if(value >= 60 && value < 80){
            radar = "1.2GHz"
        }else if(value >= 80 && value <= 100){
            radar = "2.4GHz"
        }
        console.log("value:" + value);
        console.log("radar" + radar);
    }, onButtonClick = () => {       
        if(clickFlag == true){
            clickFlag = false;
            console.log(clickFlag);

            if(aeroplane == "sphere")
                var obj = getMeshByState("sphere");
            else if(aeroplane == "square") 
                var obj = getMeshByState("square");
            else if(aeroplane == "column")
                var obj = getMeshByState("column");
                  
            createWave(radar,obj)
            setTimeout(() => {
                //video = addPicture("exp_2", aeroplane, radar, type);
                console.log("forth?")
                video_2 = addPicture("exp_5", aeroplane, radar, type,  x = 300, y = 80, z = 40);
                clickFlag = true;
                console.log("出现图片后的flag :"+clickFlag);
            }, 10000)

        }
    })
    advancedTexture_l.addControl(panel_l)



}
function createWave(frequency,obj) {
    //let wave = createRadarSphere(scene, frequency == "433MHz" ? 2 : 0.7, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
    let wave;
 /*   let waveRotation = new BABYLON.Vector3(Math.PI /4, Math.PI, Math.PI * 0)
    if(obj.position.z == 200) waveRotation = new BABYLON.Vector3(Math.PI / 4, Math.PI, Math.PI * 0)
    else if(obj.position.z == 141)  waveRotation = new BABYLON.Vector3(Math.PI * 0.3, Math.PI * (3/4), Math.PI * 0)
    else if(obj.position.z == 0)    waveRotation = new BABYLON.Vector3(Math.PI * 0.3, Math.PI / 2, Math.PI * 0)
    else if(obj.position.z == -141) waveRotation = new BABYLON.Vector3(Math.PI * 0.3, Math.PI / 4, Math.PI * 0)
    else if(obj.position.z == -200) waveRotation = new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0, Math.PI * 0)*/

    if (frequency == "433MHz")
        wave = createRadarSphere(scene, 0.8, new BABYLON.Vector3(257, 25, -23), new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.75, Math.PI * 0))
    else if(frequency == "600MHz")
        wave = createRadarSphere(scene, 0.65, new BABYLON.Vector3(257, 25, -23), new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.72, Math.PI * 0))
    else if(frequency == "900MHz")
        wave = createRadarSphere(scene, 0.5, new BABYLON.Vector3(257, 25, -23), new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.7, Math.PI * 0))
    else if(frequency == "1.2GHz")
        wave = createRadarSphere(scene, 0.35, new BABYLON.Vector3(257, 25, -23),new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.7, Math.PI * 0))
    else if(frequency == "2.4GHz")
        wave = createRadarSphere(scene, 0.2, new BABYLON.Vector3(257, 25, -23), new BABYLON.Vector3(Math.PI / 4, Math.PI * 0.7, Math.PI * 0))
    setTimeout(() => {
        clearInterval(wave)
        clickFlag = true;
    }, 5000)
    }