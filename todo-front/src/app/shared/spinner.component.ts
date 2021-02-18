import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `Chargement en cours...`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {}
