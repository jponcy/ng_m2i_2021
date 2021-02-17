import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <h1>Bienvenue sur {{ title }}</h1>

    {{ nb }}² = {{ nb * nb }}
    <br>
    {{ randInter }}² = {{ randInter * randInter }}
  `,
  styles: [
  ]
})
export class DemoComponent implements OnInit, OnDestroy {
  title = 'front';
  private myNb = this.rand();
  randInter: number;
  private interval: any;

  // constructor() {
    // Exemple interval avec une fonction anonyme.
    // setInterval(
    //   (function () { this.randInter = this.rand(); })
    //       .bind(this),
    //   1_000);

    // Exemple interval avec une arrow function "complete".
    // setInterval(
    //   () => { this.randInter = this.rand(); },
    //   1_000);

    // Exemple interval avec une arrow function "simplification mono-ligne".
    // setInterval(() => this.randInter = this.rand(), 1_000);

    // IntStream.range(0, 50).map(i -> i * i).collect(Collectors.toList());
  // }

  ngOnInit(): void {
    this.interval = setInterval(() => this.randInter = this.rand(), 1_000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private rand(): number {
    return Math.floor(Math.random() * 100);
  }

  private rand2 = () => Math.floor(Math.random() * 100);

  get nb(): number {
    return this.myNb;
  }

  // set nb(nb: number) {
  //   this.myNb = nb;
  // }
}
