<!--
 * @Author: Kadia
 * @Date: 2021-09-14 18:42:57
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-18 19:16:12
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div v-loading="loading.value" style="padding:20px;background:#ffffff;">
        <div>
            <el-button @click="loginOut" :type="isLight()?'danger':'warning'"><i class="el-icon-circle-plus-outline"></i>退出登录</el-button>
        </div>
        <div class="title-label" style="margin-top:20px;">我的信息</div>
        <div class="flex-center-between input">
            <label>站点名</label>
            <my-input :value="info.name" @input="info.name=$event;changed=true;" icon="el-icon-s-home" background="#fafafa" color="#333"></my-input>
        </div>
        <div class="flex-center-between input">
            <label>后台密码</label>
            <my-input type="password" :value="info.password" @input="info.password=$event;changed=true;" icon="el-icon-lock" background="#fafafa" color="#333"></my-input>
        </div>
        <div class="flex-center-between input">
            <label>邮箱</label>
            <my-input :value="info.email" @input="info.email=$event;changed=true;" icon="el-icon-receiving" background="#fafafa" color="#333"></my-input>
        </div>
        <div class="flex-center-between input">
            <label></label>
            <el-button v-loading="buttonLoading.value" @click="clickSaveInfo(0)" style="margin:10px 0px;" :disabled="!changed" :type="isLight()?'success':'info'">保存</el-button>
        </div>
        <div class="title-label" style="margin-top:20px;">头像</div>
        <el-upload class="avatar-uploader"
            :action="$store.state.baseUrl+$store.state.apiAgent+'/user/upload'"
            :data="{
                token:$cookies.get('token')
            }"
            :on-success="uploadOk"
            :show-file-list="false">
            <img v-if="info.avatar" :src="$store.state.baseUrl+info.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="title-label" style="margin-top:20px;">公告编辑</div>
        <mavon-editor ref="notice" @imgAdd="noticeImgAdd" :autofocus="false" @save="clickSaveInfo(1)" v-loading="noticeLoading.value" v-model="info.notice"></mavon-editor>
        <div class="title-label" style="margin-top:50px;">关于编辑</div>
        <mavon-editor ref="about" @imgAdd="aboutImgAdd" :autofocus="false" @save="clickSaveInfo(2)" v-loading="aboutLoading.value" v-model="info.about"></mavon-editor>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info:{
                name:'',
                password:'',
                email:'',
                notice:'',
                about:''
            },
            changed:false,
            loading:{
                value:true
            },
            buttonLoading:{
                value:false
            },
            noticeLoading:{
                value:false
            },
            aboutLoading:{
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
                url:'/user/getInfo',
                method:'post',
                data:{
                    token:that.$cookies.get("token")
                }
            },
            successCode:function(res){
                that.info=res.data.data;
            }
        });
    },
    methods:{
        // 保存基本信息
        clickSaveInfo(type){
            const that=this;
            let data={};
            let infoData={};
            if(type==0){
                data={
                    loading:that.buttonLoading
                }
                infoData={
                    token:that.$cookies.get("token"),
                    type:0,
                    name:that.info.name,
                    password:that.info.password,
                    email:that.info.email
                }
            }else if(type==1){
                data={
                    loading:that.noticeLoading
                }
                infoData={
                    token:that.$cookies.get("token"),
                    type:1,
                    notice:that.info.notice
                }
            }else if(type==2){
                data={
                    loading:that.aboutLoading
                }
                infoData={
                    token:that.$cookies.get("token"),
                    type:2,
                    about:that.info.about
                }
            }
            that.Axios({
                data:data,
                info:{
                    url:'/user/changeInfo',
                    method:'post',
                    data:infoData
                },
                successCode:function(res){
                    that.$message({
                        message:'保存成功',
                        type:'success'
                    });
                    that.$cookies.set("token",res.data.data,60*60*24*7);
                    if(type==0)
                        that.changed=false;
                }
            });
        },
        // 上传头像成功
        uploadOk(res){
            const that=this;
            that.info.avatar=res.data;
            that.$message({
                message:'头像上传成功!',
                type:'success'
            });
            that.Axios({
                info:{
                    url:'/user/setAvatar',
                    method:'post',
                    data:{
                        token:that.$cookies.get("token"),
                        avatar:res.data
                    }
                },
                successCode:function(res){}
            });
        },
        // 退出登录
        loginOut(){
            const that=this;
            that.$cookies.remove("token");
            that.goTo(that.$route,'Index');
        },
        // 添加图片
        imgAdd(md,filename,file){
            const that=this;
            let formData = new FormData();
            formData.append("file",file);
            formData.append("token",that.$cookies.get("token"));
            that.Axios({
                info:{
                    url: '/user/upload',
                    method: 'post',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
                successCode:function(res){
                    that.$refs[md].$img2Url(filename, that.$store.state.baseUrl+res.data.data);
                }
            });
        },
        // 公告上传图片
        noticeImgAdd(filename,file){
            const that=this;
            that.imgAdd("notice",filename,file);
        },
        // 关于上传图片
        aboutImgAdd(filename,file){
            const that=this;
            that.imgAdd("about",filename,file);
        },
    }
}
</script>

<style lang="scss" scoped>
    .input{
        width: 350px;
        max-width: 80vw;
    }
    .avatar-uploader {
        width: 178px;
        height: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
        border-color: #409EFF;
    }
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>