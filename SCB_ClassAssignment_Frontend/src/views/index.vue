<template>
      <ElContainer>
    <ElHeader>


      <RouterView />
    </ElHeader>
    <ElMain>
        这是主页面
    </ElMain>

    <ElFooter>
      这里是底栏
    </ElFooter>
  </ElContainer>
</template>

<script setup>
import { ElButton, ElFooter, ElContainer, ElMain, ElHeader } from 'element-plus';

</script>