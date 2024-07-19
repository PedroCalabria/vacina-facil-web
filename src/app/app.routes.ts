import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './guard/login.guard';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { authGuard } from './guard/auth.guard';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';
import { RegisterAppointmentComponent } from './pages/register-appointment/register-appointment.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'appointments',
        pathMatch: 'full'
    },
    {
        path: 'appointments',
        component: AppointmentsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'register',
        component: RegisterPatientComponent
    },
    {
        path: 'schedule',
        component: RegisterAppointmentComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: '/'
    }    
];
