import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CalculateComponent } from './pages/calculate/calculate.component';
import { ResultsComponent } from './pages/results/results.component';

export const routes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: 'calculate', component: CalculateComponent},
    {path: 'results', component: ResultsComponent},
    {path: "**", component: AboutComponent, pathMatch: 'full'}
];
