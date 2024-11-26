export interface Recipe {
  id: number;
  title: string;
  imageUrl?: string;
  description?: string;
  instructions: string[];
  ingredients: string[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Unit {
  abbreviation: string;
  name: string;
  type: UnitType | DBUnitType;
}

export enum UnitType {
  Weight = 1,
  Volume,
  Custom
}

export interface DBUnitType {
  type: string;
}
