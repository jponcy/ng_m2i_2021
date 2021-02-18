import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-skeleton>
      <router-outlet></router-outlet>
    </app-skeleton>`,
  styles: []
})
export class AppComponent {
}
