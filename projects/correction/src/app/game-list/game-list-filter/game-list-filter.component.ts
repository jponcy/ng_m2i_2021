import { Component, Output, EventEmitter } from '@angular/core';
import { GameFilter } from '../models';

@Component({
  selector: 'app-game-list-filter',
  templateUrl: './game-list-filter.component.html',
  styleUrls: ['./game-list-filter.component.scss']
})
export class GameListFilterComponent {

  private filterData: GameFilter = { name: null, editor: null, type: null };

  types = ['RPG', 'Platform', 'Aventure'];

  @Output()
  private filter = new EventEmitter<GameFilter>();

  onChange(fieldName: string, value: string): void {
    this.filterData[fieldName] = value;
  }

  onSubmit(): void {
    this.filter.emit(this.filterData);
    // elt.querySelectorAll('input,select');
  }
}
