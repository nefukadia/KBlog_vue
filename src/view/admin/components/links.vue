<!--
 * @Author: Kadia
 * @Date: 2021-09-16 20:54:30
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-18 13:47:51
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div style="padding:20px;background:#ffffff;">
        <el-button @click="clickAddLink(null)" :type="isLight()?'success':'warning'"><i class="el-icon-circle-plus-outline"></i>添加友链</el-button>
        <el-table v-loading="listLoading.value" :data="list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column label="头像">
                <template slot-scope="scope">
                    <img style="width:70px;height:70px;object-fit: cover;" :src="$store.state.baseUrl+list[scope.$index].avatar" />
                </template>
            </el-table-column>
            <el-table-column label="链接">
                <template slot-scope="scope">
                    <a :href="list[scope.$index].url" target="_block" v-text="list[scope.$index].url"></a>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="clickAddLink(scope.$index)">编辑</el-button>
                    <el-popconfirm title="真的要删掉么？" @confirm="handleDelete(scope.$index)">
                        <el-button slot="reference" size="mini" type="danger">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog class="dialog" title="友链管理" :show-close="false" :visible="showDialog" :modal="false">
            <div class="flex-center-start">
                <label>昵称</label>
                <my-input :value="dialogInfo.nickname" @input="dialogInfo.nickname=$event" style="margin-left:5px;" icon="el-icon-user" placeholder="请输入昵称" background="#eee"></my-input>
            </div>
            <div class="flex-center-start">
                <label>头像</label>
                <el-upload style="margin-left:10px;" class="avatar-uploader"
                    :action="$store.state.baseUrl+$store.state.apiAgent+'/user/upload'"
                    :data="{
                        token:$cookies.get('token')
                    }"
                    :on-success="uploadOk"
                    :show-file-list="false">
                    <img v-if="dialogInfo.avatar" :src="$store.state.baseUrl+dialogInfo.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="flex-center-start">
                <label>链接</label>
                <my-input :value="dialogInfo.url" @input="dialogInfo.url=$event" style="margin-left:5px;" icon="el-icon-link" placeholder="请输入链接" background="#eee"></my-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false;dialogInfo={}">取 消</el-button>
                <el-button v-loading="dialogLoading.value" type="primary" @click="addLink(dialogInfo)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[],
            showDialog:false,
            dialogInfo:{},
            listLoading:{
                value:true
            },
            dialogLoading:{
                value:false
            }
        }
    },
    created(){
        const that=this;
        that.Axios({
            data:{
                loading:that.listLoading
            },
            info:{
                url:'/links/getLinks'
            },
            successCode:function(res){
                that.list=res.data.data;
            }
        });
    },
    methods:{
        // 点击添加/编辑
        clickAddLink(index){
            const that=this;
            if(index!=null){
                that.dialogInfo=that.list[index];
            }else{
                that.dialogInfo={
                    id:null,
                    nickname:'',
                    avatar:'',
                    url:''
                }
            }
            that.showDialog=true;
        },
        // 添加/编辑
        addLink(obj){
            const that=this;
            that.Axios({
                data:{
                    loading:that.dialogLoading
                },
                info:{
                    url:'/links/changLink',
                    method:'post',
                    data:{
                        id:obj.id,
                        nickname:obj.nickname,
                        avatar:obj.avatar,
                        url:obj.url,
                        token:that.$cookies.get("token")
                    }
                },
                successCode:function(res){
                    that.$message({
                        message:'操作成功',
                        type:'success'
                    });
                    that.Axios({
                        data:{
                            loading:that.listLoading
                        },
                        info:{
                            url:'/links/getLinks'
                        },
                        successCode:function(res){
                            that.list=res.data.data;
                        }
                    });
                    that.showDialog=false;
                }
            });
        },
        // 删除
        handleDelete(index){
            const that=this;
            that.Axios({
                info:{
                    url:'/links/deleteLink',
                    method:'post',
                    data:{
                        token:that.$cookies.get("token"),
                        id:that.list[index].id
                    }
                },
                successCode:function(res){
                    that.list.splice(index,1);
                    that.$message({
                        message:res.data.data,
                        type:'success'
                    });
                }
            });
        },
         // 上传头像成功
        uploadOk(res){
            const that=this;
            that.dialogInfo.avatar=res.data;
            console.log(that.dialogInfo);
            that.$message({
                message:'头像上传成功!',
                type:'success'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .dialog{
        transition: none;
        -moz-transition: none;
        -webkit-transition: none;
        -o-transition: none;
    }
    .avatar-uploader {
        width: 78px;
        height: 78px;
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
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }
    .avatar {
        width: 78px;
        height: 78px;
        display: block;
    }
</style>