import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriviaService } from '../../services/trivia';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css']
})
export class QuizComponent implements OnInit {

  questions: any[] = [];
  currentIndex = 0;
  score = 0;
  currentQuestion: any;
  answers: string[] = [];

  constructor(
    private triviaService: TriviaService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.triviaService.getQuestions().subscribe({
    next: (data: any) => {
      this.questions = data.results || [];
      this.loadQuestion();
    },
    error: (err) => {
      console.error("API failed:", err);

      alert("Trivia API is rate limited. Please wait a bit and refresh.");

      this.questions = [];
    }
  });
}

  loadQuestion() {
  if (!this.questions || this.questions.length === 0) return;

  this.currentQuestion = this.questions[this.currentIndex];
  if (!this.currentQuestion) return;

  this.answers = [
    ...this.currentQuestion.incorrect_answers,
    this.currentQuestion.correct_answer
  ];

  this.answers = this.shuffle(this.answers);
}

  shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  selectAnswer(answer: string) {
    if (answer === this.currentQuestion.correct_answer) {
      this.score++;
    }

    this.nextQuestion();
  }

  nextQuestion() {
    this.currentIndex++;

    if (this.currentIndex < this.questions.length) {
      this.loadQuestion();
    } else {
      this.router.navigate(['/results'], {
        state: { score: this.score, total: this.questions.length }
      });
    }
  }
}
