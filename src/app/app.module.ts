import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'; // ngModel lives here
// There are several ways to provide the HeroService: 
// in the HeroesComponent, in the AppComponent, in the AppModule. 
import { HeroService } from './hero.service';
// This tutorial chooses to provide it in the AppModule.
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
// Enable HTTP services
// HttpClient is Angular's mechanism for communicating with a remote server over HTTP.
// To make HttpClient available everywhere in the app,
// open the root AppModule,
// import the HttpClientModule symbol from @angular/common/http,
// add it to the @NgModule.imports array.
import { HttpClientModule }    from '@angular/common/http';

//Important: the In-memory Web API module has nothing to do with HTTP in Angular.
//If you're just reading this tutorial to learn about HttpClient, you can skip over this step. If you're coding along with this tutorial, stay here and add the In-memory Web API now.
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@NgModule({
	// Every component must be declared in exactly one NgModule.
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  // add FormsModule to the @NgModule metadata's 
  imports: [
    BrowserModule, 
    FormsModule, AppRoutingModule, 
    //enable http services
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )    
  ],
// The providers array tells Angular to create a single, 
// shared instance of HeroService and inject into any class that asks for it.
  providers: [ HeroService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
