import { TestBed } from '@angular/core/testing';

import { TriviaQuestionsService } from './trivia-questions.service';

describe('TriviaQuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TriviaQuestionsService = TestBed.get(TriviaQuestionsService);
    expect(service).toBeTruthy();
  });
});
