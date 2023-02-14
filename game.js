// Using jQuery

let started = false;
let level = 0;

let userClicked;
let userClickedPattern = [];

let ranNum;
let color = ["red", "green", "yellow", "blue"];
let gamePattern = [];

$(document).keypress(function () {
  if (!started) {
    started = true;
    $(".text").text("Level " + level++);
    nextLevel();
  }
});

$(".btn").click(function () {
  userClicked = $(this).attr("id");
  makeSound(userClicked);
  $(this).addClass("pressed");
  setTimeout(() => {
    $(this).removeClass("pressed");
  }, 100);
  userClickedPattern.push(userClicked);
  checkClicked(userClickedPattern.length - 1);
});

const gameOver = () => {
  $(".text").text("GAME OVER!!, press any key to restart.");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 500);
};

const checkClicked = (currLevel) => {
  if (userClickedPattern[currLevel] === gamePattern[currLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextLevel();
      }, 500);
    }
  } else {
    gameOver();
    makeSound("wrong");
    restart();
  }
};

const nextLevel = () => {
  randomColor();
  $("#" + color[ranNum]).animate({ opacity: 0.5 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
  });
  $(".text").text("Level " + level++);
  makeSound(color[ranNum]);
  userClickedPattern = [];
};

const getPressed = function (btn) {
  btn.addClass("pressed");
  setTimeout(() => {
    btn.removeClass("pressed");
  }, 300);
};

const randomColor = () => {
  ranNum = Math.floor(Math.random() * 4);
  gamePattern.push(color[ranNum]);
};

const makeSound = (color) => {
  let sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
};

const restart = () => {
  started = false;
  gamePattern = [];
  level = 0;
};
