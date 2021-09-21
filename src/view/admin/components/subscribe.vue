<!--
 * @Author: Kadia
 * @Date: 2021-09-16 20:37:25
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-16 21:23:13
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div style="padding:20px;background:#ffffff;">
        <div v-loading="listLoading.value">
            <el-table :data="list" style="width: 100%;margin-top:20px;">
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-popconfirm title="真的要删掉么？" @confirm="handleDelete(scope.$index)">
                            <el-button slot="reference" size="mini" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div class="show-more" style="background:#ffffff;margin:0;padding:5px;">
                <i class="el-icon-arrow-down" @click="getNextSubscribe">康康更多</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[],
            nextPage:0,
            listLoading:{
                value:true
            }
        }
    },
    created(){
        const that=this;
        that.getNextSubscribe();
    },
    methods:{
        // 获取下一页订阅
        getNextSubscribe(){
            const that=this;
            that.Axios({
                data:{
                    loading:that.listLoading
                },
                info:{
                    url:'/subscribe/getList',
                    params:{
                        token:that.$cookies.get("token"),
                        page:that.nextPage
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
        // 删除
        handleDelete(index){
            const that=this;
            that.Axios({
                info:{
                    url:'/subscribe/deleteSubscribe',
                    method:'post',
                    data:{
                        token:that.$cookies.get("token"),
                        email:that.list[index].email
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
        }
    }
}
</script>

<style lang="scss" scoped>

</style>