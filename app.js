'use strict';
console.log('script loaded sucessfully');

const workArea = document.getElementById('work-area');
let currentWidth = 0;
let currentHeight = 0;
let storedLayers = [];
let activeLayer = '';
let currentLineColor = '#000000';
let infill = false;

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
  currentWidth = this.width;
  currentHeight = this.height;
  storedLayers.push(this);
};

function renderActiveLayer() {
  for (let i = 0; i < storedLayers.length; i++) {
    if (storedLayers[i].name === activeLayer) {
      let thisCanvas = document.getElementById(storedLayers[i].name).getContext('2d');
      thisCanvas.clearRect(0, 0, currentWidth, currentHeight);
      thisCanvas.beginPath();
      if (storedLayers[i].lines.length === 1) {
        // console.log(storedLayers[i].lines[0].lineX, storedLayers[i].lines[0].lineY)
        thisCanvas.moveTo(storedLayers[i].lines[0].lineX, storedLayers[i].lines[0].lineY);
      } else {
        for (let j = 0; j < storedLayers[i].lines.length; j++) {
          // console.log(storedLayers[i].lines[j].lineX, storedLayers[i].lines[j].lineY)
          thisCanvas.lineTo(storedLayers[i].lines[j].lineX, storedLayers[i].lines[j].lineY);
          thisCanvas.strokeStyle = storedLayers[i].lines[j].color;
          if(infill === true){
            thisCanvas.fillStyle = storedLayers[i].lines[j].color;
            thisCanvas.fill();
          };
        };
      };
      thisCanvas.stroke();
      break;
    };
  };
};

function addNewDrawpoint(x, y) {
  let line = {
    lineX: x,
    lineY: y,
    color: currentLineColor
  };
  for (let i = 0; i < storedLayers.length; i++) {
    if (storedLayers[i].name === activeLayer) {
      storedLayers[i].lines.push(line);
      break;
    };
  };
  renderActiveLayer();
};

document.onmousedown = function (e) {
  if (e.which === 1) {// Left Mouse button
    mousePosition(e);
    renderActiveLayer();
  };
  if (e.which === 2) {// Middle Mouse button
    console.log('Middle Mouse button')
  };
  if (e.which === 3) {// Right Mouse button
    console.log('Right mouse button')
  };
  if (e.which === 4) {// Mouse button 4
    console.log('Mouse button 4')
  };
  if (e.which === 5) {// Mouse button 5
    console.log('Mouse button 5')
  };
};

function mousePosition(e) {
  var rect = workArea.getBoundingClientRect();
  let x = Math.round(event.clientX - rect.left);
  let y = Math.round(event.clientY - rect.top);
  // console.log(rect.top, rect.right, rect.bottom, rect.left);
  console.log('X:', x, 'Y:', y);
  if(x > 0 && y > 0 && x < currentWidth && y < currentHeight){
    addNewDrawpoint(x, y);
  }
  
};

window.onload = function () {
  console.log('page loaded');
  new CreateCanvas('can-1', 400, 400);
  // new CreateCanvas('can-2', 400, 400);
};

let infillUse = document.getElementById('infill');
infillUse.onclick = function(){
  if(infill === false){
    infill = true;
    infillUse.innerHTML = 'No fill';
  } else {
    infill = false;
    infillUse.innerHTML = 'In fill';
  };
  renderActiveLayer();
};