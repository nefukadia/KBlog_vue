<!--
 * @Author: Kadia
 * @Date: 2021-09-03 14:36:01
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-14 16:59:14
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <div ref="nav" class="flex-center-center" id="nav" style="flex-wrap:wrap;" :style="themeColor('#333','#eee','#eaeaea','#333')">
            <div class="nav-item" @click="goTo($route.name,'Index')"><i class="el-icon-s-grid" />首页</div>
            <div class="nav-item" @click="goTo($route.name,'Message')"><i class="el-icon-s-management" />留言墙</div>
            <div class="nav-item" @click="goTo($route.name,'Tourist')"><i class="el-icon-s-comment" />游客中心</div>
            <div class="nav-item" @click="goTo($route.name,'Links')"><i class="el-icon-s-shop" />友链</div>
            <div class="nav-item" @click="goTo($route.name,'About')"><i class="el-icon-info" />关于</div>
            <div class="nav-item" @click="goTo($route.name,'Admin')"><i class="el-icon-s-home" />我的后台</div>
        </div>
        <div :style="'height:'+offsetHeight"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            offsetHeight:'0px'
        }
    },
    mounted(){
        const that=this;
        that.offsetHeight=that.$refs.nav.offsetHeight+'px';
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
    #nav{
        width: 100%;
        opacity: 0.8;
        position: fixed;
        top: 0;
        z-index: 1000;
        .nav-item{
            padding: 10px 20px;
            font-size: 16px;
            text-align: center;
            &:hover{
                cursor: pointer;
                opacity: 0.5;
                background:darkkhaki;
            }
        }
    }
</style>