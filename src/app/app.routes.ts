import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CalculateComponent } from './pages/calculate/calculate.component';
import { ResultsComponent } from './pages/results/results.component';
import { DietaryPracticesComponent } from './pages/dietary-practices/dietary-practices.component';
import { HowUseComponent } from './pages/how-use/how-use.component';
import { GlycemicLoadComponent } from './pages/glycemic-load/glycemic-load.component';
import { GlycemicIndexComponent } from './pages/glycemic-index/glycemic-index.component';

export const routes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: 'calculate', component: CalculateComponent},
    {path: 'results', component: ResultsComponent},
    {path: 'dietary-practices', component: DietaryPracticesComponent},
    {path: 'how-to-use', component: HowUseComponent},
    {path: 'glycemic-load', component: GlycemicLoadComponent},
    {path: 'glycemic-index', component: GlycemicIndexComponent},
    {path: "**", component: AboutComponent, pathMatch: 'full'}
];
