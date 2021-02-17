import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag, TagDTO } from './models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

const URL = environment.apiUrl + '/tags';

@Injectable({
  providedIn: 'root'
})
export class TagsApiService {
  constructor(private readonly http: HttpClient) {}

  // private tags = new BehaviorSubject<Tag[]>(null);
  // // Cache manuel avec algo "naif".
  // getAll(): Observable<Tag[]> {
  //   if (!this.tags.value) {
  //     this.http.get<TagDTO[]>(URL)
  //         .pipe(
  //           map(v => v.map(({ created_at: _, updated_at: __, ...others }) => ({ ...others }))),
  //         )
  //         .subscribe(values => this.tags.next(values));
  //   }

  //   return this.tags as Observable<Tag[]>;
  // }

  @Cacheable() // Possibilite de cache "simple".
  getAll(): Observable<Tag[]> {
    return this.http.get<TagDTO[]>(URL)
        .pipe(
          map(v => v.map(({ created_at: _, updated_at: __, ...others }) => ({ ...others }))),
        );
  }

  // Il est aussi possible de partir sur une solution plus complete/complexe/lourde (style NgRX).
}
