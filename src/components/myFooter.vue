<!--
 * @Author: Kadia
 * @Date: 2021-08-30 16:25:17
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-12 10:14:44
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div id="footer">
        <div>KBlog ^_~</div>
        <div>大概世间万物都有去处，而你才是我的归宿</div>
        <div>&copy; 2021
            <a href="https://www.kadia.link" target="_blank">Kadia</a> 
            由 <a href="https://vuejs.org" target="_blank">Vue</a> and <a href="https://element.eleme.cn" target="_blank">ElementUI</a> 炒鸡强力驱动
        </div>
        <div>
            <a href="https://beian.miit.gov.cn" target="_blank" v-text="$store.state.icp"></a>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo" target="_blank" v-text="$store.state.police"></a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    #footer{
        margin-top:10px;
        padding: 15px;
        background: #232323;
        color: #999;
        text-align: center;
        font-size:14px;
        line-height: 25px;
        opacity: 0.9;
        a{
            color: rgb(240, 181, 73);
            &:hover{
                opacity: 0.8;
            }
        }
    }
</style>
