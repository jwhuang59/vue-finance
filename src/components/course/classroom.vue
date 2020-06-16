<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"></div>
            <div class="header_text">财经课堂</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="video_wrapper">
                <video id="media" src="http://47.100.231.174/video/zhiyuan/shipin1.mp4" controls="" width="100%"></video>
                <img src="../../assets/play_bg.jpg" class="play_bg" v-if="!palyStatus">
                <img src="../../assets/play.png" class="play_icon" @click="toPlay()" v-if="!palyStatus">
                <div class="video_text" v-if="!palyStatus">
                    <h4>CCTV奋斗之投资教父泉霳专访</h4>
                </div>
            </div>
            <div class="video_menu">
                <ul @click="$router.push('/course/videocenter')">
                    <li >
                        <img src="../../assets/videomenu_1.png">
                        <span>所有课程</span>
                    </li>
                    <li>
                        <img src="../../assets/videomenu_2.png">
                        <span>会员专区</span>
                    </li>
                    <li>
                        <img src="../../assets/videomenu_3.png">
                        <span>已购课程</span>
                    </li>
                    <li>
                        <img src="../../assets/videomenu_4.png">
                        <span>历史观看</span>
                    </li>
                </ul>
            </div>
            <div class="video_container">
                <div class="newest_video">
                    <div class="newest_header" @click="$router.push('/course/course')">
                        <h3>最新推荐</h3>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <div class="newest_body">
                        <div class="newest_info" @click="toPlayVideo(0)">
                            <img src="../../assets/video_bg.jpg">
                            <div class="newest_price">
                                <h4>投资教父泉霳专访</h4>
                                <p><label>积分</label>298</p>
                            </div>
                            <div class="newest_other">
                                <span>43人购买</span>
                                <span>好评度96%</span>
                            </div>
                        </div>
                        <div class="newest_info" @click="toPlayVideo(1)">
                            <img src="../../assets/video_bg.jpg">
                            <div class="newest_price">
                                <h4>点掌财经视屏直播</h4>
                                <p><label>积分</label>298</p>
                            </div>
                            <div class="newest_other">
                                <span>43人购买</span>
                                <span>好评度96%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="newest_video">
                    <div class="newest_header" @click="$router.push('/course/course')">
                        <h3>免费视频</h3>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <div class="newest_body">
                        <div class="newest_info" @click="toPlayVideo(2)">
                            <img src="../../assets/video_bg.jpg">
                            <div class="newest_price">
                                <h4>汇通网视频直播</h4>
                                <p><label>积分</label>298</p>
                            </div>
                            <div class="newest_other">
                                <span>43人购买</span>
                                <span>好评度96%</span>
                            </div>
                        </div>
                        <div class="newest_info" @click="toPlayVideo(3)">
                            <img src="../../assets/video_bg.jpg">
                            <div class="newest_price">
                                <h4>汇通网视频直播</h4>
                                <p><label>积分</label>298</p>
                            </div>
                            <div class="newest_other">
                                <span>43人购买</span>
                                <span>好评度96%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { getColumnsVideo } from '../../api/api'
export default {

    data () {
        return {
            palyStatus:false,
            videoList:'',

        }
    },
    mounted() {
        this.getVideo();
    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        toPlay(){
            var Media = document.getElementById("media"); 
            Media.play();
            this.palyStatus = true
        },
        toPlayVideo(id){
            for(var i in this.videoList){
                if(id == i){
                    localStorage.setItem('videoDetails',JSON.stringify(this.videoList[id]))
                    this.$router.push('/course/playvideo')
                }
            }

        },
        getVideo(){
            getColumnsVideo().then((res) => {
                this.videoList = res.info
            })
        },
        
        
    },
    computed: {
        userInfo () {
            return this.$store.state.userInfo
        }
    }
}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.content{background:#fff;margin-bottom:0.46rem;}

.video_wrapper{width:100%;height:1.8rem;position: relative;}
.video_wrapper .play_bg{width:100%;position: absolute;left:0;top:0;bottom:0;right:0;z-index:8}
.video_wrapper .play_icon{width:0.5rem;position: absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10}
.video_text{padding:0.05rem 0.1rem;position:absolute;bottom:0.1rem;left:0.1rem;z-index:9}
.video_wrapper .video_text h4{font-size:0.14rem;color:#fff;font-weight:normal}

.video_menu ul{width:100%;display: flex;flex-direction: row;justify-content: space-around;align-items: center;font-size:0.14rem;padding:0.1rem 0;border-bottom:0.01rem solid #ddd;}
.video_menu ul li{width:20%;display: flex;flex-direction: column;align-content: center;}
.video_menu ul li img{width:70%;margin:0 auto;}
.video_menu ul li span{margin-top:0.05rem}

.video_container{padding:0.1rem;display: flex;flex-direction: column;}
.video_container .newest_video .newest_header{display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
.video_container .newest_video .newest_header h3{font-size:0.16rem;}
.video_container .newest_video .newest_header i{font-size:0.16rem;color:#666;}
.video_container .newest_video .newest_body{display: flex;flex-direction: row;justify-content: space-between;margin:0.1rem 0}
.newest_video .newest_info{width:49%;display: flex;flex-direction: column;align-items: flex-start;justify-content: center}
.newest_video .newest_info>div{width:100%;margin-top:0.05rem;display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
.newest_video .newest_info img{width:100%;}
.newest_video .newest_info h4{font-size:0.14rem;font-weight:normal;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;}
.newest_video .newest_info p{width:50%;font-size:0.16rem;color:#FA666A;}
.newest_video .newest_info label{font-size:0.12rem;color:#666;margin-right:0.03rem;}
.newest_video .newest_info span{font-size:0.12rem;color:#999}


</style>
