import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./reducers";
import goalReducer from "./moreReducer/goalReducer";


const RootReducer = combineReducers({
    AuthReducer,
    goal: goalReducer
});

export const store = createStore(RootReducer, applyMiddleware(thunk));