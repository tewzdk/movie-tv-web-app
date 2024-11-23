import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

platformBrowserDynamic().bootstrapModule(AppModule);//, {
  //providers: provideAnimations()});

/*
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));*/