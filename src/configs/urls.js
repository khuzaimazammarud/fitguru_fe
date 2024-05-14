export const API_BASE_URL = "http://192.168.18.10:3001";
// export const API_BASE_URL = "http://192.168.100.5:3001";

export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const LOGIN = getApiUrl("/users/signin");
export const SIGNUP = getApiUrl("/users/signup");
export const sendEmail = getApiUrl("/users/sendemail");
export const VerifyOtp = getApiUrl("/users/verifyOtp");
export const UpdatePassword = getApiUrl("/users/updatePassword");
export const UpdateWeights = getApiUrl("/users/updateWeight");
export const CreateGoal = getApiUrl("/goals/create");
export const getGoal = getApiUrl("/goals/user");
export const GetFood = getApiUrl("/food");
export const CreatePost = getApiUrl("/posts/create");
export const getPostByFollower = getApiUrl("/posts/follower");
export const getPostByUser = getApiUrl("/posts/currentUser");
export const CreateComment = getApiUrl("/comment/create");
export const GetComments = getApiUrl("/comment");
export const LogMeal = getApiUrl("/progress");
export const GetProgress = getApiUrl("/progress/total");
export const DeleteEntry = getApiUrl("/progress");
export const ProgressAnalytics = getApiUrl("/progress");