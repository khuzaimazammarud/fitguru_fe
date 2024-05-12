import { FETCH_GOAL_PROGRESS } from "../types";

const initialState = {
  caloriesProgress: 0,
  proteinProgress: 0,
  carbsProgress: 0,
  fatsProgress: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_GOAL_PROGRESS:
      return action.payload;
    default:
      return state;
  }
}
