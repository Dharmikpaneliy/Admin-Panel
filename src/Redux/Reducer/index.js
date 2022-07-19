import { combineReducers } from "redux";
import { counterReducer } from "./Counter.reducer";
import { doctorreducer } from "./doctor.reducer";
import { medicinereducer } from "./medicine.reducer";


export const rootreducer = combineReducers({
    counter : counterReducer,
    medicines : medicinereducer,
    doctor: doctorreducer
})