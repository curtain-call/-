<template>

    <el-card v-for="(item, index) in items" :key="index" :span="1" :offset="1" class="message">{{ item.name }}</el-card>

    <!-- <div class="card-container" v-if="items.length !== 0">
        <el-card v-for="(item, index) in items" :key="index" ref="elements" :span="1" :offset="1" class="message"
            :style="{ top: computedTop(index) }">{{ item.name }}</el-card>
    </div>
    <div v-else>
        <el-card v-for="(item, index) in items_fixed" ref="elements" :key="index" :span="1" :offset="1" class="message"
            :style="{ top: computedTop(index) }">{{ item.name }}</el-card>
    </div> -->
</template>
 
<script>
// import { computed,ref } from '@vue/reactivity';
// import { nextTick } from 'vue';

// const items = []                // 存储从后端发来的简历信息数组
// const items_fixed = [           // 如果没有简历信息, 就用写死的信息
//     { name: "今天天气怎么样" },
//     { name: "今天天气不好" },
//     { name: "哇塞多撒打算放" },
//     { name: "阿发送方三房" },
//     { name: "阿萨发顺丰都是地方" },
// ]

// const elements = ref([])        // 滚动的元素列表
// const topbar = ref(null)

// const computedTop = computed(() => (index) => {
//     // 必须在下一tick才可以拿到已经渲染好的子元素
//     // console.log(index)
//     nextTick(() => {
//         const ele = elements[index]
//         // 这里要拿到现有的元素的css top属性
//         currentTop = ele.style.top
//         console.log(currentTop)

//         // return "0px"
//     })
// })

// console.log("执行到这里了")
export default {
    data() {
        return {
            animate: false,
            items: [
                { name: "这是xxx的简历profile" },
                { name: "这是yyy的简历profile" },
                { name: "这是zzz的简历profile" },
                { name: "这是ooo的简历profile" },
                { name: "这是sss的简历profile" },
                { name: "这是毛子昊的简历profile" },
                { name: "这是杨力闻的简历profile" },
                { name: "这是牛锴鹏的简历profile" },
                { name: "这是林诰人的简历profile" },
            ]
        }
    },
    created() {
        setInterval(this.scroll, 2000)
    },
    methods: {
        scroll() {
            this.animate = true;
            setTimeout(() => {
                this.items.push(this.items[0]);
                this.items.shift();
                this.animate = false;
            }, 500)
        }
    }
}
</script>
 
<style scoped>
.message {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
}
</style>
 