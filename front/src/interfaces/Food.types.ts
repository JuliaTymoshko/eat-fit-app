export interface Food {
  additionalDescriptions: string;
  allHighlightFields: string;
  commonNames: string;
  dataType: string;
  description: string;
  fdcId: number;
  finalFoodInputFoods: FinalFoodInputFoods[];
  foodAttributeTypes: FoodAttributeTypes[];
  foodAttributes: any[];
  foodCategory: string;
  foodCategoryId: number;
  foodCode: number;
  foodMeasures: FoodMeasure[];
  foodNutrients: FoodNutrient[];
  foodVersionIds: number[];
  lowercaseDescription: string;
  publishedDate: string | Date;
  score: number;
}

export interface FinalFoodInputFoods {
  foodDescription: string;
  gramWeight: number;
  id: number;
  portionCode: string;
  portionDescription: string;
  rank: number;
  srCode: number;

  unit: string;
  value: number;
}

export interface FoodAttributeTypes {
  description: string;
  foodAttributes: Array<Attribute>;
  id: number;
  name: string;
}

export interface Attribute {
  id: number;
  value: string;
}

export interface FoodMeasure {
  disseminationText: string;
  gramWeight: number;
  id: number;
  measureUnitAbbreviation: string;
  measureUnitId: number;
  measureUnitName: string;
  modifier: string;
  rank: number;
}

export interface FoodNutrient {
  foodNutrientId: number;
  indentLevel: number;
  nutrientId: number;
  nutrientName: string;
  nutrientNumber: string;
  rank: number;
  unitName: string;
  value: number;
}
