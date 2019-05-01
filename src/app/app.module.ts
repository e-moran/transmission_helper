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
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSnackBarModule, MatToolbarModule
} from '@angular/material';
import { SearchAddDialogComponent } from './search-add-dialog/search-add-dialog.component';
import { StatusComponent } from './status/status.component';
import { TorrentStatusPipe } from './torrent-status.pipe';
import { SecondsPipe } from './seconds.pipe';
import { FileSizePipe } from './file-size.pipe';

const appRoutes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'config', component: ServerConfigComponent },
  { path: 'status', component: StatusComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    SearchComponent,
    SearchBottomNavComponent,
    ServerConfigComponent,
    NavbarComponent,
    SearchAddDialogComponent,
    StatusComponent,
    TorrentStatusPipe,
    SecondsPipe,
    FileSizePipe
  ],
  entryComponents: [SearchAddDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
        appRoutes,
        {enableTracing: true}
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressBarModule
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
