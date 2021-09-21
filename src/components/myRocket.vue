<!--
 * @Author: Kadia
 * @Date: 2021-09-13 19:41:54
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-13 20:37:40
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div style="height:0px;">
        <img v-show="showRocket" @click="toTop" id="rocket" src="../assets/rocket.png">
    </div>
</template>

<script>
export default {
    data(){
        return{
            showRocket:false
        }
    },
    mounted () {
        window.addEventListener('scroll', this.scrolling);
    },
    methods:{
        scrolling(){
            const that=this;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop>=300)
                that.showRocket=true;
            else
                that.showRocket=false;
        },
        toTop(){
            const that=this;
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                if (top <= 0) {
                    clearInterval(timeTop);
                }
            }, 10);
        }
    }
}
</script>

<style lang="scss" scoped>
    #rocket{
        width:100px;
        max-width: 10vw;
        height: 100px;
        max-height: 10vw;
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 50;
        cursor: pointer;
    }
</style>