import * as ActionType from '../ActionType'

const initalState = {
    isLoading: false,
    doctors: [],
    error: ''
}

export const doctorreducer = (state = initalState, action) => {
    console.log(action.type, action.payload, state)
    switch (action.type) {
        case ActionType.GET_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctors: action.payload,
                error: ''
            }
        case ActionType.POST_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.concat(action.payload),
                error: ''
            }
        case ActionType.DELETE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.filter((d, i) => d.id !== action.payload),
                error: ''
            }
        case ActionType.UPDATE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.map((l) => {
                    if (l.id === action.payload.id) {
                        return action.payload
                    } else {
                        return l;
                    }
                }),
                error: ''
            }
        default:
            return state;
    }
}