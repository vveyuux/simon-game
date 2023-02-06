var level = 1;
var started = false;

var gamePattern = [];
var ranColor;

var userClicked;
var userClickedPattern = [];

var color = ["red", "blue", "green", "yellow"];
var ranNum;

$(document).keypress(function () {
  if (!started) {
    nextLevel();
    started = true;
  }
});

function btnPressed(btn) {
  $(btn).addClass("pressed");
  setTimeout(() => {
    $(btn).removeClass("pressed");
  }, 100);
}

function restartGame() {
  gamePattern = [];
  level = 1;
  started = false;
}

function checkAnswer(curr) {
  if (gamePattern[curr] === userClickedPattern[curr]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextLevel();
      }, 1000);
    }
  } else {
    makeSound("wrong");
    $(".title-text").text("Game Over, Press any to restart.");
    restartGame();
  }
}

$(".box").click(function () {
  userClicked = $(this).attr("id");
  userClickedPattern.push(userClicked);
  btnPressed("#" + userClicked);
  makeSound(userClicked);
  checkAnswer(userClickedPattern.length - 1);
});

function randomColor() {
  ranNum = Math.floor(Math.random() * 4);
  gamePattern.push(color[ranNum]);
}

function nextLevel() {
  userClickedPattern = [];
  $(".title-text").text("Level " + level++);
  randomColor();
  makeSound(color[ranNum]);
  $("#" + color[ranNum]).animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
  });
}

function makeSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}
