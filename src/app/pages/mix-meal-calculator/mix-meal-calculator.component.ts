import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResultsComponentService } from '../results/results.component.service';
import { HttpClientModule } from '@angular/common/http';
import { ResultsResponse } from '../../models/results.response';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mix-meal-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './mix-meal-calculator.component.html',
  styleUrl: './mix-meal-calculator.component.scss',
  providers: [ResultsComponentService]
})
export class MixMealCalculatorComponent {
  searchTerm: string = '';
  isDropdownOpen: boolean = false;
  selectedFood: any = null;
  filteredFood: ResultsResponse[] = [];
  foodData: ResultsResponse[] = [];
  selectedFoods: ResultsResponse[] = [];


  constructor(private resultsService: ResultsComponentService, private router: Router, private modalService: NgbModal){}

  openConfirmModal(content: any) {
    if (this.selectedFoods.length >= 2) {
      this.modalService.open(content, { centered: true });
    }
  }

  filterFood() {
    if (this.searchTerm.trim()) {
      this.resultsService.retrieveByName(this.searchTerm.trim()).subscribe(res => {
        this.foodData = res.results
        this.filteredFood = this.foodData.filter(food =>
          food.foodName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      })
    } else {
      this.filteredFood = [...this.foodData];
    }
  }

  selectFood(food: any) {
    if (!this.selectedFoods.find(f => f.foodName === food.foodName)) {
      this.selectedFoods.push(food);
    }
    this.selectedFood = food;
    this.searchTerm = food.foodName;
    this.isDropdownOpen = false;
    this.searchTerm = '';
  }

  applySearch() {
    console.log('Search clicked:', this.searchTerm);
  }

  closeDropdownWithDelay() {
    setTimeout(() => this.isDropdownOpen = false, 2000);
  }

  getAlertClass(food : ResultsResponse): string {
    if (!food) return 'alert-secondary';

    const gi = food.glycemicLoad;
    if (gi <= 10) return 'alert-success'; 
    if (gi <= 19) return 'alert-warning';
    return 'alert-danger'; 
  }

  removeFood(index: number) {
    this.selectedFoods.splice(index, 1);
  }

  predictGlycemicLoad() {
    if (this.selectedFoods.length >= 2) {
      const totalPortionSize = this.selectedFoods.reduce((sum, food) => sum + food.portionSize, 0);

      const totalNutrients = this.selectedFoods.reduce((totals, food) => {
        totals.carbs += food.nutrients.carbs;
        totals.protein += food.nutrients.protein;
        totals.fats += food.nutrients.fats;
        totals.fiber += food.nutrients.fiber;
        return totals;
      }, { carbs: 0, protein: 0, fats: 0, fiber: 0 });

      const avgNutrients = {
        carbs: parseFloat((totalNutrients.carbs / totalPortionSize * 100).toFixed(2)),
        protein: parseFloat((totalNutrients.protein / totalPortionSize * 100).toFixed(2)),
        fats: parseFloat((totalNutrients.fats / totalPortionSize * 100).toFixed(2)),
        fiber: parseFloat((totalNutrients.fiber / totalPortionSize * 100).toFixed(2))
      };

      console.log('Predicted Mixed Meal Glycemic Load:', {
        totalPortionSize,
        totalNutrients,
        avgNutrients
      });

      this.router.navigate(['/calculate'], {
        queryParams: {
          portionSize: totalPortionSize,
          carbs: avgNutrients.carbs,
          protein: avgNutrients.protein,
          fats: avgNutrients.fats,
          fiber: avgNutrients.fiber
        }
      });
    }
  }
}
