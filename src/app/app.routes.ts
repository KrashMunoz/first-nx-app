import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from '@myngapp/shared-components';
import { AboutComponent } from './about/about.component';
import { MoreComponent } from './more/more.component';
import { GialloComponent } from './giallo-home/giallo.component';
import { ShowcaseComponent } from './showcase/showcase.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'more', component: MoreComponent },
  { path: 'giallo', component: GialloComponent },
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];
