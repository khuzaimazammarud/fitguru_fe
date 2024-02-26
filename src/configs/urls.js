export const API_BASE_URL = "http://192.168.18.10:3001";
// export const API_BASE_URL = "http://192.168.100.5:3001";

export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const LOGIN = getApiUrl("/users/signin");
export const SIGNUP = getApiUrl("/users/signup");
export const sendEmail = getApiUrl("/users/sendemail");
export const VerifyOtp = getApiUrl("/users/verifyOtp");
export const UpdatePassword = getApiUrl("/users/updatePassword");
export const CreateGoal = getApiUrl("/goals/create");
export const GetFood = getApiUrl("/food");
export const CreatePost = getApiUrl("/posts/create");
