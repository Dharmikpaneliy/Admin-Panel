import { deleterequest, getrequest, postrequest, putrequest } from "../request"

export const getdoctordata = () => {
    return getrequest('doctors')
}

export const postdoctordata = (data) => {
    return postrequest('doctors',data)
}

export const deletedoctordata = (id) => {
    return deleterequest ('doctors/', id)
}

export const updatedoctordata = (data) => {
   return putrequest ('doctors/', data)
}