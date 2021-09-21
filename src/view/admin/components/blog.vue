<!--
 * @Author: Kadia
 * @Date: 2021-09-15 16:39:36
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-16 21:23:04
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div style="padding:20px;background:#ffffff;">
        <el-button @click="goTo($route,'Blog')" :type="isLight()?'success':'warning'"><i class="el-icon-circle-plus-outline"></i>写博客</el-button>
        <div v-loading="listLoading.value">   
            <el-table :data="list" style="width: 100%;margin-top:20px;">
                <el-table-column prop="id" label="id" width="100px"></el-table-column>
                <el-table-column label="标题">
                    <template slot-scope="scope">
                        <label style="cursor: pointer;" v-text="list[scope.$index].title" @click="goTo($route,'Blog',{blogId:list[scope.$index].id})"></label>
                    </template>
                </el-table-column>
                <el-table-column label="发布时间">
                    <template slot-scope="scope">
                        <label v-text="$store.state.timeFormat(list[scope.$index].time)"></label>
                    </template>
                </el-table-column>
                <el-table-column label="公开">
                    <template slot-scope="scope">
                        <el-switch :value="list[scope.$index].state==1" @change="changeBlog(scope.$index,0)" active-color="#00ff00" inactive-color="#666"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot="header">
                        <my-input @keyup.enter.native="clickSearch" icon="el-icon-search" :value="searchInput" @input="searchInput=$event"></my-input>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index)">编辑</el-button>
                        <el-popconfirm title="真的要删掉么？" @confirm="changeBlog(scope.$index,1)">
                            <el-button slot="reference" size="mini" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div class="show-more" style="background:#ffffff;margin:0;padding:5px;">
                <i class="el-icon-arrow-down" @click="getNextBlog">康康更多</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchInput:'',
            searchValue:'',
            list:[],
            nextPage:0,
            listLoading:{
                value:true
            }
        }
    },
    created(){
        const that=this;
        that.getNextBlog();
    },
    methods:{
        // 获取下一页博客
        getNextBlog(){
            const that=this;
            that.Axios({
                data:{
                    loading:that.listLoading
                },
                info:{
                    url:'/index/getBlog',
                    params:{
                        token:that.$cookies.get("token"),
                        page:that.nextPage,
                        title:that.searchValue
                    }
                },
                successCode:function(res){
                    if(res.data.data.length>0){
                        that.nextPage++;
                        that.list=that.list.concat(res.data.data);
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
            that.list=[];
            that.searchValue=that.searchInput;
            that.getNextBlog();
        },
        //改变状态/删除
        changeBlog(index,type){
            const that=this;
            that.Axios({
                info:{
                    url:'/user/changeBlog',
                    method:'post',
                    data:{
                        token:that.$cookies.get("token"),
                        id:that.list[index].id,
                        type:type
                    }
                },
                successCode:function(res){
                    if(type==0){
                        that.list[index].state=that.list[index].state==1?0:1;
                    }else{
                        that.list.splice(index,1);
                    }
                    that.$message({
                        message:res.data.data,
                        type:'success'
                    });
                }
            });
        },
        //编辑
        handleEdit(index){
            const that=this;
            that.goTo(that.$route,'Blog',{blogId:that.list[index].id});
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>