function addCloseButton(screen) {
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI"
  );

  var button = BABYLON.GUI.Button.CreateSimpleButton("close", "close");
  button.alpha = 0.5;
  button.width = "74px";
  button.height = "50px";
  button.color = "white";
  button.background = "gray";

  button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

  advancedTexture.addControl(button);

  button.onPointerClickObservable.add(function () {
    screen.dispose();
    advancedTexture.dispose();
    video = "";
  });
}

function addBackButton(title) {
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI"
  );

  var button = BABYLON.GUI.Button.CreateImageOnlyButton(
    "but",
    "textures/backspace.png"
  );
  button.alpha = 0.8;
  button.width = "74px";
  button.height = "50px";
  button.color = "#1D2020";
  button.background = "white";
  button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

  advancedTexture.addControl(button);

  button.onPointerClickObservable.add(function () {
    scene.dispose();
    scene = simpleScene();
  });
}

function Button(
  text,
  onButtonClick = () => { },
  onButtonHover = () => { },
  height = "100px",
  width = 1,
  color = "white",
  background = "#222",
  fontSize = 50
) {
  let button = BABYLON.GUI.Button.CreateSimpleButton(text, text);
  button.width = width;
  button.height = height;
  button.color = color;
  button.fontSize = fontSize;
  button.background = background;


  button.onPointerClickObservable.add(onButtonClick);
  button.onPointerMoveObservable.add(onButtonHover);
  return button;
}

function Button_s(
  flag,
  text,
  onButtonClick = () => {
    console.log("click");
  },
  onButtonHover = () => {
    console.log("hover");
  },
  height = "100px",
  width = 1,
  color = "white",
  background = "#222",
  fontSize = 50
) {
  let button = BABYLON.GUI.Button.CreateSimpleButton(text, text);
  button.width = "200px";
  button.height = "40px";
  button.color = color;
  button.fontSize = 20;
  button.background = background;

  button.onPointerClickObservable.add(onButtonClick);
  button.onPointerMoveObservable.add(onButtonHover);
  return button;
}

function TextBlock(text, fontSize = 25, height = "60px") {
  var textblock = new BABYLON.GUI.TextBlock();
  textblock.height = height;
  textblock.fontSize = fontSize;
  textblock.text = text;
  textblock.color = "black";
  textblock.alpha = 0.7;
  return textblock;
}

function RatioButton(size = "24px") {
  let button = new BABYLON.GUI.RadioButton();
  button.width = size;
  button.height = size;
  button.color = "white";
  button.background = "#1D2020";  // li标签小圆点颜色
  return button;
}

function Ratio(
  text,
  height = "150px",
  width = "400px",
  fontsize = 24,
  size = "24px",
  callback = value => {
    console.log(value);
  }
) {
  let button = RatioButton(size);
  button.onIsCheckedChangedObservable.add(state => {
    if (state) {
      callback(text);
    }
  });
  let header = BABYLON.GUI.Control.AddHeader(button, text, width, {
    isHorizontal: true,
    controlFirst: true
  });
  header.height = height;
  header.color = "black";
  header.alpha = 0.7;
  header.children[1].fontSize = fontsize;
  header.children[1].onPointerMoveObservable.add(() => {
    header.children[1].fontSize = 30;
    header.children[1].color = "#2c6ef7";
  });
  header.children[1].onPointerOutObservable.add(() => {
    header.children[1].fontSize = fontsize;
    header.children[1].color = "";
  });
  header.children[1].fontSize = fontsize;
  header.children[1].onPointerDownObservable.add(() => {
    button.isChecked = !button.isChecked;
  });
  return header;
}

function Ratio_s(
  text,
  height = "150px",
  width = "400px",
  fontsize = 40,
  size = "40px",
  callback = value => {
    console.log(value);
  }
) {
  let button = RatioButton(size);
  button.onIsCheckedChangedObservable.add(state => {
    if (state) {
      callback(text);
    }
  });
  let header = BABYLON.GUI.Control.AddHeader(button, text, width, {
    isHorizontal: true,
    controlFirst: true
  });
  header.height = height;
  header.color = "black";
  header.alpha = 0.7;
  header.children[1].fontSize = 20;
  header.children[1].onPointerMoveObservable.add(() => {
    header.children[1].fontSize = 24;
  });
  header.children[1].onPointerOutObservable.add(() => {
    header.children[1].fontSize = 20;
  });
  header.children[1].fontSize = fontsize;
  header.children[1].onPointerDownObservable.add(() => {
    button.isChecked = !button.isChecked;
  });
  return header;
}

