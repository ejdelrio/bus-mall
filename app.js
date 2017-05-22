'use strict';

var imageArray = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
  'sweep',
  'usb'
];
var imageObjects = [];
var usedImages = [];
var totalCounter = 0;

function Image (name, type) {
  this.name = name;
  this.path = `./img/${name}.${type}`;
  this.views = 0;
  this.clicks = 0;
}

function populateImages () {
  for (var i = 0; i < imageArray.length - 2; i++) {
    imageObjects.push(new Image(imageArray[i], 'jpg'));
  }
  imageObjects.push(new Image('usb', 'gif'));
  imageObjects.push(new Image('sweep', 'png'));
}

function randImage () {
  //console.log('working');
  while (true) {
    var randNum = Math.floor(Math.random() * imageArray.length);
    //console.log(randNum);
    if (usedImages.includes(imageObjects[randNum]) === false) {
      //console.log(usedImages);
      //console.log(imageObjects[randNum]);
      //console.log(imageObjects[randNum]);
      return imageObjects[randNum];
    }
  }
}

function newImage () {
  var allPics = document.getElementsByClassName('randPic');
  var newUsed = [];
  for (var i = 0; i < allPics.length; i++) {
    var tempImage = randImage();
    tempImage.views += 1;
    allPics[i].setAttribute('src', tempImage.path);
    newUsed.push(tempImage);
    usedImages.push(tempImage);
    //console.log(tempImage);
  }
  console.log(newUsed);
  usedImages = newUsed;
  console.log(usedImages);
}


function imageClick () {
  for (var i = 0; i < usedImages.length; i++) {
    if (this.getAttribute('src') === usedImages[i].path) {
      usedImages[i].clicks += 1;
      //console.log('Number of clicks: ', usedImages[i].clicks);
      //console.log('total: ', totalCounter);
      totalCounter += 1;
      newImage();
    }
  }
}

function addHandler() {
  var allPics = document.getElementsByClassName('randPic');
  for (var i = 0; i < allPics.length; i++) {
    //console.log(allPics[i]);
    allPics[i].addEventListener('click', imageClick);
  }
}


populateImages();
newImage();
console.log(usedImages);
addHandler();
