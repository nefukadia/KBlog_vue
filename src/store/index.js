/*
 * @Author: Kadia
 * @Date: 2021-08-30 20:42:19
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-20 20:01:59
 * @Connect: nefukadia@foxmail.com
 */
import Vue from "vue"
import Vuex from "vuex"
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state:{
        title:'KBlog', // 站点标题
        baseUrl:'', // 服务器域名
        icp:'', // icp
        police:'', //公安备案
        apiAgent:'/api', // api反向代理目录
        apiSuccessCode:1,
        themeName:(new Date().getHours()>=7&& new Date().getHours()<22)?'light':'dark',
        PrefixZero:function(num, n) {
            return (Array(n).join(0) + num).slice(-n);
        },
        timeFormat:function(utc_datetime,info=false) {
            const time = new Date(utc_datetime*1000);
            if(info){
                return time.getFullYear() + '-' + this.PrefixZero(time.getMonth() + 1, 2) + '-' + this.PrefixZero(time.getDate(), 2)+' '
                         +this.PrefixZero(time.getHours(), 2)+':'+this.PrefixZero(time.getMinutes(), 2)+':'+this.PrefixZero(time.getSeconds(), 2);
            }else{
                return time.getFullYear() + '-' + this.PrefixZero(time.getMonth() + 1, 2) + '-' + this.PrefixZero(time.getDate(), 2);
            }
            
        }
    },
    mutations:{
        saveThemeName(state,newThemeName){
            state.themeName=newThemeName;
        }
    }
})