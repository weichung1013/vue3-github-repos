import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ant);

app.mount('#app');