// button在上方
function upFormitem(
  columns,
  title,
  onRatioClick = value => { },
  onButtonClick = () => { }
) {
  let panel = new BABYLON.GUI.StackPanel();
  panel.top = "60px";
  panel.left = "10px"

  // 以left/top相对于窗口来定位
  panel.horizontalAlignment = transformHorizontal("left");
  panel.verticalAlignment = transformVertical("top");

  panel.background = "white";
  panel.alpha = 0.8;
  panel.width = "300px";
  panel.height = "540px";

  // title
  panel.addControl(
    Button(
      title,
      (onButtonClick = onButtonClick), onButtonHover = () => { },
      height = "90px",
      width = "300px",
      color = "white",
      background = "#222", // 灰
      fontSize = 26
    )
  );

  // 选项
  columns.forEach(element => {
    panel.addControl(
      Ratio(
        element,
        (height = "90px"),
        (width = "250px"),
        (fontsize = 24),
        (size = "20px"),
        onRatioClick
      )
    );
  });
  return panel;
}

// button在下方
function downFormitem(
  columns,
  title,
  subtitle,
  onRatioClick = value => {
    console.log(value);
  },
  onButtonClick = value => {
    console.log("click");
  }
) {
  let panel = new BABYLON.GUI.StackPanel();
  panel.top = "180px";
  panel.left = "500px";
  panel.background = "white";
  panel.alpha = 0.7;
  panel.width = "400px";
  panel.height = "220px";

  let textblock = TextBlock(subtitle, 30);
  panel.addControl(textblock);
  panel = addSlider(panel, value => {
    onRatioClick(value);
  });
  let paramsRange = TextBlock("443MHz      ~       2.4GMHz", 20, "50px");

  panel.addControl(paramsRange);

  panel.addControl(Button(title, (onButtonClick = onButtonClick), null, "55px", "500px", "white", "#222", "20px", 5));
  return panel;
}

function downFormitem_s(
  flag,
  columns,
  title,
  subtitle,
  left,
  top,
  width = "150px",
  height = "140px",
  horizontal,
  vertical,
  onRatioClick = value => {
    console.log(value);
  },
  onButtonClick = value => {
    console.log("click");
  }
) {
  let panel = new BABYLON.GUI.StackPanel();
  panel.top = top;
  panel.left = left;
  panel.background = "white";
  panel.alpha = 0.8;
  panel.width = width;
  panel.height = height;
  panel.horizontalAlignment = transformHorizontal(horizontal);
  panel.verticalAlignment = transformVertical(vertical);

  let textblock = TextBlock(subtitle, 26, "40px");
  panel.addControl(textblock);
  panel = addSlider(panel, value => {
    onRatioClick(value);
  });
  let paramsRange = TextBlock("443MHz    ~     2.4GMHz", 18, "35px");
  panel.addControl(paramsRange);
  //panel.addControl(Button(title, (onButtonClick = onButtonClick),null,"55px","500px","white","orange","20px",5));
  //


  //let textblock = TextBlock(subtitle, 20, "30px");
  //panel.addControl(textblock);

  /*columns.forEach(element => {
    panel.addControl(
      Ratio_s(
        element,
        (height = "35px"),
        "100px",
        (fontsize = 15),
        (size = "15px"),
        value => {
          onRatioClick(value);
          textblock.text = `已选择：${value}`;
        }
      )
    );
  });*/

  panel.addControl(Button_s(flag, title, (onButtonClick = onButtonClick)));
  return panel;
}

// 没有button
function pureFormitem(
  columns,
  subtitle,
  left,
  top,
  horizontal,
  vertical,
  onRatioClick = value => {
    console.log(value);
  },
  onButtonClick = () => {
    console.log("click");
  }
) {
  let panel = new BABYLON.GUI.StackPanel();
  panel.width = "200px";
  panel.height = "200px";
  panel.horizontalAlignment = transformHorizontal(horizontal);
  panel.verticalAlignment = transformVertical(vertical);
  panel.background = "white";
  panel.alpha = 0.8;
  panel.top = top;
  panel.left = left;

  let textblock = TextBlock(subtitle, 25, "40px");
  panel.addControl(textblock);

  columns.forEach(element => {
    panel.addControl(
      Ratio_s(
        element,
        (height = "75px"),
        "100px",
        (fontsize = 20),
        (size = "20px"),
        value => {
          onRatioClick(value);
          textblock.text = `已选择：${value}`;
        }
      )
    );
  });
  return panel;
}

