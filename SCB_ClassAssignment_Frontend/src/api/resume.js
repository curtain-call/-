import request from "../utils/request"

export function getResumeParser(data){
    return request({
        url: '/ResumeView/DetailedResume',
        method: 'post',
        data
    })
}
export function getAllResumeParser(data){
    return request({
        url: '/ResumeView/AllResumes',
        method: 'post',
        data
    })
}