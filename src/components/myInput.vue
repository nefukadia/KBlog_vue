<!--
 * @Author: Kadia
 * @Date: 2021-09-04 14:11:30
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-17 17:35:19
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div class="flex-center-start" style="flex-wrap:wrap;">
        <div id="container" :style="'background:'+background+';color:'+color">
            <i :class="icon"></i>
            <input :disabled="disable" :type="type" :value="value" @input="$emit('input',$event.target.value)" :placeholder="placeholder" :style="'background:'+background+';color:'+color+';width:'+inputWidth" />
        </div>
        <slot name="append"></slot>
    </div>
</template>

<script>
export default {
    props:{
        value:{
            type:String,
            default:''
        },
        inputWidth:{
            type:String,
            default:'200px'
        },
        placeholder:{
            type:String,
            default:'请输入内容'
        },
        background:{
            type:String,
            default:'#fff'
        },
        color:{
            type:String,
            default:'#333'
        },
        icon:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:'text'
        },
        disable:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style lang="scss" scoped>
    #container{
        margin: 5px;
        padding: 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }
    input{
        margin-left: 10px;
        outline-style: none;
        border:none;
        border-radius: 5px;
        opacity: 0.8;
    }
</style>