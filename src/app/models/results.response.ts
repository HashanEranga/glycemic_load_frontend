export class ResultsResponse {
    foodName: string = '';
    portionSize: number = 0;
    nutrients: Nutrients = new Nutrients(0,0,0,0);
    glycemicLoad: number = 0;
  
    constructor(foodName: string, portionSize: number, nutrients: Nutrients, glycemicLoad: number) {
      this.foodName = foodName
      this.portionSize = portionSize
      this.nutrients = nutrients
      this.glycemicLoad = glycemicLoad
    }
}

export class Nutrients{
    carbs: number = 0;
    fats: number = 0;
    protein: number = 0;
    fiber: number = 0;

    constructor(carbs: number, fats: number, protein: number, fiber: number){
        this.carbs = carbs
        this.fats = fats
        this.protein = protein
        this.fiber = fiber
    }
}
  