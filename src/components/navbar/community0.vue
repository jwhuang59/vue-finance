<template>
    <div class="flex">
        <div class="header">
            <img src="../../assets/article_bg.png" class="header_bg">
            <img src="../../assets/person0.png" class="person_img">
            <div class="person_name">
                <div class="name_wrapper">
                    <h2>泉霳</h2>
                    <i><svg t="1572246554826" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3545" width="15" height="15"><path d="M1013.76 26.161152H746.341376l-401.588224 393.54368V26.161152H10.24v112.444416h111.506432v843.30496zM818.141184 981.757952c-30.708736 0-55.656448-10.411008-74.146816-30.944256-18.325504-20.34688-28.027904-48.12288-28.839936-82.55488l-0.12288-5.240832h77.76256l0.953344 3.905536c2.813952 11.529216 7.620608 20.205568 14.286848 25.78944 6.659072 5.590016 14.52032 8.30464 24.0384 8.30464 13.05088 0 24.947712-5.485568 36.369408-16.771072 11.485184-11.350016 18.90304-26.15296 22.049792-43.998208 3.0464-17.271808 1.195008-31.35488-5.501952-41.858048-6.498304-10.182656-15.280128-15.132672-26.847232-15.132672-6.107136 0-12.726272 1.897472-19.675136 5.638144-7.279616 3.926016-14.865408 9.77408-22.542336 17.379328l-2.079744 2.061312-59.368448-15.679488 83.782656-230.638592H1009.44896l-14.148608 80.239616H882.074624l-22.29248 60.557312a65.496064 65.496064 0 0 1 3.15904-0.50176 89.541632 89.541632 0 0 1 11.80672-0.794624c32.666624 0 57.99424 13.130752 75.27936 39.027712 17.027072 25.5232 22.098944 58.656768 15.076352 98.481152-6.975488 39.565312-24.82176 73.555968-53.045248 101.029888-28.43136 27.670528-60.028928 41.700352-93.917184 41.700352z" p-id="3546" fill="#F3C333"></path></svg></i>
                    <span>已认证</span>
                </div>
            </div>
            <div class="person_other">
                <div class="follow">
                    <label>关注</label>
                    <span>3954</span>
                </div>
                <div class="fans">
                    <label>粉丝</label>
                    <span>16294</span>
                </div>
            </div>
            <div class="person_introduce">
                <h3>简介：泉霳老师，上海泉霳投资管理有限公司创始人，CCTV、腾讯财经、新浪财经、第一财经、汇通网、上海东方电视台财经频道特邀嘉宾，上海东海大学金融系客座教授，金融衍生品投资理财专家，资深投资教练，拥有20年期货、证券、外汇、贵金属等操盘经验。 </h3>
            </div>
        </div>
        <div class="content">
            <ul :class="{'is_top':isTop}">
                <li :class="{'on':index == newsNum}" v-for="(item,index) in newsList" :key="index" @click="getNews(index,item.page,true)">{{item.name}}</li>
                    
            </ul>
            <div class="news_wrapper" :class="{'is_margin':isTop}">
                <div class="news_item news_content" v-if="newsNum == 0">
                    <div class="article_wrapper">
                        <div class="article_totals">共{{newsList[0].totals}}篇文章</div>
                        <div class="article_slide" v-for="(item,index) in newsList[0].article" :key="index" @click="$router.push({path:'/article0',query: {id:item.id,type:'2'}})">
                            <div class="slide_left">
                                <h4>{{item.title}}</h4>
                                <div class="article_other">
                                    <div class="other_left">
                                        <span>作者：泉霳</span>
                                        <span>{{item.create_time.split(" ")[1].substring(0,item.create_time.split(" ")[1].length-3)}}</span>
                                    </div>
                                    <div class="other_right">{{item.reading_num}}人看过</div>
                                </div>
                            </div>
                            <div class="slide_right" :class="{'no_img':item.title_img == ''}">
                                <img :src="item.title_img">
                            </div>
                        </div>
                    </div>
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="newsList[0].noNews">暂无更多数据</div>
                </div>
                <div class="news_item news_content" v-if="newsNum == 1">

                    <!-- <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="newsList[1].noNews">暂无更多数据</div> -->
                </div>
                <div class="news_item" v-if="newsNum == 2">
                    <div class="video_wrapper">
                        <div class="video_wrapper">
                        <a class="video_item" :href="item.url" target="_black" v-for="(item,index) in videoList" :key="index">
                            <div class="item_text">
                                <h4>{{item.desc}}</h4>
                                <span>播放量 591次</span>
                            </div>
                            <div class="video_box"><img src="../../assets/video_bg.jpg"></div>
                        </a>
                    </div>
                    </div>
