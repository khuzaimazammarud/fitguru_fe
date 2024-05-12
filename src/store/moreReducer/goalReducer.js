import { FETCH_GOAL_PROGRESS } from "../types";

const initialState = {
  caloriesProgress: 0,
  proteinProgress: 0,
  carbsProgress: 0,
  fatsProgress: 0,
  foods: [],
  totalCalories: 0,
  totalProtein: 0,
  totalFats: 0,
  totalCarbs: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_GOAL_PROGRESS:
      const { progress, totalCalories, totalProtein, totalFats, totalCarbs, allFoods } = action.payload;
      return {
        ...state,
        caloriesProgress: progress.caloriesProgress,
        proteinProgress: progress.proteinProgress,
        carbsProgress: progress.carbsProgress,
        fatsProgress: progress.fatsProgress,
        totalCalories,
        totalProtein,
        totalFats,
        totalCarbs,
        foods: allFoods,
      };
    default:
      return state;
  }
}
