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

function Image (name, type) {
  this.name = name;
  this.path = `./img/${name}.${type}`;
  this.views = 0;
  this.clicks = 0;
}

function populateImages () {
  for (var i = 0; i < imageArray.length - 2; i++) {
    imageObjects.push(new Image(imageArray[i]), 'jpg');
  }
  imageObjects.push(new Image('usb', 'gif'));
  imageObjects.push(new Image('sweep', 'png'));
}

function randImage () {
  while (true) {
    var randNum = Math.floor(Math.random * imageArray.length);
    if (!usedImages.includes(imageObjects[randNum])) {
      return imageObjects[randNum];
    }
  }
}

function newImage () {
  var allPics = document.getElementsByClassName('className');
  var newUsed = [];
  for (var i = 0; i < allPics.length; i++) {
    var tempImage = randImage();
    tempImage.views += 1;
    allPics[i].setAttribute('src', tempImage.path);
    newUsed.push(tempImage);
  }
  usedImages = newUsed;
}

function imageClick () {
  for (var i = 0; i < usedImages.length; i++) {
    if (this.getAttribute('src') === usedImages[i].path) {
      usedImages.clicks += 1;
      newImage();
    }
  }
}

function addHandler() {
  var allPics = document.getElementsByClassName('className');
  for (var i = 0; i < allPics.length; i++) {
    allPics[i].addEventHandler('click', imageClick);
  }
}

populateImages();
addHandler();