<!-- 
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="newsList[2].noNews">暂无更多数据</div> -->
                </div>
                <div class="news_item news_content" v-if="newsNum == 3">

                    <!-- <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="newsList[3].noNews">暂无更多数据</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import {getArticleQuanl,getColumnsVideo} from '../../api/api';
export default {

    data () {
        return {
            msg: '社区',
            newsNum:0,
            newsList:[
                {
                    article:"",
                    totals:"",
                    name:"文章",
                    type:0,
                    page:1,
                    noNews:false,
                },
                {
                    information:"",
                    name:"动态",
                    type:1,
                    page:1,
                    noNews:false,
                },
                {
                    notice:"",
                    name:"视频",
                    type:2,
                    page:1,
                    noNews:false,
                },
                {
                    report:"",
                    name:"直播",
                    type:3,
                    page:1,
                    noNews:false,
                },
            ],
            isLoad:true,
            isTop:false,
            videoList:''
        }
    },
    mounted() {
        this.getNews(0,1);
        this.getVideo();
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods:{
        getNews(i,page,isClick){
            if(i == 3){
                window.location.href = 'http://vip.aieiz.cn'
            }
            this.newsNum = i
            if(!isClick){
                switch (i){
                    case 0:
                        getArticleQuanl({
                            page:this.newsList[0].page
                        }).then((res) => {
                            this.isLoad = false
                            if(res.status == 0){
                                
                                if(this.newsList[0].article){
                                    this.newsList[0].article.push.apply(this.newsList[0].article,res.info)

                                }else{
                                    this.newsList[0].article = res.info
                                    this.newsList[0].totals = res.totals
                                }
                            }else{
                                this.newsList[0].noNews = true

                            }
                        })
                        break;
                    case 1:
                         this.isLoad = false
                        break;
                    case 2:
                         this.isLoad = false
                        break;
                    case 3:
                         this.isLoad = false
                        break;
                } 

            }
        },
        getVideo(){
            getColumnsVideo().then((res) => {
                this.videoList = res.info
                

            })
        },
        scrollLoad(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let offestHeight = document.body.offsetHeight
            let isTop = $(".content ul").offset().top

            if(scrollTop + innerHeight >= offestHeight  && !this.isLoad){

                var currIndex = ''

                for(var i in this.newsList){
                    if(this.newsList[i].type == this.newsNum){
                        currIndex = i
                        this.newsList[i].page += 1
                        
                    }
                }
                setTimeout(() => {

                    if(!this.newsList[currIndex].noNews){
                        if(this.isShare && currIndex == 0){
                            
                        }else{
                            this.isLoad = true
                            this.getNews(this.newsNum,this.newsList[currIndex].page,false)
                        }
                        
                    }
                },0)

            }
            if(!this.isTop){

                if(scrollTop >= isTop){

                    this.isTop = true
                    this.isHeight = $(".content ul").offset().top

                }

            }else{

                if(scrollTop <= this.isHeight){
                    this.isTop = false
                }
            }

        },

    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollLoad);  
    }
}
</script>

