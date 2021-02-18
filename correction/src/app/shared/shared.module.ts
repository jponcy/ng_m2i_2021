import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundModule } from './not-found/not-found.module';
import { SpinnerComponent } from './spinner/spinner.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    NotFoundModule,
    MatProgressSpinnerModule
  ],
  exports: [SpinnerComponent]
})
export class SharedModule { }
