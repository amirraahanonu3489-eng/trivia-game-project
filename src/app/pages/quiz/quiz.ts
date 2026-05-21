import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css']
})
export class QuizComponent implements OnInit {

  players: any[] = [];
  questions: any[] = [];
  currentQuestion: any;

  currentIndex = 0;
  currentPlayerIndex = 0;

  selectedAnswer: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {

    // ✅ FIXED WAY (WORKS EVERY TIME)
    const settings = history.state?.settings;

    if (!settings?.players) {
      this.router.navigate(['/setup']);
      return;
    }

    // ---------------- PLAYERS ----------------
    this.players = settings.players.map((name: string, i: number) => ({
      name,
      correct: 0,
      incorrect: 0,
      color: ['#ffadad', '#caffbf', '#9bf6ff'][i]
    }));

    // ---------------- QUESTIONS ----------------
    const amount = settings.questionAmount;
const type = settings.questionType;
const category = settings.category;
const difficulty = settings.difficulty;

this.questions = this.getLocalQuestions()
  .filter(q =>
    (!type || q.type === type) &&
    (!category || q.category === category) &&
    (!difficulty || q.difficulty === difficulty)
  )
  .slice(0, amount);

// fallback so game NEVER breaks
if (this.questions.length === 0) {
  this.questions = this.getLocalQuestions().slice(0, amount);
}

    this.setQuestion();
  }

  // ---------------- GETTERS ----------------
  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  get progressPercent() {
    return this.questions.length
      ? (this.currentIndex / this.questions.length) * 100
      : 0;
  }

  get leader() {
    return this.players.reduce((a, b) =>
      a.correct >= b.correct ? a : b
    );
  }

  // ---------------- QUESTION SETUP ----------------
  setQuestion() {

    this.currentQuestion = this.questions[this.currentIndex];

    if (!this.currentQuestion) return;

    const answers =
      this.currentQuestion.type === 'boolean'
        ? ['True', 'False']
        : [...this.currentQuestion.incorrect_answers,
           this.currentQuestion.correct_answer]
            .sort(() => Math.random() - 0.5);

    this.currentQuestion.answers = answers;
  }

  // ---------------- ANSWER ----------------
  selectAnswer(answer: string) {

    if (this.selectedAnswer) return;

    this.selectedAnswer = answer;

    const player = this.currentPlayer;

    if (answer === this.currentQuestion.correct_answer) {
      player.correct++;
    } else {
      player.incorrect++;
    }
  }

  // ---------------- NEXT ----------------
  nextQuestion() {

    this.selectedAnswer = null;
    this.currentIndex++;

    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;

    if (this.currentIndex < this.questions.length) {
      this.setQuestion();
    } else {
      this.router.navigate(['/results'], {
        state: { players: this.players }
      });
    }
  }

  // ---------------- LOCAL QUESTIONS ----------------
  getLocalQuestions() {
  return [
    // ---------------- SCIENCE (EASY) ----------------
    {
      question: 'What planet is closest to the Sun?',
      correct_answer: 'Mercury',
      incorrect_answers: ['Venus', 'Earth', 'Mars'],
      type: 'multiple',
      category: 'Science',
      difficulty: 'easy'
    },
    {
      question: 'Water boils at 100°C.',
      correct_answer: 'True',
      incorrect_answers: ['False'],
      type: 'boolean',
      category: 'Science',
      difficulty: 'easy'
    },
    {
      question: 'What gas do plants breathe in?',
      correct_answer: 'Carbon Dioxide',
      incorrect_answers: ['Oxygen', 'Nitrogen', 'Hydrogen'],
      type: 'multiple',
      category: 'Science',
      difficulty: 'easy'
    },

    // ---------------- SCIENCE (MEDIUM) ----------------
    {
      question: 'What is the chemical symbol for Gold?',
      correct_answer: 'Au',
      incorrect_answers: ['Ag', 'Gd', 'Go'],
      type: 'multiple',
      category: 'Science',
      difficulty: 'medium'
    },
    {
      question: 'Humans have 206 bones in their body.',
      correct_answer: 'True',
      incorrect_answers: ['False'],
      type: 'boolean',
      category: 'Science',
      difficulty: 'medium'
    },

    // ---------------- HISTORY (EASY) ----------------
    {
      question: 'Who was the first President of the United States?',
      correct_answer: 'George Washington',
      incorrect_answers: ['Abraham Lincoln', 'John Adams', 'Thomas Jefferson'],
      type: 'multiple',
      category: 'History',
      difficulty: 'easy'
    },
    {
      question: 'The Great Wall of China is visible from space.',
      correct_answer: 'False',
      incorrect_answers: ['True'],
      type: 'boolean',
      category: 'History',
      difficulty: 'easy'
    },

    // ---------------- HISTORY (MEDIUM) ----------------
    {
      question: 'What year did World War II end?',
      correct_answer: '1945',
      incorrect_answers: ['1939', '1942', '1950'],
      type: 'multiple',
      category: 'History',
      difficulty: 'medium'
    },

    // ---------------- GENERAL (EASY) ----------------
    {
      question: 'How many continents are there?',
      correct_answer: '7',
      incorrect_answers: ['5', '6', '8'],
      type: 'multiple',
      category: 'General Knowledge',
      difficulty: 'easy'
    },
    {
      question: 'The Earth is flat.',
      correct_answer: 'False',
      incorrect_answers: ['True'],
      type: 'boolean',
      category: 'General Knowledge',
      difficulty: 'easy'
    },

    // ---------------- SPORTS (EASY) ----------------
    {
      question: 'How many players are on a soccer team on the field?',
      correct_answer: '11',
      incorrect_answers: ['9', '10', '12'],
      type: 'multiple',
      category: 'Sports',
      difficulty: 'easy'
    }
  ];
}
}