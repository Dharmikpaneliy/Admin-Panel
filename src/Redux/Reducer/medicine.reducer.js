import * as ActionType from '../ActionType'

const initalState = {
    isLoading: false,
    medicines: [],
    error: ''
}

export const medicinereducer = (state = initalState, action) => {
    console.log(action.type);
    switch (action.type) {
        case ActionType.LOADING_MEDICINE:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionType.GET_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicines: action.payload,
                error: ''
            }
        case ActionType.ADD_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicines: state.medicines.concat(action.payload),
                error: ''
            }
        case ActionType.ERROR_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicines: [],
                error: action.payload
            }
        default:
            return state;
    }

}