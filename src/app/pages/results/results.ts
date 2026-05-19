import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.html',
  styleUrls: ['./results.css']
})
export class ResultsComponent {

  score = 0;
  total = 0;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;

    this.score = state?.score || 0;
    this.total = state?.total || 10;
  }

  restart() {
    this.router.navigate(['/']);
  }
}
