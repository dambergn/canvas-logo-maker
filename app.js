'use strict';
console.log('script loaded sucessfully');

const workArea = document.getElementById('work-area');
let storedLayers = [];
let activeLayer = '';

function CreateCanvas(name, height, width) {
  this.name = name;
  this.height = height;
  this.width = width;
  this.lines = [];

  let newCanvas = document.createElement('canvas')
  newCanvas.setAttribute('id', this.name);
  newCanvas.setAttribute('class', 'canvas');
  newCanvas.setAttribute('height', this.height);
  newCanvas.setAttribute('width', this.width);
  newCanvas.setAttribute('style', `z-index: ${storedLayers.length};`)
  workArea.appendChild(newCanvas);
  activeLayer = this.name;
  storedLayers.push(this);
};

function renderActiveLayer(){
  for(let i = 0; i < storedLayers.length; i++){
    if (storedLayers[i].name === activeLayer){
      let thisCanvas = document.getElementById(storedLayers[i].name).getContext('2d');
      thisCanvas.beginPath();
      if (storedLayers[i].lines.length === 1){
        // console.log(storedLayers[i].lines[0].lineX, storedLayers[i].lines[0].lineY)
        thisCanvas.moveTo(storedLayers[i].lines[0].lineX, storedLayers[i].lines[0].lineY);
      } else {
        for(let j = 0; j < storedLayers[i].lines.length; j++){
          // console.log(storedLayers[i].lines[j].lineX, storedLayers[i].lines[j].lineY)
          thisCanvas.lineTo(storedLayers[i].lines[j].lineX, storedLayers[i].lines[j].lineY)
        };
      };
      thisCanvas.stroke();
      break;
    };
  };
};

function addNewDrawpoint(x, y){
  let line = {
    lineX: x,
    lineY: y
  };
  for(let i = 0; i < storedLayers.length; i++){
    if (storedLayers[i].name === activeLayer){
      storedLayers[i].lines.push(line);
      break;
    };
  };
  renderActiveLayer();
};

document.onmousedown = function (e) {
  mousePosition(e);
  renderActiveLayer();
};

function mousePosition(e){
  var rect = workArea.getBoundingClientRect();
  let x = Math.round(event.clientX - rect.left);
  let y = Math.round(event.clientY - rect.top);
  // console.log(rect.top, rect.right, rect.bottom, rect.left);
  console.log('X:', x, 'Y:', y);
  addNewDrawpoint(x, y);
};

window.onload = function () {
  console.log('page loaded');
  new CreateCanvas('can-1', 400, 400);
  // new CreateCanvas('can-2', 400, 400);
};
