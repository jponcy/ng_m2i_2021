import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, flatMap, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { GameApiService } from '../game-list/game-api.service';
import { Game } from '../game-list/models';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  /** Used to free observables. */
  protected subscriptionHandler$ = new Subject();

  loading = true;

  game: Game;

  constructor(private readonly api: GameApiService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    // const id = +this.route.snapshot.params.id;
    this.route.params
        .pipe(
          tap(() => this.loading = true),
          takeUntil(this.subscriptionHandler$),         // Liberation de l'observable.
          filter(params => params.id),                  // Arrete le "flux" si la condition n'est pas remplie.
          mergeMap(params => this.api.getOne(params.id))// Conversion de notre observable en un autre.
        )
        .subscribe(game => {
          this.game = game;
          this.loading = false;
        })
        // .add(() => this.loading = false);               // Appele dans tous les cas a la fin
                                                        // (un peu comme un finally en Java).
  }
}
