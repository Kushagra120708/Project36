//Create variables here
var database;
var dog,dogImg,happyDogImg;
var foodS,foodStock;
var FedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 500);

  foodObj = new Food();
  
  dog = createSprite(700,270);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed The Dog");
  feed.position(400,60)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(400,80)
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  //add styles here

fedTime = database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed = data.val();
})

  fill(255,255,254)
  textSize(25)
  if (lastFed>=12) {
    text("Last Feed:" + lastFed%12 + "PM",400,30);
  } else if(lastFed==0) {
    text("Last Fed:12 AM",400,30);
  }else{
    text("Last Feed:" + lastFed + "AM",400,30);
  }

  foodObj.display();
  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
   foodS++
   database.ref('/').update({
     Food:foodS
   })
}



