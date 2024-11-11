export interface Recipe {
  id: number;
  title: string;
  description?: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: Unit;
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
