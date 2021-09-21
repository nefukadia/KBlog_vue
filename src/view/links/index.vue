<!--
 * @Author: Kadia
 * @Date: 2021-09-04 18:50:12
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-19 20:18:27
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <my-navigation-bar></my-navigation-bar>
        <div class="noFooterView">
            <div v-loading="loading.value" class="flex-center-start" style="flex-wrap:wrap;" id="container" :style="themeColor('#333','#eee','#eee','#333')">
               <a v-for="(item,index) in linkList" :key="index" :href="item.url" target="_block">
                   <div class="container-item flex-center-start" :style="themeColor('#333','#eee','#fafafa','#222')">
                        <img :src="$store.state.baseUrl+item.avatar" />
                        <div class="container-item-text ellipsis" v-text="item.nickname"></div>
                    </div>
               </a>
               <div style="width:100%;">
                    <el-empty v-if="linkList.length==0" description="咩呀"></el-empty>
               </div>
            </div>
        </div>
        <my-footer></my-footer> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            linkList:[],
            loading:{
                value:true
            }
        }
    },
    created(){
        const that=this;
        that.Axios({
            data:{
                loading:that.loading
            },
            info:{
                url:'/links/getLinks'
            },
            successCode:function(res){
                that.linkList=res.data.data;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
    #container{
        width: 920px;
        margin: 0 auto;
        margin-top: 20px;
        max-width: calc(95vw - 40px);
        padding: 20px;
        opacity: 0.85;
        border-radius: 10px;
        &:hover{
            opacity: 0.95;
        }
        .container-item{
            width: 250px;
            margin: 10px;
            cursor: pointer;
            padding: 15px;
            border-radius: 10px;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
            }
            .container-item-text{
                margin-left:10px;
                font-size: 20px;
                font-weight: 800;
            }
        }
    }
</style>