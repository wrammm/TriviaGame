import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Question, QuestionResponse } from 'src/app/question.model';
import { TriviaQuestionsService } from 'src/app/trivia-questions.service';

export enum KEY_CODE {
	RIGHT_ARROW = 39,
	LEFT_ARROW = 37
}
@Component({
	selector: 'app-single-player',
	templateUrl: './single-player.component.html',
	styleUrls: [ './single-player.component.css' ]
})
export class SinglePlayerComponent implements OnInit {
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

	constructor(private triviaQuestionsService: TriviaQuestionsService, private elementRef: ElementRef) {}

	@HostListener('window:keyup', [ '$event' ])
	keyEvent(event: KeyboardEvent) {
		console.log(event);

		if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
			this.increment();
		}

		if (event.keyCode === KEY_CODE.LEFT_ARROW) {
			this.decrement();
		}
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
		if (this.answerSelected === false) {
			this.currentQuestionNumber++;
			this.showNextButton = true;
			if (this.currentQuestionNumber === 10) {
				this.showNextButton = false;
				this.gameOver = true;
			}
			if (this.randNum !== answerNumberSelected) {
				this.answerOutcome = 'incorrect';
			} else {
				this.currentScore++;
				this.answerOutcome = 'correct';
			}
		}
		this.answerSelected = true;
	}
}
