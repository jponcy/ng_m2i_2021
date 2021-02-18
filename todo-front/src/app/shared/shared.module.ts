import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import { SpinnerComponent } from './spinner.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    PagesModule
  ],
  exports: [
    SpinnerComponent,
    MatCardModule
  ]
})
export class SharedModule { }
