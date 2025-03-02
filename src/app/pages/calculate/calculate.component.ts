import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CalculateComponentService } from './calculate.component.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-calculate',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule, HttpClientModule],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss',
  providers: [CalculateComponentService]
})
export class CalculateComponent {
  glycemicForm: FormGroup;
  result: any = null;
  isLoading: boolean = false; 
  foodName: string = '';

  constructor(private calculateService: CalculateComponentService) {
    this.glycemicForm = new FormGroup({
      foodName: new FormControl('', [Validators.required]),
      portionSize: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]),
      carbohydrates: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]),
      protein: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]),
      totalFat: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]),
      dietaryFiber: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)])
    });
  }

  onSubmit() {
    if (this.glycemicForm.valid) {
      this.isLoading = true;  
      var data = {
        "foodName" : this.glycemicForm.controls["foodName"].value,
        "portionSize": this.glycemicForm.controls["portionSize"].value,
        "nutrients": {
          "carbs": this.glycemicForm.controls["carbohydrates"].value,
          "fats": this.glycemicForm.controls["totalFat"].value,
          "protein": this.glycemicForm.controls["protein"].value,
          "fiber": this.glycemicForm.controls["dietaryFiber"].value
        }
      }
      this.calculateService.saveNutrients(data).subscribe(res => {
        this.result = res.glycemicLoad
        this.isLoading = false
        this.foodName = res.foodName
      })
    } else {
      console.log("Form is invalid");
    }
  }

  getCategory(): string {
    if (this.result === null) return '';
    if (this.result >= 0 && this.result <= 10) return 'Low';
    if (this.result > 10 && this.result <= 20) return 'Medium';
    return 'High';
  }

  getProgressClass(): string {
    if (this.result === null) return 'bg-secondary';
    if (this.result >= 0 && this.result <= 10) return 'bg-success';  
    if (this.result > 10 && this.result <= 20) return 'bg-warning'; 
    return 'bg-danger';
  }

  getAlertClass(): string {
    if (this.result === null) return 'alert-secondary';
    if (this.result >= 0 && this.result <= 10) return 'alert-success';
    if (this.result > 10 && this.result <= 20) return 'alert-warning'; 
    return 'alert-danger'; 
  }

  resetForm(){
    this.result = null
    this.foodName = ''
    this.glycemicForm.reset();
  }
  
}
