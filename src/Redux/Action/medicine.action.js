import { BASE_URL } from '../../shared/baseurl';
import * as ActionType from "../ActionType"

export const getmedicine = () => (dispatch) => {
    try {
        dispatch(loadingMedicine());
        setTimeout(function () {
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
                .then(medicines => dispatch({ type: ActionType.GET_MEDICINE, payload: medicines }))
                .catch(error => dispatch({ type: ActionType.ERROR_MEDICINE, payload: error.message }))
        }, 2000)
    } catch (error) {
        dispatch({ type: ActionType.ERROR_MEDICINE, payload: error.message })
    }
}


export const postmedicine = (data) => (dispatch) => {
    try {
        dispatch(loadingMedicine());
        setTimeout(function () {
            return fetch(BASE_URL + 'medicines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
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
                .then(medicines => dispatch({ type: ActionType.ADD_MEDICINE, payload: medicines }))
                .catch(error => dispatch({ type: ActionType.ERROR_MEDICINE, payload: error.message }))
        }, 2000)
    } catch (error) {
        dispatch({ type: ActionType.ERROR_MEDICINE, payload: error.message })
    }
}

export const deleteMedicine = (id) => (dispatch) => {
    try {
        dispatch(loadingMedicine());
        return fetch(BASE_URL + 'medicines/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
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
                .then(medicines => dispatch({ type: ActionType.DELETE_MEDICINE, payload: id }))
                .catch(error => dispatch({ type: ActionType.ERROR_MEDICINE, payload: error.message }))
    } catch (error) {
        dispatch({ type: ActionType.ERROR_MEDICINE, payload: error.message })
    }
}

export const loadingMedicine = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_MEDICINE })
}

export const errorMedicine = (error) => (dispatch) => {
    dispatch({ type: ActionType.ERROR_MEDICINE, payload: error })
}
