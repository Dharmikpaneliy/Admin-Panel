import * as ActionType from '../ActionType';

export const incrementCounter = () => (dispatch) => {
    dispatch ({type:ActionType.INCREMENT_COUNTER})
}

export const decrementCounter = () => (dispatch) => {
    dispatch ({type:ActionType.DECREMENT_COUNTER})
}
