<template>
    <div class="flex">
        <div class="head">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="article_text">订单列表</div>
            <div></div>
        </div>
        
        <div class="content">
            <ul>
                <li :class="{'on':index == newsNum}" v-for="(item,index) in exchangeList" :key="index" @click="getNews(index,item.page,true)">{{item.name}}</li>
                 
            </ul>
            <div class="news_wrapper">
                <div class="news_item news_content" v-if="newsNum == 0">
                    <div class="goods_wrapper" v-for="(item,index) in exchangeList[0].orderList" :key="index">
                        <div class="integral_num">
                            <i><svg t="1576568191530" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2378" width="12" height="12"><path d="M0 236.8c0 128 230.4 236.8 512 236.8s512-102.4 512-236.8S793.6 0 512 0 0 108.8 0 236.8z" fill="#168CE3" p-id="2379"></path><path d="M512 569.6c-217.6 0-403.2-64-480-147.2C6.4 454.4 0 480 0 512c0 128 230.4 236.8 512 236.8S1024 640 1024 512c0-32-12.8-57.6-32-83.2-76.8 83.2-262.4 140.8-480 140.8z" fill="#168CE3" p-id="2380"></path><path d="M512 851.2c-217.6 0-403.2-64-480-147.2-25.6 19.2-32 51.2-32 83.2 0 128 230.4 236.8 512 236.8s512-102.4 512-236.8c0-32-12.8-57.6-32-83.2-76.8 83.2-262.4 147.2-480 147.2z" fill="#168CE3" p-id="2381"></path></svg></i>
                            <span>{{item.order_num}}</span>

                        </div>
                        <div class="goods_info" @click="$router.push({path:'../pages/exchangedetails',query:{id:item.id}})">
                            <img :src=item.thumb_img>
                            <div class="goods_name">
                                <h4>{{item.store_name}}</h4>
                                <div class="goods_other">
                                    <span>{{item.integral}}积分</span>
                                    <label>x1</label>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="view_logistics"><span>查看物流</span></div> -->
                    </div>
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="exchangeList[0].noOrder">暂无订单数据</div>
                </div>
                <div class="news_item" v-if="newsNum == 1">
                    <div class="goods_wrapper" v-for="(item,index) in exchangeList[1].orderList" :key="index">
                        <div class="integral_num">
                            <i><svg t="1576568191530" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2378" width="12" height="12"><path d="M0 236.8c0 128 230.4 236.8 512 236.8s512-102.4 512-236.8S793.6 0 512 0 0 108.8 0 236.8z" fill="#168CE3" p-id="2379"></path><path d="M512 569.6c-217.6 0-403.2-64-480-147.2C6.4 454.4 0 480 0 512c0 128 230.4 236.8 512 236.8S1024 640 1024 512c0-32-12.8-57.6-32-83.2-76.8 83.2-262.4 140.8-480 140.8z" fill="#168CE3" p-id="2380"></path><path d="M512 851.2c-217.6 0-403.2-64-480-147.2-25.6 19.2-32 51.2-32 83.2 0 128 230.4 236.8 512 236.8s512-102.4 512-236.8c0-32-12.8-57.6-32-83.2-76.8 83.2-262.4 147.2-480 147.2z" fill="#168CE3" p-id="2381"></path></svg></i>
                            <span>{{item.order_num}}</span>

                        </div>
                        <div class="goods_info" @click="$router.push({path:'../pages/exchangedetails',query:{id:item.id}})">
                            <img :src=item.thumb_img>
                            <div class="goods_name">
                                <h4>{{item.store_name}}</h4>
                                <div class="goods_other">
                                    <span>{{item.integral}}积分</span>
                                    <label>x1</label>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="view_logistics"><span>查看物流</span></div> -->
                    </div>
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="exchangeList[1].noOrder">暂无更多数据</div>
                </div>
                <div class="news_item" v-if="newsNum == 2">
                    <div class="goods_wrapper" v-for="(item,index) in exchangeList[2].orderList" :key="index">
                        <div class="integral_num">
                            <i><svg t="1576568191530" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2378" width="12" height="12"><path d="M0 236.8c0 128 230.4 236.8 512 236.8s512-102.4 512-236.8S793.6 0 512 0 0 108.8 0 236.8z" fill="#168CE3" p-id="2379"></path><path d="M512 569.6c-217.6 0-403.2-64-480-147.2C6.4 454.4 0 480 0 512c0 128 230.4 236.8 512 236.8S1024 640 1024 512c0-32-12.8-57.6-32-83.2-76.8 83.2-262.4 140.8-480 140.8z" fill="#168CE3" p-id="2380"></path><path d="M512 851.2c-217.6 0-403.2-64-480-147.2-25.6 19.2-32 51.2-32 83.2 0 128 230.4 236.8 512 236.8s512-102.4 512-236.8c0-32-12.8-57.6-32-83.2-76.8 83.2-262.4 147.2-480 147.2z" fill="#168CE3" p-id="2381"></path></svg></i>
                            <span>{{item.order_num}}</span>

                        </div>
                        <div class="goods_info" @click="$router.push({path:'../pages/exchangedetails',query:{id:item.id}})">
                            <img :src=item.thumb_img>
                            <div class="goods_name">
                                <h4>{{item.store_name}}</h4>
                                <div class="goods_other">
                                    <span>{{item.integral}}积分</span>
                                    <label>x1</label>
                                </div>
                            </div>
                        </div>
                        <div class="view_logistics"><span>查看物流</span></div>
                    </div>
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="exchangeList[2].noOrder">暂无更多数据</div>
                </div>
                <div class="news_item" v-if="newsNum == 3">
                    <div class="goods_wrapper" v-for="(item,index) in exchangeList[3].orderList" :key="index">
                        <div class="integral_num">
                            <i><svg t="1576568191530" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2378" width="12" height="12"><path d="M0 236.8c0 128 230.4 236.8 512 236.8s512-102.4 512-236.8S793.6 0 512 0 0 108.8 0 236.8z" fill="#168CE3" p-id="2379"></path><path d="M512 569.6c-217.6 0-403.2-64-480-147.2C6.4 454.4 0 480 0 512c0 128 230.4 236.8 512 236.8S1024 640 1024 512c0-32-12.8-57.6-32-83.2-76.8 83.2-262.4 140.8-480 140.8z" fill="#168CE3" p-id="2380"></path><path d="M512 851.2c-217.6 0-403.2-64-480-147.2-25.6 19.2-32 51.2-32 83.2 0 128 230.4 236.8 512 236.8s512-102.4 512-236.8c0-32-12.8-57.6-32-83.2-76.8 83.2-262.4 147.2-480 147.2z" fill="#168CE3" p-id="2381"></path></svg></i>
                            <span>{{item.order_num}}</span>

                        </div>
                        <div class="goods_info" @click="$router.push({path:'../pages/exchangedetails',query:{id:item.id}})">
                            <img :src=item.thumb_img>
                            <div class="goods_name">
                                <h4>{{item.store_name}}</h4>
                                <div class="goods_other">
                                    <span>{{item.integral}}积分</span>
                                    <label>x1</label>
                                </div>
                            </div>
                        </div>
                        <div class="view_logistics"><span>查看物流</span></div>
                    </div>
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="exchangeList[3].noOrder">暂无更多数据</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import {exchangeList} from '../../api/api';
export default {

    data () {
        return {
            newsNum:0,
            exchangeList:[
                {
                    orderList:"",
                    name:"已兑换",
                    page:1,
                    state:1,
                    noOrder:false,
                },
                {
                    orderList:"",
                    name:"已审核",
                    page:1,
                    state:2,
                    noOrder:false,
                },
                {
                    orderList:"",
                    name:"已发货",
                    page:1,
                    state:3,
                    noOrder:false,
                },
                {
                    orderList:"",
                    name:"兑换完成",
                    page:1,
                    state:4,
                    noOrder:false,
                },
            ],
            isLoad:true,
            isTop:false,
        }
    },
    mounted() {
        this.getNews(0,1);
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods:{
        goBack(){
            this.$router.push('/mine/integralmall')

        },
        getNews(i,page,isClick){
            this.isLoad = true
            this.newsNum = i
            
            if(!isClick){
                
                exchangeList({
                    
                    token:this.$store.state.userInfo.token,
                    page:this.exchangeList[i].page,
                    status:this.newsNum+1,

                }).then((res) => {
                    this.isLoad = false
                    if(res.status == 0){
                        
                        if(this.exchangeList[i].orderList){
                            this.exchangeList[i].orderList.push.apply(this.exchangeList[i].orderList,res.info)

                        }else{
                            this.exchangeList[i].orderList = res.info
                        }
                    }else{
                        this.exchangeList[i].noOrder = true

                    }
                })
                
            }else{
                
                exchangeList({
                    token:this.$store.state.userInfo.token,
                    page:1,
                    status:this.newsNum+1,

                }).then((res) => {
                    this.isLoad = false
                    if(res.status == 0){
                        this.exchangeList[i].orderList = res.info
                        
                    }else{
                        this.exchangeList[i].noOrder= true

                    }
                })
                
            }
            
            
        },
        scrollLoad(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let offestHeight = document.body.offsetHeight

            if(scrollTop + innerHeight >= offestHeight  && !this.isLoad){

                var currIndex = ''

                for(var i in this.exchangeList){
                    if(this.exchangeList[i].state == this.newsNum + 1){
                        currIndex = i
                        this.exchangeList[i].page += 1
                        
                    }
                }
                setTimeout(() => {

                    if(!this.exchangeList[currIndex].noOrder){
                        
                        this.isLoad = true
                        this.getNews(this.newsNum,this.exchangeList[currIndex].page,false)
                        
                        
                    }
                },0)

            }

        },

    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollLoad);  
    }
}
</script>