<style scoped>
.flex{display:flex;flex-direction: column;}
.flex .header{display: flex;flex-direction: column;background:#168CE3;color:#fff;position: relative}
.header .header_bg{position: absolute;width:2.5rem;left:0;top:0}
.header .person_img{width:20%;margin:0.1rem auto 0.05rem;}
.header .person_name{display: flex;flex-direction: row;align-items: center;justify-content: center;}
.header .person_name .name_wrapper{display: flex;flex-direction: row;align-items: center;padding-left:0.52rem;}
.header .person_name h2{font-size:0.16rem;}
.header .person_name i{margin:0.06rem 0.05rem 0 0.05rem;}
.header .person_name span{font-size:0.09rem;background:#E42E2E;color:#F3C333;padding:0.01rem 0.02rem;border-radius: 0.03rem;}
.header .person_other{width:40%;display: flex;flex-direction: row;margin:0.05rem auto;justify-content: space-between;}
.header .person_other>div{font-size:0.12rem;}
.header .person_introduce{width:85%;margin:0 auto;padding:0.05rem 0 0.1rem 0}
.header .person_introduce h3{line-height:0.18rem;font-size:0.11rem;text-align:left;font-weight:normal;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}


.content{width:100%;background:#fff;border-top:0.02rem solid #efeff4;}
.content ul{height:0.36rem;display: flex;flex-direction: row;justify-content: space-between;padding:0 0.2rem;}
.content ul li{height:0.34rem;line-height:0.34rem;font-size:0.14rem;}
.content ul li.on{border-bottom:0.02rem solid #F35353;color:#F35353}
/* .content .news_wrapper{display:flex;position: absolute;right:0;left:0;bottom:0;top:2.36rem;background:#fff;} */
/* position: absolute;right:0;left:0;bottom:0;top:0 */
/* .content .news_wrapper .news_item{margin-bottom:0.5rem} */

.article_wrapper{display: flex;flex-direction: column;}
.article_wrapper .article_totals{font-size:0.12rem;color:#888;text-align:left;padding:0.05rem 0.1rem 0 0.1rem}
.article_wrapper .article_slide{margin:0 0.1rem;padding:0.1rem 0;display: flex;flex-direction: row;justify-content: space-between;text-align: left;border-bottom:0.01rem solid #ddd;}
.article_wrapper .article_slide .slide_left{width:100%;display: flex;flex-direction: column;justify-content: space-between;margin-right:0.1rem;}
.article_wrapper .article_slide .slide_left h4{font-size:0.13rem;font-weight:normal;color:#444;}
.article_wrapper .article_slide .slide_left .article_other{font-size:0.12rem;color:#777;display: flex;justify-content: space-between}
.article_wrapper .article_slide .slide_left .article_other 
.article_wrapper .article_slide .slide_right{width:40%;}
.article_wrapper .article_slide .slide_right img{width:100%;}
.article_wrapper .article_slide .slide_right.no_img{width:0}

.news_wrapper .isLoad,.news_wrapper .noNews{font-size:0.13rem;margin:0 0.1rem;padding:0.08rem 0}
.content .is_top{background:#fff;position:fixed;top:0;left:0;right:0;z-index:999;display: flex;flex-direction: row;justify-content: space-between;padding:0 0.2rem;}
.news_wrapper.is_margin{margin-top:0.36rem;}


.video_wrapper{display:flex;flex-direction: column;}
.video_wrapper .video_item{display:flex;flex-direction: row;padding:0.1rem 0;margin:0 0.1rem;border-bottom:0.01rem solid #ddd;}
.video_wrapper .video_item .item_text{width:65%;display:flex;flex-direction: column;justify-content: space-between;align-items: flex-start;padding-right:0.1rem;}
.video_wrapper .video_item .item_text h4{font-size:0.13rem;color:#444;text-align: left;}
.video_wrapper .video_item .item_text span{font-size:0.12rem;color:#666;}
.video_wrapper .video_item .video_box{width:35%;}
.video_wrapper .video_item .video_box img{width:100%;}


</style>
