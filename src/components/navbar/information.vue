<template>
    <div class="flex">
        <div class="header">
            <img src="../../../static/images/mine.png" @click="toMine()" class="admin">
            <form class="search" @click="$router.push('/search')">
                <input placeholder="搜索资讯，期货/股票，期货" type="text">
                <i class="el-icon-search"></i>
            </form> 
            <img src="../../../static/images/release.png" @click="toTalking()" class="release">
        </div>
        <div class="swiper">
            <div class="block">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
                            <img :src="item.img_path" alt="" class="banner_img" @click="toBanner(item.url)">
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                                    
                </div>
            </div>

        </div>
        <div class="section">
            <ul class="menu">
                <li v-for="(item,index) in menuList" :key="index" @click="$router.push(item.url)">
                    <img :src=item.img_path>
                    <span>{{item.title}}</span>
                </li>
            </ul>
            <div class="concept">
                <h2>热门指数-板块</h2>
                <div class="exponent_wrapper">
                    <div class="swiper-container0 exponent_swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide ul">
                                <div class="li" v-for="(item,index) in getMarket" :key="index" v-if="index<3" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                    <img src="../../../static/images/mark1.png" v-if="item.zf_ds<0">
                                    <img src="../../../static/images/mark2.png" v-else>
                                    <h3>{{item.name}}</h3>
                                    <span class="plate" :class="{'red':item.zf_ds>0}">{{parseFloat(item.price).toFixed(2)}}</span>
                                    <p :class="{'red':item.zf_ds>0}" v-if="item.zf_ds>0">
                                        <span class="value">+ {{item.zf_ds}}</span><span class="percentage">+ {{item.zf_bfb}}%</span>
                                    </p>
                                    <p :class="{'red':item.zf_ds>0}" v-else>
                                        <span class="value">{{item.zf_ds}}</span><span class="percentage">{{item.zf_bfb}}%</span>
                                    </p>
                                </div>

                            </div>
                            <div class="swiper-slide ul">
                                <div class="li" v-for="(item,index) in getMarket" :key="index" v-if="index>2" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                    <img src="../../../static/images/mark1.png" v-if="item.zf_ds<0">
                                    <img src="../../../static/images/mark2.png" v-else>
                                    <h3>{{item.name}}</h3>
                                    <span class="plate" :class="{'red':item.zf_ds>0}">{{item.price}}</span>
                                    <p :class="{'red':item.zf_ds>0}" v-if="item.zf_ds>0">
                                        <span class="value">+{{item.zf_ds}}</span><span class="percentage">+{{item.zf_bfb}}%</span>
                                    </p>
                                    <p :class="{'red':item.zf_ds>0}" v-else>
                                        <span class="value">{{item.zf_ds}}</span><span class="percentage">{{item.zf_bfb}}%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination0 dot"></div>
                    </div>
                </div>

                <div class="concept_wrapper">
                    <ul >
                        <li v-for="(item,index) in getPlate" :key="index" @click="$router.push({path: '/kline', query: { code: item.keywords,key:item.index_key }})">
                            <h3>{{item.name}}</h3>
                            <span class="plate" :class="{'red':item.zf_bfb>0}">+{{item.zf_bfb}}%</span>
                            <h4>{{item.symbol_name}}</h4>
                            <p class="red"><span class="value">+0.44</span><span class="percentage">+{{item.symbol_bfb}}%</span></p>
                        </li>
                    </ul>
                </div>
                
            </div>
            <div class="banner_ad"><img src="../../assets/banner_ad.jpg"></div>
            <div class="simulation">
                <div class="title">
                    <h2>模拟排行</h2> 
                    <span @click="$router.push('/train')">查看更多</span> 
                </div>
                <table>
                    <thead>
                        <th>名次</th>
                        <th>用户名</th>
                        <th>总收益率</th>
                        <th>总收益</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>孙先生</td>
                            <td>41%</td>
                            <td>116515</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>李先生</td>
                            <td>36%</td>
                            <td>116515</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>王先生</td>
                            <td>28%</td>
                            <td>11615</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tabs">
                <div class="tabs_wrap" :class="{'is_top':isTop}">
                    <div class="scroll_box">
                        <ul>
                            <li :class="{'on':index == tabNum}" v-for="(item,index) in list" :key="index" @click="tabs(index,item.sub,1,true)" >{{item.name}}</li>
                         
                        </ul>
                    </div>
                </div>
                <div class="tabs_container" :class="{'is_margin':isTop}">
                    <div class="swiper-container-cons">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="content-slide">
                                    <div class="one_title"><img src="../../../static/images/watch.png"><span>市场数据</span></div>
                                    <div class="one_wrapper" v-for="(item,index) in menuInfo" :key="index">
                                        <div class="one_news">
                                            <h3>{{item.time}}</h3>
                                            <p>{{item.content}}</p>
                                        </div>
                                        <i><img src="../../../static/images/dot.png"></i>
          
                                    </div>

                                </div>
                            </div>
                            <div class="swiper-slide"></div>
                            <div class="swiper-slide"></div>
                            <div class="swiper-slide"></div>
                            <div class="swiper-slide"></div>
                            <div class="swiper-slide"></div>
                            <div class="swiper-slide"></div>
                            <!-- <div class="swiper-slide">
                                <div class="content-slide">
                                    <div class="content_wrapper" v-for="(item,index) in menuInfo" :key="index">
                                        <div class="wrapper_left" :class="{'hasImg':item.title_img != null}">
                                            <h3><font>{{item.title}}</font></h3>
                                            <p>{{item.abstract}}</p>
                                            <div class="more">
                                                <div class="more_left">
                                                    <i class="el-icon-time"></i>
                                                    <span>{{item.create_time}}</span>
                                                </div>
                                                <div class="more_right">
                                                    <i class="el-icon-view"></i>
                                                    <span>{{item.reading_num}}</span>
                                                    <i class="el-icon-star-off"></i>
                                                    <span>695</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper_right" :class="{'noImg':item.title_img == null}">
                                            <img :src="item.title_img">
                                        </div>
                                        
                                    </div>

                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="go_back" @click="goBack()" v-if="show_goBack">
            <i><svg t="1573201304741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5492" width="18" height="18"><path d="M967.113846 0H56.886154a56.886154 56.886154 0 0 0 0 113.772308h910.227692a56.886154 56.886154 0 1 0 0-113.772308zM559.310769 194.461538a57.846154 57.846154 0 0 0-88.270769-7.704615L102.916923 554.830769a57.847385 57.847385 0 0 0 81.809231 81.809231l270.387692-270.387692v600.861538a56.886154 56.886154 0 1 0 113.772308 0v-602.215384l264.923077 264.923076a56.891077 56.891077 0 1 0 80.455384-80.455384z" p-id="5493" fill="#ffffff"></path></svg></i>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import mui from '../../../static/js/mui.min.js';
