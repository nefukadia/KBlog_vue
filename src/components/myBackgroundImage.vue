<!--
 * @Author: Kadia
 * @Date: 2021-08-30 16:43:24
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-03 11:27:18
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div style="height:0">
        <img id="bkImage" src="../assets/backgroundImage.png" />
        <div v-if="!isLight()" class="blackDiv"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    #bkImage{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        object-fit: cover;
        z-index: -1;
    }
    .blackDiv{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: -1;
        background: #434343;
        opacity: 0.7;
    }
</style>