import { deletedoctordata, getdoctordata, postdoctordata, updatedoctordata } from "../../common/apis/doctor.api";
import * as ActionType from "../ActionType";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../Firebase";
import Doctor from "../../Container/Doctor/Doctor";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getdata = () => async (dispatch) => {
    try {
        // getdoctordata()
        const querySnapshot = await getDocs(collection(db, "doctor"));

        let data = [];

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            // console.log(`${doc.id} => ${doc.data()}`);
        });
        dispatch({ type: ActionType.GET_DOCTOR, payload: data })

        // .then((data) => dispatch({ type: ActionType.GET_DOCTOR, payload: data.data }))
    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}

export const postdata = (data) => async (dispatch) => {
    console.log(data);
    try {

        const randomstr = Math.floor(Math.random() * 100000).toString();
        const imagesRef = ref(storage, 'doctor/' + randomstr);

        uploadBytes(imagesRef, data.file)
            .then((snapshot) => {
                getDownloadURL((snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "doctor"), {
                            degree: data.degree,
                            department: data.department,
                            email: data.email,
                            name: data.name,
                            file: url,
                            fileName: randomstr
                        });
                        dispatch({
                            type: ActionType.POST_DOCTOR, payload: {
                                id: docRef.id,
                                degree: data.degree,
                                department: data.department,
                                email: data.email,
                                name: data.name,
                                file: url,
                                fileName: randomstr
                            }
                        })
                    });
            });



        // setTimeout(function() {
        //     return postdoctordata(data)
        //         .then((data) => dispatch({ type: ActionType.POST_DOCTOR, payload: data.data }))
        // }, 2000)

    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}

export const deletedata = (data) => async (dispatch) => {
    console.log(data);
    try {

        const desertRef = ref(storage, 'doctor/'+ data.fileName);

        
        deleteObject(desertRef).then(async() => {
            await deleteDoc(doc(db, "doctor", data.id));

            dispatch({type : ActionType.DELETE_DOCTOR, payload: data.id})
        }).catch((error) => {
            dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
        });

        // return deletedoctordata(id)
        //     .then(dispatch({ type: ActionType.DELETE_DOCTOR, payload: id }))
    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}

export const updatedoctor = (data) => async (dispatch) => {
    try {

        const doctorRefedit = doc(db, "doctor", data.id);
        if (typeof data.file === "string") {
            await updateDoc(doctorRefedit, {
                degree: data.degree,
                department: data.department,
                email: data.email,
                name: data.name,
                file: data.url
            });
            dispatch({ type: ActionType.UPDATE_DOCTOR, payload: data })

        } else {
            const doctorRefdel = ref(storage, 'doctor/' + data.fileName);

            deleteObject(doctorRefdel).then(async () => {
                const randomstr = Math.floor(Math.random() * 100000).toString();
                const doctorRef = ref(storage, 'doctor/' + randomstr);

                uploadBytes(doctorRef, data.file)
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                            .then(async (url) => {
                                await updateDoc(doctorRefedit, {
                                    degree: data.degree,
                                    department: data.department,
                                    email: data.email,
                                    name: data.name,
                                    file: url,
                                    fileName: randomstr
                                });
                                dispatch({ type: ActionType.UPDATE_DOCTOR, payload: { ...data, fileName: randomstr, file: url, } })
                            })
                    }
                    )
            })
        }

        // const washingtonRefup = doc(db, "doctor", data.id);
        // await updateDoc(washingtonRefup, {
        //     degree: data.degree,
        //     department: data.department,
        //     email: data.email,
        //     name: data.name
        // });

        // dispatch({ type: ActionType.UPDATE_DOCTOR, payload: data })
        // return updatedoctordata(data)
        //     .then((data) => dispatch({ type: ActionType.UPDATE_DOCTOR, payload: data.data }))
    } catch (error) {
        dispatch({ type: ActionType.ERROR_DOCTOR, payload: error.message })
    }
}