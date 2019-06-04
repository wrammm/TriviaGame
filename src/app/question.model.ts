export class QuestionResponse {
    results: Question[];
    response_code: number;
}
export class Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}