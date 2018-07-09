import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { ChatService } from './shared/chat.service';

import { ClientRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';

import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app-routing.module';
import { UsergroupComponent } from './usergroup/usergroup.component';

const route_var: Routes = [
  {path : 'usergroup', component : UsergroupComponent},
  {path : 'chatstart', component : ChatComponent}];
const chat_obj = RouterModule.forRoot(route_var);




@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    UsergroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClientRoutingModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAJCd6ScAgbnT_7vEdYXxQvVGLItGrNUsI'
    }),
    chat_obj

  ],
  providers: [
    ChatService,
    { provide: LocationStrategy, useClass: PathLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
