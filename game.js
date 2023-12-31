let buttonColors = ['red','blue','green','yellow'];
let gamePattern = [];
let userClickedPattern = [];

let gameStart = false , level = 0;
$(document).keydown(function(){
    if(!gameStart){
        setTimeout(function(){nextSequence();},300);
        gameStart = true;
    }
})


$(".btn").click(function(){
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {nextSequence();}, 1000);
        }
    } 
    else {
        wrong();
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); 
}  

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed")} , 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function wrong(){
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")} , 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = false;
}
