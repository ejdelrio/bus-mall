'use strict';
//Initial array containing image names used to construct objects
var imageArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass', 'sweep', 'usb'];
var imageObjects = [];//Will house contructed objects
var usedImages = [];//Will house previous guesses
var totalCounter = 0;//Counts total number of clicks

function Image(name, type) {
  //Constructs image with name, file path and number of clicks/views
  this.name = name;
  this.path = `./img/${name}.${type}`;
  this.views = 0;
  this.clicks = 0;
  imageObjects.push(this);
}

function packageSession() {
  localStorage.oldObjects = JSON.stringify(imageObjects);
}

function unpackSession() {
  imageObjects = JSON.parse(localStorage.oldObjects);
}

function populateImages() {
  //Iterates throug imageArray and runs names through constructor.
  for (var i = 0; i < imageArray.length - 2; i++) {
    new Image(imageArray[i], 'jpg');
  }
  //Constructs the two non-jpg objects
  new Image('usb', 'gif');
  new Image('sweep', 'png');
}

function randImage() {
  //Generates a random image from imageObjects array
  //console.log('working');
  while (true) { //Intentional infinite loop to keep generating random numbers until a proper choice is made.
    var randNum = Math.floor(Math.random() * imageArray.length); //Generates a random number between 0 and 19 that will be used as the index for imageObjects
    //console.log(randNum);
    //Checks to see if random Object is in list of previous guesses.
    if (usedImages.includes(imageObjects[randNum]) === false) {
      //console.log(imageObjects[randNum]);
      return imageObjects[randNum];
    }
  }
}

function newImage() {
  //Retrieves all image elements from survey
  var allPics = document.getElementsByClassName('randPic');
  //Stores 3 new Objects.
  var newUsed = [];
  for (var i = 0; i < allPics.length; i++) {
    //Assigns a temporary variable name to random object
    var tempImage = randImage();
    //increases views of temp Object
    tempImage.views += 1;
    //Assigns Object path as an image source
    allPics[i].setAttribute('src', tempImage.path);
    newUsed.push(tempImage);
    usedImages.push(tempImage); //Pushes tempImage to usedImages to prevent it from being drawn again
    //console.log(tempImage);
  }
  //console.log(newUsed)
  usedImages = newUsed; //reassigns used images to the new array of used objects
  //console.log(usedImages);
}

function updateHTMLTotal() {
  //Upates the total counter on HTML page
  document.getElementsByTagName('h3')[0].innerHTML = `Total number of clicks: ${totalCounter}`;
}

function imageClick() {
  //Iterates through old values
  //If source of clicked image is the same as the objects path, it's clicked counter increases by one.
  for (var i = 0; i < usedImages.length; i++) {
    if (this.getAttribute('src') === usedImages[i].path) {
      usedImages[i].clicks += 1;
      //console.log('Number of clicks: ', usedImages[i].clicks);
      //console.log('total: ', totalCounter);
      totalCounter += 1;
      newImage(); //New images are generated
    }
  }
  endSurvey();
  updateHTMLTotal();
  //console.log(totalCounter);
}

// function postResults () {
//   //Iterates through clicked values of objects and appends them to HTML ul element
//   var listArray = [];
//   var masterList = document.getElementById('results');
//   for (var i = 0; i < imageObjects.length; i++) {
//     listArray.push(`<li>Number of clicks for ${imageObjects[i].name}: ${imageObjects[i].clicks}</li>`);
//   }
//   masterList.innerHTML = listArray.join('');
// }

function endSurvey() {
  //Checks to see if totCounter is greater than 25
  //If so, the event handler is removed from images to prevent clicking
  //postResults is called to display results on HTML
  if (totalCounter >= 25) {
    var allPics = document.getElementsByClassName('randPic');
    for (var i = 0; i < allPics.length; i++) {
      //console.log(allPics[i]);
      allPics[i].removeEventListener('click', imageClick);
    }
    //postResults();
  }
  genChart();
  packageSession();
}

function addHandler() {
  //Adds event handler to image elements
  var allPics = document.getElementsByClassName('randPic');
  for (var i = 0; i < allPics.length; i++) {
    //console.log(allPics[i]);
    allPics[i].addEventListener('click', imageClick);
  }
}

populateImages();
if (localStorage.oldObjects) {
  unpackSession();
}
newImage();
addHandler();
updateHTMLTotal();

function totalArray (propertyName) {
  //returns array of total property value for all images
  var total = [];
  for (var i = 0; i < imageObjects.length; i++) {
    total.push(imageObjects[i][propertyName]);
  }
  return total;
}


function randomColor() {
  var newColor = [];
  for (var i = 0; i < 6; i++) {
    var letterOrNumber = Math.floor(Math.random() * 2);
    var randChar = String.fromCharCode(Math.floor(Math.random() * 6 + 97));
    var randNum = Math.floor(Math.random() * 9);
    newColor.push([randChar, randNum][letterOrNumber]);
  }
  return `#${newColor.join('')}`;
}

function colorArray() {
  var colorArray = [];
  for (var i = 0; i < imageObjects.length; i++) {
    colorArray.push(randomColor());
  }
  return colorArray;
}



function genChart() {
  var ctx = document.getElementById('canvas');
  ctx.style.visibility = 'visible';
  new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: imageArray,
      datasets: [{
        label: 'Total number of clicks.',
        data: totalArray('clicks'),
        backgroundColor: colorArray(),
        borderWidth: 1
      },{
        label: 'Total number of views.',
        data: totalArray('views'),
        backgroundColor: 'black',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
      }
    }
  });
}
