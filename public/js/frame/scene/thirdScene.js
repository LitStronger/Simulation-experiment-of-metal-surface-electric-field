var thirdScene = function (aeroplane="F117") {
    var scene = new BABYLON.Scene(engine);

    video=""

    var light = setLight(scene)
    frontCamera = frontCam(scene)
    sideCamera=sideCam(scene)
    scene.activeCamera=sideCamera
    var ground = frameGround(scene)
    var two_panel = addTimePanel(scene,aeroplane)
    var vrHelper=vr(scene,ground)
    var tri_panel = addBackButton("表面电场分布（时间）")

    var assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.onTaskError = function (task) {
        console.log("error while loading " + task.name);
    }
    assetsManager.onFinish = function (tasks) {
        engine.runRenderLoop(function () {
            scene.render();
        });
    };
    addSkyAndFloor(scene);
    if(aeroplane=="F117"){
        addRadar(assetsManager,new BABYLON.Vector3(260,-10,-100))
        addF117(assetsManager)
        assetsManager.load();
    }else{
        addRadar(assetsManager,new BABYLON.Vector3(260,-10,-100))
        addA380(assetsManager)
        assetsManager.load();
    }
    return scene;
};

// -----------------------------------------
function addTimePanel(scene_t,aeroplane) {
    wave=""
    type="side"
    radar="433MHz"
    let columns = [
        "目标一",
        "目标二"
    ]
    var columns_2 = [
        "0°方向",
        "45°方向",
        "90°方向",
        "135°方向",
        "180°方向",
        "225°方向",
        "270°方向",
        "315°方向"
    ]
    var columns_l = [
        "正视图",
        "侧视图"
    ]
    var columns_radar=[
        "433MHz",
        "2.4GHz"
    ]
        // aero_type
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("plane_r");
        let panel=miniFormitem(columns,"目 标 类 型", "300px", "145px",30,80,"left","top",onRatioClick=(aero)=>{
            if(aero=="目标一"){
                scene.dispose()
                scene=thirdScene("F117")
            }else{
                scene.dispose()
                scene=thirdScene("A380")
            }
        })
        advancedTexture.addControl(panel);



    // radar_type
    var clickFlag = true;
    var advancedTexture_l = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("plane_l");
    let panel_l=downFormitem_s(clickFlag, columns_radar,"开始实验","雷达类型",30,420,"300px","175px","left","top",onRatioClick=(value)=>{
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

    },onButtonClick=()=>{
        if(clickFlag == true){
            clickFlag = false;
            if(aeroplane!=""&&radar!=""&&type!=""){
                scene.meshes.forEach((element)=>{
                    if(element.state=="f117"||element.state=="a380"){
                        aerofly_3(element,radar)
                    }
                    setTimeout(()=>{
                        video=addVideo("exp_3",aeroplane,radar,type)
                        clickFlag = true;
                    },14000)
                })
            }else{
                console.log(aeroplane,wave,type)
                alert("请填写完所有参数")
                clickFlag = true;
            }
        }
    })
    advancedTexture_l.addControl(panel_l)
    //view type
    let panel_2 = addAngleSlider(columns_2,"选 择 角 度",30 , 235, "left", "top", onRatioClick = (index) =>{
        //element.rotation.y = 0;
        console.log(index+"角度");
        console.log("angle's : "+clickFlag);
        if(clickFlag == true)
        if (index == 0) {
            type = "front"//用于检测是否选择了相关参数
            scene.meshes.forEach((element) => {
                if (element.state == "f117" || element.state == "a380") {
                    if (element.position.x != 0 || element.position.z != 300) {
                        element.rotation.y = 0;
                        element.position = new BABYLON.Vector3(0, element.position.y, 300)
                        element.rotation.y = 0;
                        if(element.state == "a380") element.rotation.y = Math.PI;
                    }
                    console.log(element.position)
                }
            })
        }else if(index == 1){
            type = "side"           
            scene.meshes.forEach((element) => {  
                if (element.state == "f117" || element.state == "a380") {
                    if (element.position.x != -212 || element.position.z != 212) {
                        element.rotation.y = 0;
                        if(element.state == "a380") element.rotation.y = Math.PI;
                        element.position = new BABYLON.Vector3(-212, element.position.y, 212)
                        element.rotation.y -= 0.25 * Math.PI;
                    }
                    console.log("1:"+element.position)
                }
            })
            console.log("??");
        }else if(index == 2){
            scene.meshes.forEach((element) => {
                type = "side"
                if (element.state == "f117" || element.state == "a380") {
                    if (element.position.x != -300 || element.position.z != 0) {
                        element.rotation.y = 0;
                        if(element.state == "a380") element.rotation.y = Math.PI;
                        element.position = new BABYLON.Vector3(-300, element.position.y, 0)
                        element.rotation.y -= 0.5 * Math.PI
                    }
                    console.log(element.position)
                }
            })
        }else if(index == 3){
            scene.meshes.forEach((element) => {
                type = "side"
                if (element.state == "f117" || element.state == "a380") {
                    console.log(element.position)
                    if (element.position.x != -212 || element.position.z != -212) {
                        element.rotation.y = 0;
                        if(element.state == "a380") element.rotation.y = Math.PI;
                        element.position = new BABYLON.Vector3(-212, element.position.y, -212)
                        element.rotation.y -= 0.75 * Math.PI
                    }
                    console.log(element.position)
                }
            })
        }else if(index == 4){
            scene.meshes.forEach((element) => {
                type = "side"
                if (element.state == "f117" || element.state == "a380") {
                    if (element.position.x != 0 || element.position.z != -300) {
                        element.rotation.y = 0;
                        if(element.state == "a380") element.rotation.y = Math.PI;
                        element.position = new BABYLON.Vector3(0, element.position.y, -300)
                        element.rotation.y -= 1.0 * Math.PI
                    }
                    console.log(element.position)
                }
            })
        }else if(index == 5){
            scene.meshes.forEach((element) => {
                type = "side"
                if (element.state == "f117" || element.state == "a380") {
                    if (element.position.x != 212 || element.position.z != -212) {
                        element.rotation.y = 0;
                        if(element.state == "a380") element.rotation.y = Math.PI;
                        element.position = new BABYLON.Vector3(212, element.position.y, -212)
                        element.rotation.y -= 1.25 * Math.PI
                    }
                    console.log(element.position)
                }
            })
        }else if(index == 6){
            scene.meshes.forEach((element) => {
                type = "side"
                if (element.state == "f117" || element.state == "a380") {
                    if (element.position.x != 300 || element.position.z != 0) {
                        element.rotation.y = 0;
                        if(element.state == "a380") element.rotation.y = Math.PI;
                        element.position = new BABYLON.Vector3(300, element.position.y, 0)
                        element.rotation.y -= 1.5 * Math.PI
                    }
                    console.log(element.position)
                }
            })
        }else if(index == 7){
            scene.meshes.forEach((element) => {
                type = "side"
                if (element.state == "f117" || element.state == "a380") {
                    if (element.position.x != 212 || element.position.z != 212) {
                        element.rotation.y = 0;
                        if(element.state == "a380") element.rotation.y = Math.PI;
                        element.position = new BABYLON.Vector3(212, element.position.y, 212)
                        element.rotation.y -= 1.75 * Math.PI
                    }
                     console.log(element.position)
                }
            })
        }


        if (video != "") {
            video.dispose();
            video = "";
        }
    })
    advancedTexture.addControl(panel_2);
    // view_type
   /* let panel_r2=miniFormitem(columns_l,"选择角度",30,180,"left","top",onRatioClick=(towards)=>{
        if(towards=="正视图"){
            type="front"
            scene.meshes.forEach((element)=>{
                if(element.state=="f117"||element.state=="a380"){
                    console.log(element.position)
                    if(element.position.z!=0){
                        element.position=new BABYLON.Vector3(-300,element.position.y,0)
                        element.rotation.y-=0.5*Math.PI    
                    }
                }
            })
        }else{
            scene.meshes.forEach((element)=>{
                type="side"
                if(element.state=="f117"||element.state=="a380"){
                    console.log(element.position)
                    if(element.position.x!=0){
                        element.position=new BABYLON.Vector3(0,element.position.y,300)
                        element.rotation.y+=0.5*Math.PI    
                    }
                }
            })
        }
        if(video!=""){
            video.dispose()
            video="" 
        }
    })
    advancedTexture.addControl(panel_r2);*/
}

