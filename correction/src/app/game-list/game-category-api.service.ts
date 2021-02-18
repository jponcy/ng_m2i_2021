import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GameCategory } from './models';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

const URL = environment.api.urls.categories;

@Injectable({ providedIn: 'root' })
export class GameCategoryApiService {
  constructor(private readonly http: HttpClient, private route: ActivatedRoute) { }

  /** Returns all game categories (genres) ; no pagination. */
  getAll(): Observable<GameCategory[]> {
    // TODO: Cache..
    return this.http.get<GameCategory[]>(URL); // No DTO.
  }
}
