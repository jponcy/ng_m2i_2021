import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameFormComponent } from './game-form/game-form.component';

import { GameListComponent } from './game-list/game-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'product',
    children: [
      { path: '', pathMatch: 'full', component: GameListComponent },
      { path: 'new', component: GameFormComponent },
      { path: ':id/edit', component: GameFormComponent },
      { path: ':id', component: GameDetailsComponent }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'product' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
