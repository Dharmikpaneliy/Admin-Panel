import { BASE_URL } from '../../shared/baseurl';
import * as ActionType from "../ActionType"

export const getmedicine = () => (dispatch) => {
    // dispatch({ type: ActionType.GET_MEDICINE })
    try {
        return fetch(BASE_URL + 'medicines')
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(medicines => dispatch({type: ActionType.GET_MEDICINE , payload : medicines}) )

    } catch (error){console.log(error)}
}
