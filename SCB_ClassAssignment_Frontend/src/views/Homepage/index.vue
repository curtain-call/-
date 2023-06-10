<template>
    <div class="home">
        <div style="height: 50px;">

        </div>
        <ElForm>
            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :span="5" :offset="2">
                    <ElSelect placeholder="按学历检索" v-model="edu_select" clearable="true">
                        <ElOption v-for="item in ['专科', '本科', '硕士', '博士']" :value="item" />
                    </ElSelect>
                </el-col>
                <el-col :span="5">
                    <ElSelect placeholder="按年龄检索" v-model="age_select" clearable="true">
                        <ElOption v-for="item in Array.from({ length: 100 }, (_, i) => 1 + (i))" :value="item" />
                    </ElSelect>
                </el-col>

                <el-col :span="5" :offset="1">
                    <ElSelect placeholder="按性别检索" v-model="gender_select" clearable="true">
                        <ElOption v-for="item in ['男', '女']" :value="item" />
                    </ElSelect>
                </el-col>

                <el-col :span="5">
                    <ElSelect placeholder="选取匹配分数大于x的" v-model="matchingscore__select" clearable="true">
                        <ElOption v-for="item in Array.from({ length: 100 }, (_, i) => 1 + (i))" :value="item" />
                    </ElSelect>
                </el-col>

            </el-row>
            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="8" :offset="2">
                    <ElInput placeholder="按姓名检索" v-model="name_select">

                    </ElInput>
                </el-col>
                <el-col :span="8">
                    <ElInput placeholder="按求职意向检索" v-model="jobintension_select">

                    </ElInput>
                </el-col>

                <el-col :span="4">
                    <ElButton style="width: 100%;" @click="Search" type="primary"> 搜 索 </ElButton>
                </el-col>
            </el-row>
        </ElForm>

        <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <!-- action = "'http://localhost:5168/api/ResumeView/UploadResume' + '?userId=' + userStore.userId" -->
                <ElUpload action="" :http-request="uploadFile" drag style="width: 100%;align-items: center;"
                    :on-change="afterUpload" v-loading="isLoading" element-loading-text="Loading..."
                    :element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50"
                    element-loading-background="rgba(122, 122, 122, 0.8)" limit="3">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件到此或 <em>点击上传</em>
                    </div>
                </ElUpload>
            </el-col>
            <!-- <el-col span="10" v-if="cardDisplay">
                <el-card v-for="title in this.cardTitle">
                    kapian
                </el-card>
            </el-col> -->
        </el-row>
        <!-- <el-row :gutter="20">
            <el-col :span="20" :offset="">
                <button @click="goPreview">点击预览word文件</button>
                <div class="docWrap">
                    <div ref="file" class="Doc"></div>
                </div>
            </el-col>
        </el-row> -->
        <el-row :gutter="30">
            <el-col :span="20" :offset="2">
                <ElTable :data="resumeList" :border="true" style="width: 100%;" max-height="300px" @cell-click="clickItem">
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="gender" label="性别" />
                    <el-table-column prop="age" label="年龄" />
                    <el-table-column prop="highestEducation" label="学历" />
                    <el-table-column prop="jobIntention" label="求职意向" />
                    <el-table-column prop="phoneNumber" label="联系方式" />
                    <el-table-column prop="matChingScore" label="匹配分数" />
                    <ElPagination layout="prev, pager, next" :total="3" />
                </ElTable>

            </el-col>

        </el-row>

        <div class="docWrap">
            <div ref="file" class="Doc"></div>
        </div>

        <ElDrawer v-model="drawer_resume" title="简历信息详情" direction="rtl" :open="showDetail" :close="onClose" :size="'50%'"
            destroy-on-close>
            <!-- 这里要看点击的是哪一个了 -->
            <resumeDetails :resumeDetail="detail" />
        </ElDrawer>

    </div>
</template>

<script>
import { ElRow, ElCol, ElUpload, ElTable, ElPagination, ElInput, ElSelect, ElForm, ElButton, ElDrawer, ElOption } from 'element-plus';
import resumeDetails from './component/resumeDetails.vue';


import axios from 'axios';
import * as docx from 'docx-preview';
import { renderAsync } from 'docx-preview';
import JSZip from 'jszip';

import { getResumeParser } from '../../api/resume'