//角落里的pureformitem，极小
function miniFormitem(
  columns,
  subtitle,
  width = "145px",
  height = "145px",
  left,
  top,
  horizontal,
  vertical,
  onRatioClick = value => {
    console.log(value);
  },
  onButtonClick = () => {
    console.log("click");
  }
) {
  let panel = new BABYLON.GUI.StackPanel();
  panel.width = width;
  panel.height = height;
  panel.horizontalAlignment = transformHorizontal(horizontal);
  panel.verticalAlignment = transformVertical(vertical);
  panel.background = "white";
  panel.alpha = 0.8;
  panel.top = top;
  panel.left = left;

  let textblock = TextBlock(subtitle, 22, "50px");
  panel.addControl(textblock);

  columns.forEach(element => {
    panel.addControl(
      Ratio_s(
        element,
        (height = "40px"),
        "100px",
        (fontsize = 18),
        (size = "25px"),
        value => {
          onRatioClick(value);
          textblock.text = `已选择：${value}`;
        }
      )
    );
  });
  return panel;
}

function addVideo(exp, aeroplane, radar, view) {
  let url = getVideoUrl(exp, aeroplane, radar, view);
  let type = "side";
  var screen = BABYLON.MeshBuilder.CreatePlane(
    "screen",
    {
      height: 90 / 3,
      width: 160 / 3
    },
    scene
  );
  screen.billboardMode = 7;
  screen.scaling = new BABYLON.Vector3(1, 1, 1);
  // screen.scaling = new BABYLON.Vector3(2, 2, 2)
  if (type == "front") {
    screen.position.y = 80;
    screen.position.x = 0;
    screen.position.z = -300;
  } else if (type == "side") {
    screen.position.y = 80;
    screen.position.x = 300;
    // screen.position.z = 0
    screen.position.z = 40;
  }
  var mat = new BABYLON.StandardMaterial("mat", scene);

  var videoTexture = new BABYLON.VideoTexture(
    "video",
    [url],
    scene,
    true,
    false
  );
  videoTexture.invertZ = false;

  mat.diffuseTexture = videoTexture;
  screen.material = mat;
  videoTexture.video.play();

  addCloseButton(screen);

  return screen;
}

function addPicture(exp, aeroplane, radar, view, x = 300, y = 80, z = 20) {
  let url = getPictureUrl(exp, aeroplane, radar, view);
  let type = "side";
  let scaling = 2.25;
  var screen = BABYLON.MeshBuilder.CreatePlane(
    "screen",
    {
      height: 90 / scaling,
      width: 160 / scaling
    },
    scene
  );
  screen.billboardMode = 7;
  screen.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
  if (type == "front") {
    screen.position.y = 80;
    screen.position.x = 50;
    screen.position.z = -300;
  } else if (type == "side") {
    screen.position.y = y;
    screen.position.x = x;
    screen.position.z = z;
  }
  var mat = new BABYLON.StandardMaterial("mat", scene);
  mat.diffuseTexture = new BABYLON.Texture(url, scene);
  screen.material = mat;
  addCloseButton(screen);
  return screen;
}

