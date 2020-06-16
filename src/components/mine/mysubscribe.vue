<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">我的订阅</div>
            <div class="back"></div>
        </div>
        <div class="content" ref="scrollBox">
            <div class="topic_wrapper">
                <ul>
                    <li v-for="(item,index) in topicMenu" :key="index">
                        <div class="topic_img" @click="$router.push({path:'/community/topicdetails',query:{id:item.hot_topic.id}})"><img :src=item.hot_topic.topic_img></div>
                        <div class="topic_title" @click="$router.push({path:'/community/topicdetails',query:{id:item.hot_topic.id}})">
                            <h4>{{item.hot_topic.topic_name}}</h4>
                            <p>{{item.hot_topic.topic_desc}}</p>
                            <div class="other">
                                <span>阅读量{{item.hot_topic.topic_read_num}}</span>
                                <span>收藏数{{item.hot_topic.topic_collect}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                <div class="noNews" v-if="noTopicList">暂无更多数据</div>
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { operationList } from '../../api/api'
export default {

    data () {
        return {
            show:true,
            topicMenu:'',
            page:1,
            isLoad:true,
            noTopicList:false,
        }
    },
    beforeCreate() {

        if(!this.$store.state.userInfo.token){
            this.$router.push("/login")
        }
    },
    mounted() {
        this.getTopicList();
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        getTopicList(){

            operationList({
                page:this.page,
                operation_type: 4,
                token:this.$store.state.userInfo.token
            }).then((res) => {
                this.isLoad = false
                if(res.status == 0){
                    if(this.topicMenu){
                        this.topicMenu.push.apply(this.talkList,res.info)

                    }else{
                        this.topicMenu = res.info
                    }

                }else{
                    this.noTopicList = true
                    
                }

            })
        },
        scrollLoad(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let offestHeight = this.$refs.scrollBox.offsetHeight
            if(scrollTop + innerHeight >= offestHeight  && !this.isLoad){
                this.page += 1
                setTimeout(() => {
                    
                    if(!this.noTopicList){

                        this.isLoad = true
                        this.getTopicList() 
                        
                    }
                },0)

            }
            
        }
    },
    beforeDestroy() {

        window.removeEventListener('scroll', this.scrollLoad);  
    }
}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;z-index:9}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.content{margin-top:0.46rem;background:#fff;}


.content .topic_wrapper{padding:0.1rem;}
.content .topic_wrapper h3{font-size:0.15rem;text-align:left;margin-bottom:0.1rem;border-bottom:0.01rem solid #ddd;padding-bottom:0.07rem}
.content .topic_wrapper ul li{display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin-bottom:0.1rem;}
.content .topic_wrapper ul li .topic_img{width:30%;}
.content .topic_wrapper ul li .topic_img img{widtH:100%;}

.content .topic_wrapper .topic_title{width:70%;height:100%;display: flex;flex-direction: column;justify-content: space-between;align-items: flex-start;margin:0 0.05rem;}
.content .topic_wrapper .topic_title h4{font-size:0.13rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;}
.content .topic_wrapper .topic_title p{font-size:0.12rem;color:#666;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;text-align:left;}
.content .topic_wrapper .topic_title .other{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-top:0.02rem}
.content .topic_wrapper .topic_title .other span{font-size:0.10rem;color:#999;margin-right:0.05rem;}

.content .topic_wrapper .isLoad,.content .topic_wrapper .noNews{font-size:0.13rem;}


</style>
