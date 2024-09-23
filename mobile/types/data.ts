interface DietPlan {
  time: string;
  name: string;
  meals: string[];
}

export interface Data {
  name: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  objective: string;
  diet_plan: DietPlan[];
  supplements: string[];
}
