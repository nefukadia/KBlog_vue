/*
 * @Author: Kadia
 * @Date: 2021-08-29 22:39:25
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-17 12:32:16
 * @Connect: nefukadia@foxmail.com
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import myFooter from './components/myFooter.vue'
import myBackgroundImage from './components/myBackgroundImage.vue'
import myNavigationBar from './components/myNavigationBar.vue'
import myInput from './components/myInput.vue'
import myInfo from './components/myInfo.vue'
import myRocket from './components/myRocket.vue'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(VueCookies);
Vue.use(ElementUI);

Vue.config.productionTip = false
axios.defaults.baseURL=store.state.baseUrl+store.state.apiAgent;
Vue.prototype.$axios=axios;
Vue.prototype.Axios=function(obj){
  /*
  * data
  * info
  * successCode
  * failCode
  * failApi
  */
  if(obj.hasOwnProperty('data')&&obj.data.hasOwnProperty('loading')){
    obj.data.loading.value=true;
  }
  if(!obj.hasOwnProperty('failCode')){
    obj.failCode=function(res){
      ElementUI.Message({
        message: res.data.msg,
        type: 'warning'
      })
    }
  }
  if(!obj.hasOwnProperty('failApi')){
    obj.failApi=function(res){
      ElementUI.Message({
        message: '出错啦，请稍后再试',
        type: 'warning'
      })
    }
  }
  axios(obj.info)
  .then(function(res){
    if(obj.hasOwnProperty('data')&&obj.data.hasOwnProperty('loading')){
      obj.data.loading.value=false;
    }
    if(res.data.code == store.state.apiSuccessCode){
      obj.successCode(res);
    }else{
      obj.failCode(res);
    }
  }).catch(function(err){
    if(obj.hasOwnProperty('data')&&obj.data.hasOwnProperty('loading')){
      obj.data.loading.value=false;
    }
    obj.failApi(err);
  })
};
Vue.prototype.themeColor=function(colorLight,colorDark,backgroundLight='transparent',backgroundDark='transparent'){
  const op=store.state.themeName=='light'?true:false;
  return 'color:'+(op?colorLight:colorDark)+';background:'+(op?backgroundLight:backgroundDark)+';';
};
Vue.prototype.isLight=function(){
  return store.state.themeName=='light';
};
Vue.prototype.goTo=function(nowName,name,query){
  if(nowName==name)
    return;
  router.push({
    name:name,
    query:query
  });
};

Vue.component('myFooter',myFooter);
Vue.component('myBackgroundImage',myBackgroundImage);
Vue.component('myNavigationBar',myNavigationBar);
Vue.component('myInput',myInput);
Vue.component('myInfo',myInfo);
Vue.component('myRocket',myRocket);
Vue.use(mavonEditor);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
