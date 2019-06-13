import { Component, HostListener, ElementRef } from '@angular/core';
import { Question, QuestionResponse } from './question.model';
import { TriviaQuestionsService } from './trivia-questions.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	singlePlayer = false;
	twoPlayer = false;

	singlePlayerClicked() {
		this.singlePlayer = true;
	}
	twoPlayerClicked() {
		this.twoPlayer = true;
	}
}