// 引入所有Store
import { useUser } from '../../stores/user';
import { useFileStore } from '../../stores/file'
import { useResumeDetail } from '../../stores/resume'

import pinia from '../../stores';
import { mapState, mapStores } from 'pinia';

// import { PubSub } from "pubsub-js"

export default {
    data() {
        return {
            resumeList: [],
            drawer_resume: false,
            drawer_jobinfo: false,
            detail: {},

            // 搜索框绑定值, 搜索可以取用这里的值做匹配,好活儿
            edu_select: '',
            age_select: '',
            gender_select: '',
            matchingscore__select: '',
            name_select: '',
            jobintension_select: '',
            isLoading: false,
            svg: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
        };
    },
    computed: {
        ...mapStores(useFileStore, useResumeDetail, useUser)
    },
    mounted() {

        console.log(PubSub)
        window.JSZip = JSZip;
        // console.log("使用插件的renderAsync方法来渲染", docx);
        // console.log(this.ResumeDetailsStore)
        // const fileStore = useFileStore(pinia);

        // getResumeParser({rId: 2})

        this.getAllResumeList() // 挂载时先跑一遍, 获得以前上传过的所有信息

    },
    methods: {

        uploadFile(options) {
            // this.goPreview(options.file)
            this.isLoading = !this.isLoading
            const file = options.file
            this.filePreviewStore.uploadFile(file, 2).then(response => {
                console.log(response)
                // 上传成功后在本页要做什么? 跳转到详情页
                // 马上级联请求解析信息
                getResumeParser({ rId: response.rid })
                    .then(response => {
                        const detailedResume = response.detailedResume
                        this.ResumeDetailsStore.Resumedetail = detailedResume

                        console.log(file)
                        this.ResumeDetailsStore.set_file(file)
                        // 页面间通讯, 把rid显示在url里
                        this.$router.push({
                            path: '/resume-parser:id'
                        })

                    })
            })
        },

        // 点击table条目, 跳转到详情页
        clickItem(row, colomn, cell, event) {
            console.log(row, colomn, cell, event)
            // row是存着rid的
            if (colomn.label !== '匹配分数') {
                console.log("点击获取", row.rid)
                this.showDetail(row.rid)
                // drawer弹出
                this.drawer_resume = !this.drawer_resume
            } else {
                this.$router.push({ path: '/job-info:id', params: { id: this.ResumeDetailsStore.ResumeList[0].id } })
            }

        },
        // 获取以前存储的建简历信息
        getAllResumeList() {
            // 先更新state
            console.log("更新Resume state")
            console.log("userid = ", this.userStore.userId)
            this.ResumeDetailsStore.getAllResumes({ userId: this.userStore.userId })
                // this.ResumeDetailsStore.getAllResumes({ userId: 1 })
                .then(() => {
                    this.resumeList = Array.from(this.ResumeDetailsStore.ResumeList)
                    console.log(this.resumeList)
                    resolve()
                })
                .catch((error) => {
                    // reject(error)
                })
        },
        // 上传成功后的回调
        // 检索
        Search() {
            // edu_select: '',
            // age_select:'',
            // gender_select: '',
            // matchingscore__select:'',
            // name_select: '',
            // jobintension_select: '',

            // 深拷贝
            this.resumeList = this.ResumeDetailsStore.ResumeList
            if (this.edu_select) {
                this.resumeList = this.resumeList.filter(item => {
                    item.highestEducation == this.edu_select
                })
            }
            if (this.age_select) {
                this.resumeList = this.resumeList.filter(item => {
                    item.age < this.age_select
                })
            }

        },
        // 开启回调
        showDetail(rid) {
            // 还是从全局事件总线调用
            getResumeParser({ rId: rid })
                .then((response) => {
                    this.ResumeDetailsStore.Resumedetail = response.detailedResume
                    this.detail = this.ResumeDetailsStore.Resumedetail
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        },
        onClose() {
            this.drawer_resume = false
        }

    },
    components: { ElUpload, ElTable, ElPagination, ElInput, ElSelect, ElForm, ElButton, ElDrawer, resumeDetails, ElOption }
}
</script>

<style scoped lang="scss">
.docWrap {
    width: 100%;

    .Doc {
        width: 100%;
    }
}

:deep(.docx-wrapper) {
    width: 50%;
}

:deep(.docx-wrapper > section-docx) {
    width: 100%;
}
</style>