import { getFinancial,indexIndustry,getIndustry,bannerList } from '../../api/api';

export default {

    data () {
        return {
            bannerList:'',
            menuList:'',
            list:[
                {
                    name:"7x24",
                    sub:"1"
                },
                {
                    name:"推荐",
                    sub:"2"
                },
                {
                    name:"沪深",
                    sub:"3"
                },
                {
                    name:"基金",
                    sub:"5"
                },
                {
                    name:"私募",
                    sub:"6"
                },
                {
                    name:"外汇",
                    sub:"7"
                },
                {
                    name:"期货",
                    sub:"9"
                },
                {
                    name:"银行",
                    sub:"10"
                }
            ],
            getMarket:'',
            getPlate:'',
            tabNum:0,
            tabSub:'',
            page:1,
            menuInfo:[],
            html:'',
            refresh:true,
            isTop:false,
            isHeight:0,
            show_goBack:false,
        }
    },
    created(){
        window.toArticle = this.toArticle
    },
    mounted(){
        this.getBanner()
        this.plateSwiper()
        this.tabs(0,1,this.page)
        window.addEventListener('scroll', this.scrollLoad)
        //指数-板块
        this.getRealData();
        this.getIndex = setInterval(this.getRealData,10000)
        this.goBack();
    },
    methods: {
        getBanner(){

            bannerList({
                keywords:'app_banner'
            }).then((res) => {
                this.bannerList = res.info
                new Swiper('.swiper-container', {
                    loop: true, 
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true,
                    },
                    observeParents:false,  
			        observer:true, 
                    // navigation: {
                    //     nextEl: '.swiper-button-next',
                    //     prevEl: '.swiper-button-prev',
                    // },
                })
            })
            bannerList({
                keywords:'module'
            }).then((res) => {
                this.menuList = res.info
            })
        },
        toBanner(url){
            // window.location.href = url
        },
        tabs(i,sub,page,isClick){

            // document.documentElement.scrollTop = this.isHeight
            
            $(".tabs_container .swiper-slide").eq(this.tabNum).append("<p class='loadNews'><i class='el-icon-loading'></i>加载中</p>")
            var that = this;
            this.tabNum = i;
            this.tabSub = sub;
            this.mySwiperCons.slideTo(i,0,false)
            if(isClick){  
                
                if( this.tabNum != 0){
                    $(".tabs_container .swiper-slide").eq(this.tabNum).html("<p class='loadNews'><i class='el-icon-loading'></i>加载中</p>")
                }else{
                    this.menuInfo = [];  
                    $(".tabs_container .swiper-slide").eq(this.tabNum).append("<p class='loadNews'><i class='el-icon-loading'></i>加载中</p>")
                }
            }
            var params = { 
                type:sub,
                page:page
            }
            getFinancial(params).then((res) => {
                $(".tabs_container .swiper-slide>p").remove()
                if(this.tabNum == 0){
                    
                    if(res.status != 0 ){

                        $(".tabs_container .swiper-slide").eq(0).append("<p class='noNews'>暂无更多数据</p>")
                        this.page = 1
                        return false

                    }else{

                        for(var i in res.info){
                            that.menuInfo.push(res.info[i])

                        }    
                        that.refresh = true

                    }
   
                }else{

                    if(res.status !=0){
                        
                        $(".tabs_container .swiper-slide").eq(this.tabNum).append("<p class='noNews'>暂无更多数据</p>")
                        this.page = 1
                        return false

                    }else{

                        var html = "";
                        for(var i in res.info){
                            html += `
                                <div class="content-slide" onClick="toArticle(${res.info[i].id})">
                                    <div class="content_wrapper" >
                                        <div class="wrapper_left ${ res.info[i].title_img ? 'hasImg' : ''}">
                                            <h3><font>${res.info[i].title}</font></h3>
                                            <p>${res.info[i].abstract}</p>
                                            <div class="more">
                                                <div class="more_left">
                                                    <i class="el-icon-time"></i>
                                                    <span>${res.info[i].create_time}</span>
                                                </div>
                                                <div class="more_right">
                                                    <i class="el-icon-view"></i>
                                                    <span>${res.info[i].reading_num}</span>
                                                    <!-- <i class="el-icon-star-off"></i>
                                                    <span>695</span> -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapper_right ${ res.info[i].title_img ? '' : 'noImg'}">
                                            ${ res.info[i].title_img ? '<img src=' + res.info[i].title_img  + '>' : ""}
                                          
                                        </div>
                                        
                                    </div>

                                </div>
                            
                            `

                        }

                        $(".tabs_container .swiper-slide").eq(that.tabNum).append(html)
                        that.refresh = true

                    }

                }

            });
        },
        plateSwiper(){
            var that = this  
            var mySwiper2 = new Swiper('.swiper-container0', {

                pagination: {
                    el: '.swiper-pagination0',
                    clickable:true,
                },

            }) 
            that.mySwiperCons = new Swiper('.swiper-container-cons', {

                on:{

                    slideNextTransitionStart : function(e) {
                        // document.documentElement.scrollTop = this.isHeight
                        if(that.tabNum != 0){
                            $(".tabs_container .swiper-slide").eq(that.tabNum).html("")
                        }else{
                            that.menuInfo = [];
                        }

                        that.tabNum += 1 
                        that.page = 1
                        var sub0 = "";
                        for(var i in that.list){
                            if(that.tabNum == i){
                                sub0 = that.list[i].sub
                            }
                        }
                        that.tabs(that.tabNum,sub0,that.page)
                    },
                    slidePrevTransitionStart : function(e) {
                        // document.documentElement.scrollTop = this.isHeight
                        if(that.tabNum != 0){
                            $(".tabs_container .swiper-slide").eq(that.tabNum).html("")
                        }else{
                            that.menuInfo = [];
                        }

                        that.tabNum = that.tabNum - 1
                        that.page = 1
                        var sub0 = "";
                        for(var i in that.list){
                            if(that.tabNum == i){
                                sub0 = that.list[i].sub
                            }
                        }
                        that.tabs(that.tabNum,sub0,that.page)
                    }

                }   

            })
        },
        scrollLoad(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let offestHeight = document.body.offsetHeight
            let isTop = $(".tabs_wrap").offset().top

            if(scrollTop > innerHeight*2){
                this.show_goBack = true
            }else{
                this.show_goBack = false
            }
            if(scrollTop + innerHeight >= offestHeight - 60 && this.refresh){

                this.refresh = false
                this.page++
                setTimeout(() => {

                    this.tabs(this.tabNum,this.tabSub,this.page)

                },0)

            }
            if(!this.isTop){

                if(scrollTop >= isTop){

                    this.isTop = true
                    this.isHeight = $(".tabs_wrap").offset().top

                }

            }else{

                if(scrollTop <= this.isHeight){
                    this.isTop = false
                }
            }

        },
        getRealData(){
            indexIndustry().then((res) => {

                this.getMarket = res.info
            })
            var params = {
                limit:'3'
            }
            getIndustry(params).then((res) => {

                this.getPlate = res.info
            })
        },
        toArticle(id){
            this.$router.push({path:'/article',query: {id:id,type:'1'}})
        },
        toMine(){
            if(!this.$store.state.userInfo.token){
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }else{
                this.$router.push('/mine')
            }
        },
        toTalking(){
            if(!this.$store.state.userInfo.token){
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }else{
                this.$router.push('/pages/talking')
            }
        },
        goBack(){

            $("html,body").animate({scrollTop:0},300)
        }
    },
    beforeDestroy() {
        clearInterval(this.getIndex);    
        this.getIndex = null;
        window.removeEventListener('scroll', this.scrollLoad);    
        
    }

}
</script>

