import { defineStore } from "pinia";
import { uploadFile } from "../api/file";

export const useFileStore = defineStore('filePreview',{
    state: ()=>({
        filelink: 'http://ashuai.work:10000/getDoc'
    }),
    actions:{
        set_file_link(fileLink){
            this.filelink = fileLink

        },
        uploadFile(fileObj, id){
            console.log(fileObj)
            let formdata = new FormData();
            formdata.set("file", fileObj)
            console.log(formdata)
            return new Promise((resolve,reject) => {
               uploadFile(formdata, id)
               .then((response)=>{
                    console.log(response)
                    // 这里写要对返回的请求做什么事

                    resolve()
               })
               .catch(error => {
                   console.log(error)
                   reject(error)
               })
            })
        }
    }
})