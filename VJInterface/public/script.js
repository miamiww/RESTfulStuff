//GLOBAL VARIABLES
let mode;
let fgColor = {
  hue: 0,
  sat: 0,
  lig: 0
};
let bgColor = {
  hue: 0,
  sat: 0,
  lig: 0
};
let shapes = {
  square: false,
  circle: false,
  triangle: false,
  squiggle: false,
  arc: false,
}

//GET DOM ELEMENTS
window.addEventListener('load', function() {
  //get gif dom elements
  gifMode = document.getElementById("gifMode");
  getGifWord = document.getElementById("getGifWord");
  //get abstract visual dom elements
  avMode = document.getElementById("avMode");
  //foreground colors
  fgHue = document.getElementById("fgHue");
  fgSat = document.getElementById("fgSat");
  fgLig = document.getElementById('fgLig');
  //background colors
  bgHue = document.getElementById("bgHue");
  bgSat = document.getElementById("bgSat");
  bgLig = document.getElementById("bgLig");
  //shapes
  square = document.getElementById("square");
  circle = document.getElementById("circle");
  triangle = document.getElementById("triangle");
  squiggle = document.getElementById("squiggle");
  arc = document.getElementById("arc");




  gifMode.addEventListener('click', function() {
    //can't have both gif and abstract mode on at the same time
    if (gifMode.checked && avMode.checked) {
      gifMode.checked = true;
      avMode.checked = false;
    }
    if (gifMode.checked) {
      mode = 1;
    } else {
      mode = 0;
    }
    console.log("POST", mode);
  });

  avMode.addEventListener('click', function() {
    if (gifMode.checked && avMode.checked) {
      gifMode.checked = false;
      avMode.checked = true;
    }
    if (avMode.checked) {
      mode = 2;
    } else {
      mode = 0;
    }
    console.log("POST", mode);
  });

  getGifWord.addEventListener('keyup', function(e) {
    e.preventDefault();
    if (e.keyCode === 13 && this.value != "") {
      console.log("POST", this.value);
    }
  });

  function postSlider(elemName, key, obj) {
    elemName.addEventListener('mouseup', function() {
      obj[key] = this.value;
      console.log("POST", obj);
    });
  }

  postSlider(fgHue, "hue", fgColor);
  postSlider(fgSat, "sat", fgColor);
  postSlider(fgLig, "lig", fgColor);

  postSlider(bgHue, "hue", bgColor);
  postSlider(bgSat, "sat", bgColor);
  postSlider(bgLig, "lig", bgColor);


  function postShape(shapeName, key, obj) {
    shapeName.addEventListener("click", function() {
      obj[key] = this.checked;
      console.log("POST", obj);
    });
  }

  postShape(square, "square", shapes);
  postShape(circle, "circle", shapes);
  postShape(triangle, "triangle", shapes);
  postShape(squiggle, "squiggle", shapes);
  postShape(arc, "arc", shapes);


});
