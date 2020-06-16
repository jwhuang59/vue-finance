
import Vue from 'vue'
import App from './App'
import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/mui.min.css'
import Router from 'vue-router'
import Vuex from 'vuex'
import store from './store/store.js'
import Axios from 'axios'
import echarts from 'echarts'
import  VueJsonp  from  'vue-jsonp'
import globalData from './globalData.js'


import VueDirectiveImagePreviewer from 'vue-directive-image-previewer' //图片放大
import 'vue-directive-image-previewer/dist/assets/style.css'


Vue.prototype.$echarts = echarts
Vue.prototype.globalData = globalData
Vue.prototype.$store = store

Vue.use(VueDirectiveImagePreviewer) 
Vue.use(ElementUI)
Vue.use(Router)
Vue.use(Vuex)
Vue.use(VueJsonp)

Vue.config.productionTip = false


const router = new Router({
    routes,
    // mode:'history'
})
// 输入框自动聚焦
Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
})
router.beforeEach((to, from, next) => {

    let urlService = window.location.host
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    if (to.path == '/' && urlService == 'm.zhiyuan.070411.com' || to.path == '/' && urlService == 'm.070411.com') {
        next('/community0') 
    // router.push({name: 'login'})
    }else{
        next()
    }
    if(to.meta.title) {
        document.title = to.meta.title
    }
    if (to.path == '/login') {

        globalData.toPath = from.fullPath

    }
    if (userInfo) {
        store.commit('getUserInfo',userInfo)
        
    }else{
        store.commit('getUserInfo','')
    }

    // store.commit('loading',false)
})

router.afterEach((to, from) => {
    window.scrollTo(0, 0)

})


Axios.interceptors.response.use(response => {

    switch (response.data.status) {
        case 100:
            sessionStorage.removeItem("userInfo")
            setTimeout(() => {
                store.commit('getUserInfo','')
                router.push({path:'/login'})
            },1500)
        break;
    }
    return response
},error => {
    return Promise.reject(error)

})

//rem换算
var docEl = document.documentElement,
resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
recalc = function() {
    var clientWidth = document.documentElement.clientWidth;
    if(clientWidth >= 640) {
        docEl.style.fontSize = '200px';
    } else {
        docEl.style.fontSize = 200 * (clientWidth / 640) + 'px';
    }
};

window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);

//阻止移动端浏览器双击放大
var lastTouchEnd = 0;
document.addEventListener('touchstart', function(event) {

    if (event.touches.length > 1) {

            event.preventDefault();

    }

});
document.addEventListener('touchend', function(event) {

    var now = (new Date()).getTime();

    if (now - lastTouchEnd <= 300) {

        event.preventDefault();

    }

    lastTouchEnd = now;

}, false);

document.addEventListener('gesturestart', function(event) {
    event.preventDefault()
})

// 站长统计
var _hmt = _hmt || [];
var hm = document.createElement("script");
hm.src = "https://hm.baidu.com/hm.js?b6e96b11b105dbd2e52057322e2f57e2";
var s = document.getElementsByTagName("script")[0]; 
s.parentNode.insertBefore(hm, s);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
