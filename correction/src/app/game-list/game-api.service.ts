import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game, GameCategory, GameDto, GameList } from './models';
import { GameCategoryApiService } from './game-category-api.service';

const URL = environment.api.urls.games;

type MergeList = (_: [GameList[], GameCategory[]]) => Game[];

@Injectable({ providedIn: 'root' })
export class GameApiService {
  constructor(private readonly http: HttpClient, private readonly categoryApi: GameCategoryApiService) {}

  /** Returns all games with merged linked entities. */
  getAllFull(): Observable<Game[]> {
    return zip(this.getAll(), this.categoryApi.getAll())
        .pipe(map(this.mergeList));
  }

  /** Simply returns list of game (with ID references for nested objects). */
  getAll(): Observable<GameList[]> {
    return this.http.get<GameDto[]>(URL)
        .pipe(map(games => games.map(this.convert)));
  }

  getOne(id: number): Observable<Game> {
    const request = this.http.get<GameDto>(`${URL}/${id}`)
        .pipe(map(this.convert));

    return zip(request, this.categoryApi.getAll())
        .pipe(
          // map(([g, c]) => [[g], c]),
          // map(this.mergeList),
          // map(games => games[0])
          map(([game, categories]) => this.mergeData(game, categories))
        );
  }

  private readonly mergeList: MergeList = ([games, categories]) => games
      .map(g => this.mergeData(g, categories))
      .map(g => g as Game)

  private readonly mergeData: (_: GameList, __: GameCategory[]) => Game = (game: GameList, categories: GameCategory[]) => {
    const { genres, ...result } = game;

    return {
      ...result,
      categories: genres.map(genre => categories.find(c => genre === c.id)) // TODO: Optimize (index categories).
    };
  }

  private readonly convert: (_: GameDto) => GameList = (dto: GameDto) => {
    const { title, ...others } = dto;

    return { name: title, ...others };
  }
}
