import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
// The HeroDetailComponent needs a new way to obtain the hero-to-display.
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';
import { DashboardComponent }   from '../dashboard/dashboard.component';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
//The hero property must be an Input property, annotated with the @Input() decorator, 
// because the external HeroesComponent will bind to it 	
	@Input() hero: Hero;

	constructor(
// The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. 
	  private route: ActivatedRoute,
// The HeroService gets hero data from the remote server and this component will use it to get the hero-to-display.
	  private heroService: HeroService,
// The location is an Angular service for interacting with the browser. 
	  private location: Location
	) {}
// linkExtract the id route parameter
	ngOnInit(): void {
	  this.getHero();
	}

	getHero(): void {
// The route.snapshot is a static image of the route information shortly after the component was created.
// The paramMap is a dictionary of route parameter values extracted from the URL. 
// The "id" key returns the id of the hero to fetch.
// The JavaScript (+) operator converts the string to a number
	  const id = +this.route.snapshot.paramMap.get('id');
	  this.heroService.getHero(id)
	    .subscribe(hero => this.hero = hero);
	}

	goBack(): void {
	  this.location.back();
	}
/* Add the following save() method, which persists hero name changes using 
*  the hero service updateHero() method and then navigates back to the previous view. */
	save(): void {
	   this.heroService.updateHero(this.hero)
	     .subscribe(() => this.goBack());
	 }		
}
