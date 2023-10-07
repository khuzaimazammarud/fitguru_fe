export const API_BASE_URL = "http://192.168.100.110:3001";

export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const LOGIN = getApiUrl('/users/signin');
export const SIGNUP = getApiUrl('/users/signup');
export const sendEmail = getApiUrl('/users/forgotPassword');
export const VerifyOtp = getApiUrl('/users/verifyOtp');
export const CreateGoal =  getApiUrl('/goals/create');