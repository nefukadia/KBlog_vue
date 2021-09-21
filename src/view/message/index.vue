<!--
 * @Author: Kadia
 * @Date: 2021-09-03 19:44:46
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-18 13:49:33
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <my-navigation-bar></my-navigation-bar>
        <div class="noFooterView">
            <div id="writer" :style="themeColor('#333','#eee','#eee','#333')">
                <my-input :value="email" @input="email=$event" icon="el-icon-receiving" placeholder="请输入您的邮箱" :background="isLight()?'#fafafa':'#222'" :color="isLight()?'#333':'#eee'"></my-input>
                <my-input :value="nickname" @input="nickname=$event" icon="el-icon-user" placeholder="请输入您的昵称" :background="isLight()?'#fafafa':'#222'" :color="isLight()?'#333':'#eee'"></my-input>
                <textarea v-model="context" id="writer-testarea" placeholder="想留下点什么" :style="themeColor('#333','#eee','#fafafa','#222')"></textarea>
                <el-button v-loading="sendLoading.value" :type="isLight()?'success':'info'" style="margin:5px;" @click="sendMessage">提交</el-button>
            </div>
            <div v-loading="messageLoading.value" id="comment" :style="themeColor('#333','#eee','#eee','#333')">
                <div v-for="(item,index) in messageList" :key="index" :style="'margin-bottom:10px;border-bottom:0.5px solid '+(isLight()?'#bbb;':'#666;')+';padding-bottom:10px;'">
                    <div class="flex-center-start" style="opacity:0.7">
                        <i class="el-icon-user"></i>
                        <div v-text="item.nickname+'<'+item.email+'>'"></div>
                        <div v-text="$store.state.timeFormat(item.time,true)"></div>
                    </div>
                    <div class="comment-context" v-text="item.context"></div>
                </div>
                <el-empty v-if="messageList.length==0" description="咩呀"></el-empty>
                <div v-else class="show-more">
                    <i class="el-icon-arrow-down" @click="getNextMessage">康康更多</i>
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
            email:'',
            nickname:'',
            context:'',
            nextPage:0,
            messageList:[],
            messageLoading:{
                value:true
            },
            sendLoading:{
                value:false
            }
        }
    },
    created(){
        const that=this;
        that.getNextMessage();
    },
    methods:{
        // 获取下一页评论
        getNextMessage(){
            const that=this;
            that.Axios({
                data:{
                    loading:that.messageLoading
                },
                info:{
                    url:'/message/getMessage',
                    params:{
                        page:that.nextPage
                    }
                },
                successCode:function(res){
                    if(res.data.data.length>0){
                        that.nextPage++;
                        that.messageList=that.messageList.concat(res.data.data);
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
        // 发布评论
        sendMessage(){
            const that=this;
            that.Axios({
                data:{
                    loading:that.sendLoading
                },
                info:{
                    url:'/message/sendMessage',
                    method:'post',
                    data:{
                        email:that.email,
                        nickname:that.nickname,
                        context:that.context
                    }
                },
                successCode:function(res){
                    that.$message({
                        message:'OK啦！',
                        type:'success'
                    });
                    that.email=that.nickname=that.context='';
                    that.nextPage=0;
                    that.messageList=[];
                    that.getNextMessage();
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    #writer{
        width: 700px;
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 10px;
        max-width: calc(95vw - 30px);
        padding: 15px;
        opacity: 0.9;
        &:hover{
            opacity: 0.98;
        }
        #writer-testarea{
            width:calc(100% - 30px);
            height: 100px;
            padding: 10px;
            display: block;
            outline-style: none;
            border: none;
            opacity: 0.9;
            margin: 5px;
        }
    }
    #comment{
        width: 800px;
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 10px;
        max-width: calc(95vw - 40px);
        padding: 20px;
        opacity: 0.95;
        .comment-context{
            font-size: 20px;
            word-break: break-all;
        }
    }
</style>