<!--
 * @Author: Kadia
 * @Date: 2021-08-29 22:39:25
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-17 17:32:14
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div>
        <div id="app">
            <my-background-image></my-background-image>
            <router-view />
            <my-rocket></my-rocket>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    watch: {
        '$route': function(to,from){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
    }
};
</script>

<style>
    * {
        margin: 0;
        border: 0;
        padding: 0;
        text-decoration: none;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        transition: color 0.5s,background 0.5s, border 0.5s, opacity 0.5s, padding 0.5s, height 0.5s, width 0.5s ;
        -moz-transition: color 0.5s,background 0.5s, border 0.5s, opacity 0.5s, padding 0.5s, height 0.5s, width 0.5s ;
        -webkit-transition: color 0.5s,background 0.5s, border 0.5s, opacity 0.5s, padding 0.5s, height 0.5s, width 0.5s ;
        -o-transition: color 0.5s,background 0.5s, border 0.5s, opacity 0.5s, padding 0.5s, height 0.5s, width 0.5s ;
        max-width: 100vw;
    }
    .noFooterView{
        min-height:100vh;
    }
    .flex-center-start{
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .flex-center-between{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .flex-center-around{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .flex-center-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .flex-start-between{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
    .flex-start-around{
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
    }
    .flex-column-center-start{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .flex-column-start-start{
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        text-align: center;
    }
    .flex-column-center-around{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .ellipsis{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .show-more{
        margin: 5px;
        font-size:12px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        -moz-transition: all 0.2s; 
        -webkit-transition: all 0.2s;
        -o-transition: all 0.2s;
    }
    .show-more:hover{
        color: cornflowerblue;
    }
    .title-label{
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid #666;
        display: inline-block;
        font-size:22px;
    }
    @keyframes jump{
        0%{
            position: relative;
            top: 0px;
        }50%{
            position: relative;
            top: -15px;
        }100%{
            position: relative;
            top: 0px;
        }
    }
</style>