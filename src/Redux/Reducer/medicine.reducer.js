import * as ActionType from '../ActionType'

const initalState = {
    isLoading : false,
    medicines : [],
    error : ''
}

export const medicinereducer = (state = initalState, action) => {
    console.log(action.type );
    switch(action.type){
        case ActionType.GET_MEDICINE :
            return{
                ...state,
                isLoading : false,
                medicines : action.payload,
                error : ''
            }
        default : 
            return state;
    }
    
}