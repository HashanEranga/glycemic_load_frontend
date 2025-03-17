import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CalculateComponent } from './pages/calculate/calculate.component';
import { ResultsComponent } from './pages/results/results.component';
import { DietaryPracticesComponent } from './pages/dietary-practices/dietary-practices.component';
import { HowUseComponent } from './pages/how-use/how-use.component';

export const routes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: 'calculate', component: CalculateComponent},
    {path: 'results', component: ResultsComponent},
    {path: 'dietary-practices', component: DietaryPracticesComponent},
    {path: 'how-to-use', component: HowUseComponent},
    {path: "**", component: AboutComponent, pathMatch: 'full'}
];
