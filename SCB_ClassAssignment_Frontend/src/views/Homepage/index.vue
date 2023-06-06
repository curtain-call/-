<template>
    <div class="home">
        <div style="height: 20px;">

        </div>
        <ElForm>
            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :span="5" :offset="2">
                    <ElInput placeholder="按姓名检索">

                    </ElInput>
                </el-col>
                <el-col :span="5" :gutter="2">
                    <ElInput placeholder="按求职意向检索">

                    </ElInput>
                </el-col>
                <el-col :span="5" :gutter="2">
                    <ElSelect placeholder="按学历检索">

                    </ElSelect>
                </el-col>
                <el-col :span="5" :gutter="2">
                    <ElSelect placeholder="按年龄检索">

                    </ElSelect>
                </el-col>

            </el-row>
            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="5" :offset="2">
                    <ElSelect placeholder="按性别检索">

                    </ElSelect>
                </el-col>

                <el-col :span="5" :gutter="2">
                    <ElSelect placeholder="选取匹配分数大于x的">

                    </ElSelect>
                </el-col>

                <el-col :span="5" :gutter="9">
                    <ElButton> 搜索 </ElButton>
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-bottom: 20px;">


            </el-row>


        </ElForm>

        <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <ElUpload :action="'http://localhost:5285/api/Resumes/UploadResume' + '?userId=' + '231'" drag
                    style="width: 100%;align-items: center;" :on-success="afterUpload">
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
        <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <ElTable :data="resumeList" :border="true" style="width: 100%;" max-height="250" @cell-click="clickItem">
                    <el-table-column label="姓名" />
                    <el-table-column label="性别" />
                    <el-table-column label="年龄" />
                    <el-table-column label="学历" />
                    <el-table-column label="求职意向" />
                    <el-table-column label="联系方式" />
                    <el-table-column label="匹配分数" />
                </ElTable>
                <ElPagination layout="prev, pager, next" :total="3" />
            </el-col>

        </el-row>


    </div>
</template>

<script>
import { ElRow, ElCol, ElUpload, ElTable, ElPagination, ElInput, ElSelect, ElForm, ElButton } from 'element-plus';



import axios from 'axios';
import * as docx from 'docx-preview';
import { renderAsync } from 'docx-preview';
import JSZip from 'jszip';

// 引入所有Store
import { useUser } from '../../stores/user';
import { useFileStore } from '../../stores/file'
import { useResumeDetail } from '../../stores/resume'

import pinia from '../../stores';
import { mapState, mapStores } from 'pinia';

export default {
    data() {
        return {
            fileLink: "http://ashuai.work:10000/getDoc",
            cardDisplay: false,
            cardTitle: ["基本信息", "获奖信息", "岗位信息"], // 遍历响应的json格式
            resumeList: []
        };
    },
    computed: {
        ...mapStores(useFileStore, useResumeDetail, useUser)
    },
    mounted() {
        window.JSZip = JSZip;
        // console.log("使用插件的renderAsync方法来渲染", docx);
        // console.log(this.ResumeDetailsStore)
        // const fileStore = useFileStore(pinia);

        this.getAllResumeList() // 挂载时先跑一遍, 获得以前上传过的所有信息

    },
    methods: {
        // 上传文件
        uploadFile(fileObj) {
            this.filePreviewStore.uploadFile(fileObj, '231').then(() => {
                // 上传成功后在本页要做什么? 跳转到详情页
                this.$router.push({ path: '/resume-parser' })
            })
        },
        // 预览
        goPreview() {
            // 点击之后应该是上传文件, 怎么上传呢
            axios({
                method: "get",
                responseType: "arraybuffer",
                url: this.fileLink // 一个word下载文件的接口
            }).then(({ data }) => {
                console.log(data); // 后端返回的是流文件
                /**
                * 第一个参数： data为文件流，Blob | ArrayBuffer | Uint8Array 格式
                * 第二个参数： 渲染到页面的dom元素
                * 第三个参数： 渲染word文档的样式的元素，如果为null，则设置到第二个参数的DOM上
                * 第四个参数： 配置对象
                */
                renderAsync(data, this.$refs.file, null, {
                    className: "text-docx",
                    inWrapper: true,
                    ignoreWidth: false,
                    ignoreHeight: false,
                    ignoreFonts: false,
                    breakPages: true,
                    ignoreLastRenderedPageBreak: true,
                    experimental: true,
                    trimXmlDeclaration: true,
                    useBase64URL: false,
                    useMathMLPolyfill: true,
                    debug: false //enables additional logging
                }); // 渲染到页面
                this.cardDisplay = true;
            });
        },
        // 点击table条目, 跳转到详情页
        clickItem(row, colomn, cell, event) {

        },
        // 获取以前存储的建简历信息
        getAllResumeList() {
            // 先更新state
            this.ResumeDetailsStore.getAllResumes({ userId: this.userStore.userId })
            // 将state映射到data
            this.resumeList = this.ResumeDetailsStore.Resumedetail
        },
        // 上传成功后的回调
        afterUpload(response, uploadFile) {
            // 预览和修改信息

            // 更新首页人才库表
            this.getAllResumeList()

        }

    },
    components: { ElUpload, ElTable, ElPagination, ElInput, ElSelect, ElForm, ElButton }
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


