import { Routes } from '@angular/router';
import {AuthGuard} from './app/guards/auth.guard'
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { LoginFormComponent } from './app/components/login-form/login-form.component';
import { SignupFormComponent } from './app/components/signup-form/signup-form.component';
import { componentFactoryName }  from '@angular/compiler';
import { ProfileComponent } from './app/components/profile/profile.component';

export const appRoutes: Routes = [
    {path: 'signup', component: SignupFormComponent },
    {path: 'login', component: LoginFormComponent },
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    {path: '', redirectTo: '/login', pathMatch: 'full' }                
]