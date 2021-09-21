<!--
 * @Author: Kadia
 * @Date: 2021-09-04 19:20:27
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-16 18:58:44
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <my-navigation-bar></my-navigation-bar>
        <div class="noFooterView">
            <div id="container" :style="themeColor('#333','#eee','#eee','#333')">
                <mavon-editor :autofocus="false" v-model="value" style="border:none;" :style="themeColor('#333','#eee','#eee','#333')" :previewBackground="$store.state.themeName=='light'?'#eee':'#333'" :boxShadow="false" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :editable="false"></mavon-editor>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value:''
        }
    },
    created(){
        const that=this;
        that.Axios({
            info:{
                url:'/user/getInfo'
            },
            successCode:function(res){
                that.value=res.data.data.about;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
    #container{
        width: 920px;
        margin: 0 auto;
        margin-top: 20px;
        max-width: calc(95vw - 40px);
        padding: 20px;
        opacity: 0.8;
        border-radius: 10px;
        &:hover{
            opacity: 0.95;
        }
    }
</style>