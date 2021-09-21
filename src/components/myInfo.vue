<!--
 * @Author: Kadia
 * @Date: 2021-09-11 17:03:12
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-18 15:48:49
 * @Connect: nefukadia@foxmail.com
-->
<template>
    <div id="body-info">
        <div class="body-info-item" :style="themeColor('#333','#eee','#eee','#333')">
            <el-switch :value="$store.state.themeName=='dark'" @change="$store.commit('saveThemeName',$store.state.themeName=='dark'?'light':'dark')" active-text="夜读模式 爱护好眼睛哦" active-color="coral"></el-switch>
        </div>
        <div class="body-info-item flex-column-center-start" :style="themeColor('#333','#eee','#eee','#333')">
            <img id="body-info-item-avatar" v-if="info.avatar" :src="$store.state.baseUrl+info.avatar" />
            <label style="font-size:36px;" v-text="info.name"></label>
            <div class="flex-center-around" style="width:100%;">
                <div>
                    <div>文章</div>
                    <div v-text="statistics.blog"></div>
                </div>
                <div>
                    <div>订阅</div>
                    <div v-text="statistics.subscribe"></div>
                </div>
                <div>
                    <div>浏览量</div>
                    <div v-text="statistics.view"></div>
                </div>
            </div>
            <div class="flex-center-around" style="margin-top:10px;width:80%;">
                <div>
                    <el-tooltip class="item" :effect="$store.state.themeName" content="订阅" placement="bottom">
                        <el-button @click="goTo($route.name,'Tourist')" :type="isLight()?'success':'info'" icon="el-icon-bell" circle></el-button>
                    </el-tooltip>
                </div>
                <div>
                    <el-tooltip class="item" :effect="$store.state.themeName" content="发邮件" placement="bottom">
                        <a :href="'mailto:'+info.email" target="_blank">
                            <el-button :type="isLight()?'success':'info'" icon="el-icon-message" circle></el-button>
                        </a>
                    </el-tooltip>
                </div>
                <div>
                    <el-tooltip class="item" :effect="$store.state.themeName" content="留个言" placement="bottom">
                        <el-button @click="goTo($route.name,'Message')" :type="isLight()?'success':'info'" icon="el-icon-notebook-1" circle></el-button>
                    </el-tooltip>
                </div>
                <div>
                    <el-tooltip class="item" :effect="$store.state.themeName" content="关于" placement="bottom">
                        <el-button @click="goTo($route.name,'About')" :type="isLight()?'success':'info'" icon="el-icon-info" circle></el-button>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        statistics:{
            type:Object,
            default:{}
        },
        info:{
            type:Object,
            default:{}
        }
    }
}
</script>

<style lang="scss" scoped>
    #body{
        width: 70vw;
        margin: 20px auto;
        #body-info{
            width: 300px;
            .body-info-item{
                padding: 20px;
                opacity: 0.9;
                border-radius: 10px;
                margin: 20px 0;
                #body-info-item-avatar{
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin: 0 auto;
                    object-fit: cover;
                    &:hover{
                        animation: jump 0.3s ease;
                    }
                }
            }
        }
    }
</style>