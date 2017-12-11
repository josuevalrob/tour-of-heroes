import { Component, OnInit } from '@angular/core';
//import the class hero from hero.ts
import { Hero } from '../hero';
// Delete the HEROES import as you won't need that anymore. 
// lets call the HEROES constant from mock-heros.ts
// import { HEROES } from '../mock-heroes';

// Import the HeroService instead.
import { HeroService } from '../hero.service';



//@Component is a decorator function that specifies the Angular metadata for the component.
@Component({
  //css selector
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
//Always export the component class so you can import it elsewhere ... like in the AppModule.


export class HeroesComponent implements OnInit {

// hero string
// hero = 'Windstorm';
// Refactor the component's hero property to be of type Hero. 
// Initialize it with an id of 1 and the name Windstorm.
//hero object from the hero.ts class
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
// While the HeroesComponent class still works, the onSelect() method and selectedHero property are no longer used.
  // -- Rename the component's hero property to selectedHero but don't assign it. 
  // -- There is no selected hero when the application starts.	selectedHero: Hero;
  // -- selectedHero: Hero;


	//The page no longer displays properly because you changed the hero from a string to an object.
	// heroes: HEROES[];
	heroes: Hero[];


	// The parameter simultaneously defines a private heroService property
	// and identifies it as a HeroService injection site.	
	constructor(private heroService: HeroService) {
		// Reserve the constructor for simple initialization such as wiring constructor parameters to properties. 
		// The constructor shouldn't do anything. 
		// It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.
	 }
	 ngOnInit() {
	   this.getHeroes();
	 }	
// While the HeroesComponent class still works, the onSelect() method and selectedHero property are no longer used.
	 //--  Add the following onSelect() method, which assigns the clicked hero 
	 //--  from the template to the component's selectedHero.
	 	 //-- onSelect(hero: Hero): void {
	 	 //--  this.selectedHero = hero;
	 	 //--  }	 

	 // Create a function to retrieve the heroes from the service.
	getHeroes(): void 
	{
// This will not work in a real app. You're getting away with it now because 
// the service currently returns mock heroes.
// It can take a callback. It could return a Promise. It could return an Observable.

// this.heroes = this.heroService.getHeroes();

// This won't work when the HeroService is actually making requests of a remote server.

// The new version waits for the Observable to emit the array of heroes. 
// Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
	  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
	}


}
