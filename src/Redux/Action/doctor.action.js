import { deletedoctordata, getdoctordata, postdoctordata, updatedoctordata } from "../../common/apis/doctor.api";
import * as ActionType from "../ActionType"

export const getdata = () => (dispatch) => {
    try {
        getdoctordata()
        .then((data) => dispatch({ type: ActionType.GET_DOCTOR, payload: data.data }))
    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}

export const postdata = (data) => (dispatch) => {
    try {
        setTimeout(function() {
            return postdoctordata(data)
                .then((data) => dispatch({ type: ActionType.POST_DOCTOR, payload: data.data }))
        }, 2000)
    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}

export const deletedata = (id) => (dispatch) => {
    try {
        return deletedoctordata(id)
        .then(dispatch({ type: ActionType.DELETE_DOCTOR, payload: id }))
    }catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}

export const updatedoctor = (data) => (dispatch) => {
    try {
        return  updatedoctordata (data)
        .then ((data) =>dispatch({ type: ActionType.UPDATE_DOCTOR, payload: data.data }))
    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}