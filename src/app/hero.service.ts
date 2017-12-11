import { Injectable } from '@angular/core';
//The implementation in this tutorial will continue to deliver mock heroes.
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// simulate getting data from the server with the RxJS of() function.
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

// The @Injectable() decorator tells Angular that this service might itself have injected dependencies. 
@Injectable()
export class HeroService {
	// This is a typical "service-in-service" scenario: 
	// you inject the MessageService into the HeroService which is injected into the HeroesComponent.
	constructor(private messageService: MessageService) { }

// Add a getHeroes method to return the mock heroes.
	// getHeroes(): Hero[] {
	//   return HEROES;
	// }
// of(HEROES) returns an Observable<Hero[]> 
// that emits a single value, the array of mock heroes.
getHeroes(): Observable<Hero[]> {
// Send a message from HeroService
// Todo: send the message _after_ fetching the heroes
this.messageService.add('HeroService: fetched heroes');  
  return of(HEROES);
}
getHero(id: number): Observable<Hero> {
  // Todo: send the message _after_ fetching the hero
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(HEROES.find(hero => hero.id === id));
}

}
