import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, mergeMap, takeUntil } from 'rxjs/operators';

import { Game } from '../game-list/models';
import { GameApiService } from './../game-list/game-api.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  /** Used to free observables. */
  protected subscriptionHandler$ = new Subject();

  private game: Game;

  /*
   * {} => FormGroup
   * [] => FormArray
   * '' => FormControl
   */

  // form = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   // ...
  //   // company: new FormGroup({

  //   // })
  // });

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    wtf: [[]],
    disabled: { disabled: true, state: 0 },
    // ...
    company: this.fb.group({
      // ...
    })
  });

  constructor(
      private readonly api: GameApiService,
      private readonly fb: FormBuilder,
      private router: Router,
      private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
        .pipe(
          takeUntil(this.subscriptionHandler$),
          filter(params => params.id),
          mergeMap(({ id }) => this.api.getOne(id))
        )
        .subscribe(game => this.game = game);
    // this.router.navigate(['..', 'games'], { relativeTo: this.route });

    this.form.controls.company.disable();
    const val = this.form.value; // company ne sera pas present.
    // this.form.controls.name.value;
    // this.form.get('name').value;
    // this.form.controls.name.valid;
    // this.form.valid;
    // this.form.controls.company.valid;
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      // process
    }
  }

  get title(): string {
    return this.isNew ? 'New' : 'Edit ' + this.game.id;
  }

  private get isNew(): boolean {
    return !this.game;
  }

}
