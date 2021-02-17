import { Component, EventEmitter, Output } from "@angular/core";
import { ActionType } from './models';

@Component({
  selector: 'app-game-list-actions',
  template: `
    <button (click)="onFollow()">follow</button>
    <button (click)="onShare()">share</button>
    <button (click)="onBuy()" class="primary">buy</button>
  `
})
export class GameListActionsComponent {
  @Output()
  private action = new EventEmitter<string>();

  onFollow(): void {
    this.action.emit(ActionType.FOLLOW);
  }

  onShare(): void {
    this.action.emit(ActionType.SHARE);
  }

  onBuy(): void {
    this.action.emit(ActionType.BUY);
  }
}
