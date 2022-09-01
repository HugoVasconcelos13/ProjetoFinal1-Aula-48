var nave1,nave2;
var obstacle1,obstacle2;
var fuel,life,explosion;
var star,stars;
var nave1Img,obstacle1Img,obstacle2Img;
var starImg,fuelImg,explosionImg;
var backgroundImg;
var edges;
var obstacles;
var life = 200;
var vida;

function preload() {
nave1Img = loadImage("imagens/nave.png");
obstacle1Img = loadImage("imagens/meteoro.png");
obstacle2Img = loadImage("imagens/satelite.png");
starImg = loadImage("imagens/estrela.png");
fuelImg = loadImage("imagens/gasolina.png");
backgroundImg = loadImage("imagens/background.gif");
explosionImg = loadImage("imagens/explosao.png");
vida = loadImage("imagens/coracao.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  edges = createEdgeSprites();
  
  obstacles = new Group();
  stars = new Group();
   
  nave1 = createSprite(650,580,20,20);
  nave1.addImage("nave1",nave1Img)
  nave1.scale = 0.17;
}

function draw() {
 background("red");
 image(backgroundImg,0,0,width,height);
 drawSprites();
console.log("pos x "+nave1.x+"pos y "+nave1.y);

if(keyIsDown(UP_ARROW)){
    nave1.position.y -=7;
}

if(keyIsDown(RIGHT_ARROW)){
    nave1.position.x +=7;

}if(keyIsDown(LEFT_ARROW)){
    nave1.position.x -=7;
}
if(keyIsDown(DOWN_ARROW)){
    nave1.position.y +=7;
}

if (life<=0){
    gameOver();
    obstacle1.setVelocityXEach(0);
    obstacle1.setVelocityYEach(0);

    stars.setVelocityXEach(0);
    stars.setVelocityYEach(0);

    nave1.velocityX = 0;
    nave1.velocityY = 0;
}

spawnObstacles();
removeLife();
spawnStars();
collectStars();
lifeShow();

nave1.bounceOff(edges);

}
function spawnObstacles() {
 //criar o srpite dos obstáculos
 if (frameCount%50==0){

 obstacle1 = createSprite(Math.round(random(40,1280)),Math.round(random(43,580)));
 var num = Math.round(random(1,2));
 switch(num){
     case 1:obstacle1.addImage("obstacle1",obstacle1Img);
     break;
     case 2:obstacle1.addImage("obstacle2",obstacle2Img);
     break;
     default:break;
 }
 obstacle1.scale = 0.15;
 obstacle1.velocityY = 8;
 obstacle1.lifetime = 550;



 obstacles.add(obstacle1);
 
 }

}
function spawnStars(){
 if (frameCount %50==0){
     star = createSprite(Math.round(random(40,1280)),Math.round(random(43,580)));
     star.addImage(starImg);

    stars.add(star);

     star.scale = 0.14;
     star.velocityY = 5;
     star.lifeTime = 550;
 }
}


function collectStars(){
    nave1.overlap(stars,function(collector,collected){
    life+=10;
    collected.remove();
    })
}

function removeLife(){
    nave1.overlap(obstacles,function(collector,collected){
    life-=25;
        collected.remove();
    })
}
function lifeShow(){
    push();
    image(vida,width/2-150,20,20,20);
    fill("white");
    rect(width/2-120,20,200,20);
    fill("red");
    rect(width/2-120,20,life,20);
    pop();
}
function gameOver(){
    swal({
         title:`Você Perdeu :)`,
        text:`Feito por Hugo Vasconcelos`,
        imageUrl:"https://cdn-icons-png.flaticon.com/128/4099/4099871.png",
        imageSize:"150x150",
        confirmButtonText:"Jogar Novamente"
    },
   function(isConfirm){
       if(isConfirm){
           location.reload();
       }
   } )
}