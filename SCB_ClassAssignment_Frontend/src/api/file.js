import request from "../utils/request"

export function getFile(data){
    return request({
        url: '/getfile',
        method: 'post',
        responseType: 'blob',
        data
    })
}
export function uploadFile(data, userId){
    return request({
        url: '/Resumes/UploadResume',
        method: 'post',
        headers: {
            "Content-type": "multipart/form-data"
        },
        // params:{ userId },
        data
    })
}