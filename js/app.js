'use strict';

function getRandomNum() {
  return Math.floor(Math.random() * BusMall.allObject.length);
}

let leftImg = document.getElementById('leftImg');

let centerImg = document.getElementById('centerImg');

let rightImg = document.getElementById('rightImg');


let buttonResults = document.getElementById('buttonResults');

leftImg.addEventListener('click', onClicking);
centerImg.addEventListener('click', onClicking);
rightImg.addEventListener('click', onClicking);

buttonResults.addEventListener('click', resultsImg);

let counts = 0;
let maxAttempts = 25;

let leftIndex;
let centerIndex;
let rightIndex;


function BusMall(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.show = 0;
  BusMall.allObject.push(this);
}

BusMall.allObject = [];

new BusMall('bag', '../img/bag.jpg');
new BusMall('banana', '../img/banana.jpg');
new BusMall('bathroom', '../img/bathroom.jpg');
new BusMall('boots', '../img/boots.jpg');
new BusMall('breakfast', '../img/breakfast.jpg');
new BusMall('bubblegum', '../img/bubblegum.jpg');
new BusMall('chair', '../img/chair.jpg');
new BusMall('cthulhu', '../img/cthulhu.jpg');
new BusMall('dog-duck', '../img/dog-duck.jpg');
new BusMall('dragon', '../img/dragon.jpg');
new BusMall('pen', '../img/pen.jpg');
new BusMall('pet-sweep', '../img/pet-sweep.jpg');
new BusMall('scissors', '../img/scissors.jpg');
new BusMall('shark', '../img/shark.jpg');
new BusMall('sweep', '../img/sweep.png');
new BusMall('tauntaun', '../img/tauntaun.jpg');
new BusMall('unicorn', '../img/unicorn.jpg');
new BusMall('usb', '../img/usb.gif');
new BusMall('water-can', '../img/water-can.jpg');
new BusMall('wine-glass', '../img/wine-glass.jpg');

// console.log(BusMall.allObject);

renderImages();

function renderImages() {

  leftIndex = getRandomNum();
  centerIndex = getRandomNum();
  rightIndex = getRandomNum();


  while (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex) {
    if (leftIndex === centerIndex) {
      centerIndex = getRandomNum();
    } else if (leftIndex === rightIndex) {
      rightIndex = getRandomNum();
    } else if (centerIndex === rightIndex) {
      rightIndex = getRandomNum();
    }
  }

  BusMall.allObject[leftIndex].show++;
  BusMall.allObject[centerIndex].show++;
  BusMall.allObject[rightIndex].show++;

  leftImg.src = BusMall.allObject[leftIndex].source;

  centerImg.src = BusMall.allObject[centerIndex].source;

  rightImg.src = BusMall.allObject[rightIndex].source;

}


function onClicking(event) {
  counts++;

  if (maxAttempts >= counts) {

    if (event.target.id === 'leftImg') {
      BusMall.allObject[leftIndex].votes++;
    } else if (event.target.id === 'centerImg') {
      BusMall.allObject[centerIndex].votes++;
    } else if (event.target.id === 'rightImg'){
      BusMall.allObject[rightIndex].votes++;
    }

    renderImages();

  } else {

    leftImg.removeEventListener('click', onClicking);
    centerImg.removeEventListener('click', onClicking);
    rightImg.removeEventListener('click', onClicking);

  }
}


function resultsImg( ) {
  let ulResults = document.getElementById('ulResults');

  ulResults.innerHTML = '';

  for(let i = 0 ; i < BusMall.allObject.length;i++){
    let li = document.createElement('li');
    ulResults.appendChild(li);
    li.textContent = `${BusMall.allObject[i].name} had ${BusMall.allObject[i].votes} votes, and was seen ${BusMall.allObject[i].show} times.`;
  }
}
