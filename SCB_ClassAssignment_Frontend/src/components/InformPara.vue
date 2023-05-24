<template>
<div class="para">
  <el-card :body-style="{padding:'0px',margin:'0px'}">
    <img class="forum" :src="require('../../../'+this.imgPath)" v-if="!getComponentType">
<!--静态资源路径经由prop配置-->
    <div :id="'hospital'" v-if="getComponentType">
      <img class="hospital_image" :src="require('../../../'+this.imgPath)" style="display: inline">
<!--      <p style="margin: 0;width: 40%;display: inline;">下划线和其他东西</p>-->
      <div style="display: inline;width: 40%">
<!--        <el-divider v-for="num in Array(1,2,3,4,5,6,7,8)" ></el-divider>-->
      </div>

    </div>
  </el-card>
  <p v-if="!getComponentType">{{discription}}</p>
</div>
</template>

<script>
export default {
  name: 'InformPara',
  props:{
    discription:String,
    imgPath:String,
    componentType:String,
  },
  data(){
    return{

    }
  },
  methods:{
    getImgPath(){
      return require('../../../'+this.imgPath)
    },
  },
  computed:{
    getComponentType(){
      return this.componentType == "hospital";
    },
  }

}
</script>

<style scoped>

#hospital{
  /*background-color: #84b4f9;*/
}

.hospital_image{
  height: 12vw;
  width: 100%;
}

.forum{
  height: 12vw;
  width: 100%;
}

.para >>> .el-card:hover{
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 30px;
}
</style>
