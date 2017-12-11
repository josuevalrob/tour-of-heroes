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

@NgModule({
	// Every component must be declared in exactly one NgModule.
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  // add FormsModule to the @NgModule metadata's 
  imports: [
    BrowserModule, 
    FormsModule, AppRoutingModule
  ],
// The providers array tells Angular to create a single, 
// shared instance of HeroService and inject into any class that asks for it.
  providers: [ HeroService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
