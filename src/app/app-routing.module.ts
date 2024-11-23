import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { ShowsComponent } from './pages/shows/shows.component';

export const routes: Route[] = [
  {
    path: '',
    component: ShowsComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
