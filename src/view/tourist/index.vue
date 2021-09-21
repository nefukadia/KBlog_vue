<!--
 * @Author: Kadia
 * @Date: 2021-09-04 16:44:53
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-14 18:36:04
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <my-navigation-bar></my-navigation-bar>
        <div class="noFooterView">
            <div id="subscribe" :style="themeColor('#333','#eee','#eee','#333')">
                <div class="title-label" :style="themeColor('#666','#eee')">订阅推送</div>
                <div v-if="subscribePage==1">
                    <div class="subscribe-select" @click="chooseFuntion=0" :style="'border-color:'+(chooseFuntion==0?'cadetblue;':'transparent;')+themeColor('#333','#eee','#fafafa','#222')" v-text="'我想要订阅此博客 ^.^'"></div>
                    <div class="subscribe-select" @click="chooseFuntion=1" :style="'border-color:'+(chooseFuntion==1?'cadetblue;':'transparent;')+themeColor('#333','#eee','#fafafa','#222')" v-text="'我想要取消订阅此博客 >.<'"></div>
                    <div style="margin:5px;">
                        <el-button :type="isLight()?'success':'info'" @click="subscribePage=2">下一步</el-button>
                    </div>
                </div>
                <div v-if="subscribePage==2">
                    <div style="margin:5px;" v-text="chooseFuntion==0?'我要订阅':'取消订阅'"></div>
                    <my-input :value="email" @input="email=$event" icon="el-icon-receiving" placeholder="请输入您的邮箱" :background="isLight()?'#fafafa':'#222'" :color="isLight()?'#333':'#eee'">
                        <template slot="append">
                            <el-button :disabled="sending.value" style="margin:5px;" size="small" :type="isLight()?'success':'info'" @click="clickSend">发送验证码</el-button>
                        </template>
                    </my-input>
                    <my-input :value="code" @input="code=$event" icon="el-icon-key" placeholder="请输入邮箱验证码" :background="isLight()?'#fafafa':'#222'" :color="isLight()?'#333':'#eee'"></my-input>
                    <div style="margin:5px;">
                        <el-button :type="isLight()?'success':'info'" @click="subscribePage=1;email=code='';">上一步</el-button>
                        <el-button :disabled="submitLoading.value" :type="isLight()?'success':'info'" @click="clickSubmit" >完成</el-button>
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
            subscribePage:1,
            chooseFuntion:0,
            email:'',
            code:'',
            sending:{
                value:false
            },
            submitLoading:{
                value:false
            }
        }
    },
    methods:{
        // 发送验证码
        clickSend(){
            const that=this;
            that.Axios({
                data:{
                    loading:that.sending
                },
                info:{
                    url:'/subscribe/sendVerify',
                    method:'post',
                    data:{
                        email:that.email
                    }
                },
                successCode:function(res){
                    that.$message({
                        message:'发送成功，请注意查收',
                        type:'success'
                    });
                }
            });
        },
        // 提交
        clickSubmit(){
            const that=this;
            that.Axios({
                data:{
                    loading:that.submitLoading
                },
                info:{
                    url:'/subscribe/doSubscribe',
                    method:'post',
                    data:{
                        code:that.code,
                        type:that.chooseFuntion
                    }
                },
                successCode:function(res){
                    that.$message({
                        message:res.data.data,
                        type:'success'
                    });
                    that.email=that.code='';
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    #subscribe{
        width: 700px;
        max-width: calc(95vw - 30px);
        margin: 20px auto;
        padding: 15px;
        opacity: 0.8;
        border-radius: 10px;
        &:hover{
            opacity: 0.95;
        }
        .subscribe-select{
            padding: 10px;
            margin: 5px;
            display: inline-block;
            cursor: pointer;
            border: 1px solid;
        }
    }
</style>