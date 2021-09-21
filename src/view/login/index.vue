<!--
 * @Author: Kadia
 * @Date: 2021-09-17 17:12:41
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-17 17:52:30
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <my-navigation-bar></my-navigation-bar>
        <div class="noFooterView">
            <div class="flex-column-center-around" v-loading="loading.value" id="login">
                <img src="../../assets/logo.png" />
                <my-input :value="info.name" :disable="true" icon="el-icon-user" background="#eee" placeholder="请输入用户名"></my-input>
                <my-input type="password" @keyup.enter.native="login" :value="password" @input="password=$event" icon="el-icon-key" background="#eee" placeholder="请输入密码"></my-input>
                <el-button @click="login">登录</el-button>
            </div>
        </div>
        <my-footer></my-footer> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            info:{},
            password:'',
            loading:{
                value:false
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
                url:'/user/getInfo'
            },
            successCode:function(res){
                that.info=res.data.data;
            }
        });
    },
    methods:{
        // 登录
        login(){
            const that=this;
            that.Axios({
                data:{
                    loading:that.loading
                },
                info:{
                    url:'/user/login',
                    method:'post',
                    data:{
                        name:that.info.name,
                        password:that.password
                    }
                },
                successCode:function(res){
                    that.$cookies.set("token",res.data.data,60*60*24*7);
                    that.$message({
                        message:'登录成功',
                        type:'success'
                    });
                    setTimeout(function(){
                        that.goTo(that.$route,'Admin');
                    }, 500);
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #login{
        width:700px;
        height:400px;
        max-width: 90vw;
        background: #fff;
        margin: 0 auto;
        margin-top: 100px;
        text-align: center;
        border-radius: 5px;
        opacity: 0.9;
        padding-bottom: 30px;
        img{
            width:200px;
            height: 200px;
        }
    }
</style>