function addSlider(panel, callback = value => { }) {
  var header = new BABYLON.GUI.TextBlock();
  header.height = "30px";
  header.color = "black";
  header.text = "已选择: " + "443MHz";
  header.fontSize = 18;
  header.alpha = 0.7;
  panel.addControl(header);

  var slider = new BABYLON.GUI.Slider();
  slider.minimum = 0;
  slider.maximum = 100;
  slider.value = 0;
  slider.height = "30px";
  slider.width = "250px";
  slider.paddingTop = "5px";
  slider.color = "#222";
  slider.background = "white"
  //slider.left = "120px";

  slider.onValueChangedObservable.add(function (value) {
    let SliderValue = 0;
    let radarValue = "443MHz";
    SliderValue = (Math.round(value)) | 0;

    if (SliderValue >= 0 && SliderValue < 20) {
      radarValue = "接近443MHz"
    }
    else if (SliderValue >= 20 && SliderValue < 40) {
      radarValue = "接近600MHz"
    }
    else if (SliderValue >= 40 && SliderValue < 60) {
      radarValue = "接近900MHz"
    }
    else if (SliderValue >= 60 && SliderValue < 80) {
      radarValue = "接近1.2GHz"
    }
    else if (SliderValue >= 80 && SliderValue <= 100) {
      radarValue = "接近2.4GHz"
    }
    header.text = "已选择: " + radarValue;
    callback(SliderValue)

  });
  panel.addControl(slider);

  return panel;
}
function addAngleSlider(elements, subtitle, left, top, horizontal, vertical, callback = (index) => { console.log(index) }, onButtonClick = () => { }) {

  let panel = new BABYLON.GUI.StackPanel();
  panel.width = "300px";
  panel.height = "175px";
  panel.horizontalAlignment = transformHorizontal(horizontal);
  panel.verticalAlignment = transformVertical(vertical);
  panel.background = "white";
  panel.alpha = 0.8;
  panel.top = top;
  panel.left = left;

  let textblock = TextBlock(subtitle, 26, "40px");
  panel.addControl(textblock);


  var header = new BABYLON.GUI.TextBlock();
  header.height = "30px";
  header.color = "black";
  header.text = "已选择: " + "0°视角";
  header.fontSize = 18;
  header.alpha = 0.7;
  panel.addControl(header);

  var slider = new BABYLON.GUI.Slider();
  slider.minimum = 0;
  slider.maximum = 80;
  slider.value = 0;
  slider.height = "30px";
  slider.width = "250px";
  slider.paddingTop = "5px";
  slider.color = "#222";
  slider.background = "white"
  //slider.left = "120px";

  slider.onValueChangedObservable.add(function (value) {
    let SliderValue = 0;
    let index;
    SliderValue = (Math.round(value)) | 0;
    if (SliderValue >= 0 && SliderValue < 10) {
      index = 0;
    } else if (SliderValue >= 10 && SliderValue < 20) {
      index = 1;
    } else if (SliderValue >= 20 && SliderValue < 30) {
      index = 2;
    } else if (SliderValue >= 30 && SliderValue < 40) {
      index = 3;
    } else if (SliderValue >= 40 && SliderValue < 50) {
      index = 4;
    } else if (SliderValue >= 50 && SliderValue < 60) {
      index = 5;
    } else if (SliderValue >= 60 && SliderValue < 70) {
      index = 6;
    } else if (SliderValue >= 70 && SliderValue <= 80) {
      index = 7;
    }
    header.text = "已选择: " + elements[index];
    callback(index);
  });

  panel.addControl(slider);
  let paramsRange = TextBlock("0角度    ~     315角度", 20, "45px");
  panel.addControl(paramsRange);
  return panel;
}
function addAngleSlider_2(elements, subtitle, left, top, horizontal, vertical, callback = (index) => { console.log(index) }, onButtonClick = () => { }) {

  let panel = new BABYLON.GUI.StackPanel();
  panel.width = "300px";
  panel.height = "175px";
  panel.horizontalAlignment = transformHorizontal(horizontal);
  panel.verticalAlignment = transformVertical(vertical);
  panel.background = "white";
  panel.alpha = 0.8;
  panel.top = top;
  panel.left = left;

  let textblock = TextBlock(subtitle, 26, "40px");
  panel.addControl(textblock);


  var header = new BABYLON.GUI.TextBlock();
  header.height = "30px";
  header.color = "black";
  header.text = "已选择: " + "0°视角";
  header.fontSize = 18;
  header.alpha = 0.7;
  panel.addControl(header);

  var slider = new BABYLON.GUI.Slider();
  slider.minimum = 0;
  slider.maximum = 50;
  slider.value = 0;
  slider.height = "30px";
  slider.width = "250px";
  slider.paddingTop = "5px";
  slider.color = "#222";
  slider.background = "white"
  //slider.left = "120px";

  slider.onValueChangedObservable.add(function (value) {
    let SliderValue = 0;
    let index;
    SliderValue = (Math.round(value)) | 0;
    if (SliderValue >= 0 && SliderValue < 10) {
      index = 0;
    } else if (SliderValue >= 10 && SliderValue < 20) {
      index = 1;
    } else if (SliderValue >= 20 && SliderValue < 30) {
      index = 2;
    } else if (SliderValue >= 30 && SliderValue < 40) {
      index = 3;
    } else if (SliderValue >= 40 && SliderValue <= 50) {
      index = 4;
    }
    header.text = "已选择: " + elements[index];
    callback(index);
  });

  panel.addControl(slider);
  let paramsRange = TextBlock("0角度    ~     180角度", 20, "45px");
  panel.addControl(paramsRange);
  return panel;

}
