import {Routes} from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {authGuard} from "./guard/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {BaseComponent} from "./components/base/base.component";
import {SignupComponent} from "./components/signup/signup.component";

export const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'tasks',
        loadComponent: () => import('./components/my-tasks/my-tasks.component').then(m => m.MyTasksComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
