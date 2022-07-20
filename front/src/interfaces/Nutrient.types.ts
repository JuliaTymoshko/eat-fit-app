export interface NutrientType {
  dataType: string;
  description: string;
  fdcId: number;
  foodCode: number;
  foodNutrients: FoodNutrient[];
  publishedDate: string | Date;
}

export interface FoodNutrient {
  amount: number;
  name: string;
  number: string;
  unitName: string;
}
