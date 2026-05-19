import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { QuizComponent } from './pages/quiz/quiz';
import { ResultsComponent } from './pages/results/results';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'quiz', component: QuizComponent },
  { path: 'results', component: ResultsComponent }
];