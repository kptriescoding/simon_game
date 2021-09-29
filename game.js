//Variable Declarations
var randomNumber;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor;
var userClickedPattern = [];
var level = 0;
var flag = 0;
//Playsound Function
function playSound(name) {
    $(name).get(0).play();
}
//Next Sequence 
function nextSequence(gamePattern) {
    userClickedPattern = [];
    $("h1").text("Level " + ++level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    animatePress(randomChosenColor);
    playSound("#" + randomChosenColor + "-sound");
    gamePattern.push(randomChosenColor);
}
$("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
$(".btn").click(function () {
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound("#" + userChosenColor + "-sound");
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
$(document).keypress(function () {
    $("h1").text("Level 0");
    nextSequence(gamePattern);
    if (flag == 1) {
        startOver();
    }
});
function checkAnswer(currentLevel) {
    console.log(gamePattern);
    console.log(userClickedPattern);
    if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
        playSound("#wrong-sound");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");

        }, 200);
        flag = 1;
        $("h1").text("Game Over!! Press Any Key to Continue")
    }
    console.log(level);
    console.log(currentLevel);
    if (currentLevel == level - 1) {
        setTimeout(() => {
            nextSequence(gamePattern);
        }, 1000);
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    flag = 0;
    nextSequence(gamePattern);
}


