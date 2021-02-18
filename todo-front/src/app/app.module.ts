import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo.component';
import { DemosModule } from './demos/demos.module';
import { LoremComponent } from './demos/lorem.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { TodoListComponent } from './todo/todo-list.component';
import { TodoModule } from './todo/todo.module';

const routes: Routes = [
  { path: 'todos', component: TodoListComponent },
  { path: 'lorem', component: LoremComponent },
  { path: '', pathMatch: 'full', redirectTo: 'todos' },
  // { path: 'todos', children: todosRoutes },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  // Declaration des elements "appartenant" a ce module (pipe, composant, directive).
  declarations: [
    AppComponent,
    DemoComponent
  ],
  // Importation d'autres modules (a nous, ou autre).
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production,
      onSameUrlNavigation: 'reload', // Peut etre utile pour recharger facillement des composants.
      relativeLinkResolution: 'corrected',
      scrollOffset: [0, 0]
    }),
    MatButtonModule,

    SharedModule,
    TodoModule,
    DemosModule
  ],
  // Permet la declaration de certains elements (constantes, service (factory), intercepteur).
  providers: [],
  // Composants accessible au lancement (index.html).
  bootstrap: [AppComponent],
  // entryComponents: []
})
export class AppModule { }
