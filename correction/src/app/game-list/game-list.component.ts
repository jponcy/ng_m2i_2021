import { AfterViewInit, Component, OnInit } from '@angular/core';

import { GameApiService } from './game-api.service';
import { ActionType, Game, GameFilter } from './models';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, AfterViewInit {

  private initialWidth: number;
  width: number;

  private allGames: Game[];
  games: Game[];

  constructor(private readonly api: GameApiService) {}

  ngOnInit(): void {
    this.api
        .getAllFull()
        .subscribe(games => {
          this.allGames = games;
          this.games = games;
        });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const width = (document.querySelector('.card') as any).offsetWidth;
      this.width = width;
      this.initialWidth = width;
    }, 1_000);
  }

  // @ViewChild('myCards')
  // private set cards(cards: ElementRef) {
  //   setTimeout(() => this.width = cards.nativeElement.children[0].offsetWidth, 0);
  // }

  onResetSize(): void {
    this.width = this.initialWidth;
  }

  onAction(action: ActionType, game: Game): void {
    window.alert(`User '${action}' ${game.name}`);
  }

  onFilter(filter: GameFilter): void {
    const games = [];

    for (const game of this.allGames) {
      if ((!filter.name || game.name.toLowerCase().includes(filter.name.toLowerCase()))
          && (!filter.editor || game.editor.toLowerCase().includes(filter.editor.toLowerCase()))
          && (!filter.type || game.categories && game.categories.find(cat => cat.id === +filter.type))) {
        games.push(game);
      }
    }

    this.games = games;
  }

  categories(game: Game): string {
    let result = '';

    if (game.categories && game.categories.length) {
      result = game.categories.map(c => c.name).join(', ');
    }

    return result;
  }

  // @HostListener('mouseenter')
  // onMouseEnter() {}

  makeDesc(game: Game): string {
    let result = game.description;
    const matches = result.split(/[\s\t]+/);

    if (matches.length > 20) {
      result = matches.slice(0, 20).join(' ') + '...';
    }

    return result;
  }
}
