import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameCategoryApiService } from '../game-category-api.service';
import { GameCategory, GameFilter } from '../models';

@Component({
  selector: 'app-game-list-filter',
  templateUrl: './game-list-filter.component.html',
  styleUrls: ['./game-list-filter.component.scss']
})
export class GameListFilterComponent implements OnInit {

  private filterData: GameFilter = { name: null, editor: null, type: null };

  gameCategories$: Observable<GameCategory[]>;

  @Output()
  private filter = new EventEmitter<GameFilter>();

  constructor(private readonly api: GameCategoryApiService) {}

  ngOnInit(): void {
    this.gameCategories$ = this.api.getAll();
  }

  onChange(fieldName: string, value: string): void {
    this.filterData[fieldName] = value;
  }

  onSubmit(): void {
    this.filter.emit(this.filterData);
    // elt.querySelectorAll('input,select');
  }
}
