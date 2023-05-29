import { createPinia } from "pinia";

const pinia = createPinia()

export default pinia

// 在这里暴露的原因是因为在组件外使用pinia时可能遇到加载顺序问题