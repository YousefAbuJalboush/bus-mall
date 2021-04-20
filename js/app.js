/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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

// let leftIndex;
// let centerIndex;
// let rightIndex;

let firstShowIndex = [];

let arrayOfIndex = [];

let busMallName = [];
let busMallVotes = [];
let busMallShow = [];

function BusMall(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.show = 0;
  BusMall.allObject.push(this);
  busMallName.push(this.name);
}

BusMall.allObject = [];

new BusMall('bag', 'img/bag.jpg');
new BusMall('banana', 'img/banana.jpg');
new BusMall('bathroom', 'img/bathroom.jpg');
new BusMall('boots', 'img/boots.jpg');
new BusMall('breakfast', 'img/breakfast.jpg');
new BusMall('bubblegum', 'img/bubblegum.jpg');
new BusMall('chair', 'img/chair.jpg');
new BusMall('cthulhu', 'img/cthulhu.jpg');
new BusMall('dog-duck', 'img/dog-duck.jpg');
new BusMall('dragon', 'img/dragon.jpg');
new BusMall('pen', 'img/pen.jpg');
new BusMall('pet-sweep', 'img/pet-sweep.jpg');
new BusMall('scissors', 'img/scissors.jpg');
new BusMall('shark', 'img/shark.jpg');
new BusMall('sweep', 'img/sweep.png');
new BusMall('tauntaun', 'img/tauntaun.jpg');
new BusMall('unicorn', 'img/unicorn.jpg');
new BusMall('usb', 'img/usb.gif');
new BusMall('water-can', 'img/water-can.jpg');
new BusMall('wine-glass', 'img/wine-glass.jpg');

// console.log(BusMall.allObject);

renderImages();
gettingLocalStorage();

function saveLocalStorage(){

  let saveStrigify = JSON.stringify(BusMall.allObject);

  localStorage.setItem('BusMallObjects', saveStrigify);

}

function gettingLocalStorage(){
  let info = localStorage.getItem('BusMallObjects');

  let busMallInfo = JSON.parse(info);

  if(busMallInfo !== null){
    BusMall.allObject = busMallInfo;
  }

}

function renderImages() {

  firstShowIndex[0] = getRandomNum();
  firstShowIndex[1] = getRandomNum();
  firstShowIndex[2] = getRandomNum();

  // leftIndex = getRandomNum();
  // centerIndex = getRandomNum();
  // rightIndex = getRandomNum();

  // firstShowIndex = [];

  while ( firstShowIndex.some( check => arrayOfIndex.includes(check) ) || firstShowIndex[0] === firstShowIndex[1] || firstShowIndex[0] === firstShowIndex[2] || firstShowIndex[1] === firstShowIndex[2]) {
    if (firstShowIndex[0] === firstShowIndex[1]) {
      firstShowIndex[1] = getRandomNum();
    } else if (firstShowIndex[0] === firstShowIndex[2]) {
      firstShowIndex[2] = getRandomNum();
    } else if (firstShowIndex[1] === firstShowIndex[2]) {
      firstShowIndex[2] = getRandomNum();
    } else if ( arrayOfIndex.includes(firstShowIndex[0]) ) {
      firstShowIndex[0] = getRandomNum();
    }
    else if ( arrayOfIndex.includes(firstShowIndex[1]) ) {
      firstShowIndex[1] = getRandomNum();
    }
    else if ( arrayOfIndex.includes(firstShowIndex[2]) ) {
      firstShowIndex[2] = getRandomNum();
    }
  }

  arrayOfIndex = [firstShowIndex[0] , firstShowIndex[1] , firstShowIndex[2]];

  BusMall.allObject[firstShowIndex[0]].show++;
  BusMall.allObject[firstShowIndex[1]].show++;
  BusMall.allObject[firstShowIndex[2]].show++;

  leftImg.src = BusMall.allObject[firstShowIndex[0]].source;

  centerImg.src = BusMall.allObject[firstShowIndex[1]].source;

  rightImg.src = BusMall.allObject[firstShowIndex[2]].source;

}


function onClicking(event) {
  counts++;

  if (maxAttempts >= counts) {

    if (event.target.id === 'leftImg') {
      BusMall.allObject[firstShowIndex[0]].votes++;
    } else if (event.target.id === 'centerImg') {
      BusMall.allObject[firstShowIndex[1]].votes++;
    } else if (event.target.id === 'rightImg'){
      BusMall.allObject[firstShowIndex[2]].votes++;
    }

    renderImages();

  } else {

    leftImg.removeEventListener('click', onClicking);
    centerImg.removeEventListener('click', onClicking);
    rightImg.removeEventListener('click', onClicking);

    saveLocalStorage();

    buttonResults.style.display = 'block';
  }
}



function resultsImg() {
  let ulResults = document.getElementById('ulResults');

  ulResults.innerHTML = '';

  for(let i = 0 ; i < BusMall.allObject.length;i++){

    busMallVotes.push( BusMall.allObject[i].votes );
    busMallShow.push( BusMall.allObject[i].show );
    // console.log(busMallVotes);

    let li = document.createElement('li');
    ulResults.appendChild(li);
    li.textContent = `${BusMall.allObject[i].name} had ${BusMall.allObject[i].votes} votes, and was seen ${BusMall.allObject[i].show} times.`;
  }
  addChart();
  buttonResults.removeEventListener('click', resultsImg);
}


function addChart() {

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: busMallName, // ['goat away' ,  ... 'sassy goat']
      datasets: [{
        label: 'Number Of votes',
        data: busMallVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderWidth: 1
      },{
        label:'# of Shown',
        data: busMallShow,
        backgroundColor:[
          'rgba(54, 162, 235, 0.2)'
        ],
        borderWidth: 1
      }]
    }
  });
}


