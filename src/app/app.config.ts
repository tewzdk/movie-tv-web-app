import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideRouter(routes),
    provideAnimations()
  ],
};
