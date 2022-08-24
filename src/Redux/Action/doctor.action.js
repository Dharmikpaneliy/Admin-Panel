import { deletedoctordata, getdoctordata, postdoctordata, updatedoctordata } from "../../common/apis/doctor.api";
import * as ActionType from "../ActionType";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import Doctor from "../../Container/Doctor/Doctor";

export const getdata = () => async (dispatch) => {
    try {
        // getdoctordata()
        const querySnapshot = await getDocs(collection(db, "doctor"));

        let data = [];

        querySnapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()})
            // console.log(`${doc.id} => ${doc.data()}`);
        });
        dispatch({type : ActionType.GET_DOCTOR, payload: data})

        // .then((data) => dispatch({ type: ActionType.GET_DOCTOR, payload: data.data }))
    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}

export const postdata = (data) => async (dispatch) => {
    try {

        const docRef = await addDoc(collection(db, "doctor"), data );
        console.log("Document written with ID: ", docRef.id);

        dispatch({ type: ActionType.POST_DOCTOR, payload: {id: docRef.id , ...data} })

        // setTimeout(function() {
        //     return postdoctordata(data)
        //         .then((data) => dispatch({ type: ActionType.POST_DOCTOR, payload: data.data }))
        // }, 2000)

    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}

export const deletedata = (id) => async (dispatch) => {
    console.log(id);
    try {

        await deleteDoc(doc(db, "doctor", id));

        dispatch({type : ActionType.DELETE_DOCTOR, payload: id})

        // return deletedoctordata(id)
        //     .then(dispatch({ type: ActionType.DELETE_DOCTOR, payload: id }))
    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}

export const updatedoctor = (data) => async (dispatch) => {
    try {

        const washingtonRef = doc(db, "doctor", data.id);
        await updateDoc(washingtonRef, {
            degree: data.degree,
            department: data.department,
            email: data.email,
            name: data.name
        });

        dispatch({type: ActionType.UPDATE_DOCTOR, payload: data})
        // return updatedoctordata(data)
        //     .then((data) => dispatch({ type: ActionType.UPDATE_DOCTOR, payload: data.data }))
    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}