<template>
    <div class="flex"> 
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">视频播放</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="video_wrapper">
                <div class="video_play">
                    <video id="media" :src=videoDetails.url controls="" width="100%"></video>
                    <img src="../../assets/play_bg.jpg" class="play_bg" v-if="!palyStatus">
                    <img src="../../assets/play.png" class="play_icon" @click="toPlay()" v-if="!palyStatus">
                </div>
                <div class="video_text">
                    <h4>{{videoDetails.title}}</h4>
                    <span>561次播放</span>
                    <span>{{videoDetails.create_time}}</span>
                </div>
                
            </div>
            <img src="../../../static/images/screen/screen4.png">
        </div>
    </div>
</template>

<script>
export default {

    data () {
        return {
           videoDetails:JSON.parse(localStorage.getItem('videoDetails')),
           palyStatus:''
        }
    },
    mounted(){
        
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
    }

}
</script>


<style scoped>
.flex{display: flex;flex-direction: column;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}

.content{margin-top:0.46rem;}
.content>img{width:100%;}
.video_play{width:100%;height:1.8rem;position:relative}
.video_wrapper .play_bg{width:100%;position: absolute;left:0;top:0;bottom:0;right:0;z-index:8}
.video_wrapper .play_icon{width:0.5rem;position: absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10}
.video_text{padding:0.05rem 0.1rem;display: flex;flex-direction: column;align-items: flex-start}
.video_wrapper .video_text h4{font-size:0.15rem;}
.video_wrapper .video_text span{font-size:0.13rem;color:#666;}




</style>
