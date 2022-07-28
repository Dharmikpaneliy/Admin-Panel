import * as Actiontype from '../Actiontype';

export const themeReducer = (state , action) => {
    switch (action.type) {
        case  Actiontype.TOOGLE_THEME:
            return {
                ...state,
                theme : action.payload
            }
        default :
            return state;
    }
}