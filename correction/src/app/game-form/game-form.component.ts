import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, mergeMap, takeUntil } from 'rxjs/operators';

import { Game } from '../game-list/models';
import { GameApiService } from './../game-list/game-api.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  /** Used to free observables. */
  protected subscriptionHandler$ = new Subject();

  constructor(private readonly api: GameApiService, private router: Router, private readonly route: ActivatedRoute) { }

  private game: Game;

  ngOnInit(): void {
    this.route.params
        .pipe(
          takeUntil(this.subscriptionHandler$),
          filter(params => params.id),
          mergeMap(({ id }) => this.api.getOne(id))
        )
        .subscribe(game => this.game = game);
    // this.router.navigate(['..', 'games'], { relativeTo: this.route });
  }

  get title(): string {
    return this.isNew ? 'New' : 'Edit ' + this.game.id;
  }

  private get isNew(): boolean {
    return !this.game;
  }

}
