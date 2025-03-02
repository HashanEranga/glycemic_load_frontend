import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponentService } from './results.component.service';
import { Nutrients, ResultsResponse } from '../../models/results.response';
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  providers: [ResultsComponentService]
})
export class ResultsComponent implements OnInit{
  constructor(private resultsService: ResultsComponentService){

  }

  ngOnInit(): void {
    this.loadDetails()
  }

  foodData: ResultsResponse[] = [];

  selectedFood: any = null;
  currentPage = 1;
  pageSize = 4;
  searchTerm: string = '';
  filteredData = [...this.foodData];
  displayedFoodData = [...this.foodData];
  totalPagesCount: number = Math.ceil(this.foodData.length / this.pageSize);

  get totalPages(): number {
    return Math.ceil(this.foodData.length / this.pageSize);
  }

  loadDetails(){
    this.resultsService.retrieveAll().subscribe(res => {
      this.foodData = res.results
    })
  }

  showDetails(food: any) {
    this.selectedFood = food;
    this.updatePagination();
  }

  get paginatedFoodData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.foodData.slice(startIndex, startIndex + this.pageSize);
  }

  getAlertClass(): string {
    if (!this.selectedFood) return 'alert-secondary';

    const gi = this.selectedFood.glycemicLoad;
    if (gi <= 10) return 'alert-success'; 
    if (gi <= 19) return 'alert-warning';
    return 'alert-danger'; 
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
  }

  filteredFoodData() {
    return this.foodData
      .filter(food => food.foodName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  applySearch() {
    this.resultsService.retrieveByName(this.searchTerm.toLowerCase()).subscribe(res => {
      this.filteredData = res.results
      this.currentPage = 1;
      this.foodData = this.filteredData
      this.updatePagination();
    })
  }

  updatePagination() {
    this.totalPagesCount = Math.ceil(this.filteredData.length / this.pageSize);
    this.displayedFoodData = this.filteredData.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
}
