<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">股票</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="video_wrapper">
                <div class="video_item" v-for="(item,index) in videoList" :key="index" @click="toPlayVideo(item)">
                    <div class="video_box"><img src="../../../static/images/video_bg.png"></div>
                    <div class="item_text">
                        <h4>{{item.desc}}</h4>
                        <div class="video_other">
                            <span>投资 | 股票</span>
                            <span>播放量 591次</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import {getColumnsVideo} from '../../api/api';
export default {

    data () {
        return {
            videoList:''
        }
    },
    mounted() {
        this.getVideo();
        
    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        getVideo(){
            getColumnsVideo().then((res) => {
                this.videoList = res.info
            })
        },
        toPlayVideo(params){
            localStorage.setItem('videoDetails',JSON.stringify(params))
            this.$router.push('/course/playvideo')
        }

    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}


.video_wrapper{display:flex;flex-direction: column;margin-top:0.5rem;}
.video_wrapper .video_item{display:flex;flex-direction: row;padding:0.1rem 0;margin:0 0.1rem;border-bottom:0.01rem solid #ddd;}
.video_wrapper .video_item .item_text{width:65%;display:flex;flex-direction: column;justify-content: space-between;align-items: flex-start;padding-left:0.1rem;}
.video_wrapper .video_item .item_text h4{font-size:0.13rem;color:#444;text-align: left;}
.video_wrapper .video_item .item_text .video_other{width:100%;display: flex;flex-direction: row;justify-content: space-between;align-items:center;}
.video_wrapper .video_item .item_text span{font-size:0.12rem;color:#666;}

.video_wrapper .video_item .video_box{width:35%;}
.video_wrapper .video_item .video_box img{width:100%;display: block;}



</style>
