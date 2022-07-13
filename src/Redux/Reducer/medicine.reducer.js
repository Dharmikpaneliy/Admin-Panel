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
        case ActionType.DELETE_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicines: state.medicines.filter((d, i) => d.id !== action.payload),
                error: ''
            }
        case ActionType.EDIT_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicines: state.medicines.map((l) => {
                    if (l.id === action.payload.id) {
                        return action.payload
                    } else {
                        return l;
                    }
                }),
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