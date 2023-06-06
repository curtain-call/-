import request from "../utils/request"

export function getResumeParser(data){
    return request({
        url: '/Resumes/DetailedResume',
        method: 'post',
        data
    })
}
export function getAllResumeParser(data){
    return request({
        url: '/Resumes/Allresumes',
        method: 'post',
        data
    })
}