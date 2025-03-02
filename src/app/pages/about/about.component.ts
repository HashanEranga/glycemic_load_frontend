import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(private router: Router){

  }

  navigateToCalculation(){
    this.router.navigate(['/calculate'])
  }

  navigateToResults(){
    this.router.navigate(['/results'])
  }
}
