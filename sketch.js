var rows, columns, colOffset, rowOffset, radiusMax, seed1, seed2;
var radiusFactor = 1.2;
var noiseOffset1 = 0;
var noiseOffset2 = 0;
var noiseScale1 = 2;
var noiseScale2 = 2;
var noiseInc1 = 0.002;
var noiseInc2 = 0.003;
var cycle1 = 1500;
var cycle2 = 40000;
var bkgCol, bkgH, fillCol, strokeCol;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(1024, 1024);
  colorMode(HSB, 360, 255, 255, 255);
  ellipseMode(RADIUS);
  rectMode(RADIUS);
  //bkgH = random(360);
  bkgH = 0;
  bkgCol = color(bkgH, 255, 255);
  fillCol = color(0, 0, 1, 48);
  strokeCol = color(0, 0, 1, 32);
  background(bkgCol);
  var height2width = windowHeight / windowWidth;
  columns = int(random(5, 25));
  rows = height2width * columns;
  //rows = 25;
  colOffset = width/(columns*2);
  rowOffset = height/(rows*2);
  radiusMax = colOffset * radiusFactor;
  seed1 = random(1000);
  seed2 = random(1000);
}

function draw() {
  var sineWave1 = sin(map(frameCount % cycle1, 0, cycle1, 0, TWO_PI));
  var sineWave2 = sin(map(frameCount % cycle2, 0, cycle2, 0, TWO_PI));
  bkgH = map(sineWave2, -1, 1, 0, 360);
  //var bkgS = map(sineWave, -1, 1, 128, 255);
  var bkgB = map(sineWave1, -1, 1, 100, 255);
  bkgCol = color (bkgH, 255, bkgB);
  background(bkgCol);
  for(var col = 0; col < columns; col++) {
    for(var row = 0; row < rows; row++) {
      var x = map (col, 0, columns, 0, width) + colOffset;
      var y = map (row, 0, rows, 0, height) + rowOffset;
      var xseed1 = map (x, 0, width, 0, noiseScale1);
      var yseed1 = map (y, 0, width, 0, noiseScale1);
      var xseed2 = map (x, 0, width, 0, noiseScale2);
      var yseed2 = map (y, 0, width, 0, noiseScale2);
      var noise1 = noise(xseed1 + seed1 + noiseOffset1, yseed1 + seed1 + noiseOffset1); // value in range 0-1
      var noise2 = noise(xseed2 + seed2 + noiseOffset2, yseed2 + seed2 + noiseOffset2); // value in range 0-1
      var noise3 = noise(noise1, noise2); // Bonus noise!
      var rx = map(noise1, 0, 1, 0, radiusMax);
      var ry = map(noise2, 0, 1, 0, radiusMax);
      //var fillH = map(noise1, 0, 1, 0, 255);
      var fillH = 0;
      var fillH = (bkgH+180) % 360;
      //var fillS = map(noise3, 0, 1, 0, 255);
      var fillS = 255;
      var fillB = map(noise3, 0.2, 0.7, 0, 255);
      //var fillA = map(noise1, 0, 1, 0, 255);
      var fillA = 255;
      fillCol = color(fillH, fillS, fillB,fillA);
      fill(fillCol);
      stroke(strokeCol);
      push();
      translate(x, y);
      var angle = map(noise3, 0, 1, 0, TWO_PI);
      rotate(angle);
      ellipse(0, 0, rx, ry);
      //rect(0, 0, rx, ry);
      pop();
    }
  }
  noiseOffset1 += noiseInc1;
  noiseOffset2 += noiseInc2;
}