<style scoped>
.flex{width:100%;height:auto;margin-bottom:0.5rem;}
.header{width:100%;height:0.46rem;display:flex;flex-direction:row;position:relative;background:#168CE3;font-size:0.30rem;color:#fff;}
.header .user{position:absolute;left:0.08rem;top:0.08rem}
.header .search{width:100%;margin:0.08rem 0.45rem;font-size:0.16rem;position:relative;}
.header .search>input{width:100%;height:0.30rem;padding:0.05rem 0 0.05rem 0.3rem;box-sizing:border-box;background:transparent;border:0.01rem solid #fff;border-radius: 0.15rem;color:#fff;font-size:0.12rem;}
.header .search>input::-webkit-input-placeholder{color: #ddd;font-size: 0.12rem;}
.header .search i{width:0.15rem;height:0.15rem;position:absolute;left:0.1rem;top:0.08rem;}
.header .admin{width:0.24rem;height:0.24rem;position:absolute;left:0.10rem;top:0.11rem}
.header .release{width:0.24rem;height:0.24rem;position:absolute;right:0.10rem;top:0.12rem}


.banner_img{width:100%}
.section .menu{width:100%;display: flex;flex-direction: row;justify-content: space-around;align-items: center;font-size:0.14rem;padding:0.1rem 0;border-bottom:0.01rem solid #ddd;}
.section .menu li{display: flex;flex-direction: column;align-content: center;}
.section .menu li img{width:70%;margin:0 auto;}
.section .menu li span{margin-top:0.05rem}
.concept{overflow: hidden;}
.concept_wrapper{border-top:0.01rem solid #ddd;padding:0.15rem 0;}
.concept h2{width:100%;padding:0.1rem;font-size:0.16rem;font-weight:normal;text-align:left;}
.concept ul{display:flex;flex-direction: row;justify-content: space-around;padding:0 0.07rem;}
.concept ul li{width:30%;padding:0.05rem;border:0.01rem solid #ddd;}
.concept ul li img{width:100%;}
.concept ul li h3{font-size:0.14rem;font-weight: normal;margin-bottom:0.05rem}
.concept ul li .plate{color:#1CA26D;font-size:0.14rem;}
.concept ul li .plate.red{color:#F35353}
.concept ul li h4{font-size:0.13rem;font-weight: normal;margin:0.05rem 0}
.concept ul li p{color:#1CA26D;font-size:0.11rem;}
.concept ul li p.red{color:#F35353}
.concept ul li p .value{margin-right:0.02rem;font-size:0.10rem;}


.exponent_wrapper{padding-bottom:0.1rem;}
.exponent_wrapper .ul{width:100%;display:flex;flex-direction: row;justify-content: space-around;padding:0 0.07rem;}
.exponent_wrapper .ul .li{width:30%;padding:0.05rem 0.02rem;border:0.01rem solid #ddd;}
.exponent_wrapper .ul .li img{width:100%;}
.exponent_wrapper .ul .li h3{font-size:0.14rem;font-weight: normal;margin-bottom:0.05rem;}
.exponent_wrapper .ul .li .plate{color:#1CA26D;font-size:0.14rem;}
.exponent_wrapper .ul .li .plate.red{color:#F35353}
.exponent_wrapper .ul .li h4{font-size:0.13rem;font-weight: normal;}
.exponent_wrapper .ul .li p{color:#1CA26D;font-size:0.11rem;margin-top:0.05rem;}
.exponent_wrapper .ul .li p.red{color:#F35353}
.exponent_wrapper .ul .li p .value{margin-right:0.02rem;font-size:0.10rem;}

/* .swiper-pagination0 .swiper-pagination-bullet{width:0.15rem !important;height:0.05rem;background:#444 !important;} */

.banner_ad{width:100%;}
.banner_ad img{width:100%;}

.simulation{border-top:0.01rem solid #ddd;padding:0 0.1rem}
.simulation .title{display: flex;flex-direction: row;justify-content: space-between;padding:0.1rem 0}
.simulation .title h2{font-size:0.16rem;font-weight:normal;}
.simulation .title span{line-height:0.26rem;font-size:0.12rem;color:#999;vertical-align: bottom;}
.simulation table{width:100%;}
.simulation table thead,.simulation table tbody tr{height:0.26rem;line-height:0.26rem;display: flex;flex-direction: row;justify-content: space-around}
.simulation table th{width:25%;font-size:0.14rem;}
.simulation table tr td{width:25%;font-size:0.13rem;}
.simulation table tr td:nth-child(1),.simulation table th:nth-child(1){width:13%;}
.simulation table tbody{display: flex;flex-direction: column;}

.tabs{width:100%;display: flex;flex-direction: column;border-top:0.01rem solid #ddd;margin-top:0.1rem;overflow: hidden;}
.tabs_wrap{width:100%;height:0.4rem;overflow: hidden;padding:0 0.1rem;background:#fff;}
.tabs_wrap .scroll_box{width:100%;height:0.5rem;overflow:auto;}
.tabs_wrap ul{width:140%;display: flex;flex-direction: row;}
.tabs_wrap ul li{width:18%;height:0.4rem;line-height:0.4rem;font-size:0.15rem;}
.tabs_wrap ul li.on{border-bottom:0.02rem solid #F35353;color:#F35353}
.tabs_container{width:100%;}

.tabs_container.is_margin{margin-top:0.4rem;}

.tabs .tabs_wrap.is_top{position:fixed;top:0;left:0;z-index:999}

/* swiper高度自适应 */
.tabs_container .swiper-slide{height:5.5rem;}
.tabs_container .swiper-slide-active { height:auto}

>>>.content-slide{width:100%;display: flex;flex-direction: column;padding:0 0.1rem}
>>>.content-slide .content_wrapper{display: flex;flex-direction: row;border-bottom:0.01rem solid #ddd;padding:0.1rem 0;}
>>>.content_wrapper .wrapper_left{width:100%;margin:0}
>>>.content_wrapper .wrapper_left.hasImg{width:70%;margin-right:0.05rem;}
>>>.content_wrapper .wrapper_left h3{display: flex;font-size:0.14rem;text-align:left;}
>>>.content_wrapper .wrapper_left h3 font{flex:1;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
>>>.content_wrapper .wrapper_left p{line-height:0.2rem;font-size:0.12rem;color:#444;text-align:left;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
>>>.content_wrapper .wrapper_left .more{display: flex;flex-direction: row;justify-content: space-between;margin-top:0.03rem;}
>>>.content_wrapper .wrapper_left .more_left{font-size:0.11rem;}
>>>.content_wrapper .wrapper_left .more_right{font-size:0.11rem;}

>>>.content_wrapper .wrapper_right{width:30%;margin-left:0.05rem;}
>>>.content_wrapper .wrapper_right img{width:100%;}
>>>.content_wrapper .wrapper_right.noImg{width:0;margin:0}
/* document.documentElement.scrollTop= */

>>>.tabs_container .swiper-slide .noNews{font-size:0.12rem;padding:0.05rem 0}
>>>.tabs_container .swiper-slide .loadNews{font-size:0.12rem;padding:0.08rem 0}
>>>.tabs_container .swiper-slide .loadNews i{font-size:0.15rem;margin-right:0.05rem;}

.one_title{padding:0.15rem 0 0.1rem 0;display: flex;flex-direction: row;justify-content: start}
.one_title img{width:0.2rem;height:0.2rem;}
.one_title span{font-size:0.14rem;margin-left:0.05rem;}
.one_wrapper{position: relative;padding-left:0.24rem;}
.one_wrapper::after{content: "";width:0.01rem;height:40%;position: absolute;left:0.1rem;top:-0.05rem;background:#ddd;}
.one_wrapper::before{content: "";width:0.01rem;height:40%;position: absolute;left:0.1rem;bottom:-0.05rem;background:#ddd;}

.one_wrapper .one_news{border-bottom:0.01rem solid #ddd;padding:0.1rem 0}
.one_wrapper h3{font-size:0.15rem;text-align: left;}
.one_wrapper p{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;color:#444;font-size: 0.12rem;text-align:left;}
.one_wrapper i{width:0.16rem;height:0.16rem;background: #3A97DB;border-radius: 50%;display: flex;justify-content: center;align-items: center;position: absolute;left:0.02rem;top:50%;transform: translate(0,-50%);}

.flex .go_back{width:0.3rem;height:0.3rem;background:rgba(0,0,0,0.5);border-radius:50%;position: fixed;bottom:0.6rem;right:0.1rem;display: flex;flex-direction: row;justify-content: center;align-items: center;z-index:9999}
.flex .go_back i{padding-top:0.05rem;color:#fff;}
</style>
