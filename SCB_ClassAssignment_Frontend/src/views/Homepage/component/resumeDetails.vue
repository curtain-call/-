<template>
    <div class="container">
        <!-- 基本信息
        <div :class="['basisInfo', 'card']" style="margin-bottom: 20px;">
            <ElCard header="基本信息">
                

            </ElCard>
        </div> 
<div :class="['eduBackGround', 'card']" style="margin-bottom: 20px;">
            <ElCard header="教育经历">

            </ElCard>
        </div>

        <div :class="['workExperience', 'card']" style="margin-bottom: 20px;">
            <ElCard header="工作经验">

            </ElCard>
        </div>

        <div :class="['certificate', 'card']" style="margin-bottom: 20px;">
            <ElCard header="社会经历">

            </ElCard>
        </div>

        <div :class="['SupplementInfo', 'card']" style="margin-bottom: 20px;">
            <ElCard header="补充信息">

            </ElCard>
        </div>
        {{ basisInfo }} -->

        <ElCard :header="titles[0]" style="margin-bottom: 30px;">
            <!-- 基本信息 -->
            <span>姓名: </span>
            <ElInput v-model="this.resumeDetail.name" margin-bottom="10px"></ElInput>
            <span>年龄: </span>
            <ElInput v-model="this.resumeDetail.age" margin-bottom="10px"></ElInput>
            <span>性别: </span>
            <ElInput v-model="this.resumeDetail.gender" margin-bottom="10px"></ElInput>
            <span>电子邮箱: </span>
            <ElInput v-model="this.resumeDetail.email" margin-bottom="10px"></ElInput>
            <span>联系电话: </span>
            <ElInput v-model="this.resumeDetail.phoneNumber" margin-bottom="10px"></ElInput>
            <span>最高学历: </span>
            <ElInput v-model="this.resumeDetail.highestEducation" margin-bottom="10px"></ElInput>
        </ElCard>

        <ElCard :header="titles[1]" style="margin-bottom: 30px;">
            <!-- 工作经历 -->
            <template v-for="(item, index) in this.resumeDetail.workExperience" :key="index">
                <span>公司: </span>
                <ElInput v-model="item.companyName" margin-bottom="10px"></ElInput>
                <span>职位: </span>
                <ElInput v-model="item.position" margin-bottom="10px"></ElInput>
                <span>时间: </span>
                <ElInput v-model="item.time" margin-bottom="10px"></ElInput>
                <span>具体经历: </span>
                <ElInput v-model="item.task" margin-bottom="10px"></ElInput>
            </template>

        </ElCard>

        <ElCard :header="titles[2]" style="margin-bottom: 30px;">
            <!-- 教育背景 -->
            <template v-for="(item, index) in this.resumeDetail.educationBackgrounds" :key="index">
                <span>时间: </span>
                <ElInput v-model="item.time"></ElInput>
                <span>学校: </span>
                <ElInput v-model="item.school"></ElInput>
                <template v-if="item.major !== null">
                    <span>专业: </span>
                    <ElInput v-model="item.task"></ElInput>
                </template>
            </template>
        </ElCard>

        <ElCard :header="titles[3]" style="margin-bottom: 30px;">
            <!-- 获奖情况 -->
            <ElInput v-for="(item, index) in this.resumeDetail.awards" :key="index" v-model="item.awardName">
            </ElInput>
        </ElCard>

        <ElCard :header="titles[4]" style="margin-bottom: 30px;">
            <!-- 技能 -->
            <ElInput v-for="(item, index) in this.resumeDetail.skillCertificate" :key="index" v-model="item.skillName">
            </ElInput>
        </ElCard>

        <ElCard :header="titles[5]" style="margin-bottom: 30px;">
            <!-- 求职信息 -->
            <span>求职意向: </span>
            <ElInput v-model="this.resumeDetail.jobIntention"></ElInput>
        </ElCard>

        <ElCard :header="titles[6]" style="margin-bottom: 30px;">
            <!-- 自我评价 -->
            <ElInput v-model="this.resumeDetail.selfEvaluation"></ElInput>
        </ElCard>


        <ElCard :header="titles[7]" style="margin-bottom: 30px;">
            <!-- 模型评价 -->
            <span>工作稳定性: </span>
            <ElInput v-model="this.resumeDetail.workStability"></ElInput>
            <span>原因: </span>
            <ElInput v-model="this.resumeDetail.workStabilityReason"></ElInput>
            <span>人岗匹配分数: </span>
            <ElInput v-model="this.resumeDetail.matchingScore"></ElInput>
            <span>原因: </span>
            <ElInput v-model="this.resumeDetail.matchingReason"></ElInput>
        </ElCard>
    </div>
</template>

<script>
import { ElCard } from 'element-plus';


export default {
    name: 'ResumeDetail',
    data() {
        return {
            titles: ['基本信息', '工作经历', '教育背景', '获奖情况', '技能', '求职信息', '自我评价', '模型评价'],
        }
    },
    props: {
        resumeDetail: {}
    },
    components: { ElCard },
    mounted() {
        console.log(this.$props)
    }
}
</script>

<style scoped></style>