<style scoped>
.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;}
.head{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;z-index:9}
.head .back i{font-size:0.22rem;color:#fff;}
.head .article_text{text-align: center;color:#fff;font-size:0.15rem;}

.content{width:100%;border-top:0.02rem solid #efeff4;}
.content ul{height:0.36rem;display: flex;flex-direction: row;justify-content: space-between;padding:0 0.2rem;background:#fff;position:fixed;top:0.46rem;left:0;right:0;z-index:9}
.content ul li{height:0.34rem;line-height:0.34rem;font-size:0.14rem;}
.content ul li.on{border-bottom:0.02rem solid #F35353;color:#F35353}


.news_wrapper{margin-top:0.8rem;}

.goods_wrapper{padding:0.1rem;display:flex;flex-direction: column;justify-content:flex-start;align-items: flex-start;background:#fff;margin-top:0.05rem;}
.goods_wrapper .integral_num{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-bottom:0.05rem;}

.goods_wrapper .integral_num span{font-size:0.13rem;color:#666;margin-left:0.03rem;}
.goods_wrapper .goods_info{width:100%;display:flex;flex-direction: row;justify-content: flex-start;align-items: flex-start;position:relative;border-top:0.01rem solid #ddd;border-bottom:0.01rem solid #ddd;padding:0.07rem 0}
.goods_wrapper .goods_info img{width:25%;}
.goods_name{width:75%;display: flex;flex-direction: column;justify-content: center;align-items: space-between;padding-left:0.05rem;}
.goods_name h4{font-size:0.14rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;text-align: left;}
.goods_name .goods_other{width:75%;display:flex;flex-direction: row;justify-content:space-between;align-items: center;position:absolute;bottom:0.07rem;right:0;padding-left:0.05rem;}
.goods_name .goods_other label,.goods_name .goods_other span{font-size:0.13rem;}

.goods_wrapper .view_logistics{width:100%;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;}
.goods_wrapper .view_logistics span{border:0.01rem solid #999;padding:0.01rem 0.1rem;border-radius: 0.1rem;margin-top:0.1rem;font-size:0.14rem;}


.news_wrapper .isLoad,.news_wrapper .noNews{font-size:0.13rem;padding:0.08rem 0.1rem;background:#fff;}
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
