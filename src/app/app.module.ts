import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';
import { TransmissionInterceptor } from './transmission.interceptor';
import { SearchBottomNavComponent } from './search-bottom-nav/search-bottom-nav.component';
import { ServerConfigComponent } from './server-config/server-config.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'config', component: ServerConfigComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    SearchComponent,
    SearchBottomNavComponent,
    ServerConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TransmissionInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
