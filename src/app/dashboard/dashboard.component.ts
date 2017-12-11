import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
// The class is similar to the HeroesComponent class.
export class DashboardComponent implements OnInit {
// It defines a heroes array property. 
  heroes: Hero[] = [];
// The constructor expects Angular to inject the HeroService into a private heroService property.
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
// The ngOnInit() lifecycle hook calls getHeroes
  getHeroes(): void {
    this.heroService.getHeroes()
// This getHeroes reduces the number of heroes displayed to four (2nd, 3rd, 4th, and 5th). 
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}