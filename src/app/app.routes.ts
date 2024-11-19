import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from '@myngapp/shared-components';
import { AboutComponent } from './about/about.component';
import { MoreComponent } from './more/more.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'more', component: MoreComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];
