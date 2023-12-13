import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubscriberManagerComponent } from './subscriber-manager/subscriber-manager.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'subscribers', component: SubscriberManagerComponent}
];
