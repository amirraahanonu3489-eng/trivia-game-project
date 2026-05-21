import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { QuizComponent } from './pages/quiz/quiz';
import { ResultsComponent } from './pages/results/results';
import { SetupComponent } from './pages/setup/setup';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'results', component: ResultsComponent }
];