function aerofly_3(aeroplane,frequency){
    let temp_pos
    let radar=getMeshByState("radar")
    radar=radar.position
    //let wave=createRadarSphere(scene,frequency=="433MHz"?2:0.7,new BABYLON.Vector3(257,15,-98),new BABYLON.Vector3(Math.PI*0.3,Math.PI*0.69,Math.PI*0))
    if (frequency == "433MHz")
        wave = createRadarSphere(scene, 0.8, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
    else if(frequency == "600MHz")
        wave = createRadarSphere(scene, 0.6, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
    else if(frequency == "900MHz")
        wave = createRadarSphere(scene, 0.4, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
    else if(frequency == "1.2GHz")
        wave = createRadarSphere(scene, 0.25, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
    else if(frequency == "2.4GHz")
        wave = createRadarSphere(scene, 0.15, new BABYLON.Vector3(257, 15, -98), new BABYLON.Vector3(Math.PI * 0.3, Math.PI * 0.69, Math.PI * 0))
        if (aeroplane.position.z == 300  && aeroplane.position.x == 0) {
            let back = 0
            setTimeout(() => {
                back = setInterval(() => {
                    temp_pos = new BABYLON.Vector3(aeroplane.position.x, aeroplane.position.y, aeroplane.position.z)
                    setTimeout(()=>{
                        createBackSphere(scene, temp_pos, radar)
                    },1500)
                }, 200)
            }, 500)
            let move = setInterval(() => {
                aeroplane.position.z -= 0.5;//0.5
                if (aeroplane.position.z <= -600) {
                    clearInterval(move)
                    clearInterval(back)
                    clearInterval(wave)
                    aeroplane.position = new BABYLON.Vector3(0, aeroplane.position.y, 300)//飞机复位
                    
                }
            }, 1)
        }else if (aeroplane.position.z > -424 && aeroplane.position.x < 424 && aeroplane.position.z == 212 && aeroplane.position.x == -212) {
            let back = 0
            setTimeout(() => {
                back = setInterval(() => {
                    temp_pos = new BABYLON.Vector3(aeroplane.position.x, aeroplane.position.y, aeroplane.position.z)
                    setTimeout(()=>{
                        createBackSphere(scene, temp_pos, radar)
                    },1500)
                }, 300)
            }, 1000)
            let move = setInterval(() => {
                aeroplane.position.z -= 0.35
                aeroplane.position.x += 0.35
                if (aeroplane.position.z <= -424) {
                    clearInterval(move)
                    clearInterval(back)
                    clearInterval(wave)
                    aeroplane.position = new BABYLON.Vector3(-212, aeroplane.position.y, 212)
                }
            }, 1)
        }else if (aeroplane.position.z == 0 && aeroplane.position.x == -300) {//90
            let back = 0
            setTimeout(() => {
                back = setInterval(() => {
                    temp_pos = new BABYLON.Vector3(aeroplane.position.x, aeroplane.position.y, aeroplane.position.z)
                    setTimeout(()=>{
                        createBackSphere(scene, temp_pos, radar)
                    },1500)
                }, 300)
            }, 1000)
            let move = setInterval(() => {
                aeroplane.position.x += 0.5
                if (aeroplane.position.x >= 600) {
                    clearInterval(move)
                    clearInterval(back)
                    clearInterval(wave)
                    aeroplane.position = new BABYLON.Vector3(-300, aeroplane.position.y, 0)
                }
            }, 1)
        }else if (aeroplane.position.x == -212 && aeroplane.position.z == -212) {//135
            let back = 0
            setTimeout(() => {
                back = setInterval(() => {
                    temp_pos = new BABYLON.Vector3(aeroplane.position.x, aeroplane.position.y, aeroplane.position.z)
                    setTimeout(()=>{
                        createBackSphere(scene, temp_pos, radar)
                    },1500)
                }, 300)
            }, 1000)
            let move = setInterval(() => {
                aeroplane.position.z += 0.35;
                aeroplane.position.x += 0.35;
                if (aeroplane.position.z >= 424 && aeroplane.position.x >= 424) {
                    clearInterval(move)
                    clearInterval(back)
                    clearInterval(wave)
                    aeroplane.position = new BABYLON.Vector3(-212, aeroplane.position.y, -212)
                }
            }, 1)
        }else if (aeroplane.position.x == 0 && aeroplane.position.z == -300) {//180
            let back = 0
            console.log("into if")
            setTimeout(() => {
                back = setInterval(() => {
                    temp_pos = new BABYLON.Vector3(aeroplane.position.x, aeroplane.position.y, aeroplane.position.z)
                    setTimeout(()=>{
                        createBackSphere(scene, temp_pos, radar)
                    },1500)
                }, 300)
            }, 1000)
            let move = setInterval(() => {
                aeroplane.position.z += 0.5
                console.log("if move?")
                if (aeroplane.position.z >= 600) {
                    clearInterval(move)
                    clearInterval(back)
                    clearInterval(wave)
                    aeroplane.position = new BABYLON.Vector3(0, aeroplane.position.y, -300)
                }
            }, 1)
        }else if (aeroplane.position.x == 212 && aeroplane.position.z == -212) {//225
            let back = 0
            setTimeout(() => {
                back = setInterval(() => {
                    temp_pos = new BABYLON.Vector3(aeroplane.position.x, aeroplane.position.y, aeroplane.position.z)
                    setTimeout(()=>{
                        createBackSphere(scene, temp_pos, radar)
                    },1500)
                }, 300)
            }, 1000)
            let move = setInterval(() => {
                aeroplane.position.x -= 0.35
                aeroplane.position.z += 0.35
                if (aeroplane.position.z >= 424) {
                    clearInterval(move)
                    clearInterval(back)
                    clearInterval(wave)
                    aeroplane.position = new BABYLON.Vector3(212, aeroplane.position.y, -212)
                }
            }, 1)
        }else if (aeroplane.position.x == 300 && aeroplane.position.z == 0) {//270
            let back = 0
            setTimeout(() => {
                back = setInterval(() => {
                    temp_pos = new BABYLON.Vector3(aeroplane.position.x, aeroplane.position.y, aeroplane.position.z)
                    setTimeout(()=>{
                        createBackSphere(scene, temp_pos, radar)
                    },1500)
                }, 300)
            }, 1000)
            let move = setInterval(() => {
                aeroplane.position.x -= 0.5
                if (aeroplane.position.x <= -600) {
                    clearInterval(move)
                    clearInterval(back)
                    clearInterval(wave)
                    aeroplane.position = new BABYLON.Vector3(300, aeroplane.position.y, 0)
                }
            }, 1)
        }else if (aeroplane.position.x == 212 && aeroplane.position.z == 212) {
            let back = 0
            setTimeout(() => {
                back = setInterval(() => {
                    temp_pos = new BABYLON.Vector3(aeroplane.position.x, aeroplane.position.y, aeroplane.position.z)
                    setTimeout(()=>{
                        createBackSphere(scene, temp_pos, radar)
                    },1500)
                }, 300)
            }, 1000)
            let move = setInterval(() => {
                aeroplane.position.x -= 0.35
                aeroplane.position.z -= 0.35
                if (aeroplane.position.z <= -424) {
                    clearInterval(move)
                    clearInterval(back)
                    clearInterval(wave)
                    aeroplane.position = new BABYLON.Vector3(212, aeroplane.position.y, 212)
                }
            }, 1)
        }

   /* if(aeroplane.position.z==0&&aeroplane.position.x<600){
        let back=0
        setTimeout(()=>{
                back=setInterval(()=>{
                temp_pos=new BABYLON.Vector3(aeroplane.position.x,aeroplane.position.y,aeroplane.position.z)
                setTimeout(()=>{
                    createBackSphere(scene, temp_pos, radar)
                },1500)
            },200)
        },500)
        let move=setInterval(()=>{
            aeroplane.position.x+=0.5
            if(aeroplane.position.x>=600){
                clearInterval(move)
                clearInterval(back)
                clearInterval(wave)
                aeroplane.position = new BABYLON.Vector3(-300, aeroplane.position.y, 0)//飞机复位
            }
        },1)
    }else if(aeroplane.position.x==0&&aeroplane.position.z>-600){
        let back=0
        setTimeout(()=>{
                back=setInterval(()=>{
                temp_pos=new BABYLON.Vector3(aeroplane.position.x,aeroplane.position.y,aeroplane.position.z)
                setTimeout(()=>{
                    createBackSphere(scene, temp_pos, radar)
                },1500)
            },200)
        },500)
        let move=setInterval(()=>{
            aeroplane.position.z-=0.5
            if(aeroplane.position.z<=-600){
                clearInterval(move)
                clearInterval(back)
                clearInterval(wave)
                aeroplane.position = new BABYLON.Vector3(0, aeroplane.position.y, 300)//飞机复位
            }
        },1)
    }*/
    // let temp_pos
    // const radar=getMeshByState("radar").position
    // if(aeroplane.position.z==0&&aeroplane.position.x<600){
    //     let back=0
    //     setTimeout(()=>{
    //             back=setInterval(()=>{
    //             temp_pos=new BABYLON.Vector3(aeroplane.position.x,aeroplane.position.y,aeroplane.position.z)
    //             createBackSphere(scene,temp_pos,radar)
    //         },100)
    //     },200)
    //     let move=setInterval(()=>{
    //         aeroplane.position.x+=1
    //         if(aeroplane.position.x>=600){
    //             clearInterval(move)
    //             clearInterval(back)
    //         }
    //     },5)
    // }else if(aeroplane.position.x==0&&aeroplane.position.z>-600){
    //     let move=setInterval(()=>{
    //         aeroplane.position.z-=1
    //         temp_pos=new BABYLON.Vector3(aeroplane.position.x,aeroplane.position.y,aeroplane.position.z)
    //         createBackSphere(scene,temp_pos,radar)
    //         if(aeroplane.position.z<=-600){
    //             clearInterval(move)
    //         }
    //     },5)
    // }
}