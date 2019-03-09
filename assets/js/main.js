var triviaQuestions = [{
	question: "In what year was Pacman made?",
	answerList: ["1979", "1980", "1964", "1992"],
	answer: 1
},
{
	question: "When did Atari Come Out?",
	answerList: ["1977", "1985", "whats an atari?", "2003"],
	answer: 0
},
{
	question: "Which of the following was an Xbox origonal launch title?",
	answerList: ["Burnout 3 Takedown", "SSX Tricky", "Morrowind", "Halo Combat Evolved"],
	answer: 3
},
{
	question: "What is the best selling game of all timne?",
	answerList: ["tetris", "minecraft", "Grand Thewft Auto V", "God of War"],
	answer: 0
},
{
	question: "What was the first FPS Game?",
	answerList: ["Golden Eye 007", "Call of Duty", "Doom", "Wolfenstien 3d"],
	answer: 3
},
{
	question: "(What is the best selling video game console of all time?)",
	answerList: ["Wii", "PS2", "N64", "Xbox 360"],
	answer: 1
},
{
	question: "What is the longest Running Game Franchise?",
	answerList: ["Call of Duty", "Super Mario", "Mortal Kombat", "Assassins Creed"],
	answer: 1
},
{
	question: "Which of the following is an RPG?",
	answerList: ["Skyrim", "Apex Legends", "Fortnite", "F.E.A.R."],
	answer: 0
},
{
	question: "Which of the following is NOT developed by Ubisoft?",
	answerList: ["Assassins Creed", "Forza Horizon", "Tom Clancy's The Division", "Far Cry"],
	answer: 1
},
{
	question: "What is the newest Microsoft console?",
	answerList: ["Xbox 360", "Xbox one", "Xbox one S", "Xbox one X"],
	answer: 3
},
{
	question: "What game is portraid in the main artwork above for the page?",
	answerList: ["Sonic the Hedge Hog", "Crash Bandicoot", "Minecraft", "Super Bomber Man"],
	answer: 0
},{

	question: "What game won game of the year in 2018?",
	answerList: ["Red Dead Redemption 2", "Fallout 76", "God of War 4", "Assassins Creed Odyssey"],
	answer: 2
},
{
	question: "Which Grand Theft Auto Gamne had you play as 3 main characters?",
	answerList: ["GTA III", "GTA Chinatown Wars", "GTA Vice City", "GTA V"],
	answer: 3
},
{
	question: "Which Company allows cross play on different consoles?",
	answerList: ["Microsoft", "Nintendo", "Sony", "Valve"],
	answer: 0
},
{
	question: "What is the biggest video game confrence since 1995?",
	answerList: ["PSX", "Game Awards", "E3", "Comic Con"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right, great job!",
	incorrect: "No, that's not it, maybe next time.",
	endTime: "Out of time, be a little quicker next time!",
	finished: "Alright! Let's see how well you know your video game knowledge."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to start
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}