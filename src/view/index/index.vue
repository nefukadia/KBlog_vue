<!--
 * @Author: Kadia
 * @Date: 2021-08-30 13:34:21
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-18 15:48:27
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <my-navigation-bar></my-navigation-bar>
        <div class="noFooterView">
            <div id="notice" style="margin-top:80px;">
                <mavon-editor :autofocus="false" v-model="info.notice" style="border:none;" :style="themeColor('#333','#eee','#eee','#333')" :previewBackground="$store.state.themeName=='light'?'#eee':'#333'" :boxShadow="false" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :editable="false"></mavon-editor>
            </div>
            <div id="body" class="flex-start-around" style="flex-wrap:wrap;flex-direction: row-reverse;">
                <div>
                    <my-info :statistics="statistics" :info="info"></my-info>
                </div>
                <div v-loading="searchLoading.value" id="body-content" :style="themeColor('#333','#eee','#eee','#333')">
                    <div class="flex-center-center" style="text-align:center;flex-wrap:wrap;">
                        <my-input :value="searchInput" @input="searchInput=$event;" @keyup.enter.native="clickSearch" icon="el-icon-search" placeholder="请输入文章关键字" :background="isLight()?'#fafafa':'#222'" :color="isLight()?'#333':'#eee'"></my-input>
                        <el-button :type="isLight()?'warning':'info'" @click="clickSearch">找找这个</el-button>
                    </div>
                    <div  v-for="(item,index) in blog" :key="index" class="body-content-item" @click="goTo($route.name,'Content',{blogId:item.id})" :style="themeColor('#333','#eee','#dadada','#202020')">
                        <p class="ellipsis" v-text="item.title"></p>
                        <div class="flex-center-between body-content-item-footer" :style="themeColor('#777','#999')">
                            <i class="el-icon-view" v-text="'  '+item.view"></i>
                            <div v-text="$store.state.timeFormat(item.time)"></div>
                        </div>
                    </div>
                    <el-empty v-if="blog.length==0" description="咩呀"></el-empty>
                    <div v-else class="show-more">
                        <i class="el-icon-arrow-down" @click="getNextBlog">康康更多</i>
                    </div>
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
            searchInput:'',
            searchValue:'',
            nextPage:0,
            blog:[],
            info:{

            },
            statistics:{
                
            },
            searchLoading:{
                value:true
            },
            noticeLoading:{
                value:true
            }
        };
    },
    created(){
        const that=this;
        that.getNextBlog();
        that.Axios({
            data:{
                loading:that.noticeLoading
            },
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
        // 获取下一页博客
        getNextBlog(){
            const that=this;
            that.Axios({
                data:{
                    loading:that.searchLoading
                },
                info:{
                    url:'/index/getBlog',
                    params:{
                        page:that.nextPage,
                        title:that.searchValue
                    }
                },
                successCode:function(res){
                    if(res.data.data.length>0){
                        that.nextPage++;
                        that.blog=that.blog.concat(res.data.data);
                    }
                    else if(that.nextPage>0){
                        that.$message({
                            message: '没有更多的啦！',
                            type: 'warning'
                        })
                    }
                }
            });
        },
        // 点击搜索
        clickSearch(){
            const that=this;
            that.nextPage=0;
            that.blog=[];
            that.searchValue=that.searchInput;
            that.getNextBlog();
        }
    }
}
</script>

<style lang="scss" scoped>
    #notice{
        width: 1000px;
        max-width: 80vw;
        padding: 20px;
        margin: 0 auto;
        opacity: 0.8;
        border-radius: 10px;
        &:hover{
            padding: 25px;
            opacity: 0.95;
        }
    }
    #body{
        width: 70vw;
        margin: 20px auto;
        #body-content{
            width: 700px;
            opacity: 0.95;
            border-radius: 10px;
            padding:20px 0;
            max-width: 96vw;
            .body-content-item{
                margin: 20px;
                border-radius: 10px;
                padding: 20px;
                font-size: 30px;
                font-weight: 800;
                cursor: pointer;
                opacity: 0.8;
                &:hover{
                    padding: 25px;
                }
                .body-content-item-footer{
                    margin-top: 10px;
                    font-size: 16px;
                }
            }
        }
    }
</style>