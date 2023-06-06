import { defineStore } from "pinia";
import { getAllResumeParser } from "../api/resume";

export const useResumeDetail = defineStore('ResumeDetails', {
    state: () => ({
        Resumedetail: []
    }),
    actions: {
        pushResume(info) {
            this.Resumedetail.push(info)
        },
        delete(info) {
            this.Resumedetail = this.Resumedetail.filter(item => {
                item.name === info
            })
        },
        getAllResumes(info) {
            return new Promise((resolve, reject) => {
                getAllResumeParser(info)
                    .then((response) => {
                        // 把响应的数据更新到state里
                        this.Resumedetail = response.data
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        }
    }
})