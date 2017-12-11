// An Angular best practice is to load and configure the router in a separate,
// use the CLI to generate it ng generate module app-routing --flat --module=app
// --flat puts the file in src/app instead of its own folder.
// --module=app tells the CLI to register it in the imports array of the AppModule.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// You'll configure the router with Routes in the RouterModule 
// so import those two symbols from the @angular/router library.
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
// Routes tell the router which view to display when a user clicks a link or pastes a URL into the browser address bar.
// -- path: a string that matches the URL in the browser address bar.
// -- component: the component that the router should create when navigating to this route.
// Import the HeroesComponent so you can reference it in a Route. 
import { HeroesComponent } from './heroes/heroes.component';
// Navigating to hero details
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
// define an array of routes with a single route to that component.
const routes: Routes = [
//This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  // The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
    { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
// makes router directives available for use in the AppModule components that will need them.

//  The forRoot() method supplies the service providers and directives needed for routing, 
// and performs the initial navigation based on the current browser URL.
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
