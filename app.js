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
}

for (var i = 0; i < imageArray.length - 2; i++) {
  imageObjects.push(new Image(imageArray[i]), 'jpg');
}
