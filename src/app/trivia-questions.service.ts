import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, QuestionResponse } from './question.model';


@Injectable({
  providedIn: 'root'
})
export class TriviaQuestionsService {
  apiUrl = 'https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple';


  constructor(private _http: HttpClient) { }

  getQuestions(){
    return this._http.get<QuestionResponse>(this.apiUrl);
  }
}
