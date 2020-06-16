<template>
    <div id="app">

        <!-- <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
            </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">

        </router-view> -->
        <router-view v-if="isAlive"></router-view>
        <div id="footer" v-if="!$route.meta.hidden">
            <ul class="menu">
                <template v-for="(item,index) in $router.options.routes">
                    <li v-for="child in item.children" :class="$route.path==child.path?'is_show':''" @click="$router.push(child.path)">
                        <img :src=child.icon0 v-if="$route.path==child.path">
                        <img :src=child.icon v-else>
                        <span>{{child.name}}</span>                    
                    </li>
                </template>
            </ul>
        </div>
        <!-- <div id="loading" @touchmove.prevent v-show="loading">
            <div class="loading_wrapper">
                <i class="el-icon-loading"></i>
                <span>加载中</span>
            </div>
        </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'app',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isAlive: true,
      }
    },
    mounted() {
         
    },
    methods: {
        reload() {
            this.isAlive = false;
            this.$nextTick(function () {
                this.isAlive = true
            })
        }
    },
    // computed : {
    //     ...mapState({
    //         loading:state => state.loading

    //     })
    // }
}
</script>

<style>
*{margin:0;padding:0}
input{outline:none;}
ul,ol,li{list-style: none;}
a{text-decoration: none;}
img{border:0}


#app {
  font-family: Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background:#fff;
  color: #444;
}

#footer .content{margin-bottom:0.5rem;}
#footer .menu{width:100%;height:0.5rem;background:#fff;display:flex;flex-direction: row;justify-content: space-around;position: fixed;bottom:0;left:0;right:0;border-top:0.01rem solid #ddd;z-index:99;}
#footer .menu li{font-size:0.14rem;display: flex;flex-direction: column;align-content: center;justify-content: center;}
#footer .menu li img{width:60%;display: block;margin:0.05rem auto 0.02rem;}
#footer .menu li.is_show{color:#F35353}

/* #loading{position:fixed;top:0;bottom:0;left:0;right:0;background: rgba(0, 0, 0, 0.1);z-index:998}
#loading .loading_wrapper{width:1rem;height:1rem;border-radius:0.1rem;background:rgba(0, 0, 0, 0.5);position:absolute;left:50%;top:50%;margin-left:-0.5rem;margin-top:-0.5rem;z-index:999;display:flex;flex-direction: column;justify-content: center;align-items: center}
#loading .loading_wrapper i{font-size:0.3rem;color:rgba(255, 255, 255, 0.8);}
#loading .loading_wrapper span{font-size:0.13rem;color:rgba(255, 255, 255, 0.8);margin-top:0.01rem;} */



</style>
