<template>

    <div class="flex">
        <div class="header">
            <ul class="nav_menu">
                <li @click="$router.push('/community/myfollow')">关注</li>
                <li :class="{show:show}">推荐</li>
                <li @click="$router.push('/community/postnews')">帖子</li>
                <!-- <li>圈子</li> -->
            </ul>
        </div>
        <div class="content">
            <div class="community_wrapper">
                <div class="hot_topic">
                    <ul>
                        <li v-for="(item,index) in topicMenu" :key="index" @click="$router.push({path:'/community/topicdetails',query:{id:item.id}})" v-if="index<3">
                            <img src='../../../static/images/topic_bg1.png' class="hot_topic_bg">
                            <span>{{item.topic_name}}</span>
                            <div class="topic_discuss">
                                <img src="../../assets/person0.png">
                                <img src="../../assets/person1.png">
                                <p>正在讨论...</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="community_bg"><img src="../../../static/images/screen/screen5.png"></div>
                <div class="new_topic">
                    <h4>最新话题</h4>
                    <ul>
                        <li v-for="(item,index) in topicMenu" :key="index" @click="$router.push({path:'/community/topicdetails',query:{id:item.id}})"><label>#</label><span>{{item.topic_name}}</span></li>
                        <li class="more_topic" @click="$router.push('/community/topiccenter')">更多话题>></li>
                    </ul>
                </div>
                <div class="operation_container" >

                    <div class="content_wrapper" v-for="(item,index) in articleList" :key="index" @click="$router.push({path:'/article',query: {id:item.id,type:'3'}})">
                        <div class="wrapper_left" :class="{'hasImg':item.title_img != ''}">
                            <h3><font>{{item.title}}</font></h3>
                            <p>{{item.abstract}}</p>
                            <div class="more">
                                <div class="more_left">
                                    <i class="el-icon-time"></i>
                                    <span>{{item.create_time}}</span>
                                </div>
                                <div class="more_right">
                                    <i class="top"><svg t="1574332002209" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2035" width="14" height="14"><path d="M884.875894 423.143253L646.970506 423.143253c92.185562-340.464205-63.516616-357.853247-63.516616-357.853247-65.993017 0-52.312436 52.18247599-57.3031 60.881602 0 166.502152-176.849824 296.971645-176.849824 296.971645l1e-8 472.171899c0 46.607504 63.516616 63.393819 88.43309799 63.393819l357.452111 0c33.641191 0 61.036122-88.224344 61.036122-88.224344 88.43412199-300.70569 88.434122-390.177444 88.43412199-390.177444C944.657442 418.179195 884.875894 423.143253 884.875894 423.143253L884.875894 423.143253 884.875894 423.143253zM884.875894 423.143253" fill="#bfbfbf" p-id="2036"></path><path d="M251.671415 423.299819L109.214912 423.299819c-29.420053 0-29.873378 28.89612-29.873378 28.89612l29.420053 476.202703c0 30.30930601 30.36149501 30.309306 30.36149499 30.309306L262.42022301 958.707948c25.68600901 0 25.458835-20.049638 25.458835-20.049638L287.87905801 459.411271C287.879058 422.837284 251.671415 423.299819 251.671415 423.299819L251.671415 423.299819 251.671415 423.299819zM251.671415 423.299819" fill="#bfbfbf" p-id="2037"></path></svg></i>
                                    <span>{{item.praise_num}}</span>
                                    <i class="el-icon-star-off"></i>
                                    <span>{{item.review_num}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="wrapper_right" :class="{'noImg':item.title_img == ''}">
                            <img :src="item.title_img">
                        </div>
                    </div>

                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="noArticleList">暂无更多数据</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { topicType,topicArticle } from '../../api/api';
export default {

    data () {
        return {
            show:true,
            articleList:'',
            page:1,
            isLoad:true,
            noArticleList:false,
            topicMenu:''
        }
    },
    mounted() {
        this.topicArticle()
        this.getTopic();
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods: {

        getTopic(){
            topicType({
                page:1,
                limit:5
            }).then((res) => {
                this.topicMenu = res.info

            })
        },
        topicArticle(){

            topicArticle({
                page:this.page,
            }).then((res) => {
                this.isLoad = false
                if(res.status == 0){
                    if(this.articleList){
                        this.articleList.push.apply(this.articleList,res.info)

                    }else{
                        this.articleList = res.info
                    }
                    
                    
                }else{
                    this.noArticleList = true
                    
                }

            })
        },

        scrollLoad(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let offestHeight = document.body.offsetHeight

            if(scrollTop + innerHeight >= offestHeight  && !this.isLoad){
                this.page += 1
                setTimeout(() => {
                    
                    if(!this.noArticleList){

                        this.isLoad = true
                        this.topicArticle() 
                        
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


.flex{display: flex;flex-direction: column;}
.header{height:0.46rem;display: flex;flex-direction: row;padding:0.15rem 0.1rem;justify-content: space-between;background:#168CE3;}
.header .nav_menu{width:60%;display: flex;flex-direction: row;align-items: center;justify-content: space-around;margin:0 auto}
.header .nav_menu li{width:25%;color:#ddd;font-size:0.15rem;}
.header .nav_menu li.show{font-size:0.18rem;color:#fff;position:relative}
.header .nav_menu li.show::after{content:"";width:0.05rem;height:0.05rem;border-radius:50%;background:#fff;position: absolute;bottom:-0.08rem;left:50%;transform: translate(-50%,0)}


.content .hot_topic ul{display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding:0.05rem;}
.content .hot_topic li{width:33%;display: flex;flex-direction: row;justify-content: center;align-items: center;position:relative;}
.content .hot_topic li .hot_topic_bg{width:100%;border-radius: 0.05rem;}
.content .hot_topic li span{width:100%;position: absolute;left:50%;top:0.05rem;transform: translate(-50%,0);font-size:0.12rem;color:#eee;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}

.hot_topic .topic_discuss{width:100%;position: absolute;left:50%;bottom:0.05rem;transform: translate(-50%,0);display: flex;flex-direction: row;justify-content: center;}
.hot_topic .topic_discuss img{width:0.15rem;height:0.15rem;}
.hot_topic .topic_discuss p{font-size:0.10rem;color:#eee;margin-left:0.03rem;}

.community_wrapper .community_bg img{width:100%;}
.new_topic h4{font-size:0.15rem;text-align:left;margin-left:0.1rem;}
.new_topic ul{display: flex;flex-flow: row wrap;padding:0.1rem 0.1rem 0 0.1rem }
.new_topic ul li{width:50%;margin-bottom:0.1rem;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;}
.new_topic ul li label{width:0.15rem;height:0.15rem;background:#F56969;color:#fff;display: block;border-radius: 50%;font-size:0.13rem;}
.new_topic ul li span{width:100%;font-size:0.13rem;margin-left:0.05rem;text-align:left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}

.new_topic .more_topic{font-size:0.13rem;padding-left:0.2rem;color:#F56969}



.operation_container{width:100%;display: flex;flex-direction: column;padding:0 0.1rem;}
.content_wrapper{display: flex;flex-direction: row;border-bottom:0.01rem solid #ddd;padding:0.1rem 0;justify-content: space-between;align-items:center;}
.content_wrapper .wrapper_left{width:100%;margin:0;padding:0}
.content_wrapper .wrapper_left.hasImg{width:70%;padding-right:0.05rem;}
.content_wrapper .wrapper_left h3{width:100%;display: flex;font-size:0.14rem;text-align:left;}
.content_wrapper .wrapper_left h3 font{flex:1;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.content_wrapper .wrapper_left p{line-height:0.18rem;font-size:0.13rem;color:#444;text-align:left;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
.content_wrapper .wrapper_left .more{display: flex;flex-direction: row;justify-content: space-between;margin-top:0.03rem;}
.content_wrapper .wrapper_left .more_left{font-size:0.12rem;}
.content_wrapper .wrapper_left .more_right{font-size:0.12rem;}


.content_wrapper .wrapper_right{width:30%;margin-left:0.05rem;}
.content_wrapper .wrapper_right img{width:100%;display: block;}
.content_wrapper .wrapper_right.noImg{width:0 !important;margin:0}

.tabs_container .swiper-slide .noNews{font-size:0.12rem;padding:0.05rem 0}
.tabs_container .swiper-slide .loadNews{font-size:0.12rem;padding:0.08rem 0}
.tabs_container .swiper-slide .loadNews i{font-size:0.15rem;margin-right:0.05rem;}

.operation_container .isLoad{font-size:0.13rem;padding:0.1rem;}
.operation_container .noNews{font-size:0.13rem;padding:0.1rem;margin-bottom:0.5rem}





</style>
