import axios from "axios";
import { FETCH_GOAL_PROGRESS } from "../types";
import { GetProgress } from "../../configs/urls";

export const fetchGoalProgress = (goalId) => async (dispatch) => {
  try {
    const res = await axios.get(`${GetProgress}/${goalId}`);
    dispatch({
      type: FETCH_GOAL_PROGRESS,
      payload: res.data.data.progress,
    });
  } catch (err) {
    console.log(err);
  }
};
