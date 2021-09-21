<!--
 * @Author: Kadia
 * @Date: 2021-09-15 16:37:40
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-18 16:38:30
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div v-loading="loading.value">
        <div style="background:#f8f8f8;">
            <my-input inputWidth="300px;" icon="el-icon-document" :value="title" @input="title=$event"></my-input>
        </div>
        <mavon-editor ref="md" @imgAdd="imgAdd" style="height:100vh" @save="clickSave" v-model="content"></mavon-editor>
    </div>
</template>

<script>
export default{
    data(){
        return{
            title:'',
            content:'',
            loading:{
                value:false
            }
        }
    },
    created(){
        const that=this;
        if(that.$route.query.blogId!=null){
            that.Axios({
                data:{
                    loading:that.loading
                },
                info:{
                    url:'/index/viewBlog',
                    params:{
                        id:parseInt(that.$route.query.blogId),
                        token:that.$cookies.get("token"),
                    }
                },
                successCode:function(res){
                    if(res.data.data!=null){
                        that.title=res.data.data.title;
                        that.content=res.data.data.content;
                    }else{
                        that.$message({
                            message:'出错啦！请稍后再试',
                            type:'warning'
                        });
                    }
                }
            });
        }
    },
    methods:{
        // 保存
        clickSave(){
            const that=this;
            that.Axios({
                data:{
                    loading:that.loading
                },
                info:{
                    url:'/user/doBlog',
                    method:'post',
                    data:{
                        token:that.$cookies.get("token"),
                        id:parseInt(that.$route.query.blogId),
                        title:that.title,
                        content:that.content
                    }
                },
                successCode:function(res){
                    that.$message({
                        message:'发布成功',
                        type:'success'
                    });
                    setTimeout(function(){
                        that.goTo(that.$route,'Index');
                    },1000);
                }
            })
        },
        // 添加图片
        imgAdd(filename,file){
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
                    that.$refs.md.$img2Url(filename, that.$store.state.baseUrl+res.data.data);
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>