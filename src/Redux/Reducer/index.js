import { combineReducers } from "redux";
import { counterReducer } from "./Counter.reducer";
import { medicinereducer } from "./medicine.reducer";


export const rootreducer = combineReducers({
    counter : counterReducer,
    medicines : medicinereducer
})