import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoremComponent } from './lorem.component';



@NgModule({
  declarations: [LoremComponent],
  imports: [
    CommonModule
  ],
  exports: [LoremComponent]
})
export class DemosModule { }
