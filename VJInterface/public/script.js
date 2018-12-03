const URL="http://10.17.238.73:7000";

//GLOBAL VARIABLES
let modeState ={
  value: "0"
};
let keyWord={
  gifword: ""
}
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
};



//GET DOM ELEMENTS
window.addEventListener('load', function() {
  //get gif dom elements
  let gifMode = document.getElementById("gifMode");
  let getGifWord = document.getElementById("getGifWord");
  //get abstract visual dom elements
  let avMode = document.getElementById("avMode");
  //foreground colors
  let fgHue = document.getElementById("fgHue");
  let fgSat = document.getElementById("fgSat");
  let fgLig = document.getElementById('fgLig');
  //background colors
  let bgHue = document.getElementById("bgHue");
  let bgSat = document.getElementById("bgSat");
  let bgLig = document.getElementById("bgLig");
  //shapes
  let square = document.getElementById("square");
  let circle = document.getElementById("circle");
  let triangle = document.getElementById("triangle");
  let squiggle = document.getElementById("squiggle");
  let arc = document.getElementById("arc");


  //set gif mode
  gifMode.addEventListener('click', function() {
    //can't have both modes on at the same time
    if (gifMode.checked && avMode.checked) {
      gifMode.checked = true;
      avMode.checked = false;
    }
    if (gifMode.checked) {
      //gif mode on
      modeState.value = "1";
    } else {
      //both modes off
      modeState.value = "0";
    }
    let value = modeState.value;
    console.log("POST", modeState);
    axios({
      method: 'post',
      url: URL + "/mode",
      data:{
        value 
      }
    })
  });

  //set abstract visual mode
  avMode.addEventListener('click', function() {
    //can't have both modes on at the same time
    if (gifMode.checked && avMode.checked) {
      gifMode.checked = false;
      avMode.checked = true;
    }
    if (avMode.checked) {
      //visual mode on
      modeState.value = "2";
    } else {
      //both modes off
      modeState.value = "0";
    };
    // console.log("POST", modeState);
    let value = modeState.value;
 
    axios({
      method: 'post',
      url: URL+"/mode",
      data:{
        value
      }
    })
  });

  //get the gif keyword
  getGifWord.addEventListener('keyup', function(e) {
    e.preventDefault();
    //post when user hits enter
    //field cannot be empty
    if (e.keyCode === 13 && this.value != "") {
      console.log("POST", this.value);
      let gifword = this.value;
      axios({
        method: 'post',
        url: URL+"/gifword",
        data:{
          gifword
        }
      });
    }
  });

  //for all slider inputs
  //post updated color objects
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

  //for all checkboxes
  //post updated shape object
  function postCheckbox(shapeName, key, obj) {
    shapeName.addEventListener("click", function() {
      obj[key] = this.checked;
      console.log("POST", obj);
    });
  }

  postCheckbox(square, "square", shapes);
  postCheckbox(circle, "circle", shapes);
  postCheckbox(triangle, "triangle", shapes);
  postCheckbox(squiggle, "squiggle", shapes);
  postCheckbox(arc, "arc", shapes);

});
