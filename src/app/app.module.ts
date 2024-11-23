import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { moviesReducer } from './store/movies/movies.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from './store/movies/movies.effects';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { showsReducer } from './store/shows/shows.reducer';
import { ShowsEffects } from './store/shows/shows.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ movies: moviesReducer, shows: showsReducer }),
    EffectsModule.forRoot([MoviesEffects, ShowsEffects]),
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "longDate" }
    }
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
