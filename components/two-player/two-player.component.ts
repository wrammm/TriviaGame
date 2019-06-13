import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { TriviaQuestionsService } from 'src/app/trivia-questions.service';
import { QuestionResponse, Question } from 'src/app/question.model';

export enum KEY_CODE {
	RIGHT_ARROW = 39,
	LEFT_ARROW = 37,
	ENTER = 13,
	CONTROL = 17
}

@Component({
	selector: 'app-two-player',
	templateUrl: './two-player.component.html',
	styleUrls: [ './two-player.component.css' ]
})
export class TwoPlayerComponent implements OnInit {
	title = 'triviaGame';
	questions: Array<Question> = new Array<Question>();
	questionResponse: QuestionResponse;
	hideInnerDiv = false;
	questionNumber = 0;
	currentQuestion = '';
	correctAnswer = '';
	currentWrongAnswers = [ '', '', '' ];
	randNum = 0;
	answers = [ '', '', '', '' ];
	answerOutcome = '';
	value = 0;
	gameInProgress = false;
	answerSelected = false;
	currentScore = 0;
	currentQuestionNumber = 0;
	showNextButton = false;
	gameOver = false;
	timerEnabled = false;
	playerSelected = 1;
	playerIsSelected = false;
	playerOneScore = 0;
	playerTwoScore = 0;
	currentPointValue = 0;
	showPlayerSelectedBox = false;

	constructor(private triviaQuestionsService: TriviaQuestionsService, private elementRef: ElementRef) {}

	@HostListener('window:keyup', [ '$event' ])
	keyEvent(event: KeyboardEvent) {
		if (this.timerEnabled === true) {
			if (event.keyCode === KEY_CODE.CONTROL) {
				this.playerOneSelected();
				this.timerEnabled = false;
				this.playerIsSelected = true;
				this.playerSelected = 1;
			}

			if (event.keyCode === KEY_CODE.ENTER) {
				this.playerTwoSelected();
				this.timerEnabled = false;
				this.playerIsSelected = true;
				this.playerSelected = 2;
			}
		}
	}
	player1Click() {
		this.playerOneSelected();
		this.timerEnabled = false;
		this.playerIsSelected = true;
		this.playerSelected = 1;
	}
	player2Click() {
		this.playerTwoSelected();
		this.timerEnabled = false;
		this.playerIsSelected = true;
		this.playerSelected = 2;
	}
	ngAfterViewInit() {
		this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'lightblue';
	}
	increment() {
		this.value++;
	}

	decrement() {
		this.value--;
	}

	ngOnInit() {
		this.triviaQuestionsService.getQuestions().subscribe((data) => {
			this.questionResponse = data;
		});
	}

	startTimer() {
		this.timerEnabled = true;
		this.currentPointValue = this.generateRandomPointValue();
		let timeleft = 10;
		let thisRef = this;
		let downloadTimer = setInterval(function() {
			document.getElementById('countdown').innerHTML = timeleft + ' seconds remaining';
			timeleft -= 1;
			if (timeleft < 0) {
				clearInterval(downloadTimer);
				this.playerSelected = Math.floor(Math.random() * 2) + 1;
				console.log;
				if (this.playerSelected === 1) {
					console.log(this.playerSelected);
					thisRef.playerOneSelected();
					thisRef.timerEnabled = false;
					thisRef.playerIsSelected = true;
				} else if (this.playerSelected === 2) {
					console.log(this.playerSelected);
					thisRef.playerTwoSelected();
					thisRef.timerEnabled = false;
					thisRef.playerIsSelected = true;
				}
			}
		}, 1000);
	}

	playerOneSelected() {
		this.showPlayerSelectedBox = true;
		console.log('player 1 selected');
	}

	playerTwoSelected() {
		this.showPlayerSelectedBox = true;
		console.log('player 2 selected');
	}

	generateRandomPointValue() {
		return (Math.floor(Math.random() * 9) + 1) * 10;
	}

	getQuestions() {
		this.questions = this.questionResponse.results;
		this.gameInProgress = true;
		this.hideInnerDiv = true;
		console.log(this.questions);
	}
	myFunction(event) {
		alert(event.key);
	}
	nextQuestion() {
		this.showPlayerSelectedBox = false;
		this.startTimer();
		this.showNextButton = false;
		this.answerSelected = false;
		this.answerOutcome = '';
		let inc = 0;
		this.currentQuestion = this.decodeHtml(this.questions[this.questionNumber].question);
		this.correctAnswer = this.decodeHtml(this.questions[this.questionNumber].correct_answer);
		this.currentWrongAnswers = this.questions[this.questionNumber].incorrect_answers;
		this.currentWrongAnswers.forEach((currentWrongAnswer) => {
			this.currentWrongAnswers[inc] = this.decodeHtml(currentWrongAnswer);
			inc++;
		});
		inc = 0;
		let wrongAnsInc = 0;
		this.randNum = Math.floor(Math.random() * Math.floor(3));
		console.log(this.currentWrongAnswers);
		this.answers.forEach((answer) => {
			if (inc === this.randNum) {
				this.answers[inc] = this.correctAnswer;
			} else {
				this.answers[inc] = this.currentWrongAnswers[wrongAnsInc];
				wrongAnsInc++;
			}
			inc++;
		});
		this.questionNumber++;
	}
	decodeHtml(html) {
		var txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}
	selectAnswer(answerNumberSelected) {
		if (this.timerEnabled === false) {
			if (this.answerSelected === false) {
				this.currentQuestionNumber++;
				this.showNextButton = true;
				if (this.currentQuestionNumber === 10) {
					this.showNextButton = false;
					this.gameOver = true;
				}
				if (this.randNum !== answerNumberSelected) {
					this.answerOutcome = 'incorrect';
					this.takeAwayPoints();
				} else {
					this.currentScore++;
					this.answerOutcome = 'correct';
					this.giveOutPoints();
				}
			}
			this.answerSelected = true;
		}
	}
	giveOutPoints() {
		if (this.playerSelected === 1) {
			this.playerOneScore = this.playerOneScore + this.currentPointValue;
		} else {
			this.playerTwoScore = this.playerTwoScore + this.currentPointValue;
		}
	}
	takeAwayPoints() {
		if (this.playerSelected === 1) {
			this.playerOneScore = this.playerOneScore - this.currentPointValue;
		} else {
			this.playerTwoScore = this.playerTwoScore - this.currentPointValue;
		}
	}
}
