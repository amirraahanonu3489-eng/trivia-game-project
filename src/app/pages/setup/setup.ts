import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './setup.html',
  styleUrls: ['./setup.css']
})
export class SetupComponent {

  playerCount = 1;
  questionAmount = 6;

  category = 'General Knowledge';
  difficulty = 'easy';
  questionType = 'multiple';

  showError = false;

  availablePlayers = [
    'Player 1',
    'Player 2',
    'Player 3'
  ];

   selectedPlayers: string[] = [];

  isSelected(player: string): boolean {
    return this.selectedPlayers.includes(player);
  }

  constructor(private router: Router) {}

  togglePlayer(player: string) {
    if (this.selectedPlayers.includes(player)) {
      this.selectedPlayers =
        this.selectedPlayers.filter(p => p !== player);
    } else {
      this.selectedPlayers.push(player);
    }
  }

  startGame() {

    if (this.questionAmount % this.playerCount !== 0) {
      this.showError = true;
      return;
    }

    this.showError = false;

    let players: string[] = [];

    if (this.playerCount === 1) {
      players = ['Player 1'];
    } else {
      players = ['Player 1', ...this.selectedPlayers];
    }

    players = [...new Set(players)].slice(0, this.playerCount);

    this.router.navigate(['/quiz'], {
      state: {
        settings: {
          players,
          questionAmount: this.questionAmount,
          category: this.category,
          difficulty: this.difficulty,
          questionType: this.questionType
        }
      }
    });
  }
}