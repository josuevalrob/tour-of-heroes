import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
// Every time the user types in the textbox, the binding calls search() 
// with the textbox value, a "search term". The searchTerms becomes an Observable emitting a 
// steady stream of search terms.

export class HeroSearchComponent implements OnInit {
  // Notice the declaration of heroes$ as an Observable
  heroes$: Observable<Hero[]>;
  // The searchTerms property is declared as an RxJS Subject.
  // A Subject is both a source of observable values and an Observable itself. 
  // You can subscribe to a Subject as you would any Observable.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}
// You can also push values into that Observable by calling its next(value) method as the search() method does.
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
// The ngOnInit() pipes the searchTerms observable through a sequence of RxJS operators that reduce the number 
// of calls to the searchHeroes(), ultimately returning an observable of timely hero search results (each a Hero[]).
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}