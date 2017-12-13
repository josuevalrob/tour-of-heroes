import { Injectable } from '@angular/core';
//The implementation in this tutorial will continue to deliver mock heroes.
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// simulate getting data from the server with the RxJS of() function.
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';
// Import some HTTP symbols that you'll need:
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Things go wrong, especially when you're getting data from a remote server. 
// The HeroService.getHeroes() method should catch errors and do something appropriate.
import { catchError, map, tap } from 'rxjs/operators';

// The heroes web API expects a special header in HTTP save requests. 
// That header is in the httpOption constant defined in the HeroService.
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// The @Injectable() decorator tells Angular that this service might itself have injected dependencies. 
@Injectable()
export class HeroService {
	// This is a typical "service-in-service" scenario: 
	// you inject the MessageService into the HeroService which is injected into the HeroesComponent.
	constructor(
		// Inject HttpClient into the constructor in a private property called http.
		private http: HttpClient,
		private messageService: MessageService) { }
	// Keep injecting the MessageService. 
	// You'll call it so frequently that you'll wrap it in private log method.
	/** Log a HeroService message with the MessageService */
	private log(message: string) {
	  this.messageService.add('HeroService: ' + message);
	}
	// Define the heroesUrl with the address of the heroes resource on the server.
	private heroesUrl = 'api/heroes';  // URL to web api	
	private testUrl = 'https://josuevalrob.com/tasks';
/** Convert that method to use HttpClient */
				// Add a getHeroes method to return the mock heroes.
			// getHeroes(): Hero[] {
			//   return HEROES;
			// }
				// of(HEROES) returns an Observable<Hero[]> 
				// that emits a single value, the array of mock heroes.
		// getHeroes(): Observable<Hero[]> {
			// Send a message from HeroService
			// Todo: send the message _after_ fetching the heroes
			// this.messageService.add('HeroService: fetched heroes');  
		//   return of(HEROES);
		// }
/** GET heroes from the server */
	getHeroes (): Observable<Hero[]> {
	// This particular HttpClient.get call returns an Observable<Hero[]>, 
	// literally "an observable of hero arrays". In practice, it will only return a single hero array.
	    const url = `${this.heroesUrl}`;

	  return this.http.get<Hero[]>(url)
	// HttpClient.get returns the body of the response as an untyped JSON object by default. 
	// Applying the optional type specifier, <Hero[]> , gives you a typed result object.	  
	    .pipe(
/* The HeroService methods will tap into the flow of observable values and send a message (via log()) 
* to the message area at the bottom of the page.
* They'll do that with the RxJS tap operator, which looks at the observable values, 
* does something with those values, and passes them along. The tap call back doesn't touch the 
* values themselves. */	    	
	    tap(heroes => this.log(`fetched heroes`)),	
	// To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator
      	catchError(this.handleError('getHeroes', []))
    	);
	}	

/*** Get hero by id **/
		// You've swapped http.get for of and the app keeps working without any other changes 
		// because both functions return an Observable<Hero[]>.
	// getHero(id: number): Observable<Hero> {
	//   // Todo: send the message _after_ fetching the hero
	//   this.messageService.add(`HeroService: fetched hero id=${id}`);
	//   return of(HEROES.find(hero => hero.id === id));
	// }
/** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

/** PUT: update the hero on the server */
// The overall structure of the updateHero() method is similar to that of getHeroes(), 
// but it uses http.put() to persist the changed hero on the server.
updateHero (hero: Hero): Observable<any> {
	/* 
	The HttpClient.put() method takes three parameters
	- the URL
	- the data to update (the modified hero in this case)
	- options
	*/
  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

/** POST: add a new hero to the server */
/* HeroService.addHero() differs from updateHero in two ways.
	*- it calls HttpClient.post() instead of put().
	*- it expects the server to generates an id for the new hero, which it returns 
	*  in the Observable<Hero> to the caller. */
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
/*
Note that
	- it calls HttpClient.delete.
	- the URL is the heroes resource URL plus the id of the hero to delete
	- you don't send data as you did with put and post.
	- you still send the httpOptions. */  
}

/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
//The only significant difference is the URL, which includes a query string with the search term.
  return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

// The following handleError() method reports the error and then returns an innocuous result so that the application keeps working.
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
/* Because each service method returns a different kind of Observable result, 
* errorHandler() takes a type parameter so it can return the safe value as the 
* type that the app expects.
*/
}
