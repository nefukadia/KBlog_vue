<!--
 * @Author: Kadia
 * @Date: 2021-09-14 16:33:14
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-17 17:48:41
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <my-navigation-bar></my-navigation-bar>
        <div class="noFooterView">
            <div id="tabs">
                <div class="flex-center-start" id="tabs-top">
                    <div class="tabs-top-tab" @click="active=0" :style="themeColor('#333','#333',active!=0?'#ddd':'#fff',active!=0?'#ddd':'#fff')">站点信息</div>
                    <div class="tabs-top-tab" @click="active=1" :style="themeColor('#333','#333',active!=1?'#ddd':'#fff',active!=1?'#ddd':'#fff')">博客管理</div>
                    <div class="tabs-top-tab" @click="active=2" :style="themeColor('#333','#333',active!=2?'#ddd':'#fff',active!=2?'#ddd':'#fff')">留言管理</div>
                    <div class="tabs-top-tab" @click="active=3" :style="themeColor('#333','#333',active!=3?'#ddd':'#fff',active!=3?'#ddd':'#fff')">订阅管理</div>
                    <div class="tabs-top-tab" @click="active=4" :style="themeColor('#333','#333',active!=4?'#ddd':'#fff',active!=4?'#ddd':'#fff')">友链管理</div>
                </div>
                <div>
                    <div v-if="active===0">
                        <info></info>
                    </div>
                    <div v-else-if="active===1">
                        <blog></blog>
                    </div>
                    <div v-else-if="active===2">
                        <message></message>
                    </div>
                    <div v-else-if="active===3">
                        <subscribe></subscribe>
                    </div>
                    <div v-else-if="active===4">
                        <links></links>
                    </div>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import Blog from './components/blog.vue'
import info from './components/info.vue'
import Links from './components/links.vue'
import Message from './components/message.vue'
import Subscribe from './components/subscribe.vue'
export default {
    components: { info, Blog, Message, Subscribe, Links },
    data(){
        return{
            active:0
        }
    }
}
</script>

<style lang="scss" scoped>
    #tabs{
        width:1200px;
        max-width:95vw;
        margin:0 auto;
        margin-top: 50px;
        opacity: 0.85;
        &:hover{
            opacity: 0.95;
        }
        #tabs-top{
            width:100%;
            overflow: auto;
            .tabs-top-tab{
                padding: 10px 15px;
                white-space: nowrap;
                cursor: pointer;
                transition: none;
                -moz-transition: none;
                -webkit-transition: none;
                -o-transition: none;
            }
        }
    }
</style>