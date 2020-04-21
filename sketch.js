var ship;
var invaders = [];
var invaders2 = [];
var guns = [];
var img;
var invader2img;
var shipimg;
var bulletimg;

function preload() {
  img = loadImage('https://raw.githubusercontent.com/leourba/trump-invaders-v.1.2/master/images/trump.PNG');
  shipimg = loadImage('https://raw.githubusercontent.com/leourba/trump-invaders-v.1.1/master/images/ship.png');
  bulletimg = loadImage('https://raw.githubusercontent.com/leourba/trump-invaders-v.1.1/master/images/bullet.png');
  invader2img = loadImage('https://raw.githubusercontent.com/leourba/trump-invaders-v.1.1/master/images/obama.png');
}

function setup() {
  createCanvas(600, 500);
  //se crea la nave
  ship = new Ship();
  // gun= new gun(width/2,height);
  //se crean lo invasores
  for (var i = 0; i < 6; i++) {
    invaders[i] = new invader(i * 80 + 80, 60);
  }
  for (var i = 0; i < 6; i++) {
    invaders2[i] = new invader2(i * 80 + 80, 140);
  }
}

function draw() {

  background(51);

  if (invaders.length == 0 && invaders2.length==0) {
    fill(200,100,50);
    text('felicitaciones, GANASTE!', 400, height / 2);
  }


  //se muestra la nave
  ship.show();
  ship.move();
  //se muestran y mueven la balas 
  for (var i = 0; i < guns.length; i++) {
    guns[i].show();
    guns[i].move();
    //efectos
    for (var j = 0; j < invaders.length; j++) {
      if (guns[i].hits(invaders[j])) {
        invaders[j].grow();
        guns[i].die();
        if (invaders[j].r >= 36) {
          invaders[j].die();
        }

      }
    }
    for (var j = 0; j < invaders2.length; j++) {
      if (guns[i].hits(invaders2[j])) {
        invaders2[j].grow();
        guns[i].die();
        if (invaders2[j].r >= 36) {
          invaders2[j].die();
        }

      }
    }
  }
  var edge = false;
  //se muestran invasores
  for (var i = 0; i < invaders2.length; i++) {
    invaders2[i].show(img);
    invaders2[i].move();
    if (invaders2[i].x + invaders2[i].r > width || invaders2[i].x - invaders2[i].r < 0) {
      edge = true;
    }
  }
  if (edge) {
    for (var i = 0; i < invaders2.length; i++) {
      invaders2[i].shiftdown();
    }
  }


  for (var i = 0; i < invaders.length; i++) {
    invaders[i].show(img);
    invaders[i].move();
    if (invaders[i].x + invaders[i].r > width || invaders[i].x - invaders[i].r < 0) {
      edge = true;
    }
  }
  if (edge) {
    for (var i = 0; i < invaders.length; i++) {
      invaders[i].shiftdown();
    }
  }

  //se borran las balas e invasores
  for (var i = guns.length - 1; i >= 0; i--) {
    if (guns[i].toDelete) {
      guns.splice(i, 1);
    };
  }
  for (var i = invaders.length - 1; i >= 0; i--) {
    if (invaders[i].toDelete) {
      invaders.splice(i, 1);
    }
  }
  for (var i = invaders2.length - 1; i >= 0; i--) {
    if (invaders2[i].toDelete) {
      invaders2.splice(i, 1);
    };

  }

  if (ship.x + ship.r > width || ship.x - ship.r < 0) {
    ship.setdir(0);
  }
  for (var j = 0; j < invaders.length; j++) {
    for (var k = 0; k < invaders2.length; k++) {
      if (invaders[j].y > height - 80 || invaders2[k].y > height) {
        fill(255);
        rect(0, 0, 1280, 800);
        fill(0);
        text('perdiste', 100, height / 2);
      }
    }
  }
}




function keyReleased() {
  if (key != ' ') {
    ship.setdir(0);
  }
}

function keyPressed() {

  if (keyCode === RIGHT_ARROW) {
    ship.setdir(1);

  } else if (keyCode === LEFT_ARROW) {

    ship.setdir(-1);
  }
  if (keyCode == UP_ARROW || key == ' ') {

    var Gun = new gun(ship.x, height - 53);
    guns.push(Gun);
  }

}
