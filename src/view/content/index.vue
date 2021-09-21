<!--
 * @Author: Kadia
 * @Date: 2021-09-03 17:55:57
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-18 15:52:53
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <my-navigation-bar></my-navigation-bar>
        <div class="noFooterView">
            <div id="body" class="flex-start-around" style="flex-wrap:wrap;flex-direction: row-reverse;">
                <div>
                    <my-info :statistics="statistics" :info="info"></my-info>
                </div>
                <div v-loading="contentLoading.value" id="body-content" :style="themeColor('#333','#eee','#eee','#333')">
                    <p id="body-content-title" v-text="blog.title"></p>
                    <div class="flex-center-start" style="padding:0 30px;margin-top:20px;" :style="themeColor('#777','#999')">
                        <div v-text="$store.state.timeFormat(blog.time)"></div>
                        <el-divider direction="vertical"></el-divider>
                        <i class="el-icon-view" v-text="blog.view"></i>
                    </div>
                    <div style="padding:20px;">
                        <el-divider></el-divider>
                    </div>
                    <mavon-editor :autofocus="false" v-model="blog.content" style="border:none;" :style="themeColor('#333','#eee','#eee','#333')" :previewBackground="$store.state.themeName=='light'?'#eee':'#333'" :boxShadow="false" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :editable="false"></mavon-editor>
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
            blog:{},
            contentLoading:{
                value:true
            },
            statistics:{

            },
            info:{

            }
        };
    },
    created(){
        const that=this;
        that.Axios({
            data:{
                loading:that.contentLoading
            },
            info:{
                url:'/index/viewBlog',
                params:{
                    id:that.$route.query.blogId
                }
            },
            successCode:function(res){
                if(res.data.data!=null)
                    that.blog=res.data.data;
                else{
                    that.$message({
                        message:'出错啦！请稍后再试',
                        type:'warning'
                    });
                }
            }
        });
        that.Axios({
            info:{
                url:'/user/getInfo'
            },
            successCode:function(res){
                that.info=res.data.data;
            }
        });
        that.Axios({
            info:{
                url:'/user/getStatistics'
            },
            successCode:function(res){
                if(res.data.data!=null)
                    that.statistics=res.data.data;
                else{
                    that.$message({
                        message:'出错啦！请稍后再试',
                        type:'warning'
                    });
                }
            }
        });
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    #body{
        width: 80vw;
        margin: 20px auto;
        #body-info{
            width: 300px;
            .body-info-item{
                padding: 20px;
                opacity: 0.9;
                border-radius: 10px;
                margin: 20px 0;
                #body-info-item-avatar{
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin: 0 auto;
                    &:hover{
                        animation: jump 0.3s ease;
                    }
                }
            }
        }
        #body-content{
            width:1000px;
            opacity: 0.8;
            padding:20px 0;
            &:hover{
                opacity: 0.95;
            }
            #body-content-title{
                width:calc(1000px - 40px);
                max-width:calc(100vw - 40px);
                font-size:30px;
                font-weight: 800;
                padding: 0 20px;
            }
        }
    }
</style>