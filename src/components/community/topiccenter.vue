<template>
    <div class="flex"> 
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="article_text">话题中心</div>
            <div></div>
        </div>
        <div class="form">
            <div class="topic_search">
                <i class="el-icon-search enlarge"></i>
                <input type="text" placeholder="搜索话题" v-model="searchValue" @input="searchTopic($event)">
                <i class="el-icon-close dot" v-if="searchValue" @click="clearSearchValue()"></i>
            </div>
        </div>
        <div class="search_wrapper" v-if="searchMenu">
            <div class="search_topic" v-if="searchMenu != ''">
                <ul>
                    <li v-for="(item,index) in searchMenu" :key="index" @click="$router.push({path:'/community/topicdetails',query:{id:item.id}})">
                        <img :src=item.topic_img>
                        <span>{{item.topic_name}}</span> 
                    </li>
                </ul>
            </div>
            <div class="no_search_topic" v-else>暂无话题数据</div>
        </div>
        <div class="content" v-else>
            <div class="ad"><img src="../../assets/article_ad1.png"></div>
            <div class="topic_wrapper">
                <h3>话题推荐</h3>
                <ul>
                    <li v-for="(item,index) in topicMenu" :key="index">
                        <div class="topic_img" @click="$router.push({path:'/community/topicdetails',query:{id:item.id}})"><img :src=item.topic_img></div>
                        <div class="topic_title" @click="$router.push({path:'/community/topicdetails',query:{id:item.id}})">
                            <h4>{{item.topic_name}}</h4>
                            <p>{{item.topic_desc}}</p>
                            <div class="other">
                                <span>阅读量{{item.topic_read_num}}</span>
                                <span>收藏数{{item.topic_collect}}</span>
                            </div>
                        </div>
                        <div class="collect_topic" @click="subscribe(item.id,item.subscription_status)">
                            <i class="el-icon-circle-plus-outline" v-if="item.subscription_status == 0" ></i>
                            <i class="el-icon-remove-outline" v-else :class="{'is_collect':item.subscription_status}"></i>
                        </div>
                    </li>
                </ul>
                <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                <div class="noNews" v-if="notopicList">暂无更多数据</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { topicType,praise,getMessage } from '../../api/api';
export default {
    data () {
        return {
            topicMenu:'',
            topic_status:false,
            page:1,
            isLoad:true,
            notopicList:false,
            searchValue:'',
            searchMenu:'',
        }
    },
    mounted(){
        this.getTopic();
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods: {
        goBack(){
            this.$router.go(-1);
            
        },
        searchTopic(e){
            // this.searchValue = e.currentTarget.value
            if(this.searchValue){
                topicType({
                    page:1,
                    limit:20,
                    name:this.searchValue
                }).then((res) => {

                    if(res.status == 0){
                        this.searchMenu = res.info

                    }else{
                        this.searchMenu = []
                    }

                })
            }else{
                this.searchMenu = ''

            }
            
        },
        clearSearchValue(){
            this.searchValue = ''
            this.searchMenu = ''
        },
        getTopic(){
            var topicList = JSON.parse(sessionStorage.getItem("topicInfo"))

            topicType({
                page:this.page,
                limit:10
            }).then((res) => {
                this.isLoad = false
                if(res.status == 0){
                    if(this.topicMenu){
                        this.topicMenu.push.apply(this.topicMenu,res.info)

                    }else{
                        this.topicMenu = res.info
                    }
                    
                    if(topicList){

                        for(var i in topicList){
                            for(var a in this.topicMenu){
                                if(topicList[i].id == this.topicMenu[a].id){

                                    this.topicMenu[a].subscription_status = topicList[i].status

                                }
                            }
                        }

                    }
                    
                }else{
                    this.notopicList = true
                    
                }

            })
        },
        subscribe(id,status){
            var topicList = JSON.parse(sessionStorage.getItem("topicInfo"))
            console.log(this.$store.state.userInfo.token)
            if(this.$store.state.userInfo.token){
                this.topic_status = status
                if(this.topic_status == 0){
                    this.topic_status = 1
                }else{
                    this.topic_status = 0
                    
                }
                praise({
                    token:this.$store.state.userInfo.token,
                    status:this.topic_status,
                    id:id,
                    type:4,
                    operation_type:4,
                    
                }).then((res) => {

                    mui.toast(res.msg,{duration: 1500})
                    if(res.status == 0){ 
                        let topicArr = {
                            status:this.topic_status,
                            id:id,
                        }
                        if(topicList){

                            var currIndex = "";
                            for(var i in topicList){
                                if(topicList[i].id == id){
                                    currIndex = i
                                    
                                }
                            }

                            if(currIndex){
                                topicList[currIndex].status = this.topic_status
                                sessionStorage.setItem("topicInfo",JSON.stringify(topicList))
                                for(var i in this.topicMenu){
                                    if(id == this.topicMenu[i].id){
                                        this.topicMenu[i].subscription_status = topicList[currIndex].status

                                    }
                                }
                                
                            }else{
                                    
                                topicList.push(topicArr)
                                sessionStorage.setItem("topicInfo",JSON.stringify(topicList))
                                for(var i in this.topicMenu){
                                    if(id == this.topicMenu[i].id){
                                        this.topicMenu[i].subscription_status = this.topic_status

                                    }
                                }
                            }       
                            
                        }else{
                            for(var i in this.topicMenu){
                                if(id == this.topicMenu[i].id){
                                    this.topicMenu[i].subscription_status = this.topic_status

                                }
                            }
                            let topicList0 = [];
                            topicList0.push(topicArr)
                            sessionStorage.setItem("topicInfo",JSON.stringify(topicList0))
                        }
                        

                    }else if(res.status == 100){

                        sessionStorage.removeItem("userInfo")
                        setTimeout(() => {
                            this.$store.commit('getUserInfo','')
                            this.$router.push({path:'/login'})
                        },1500)
                    }

                })
            }else{
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }
        },
        scrollLoad(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let offestHeight = document.body.offsetHeight

            if(scrollTop + innerHeight >= offestHeight  && !this.isLoad){
                this.page += 1
                setTimeout(() => {
                    
                    if(!this.notopicList){

                        this.isLoad = true
                        this.getTopic() 
                        
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
.flex{display: flex;flex-direction: column;background:#fff;}
.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.header .article_text{text-align: center;color:#fff;font-size:0.15rem;}

.form .topic_search{margin:0.05rem 0.2rem;font-size:0.16rem;position:relative;}
.form .topic_search>input{width:100%;height:0.30rem;padding:0.05rem 0 0.05rem 0.3rem;box-sizing:border-box;background:transparent;border:0.01rem solid #999;border-radius: 0.15rem;color:#444;font-size:0.12rem;margin:0;color:#666}
.form .topic_search>input::-webkit-input-placeholder{color: #666;font-size: 0.12rem;}
.form .topic_search .enlarge{width:0.15rem;height:0.15rem;position:absolute;left:0.1rem;top:0.08rem;color: #666;}
.form .topic_search .dot{font-weight:bold;position:absolute;right:0.1rem;top:0.08rem;color: #666;}

/* .search_wrapper ul{padding:0.1rem 0} */
.search_wrapper ul li{padding:0.08rem 0.1rem;text-align:left;display:flex;flex-direction: row;justify-content: flex-start;align-items: center;}
.search_wrapper ul li img{width:0.3rem;height:0.3rem;}
.search_wrapper ul li span{padding-left:0.05rem;font-size:0.14rem;color:#666;}

.search_wrapper .no_search_topic{padding:0.1rem 0;font-size:0.13rem;}

.content .ad img{width:100%;display: block;}
.content .topic_wrapper{padding:0.1rem;}
.content .topic_wrapper h3{font-size:0.15rem;text-align:left;margin-bottom:0.1rem;border-bottom:0.01rem solid #ddd;padding-bottom:0.07rem}
.content .topic_wrapper ul li{display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin-bottom:0.1rem;}
.content .topic_wrapper ul li .topic_img{width:30%;}
.content .topic_wrapper ul li .topic_img img{widtH:100%;}

.content .topic_wrapper .topic_title{width:60%;height:100%;display: flex;flex-direction: column;justify-content: space-between;align-items: flex-start;margin:0 0.05rem;}
.content .topic_wrapper .topic_title h4{font-size:0.13rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;}
.content .topic_wrapper .topic_title p{font-size:0.12rem;color:#666;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;text-align:left;}
.content .topic_wrapper .topic_title .other{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-top:0.02rem}
.content .topic_wrapper .topic_title .other span{font-size:0.10rem;color:#999;margin-right:0.05rem;}
.content .topic_wrapper .collect_topic{width:10%;display:flex;flex-direction: row;align-items: center;justify-content: flex-end}
.content .topic_wrapper .collect_topic i{font-size:0.24rem;color:#168CE3}
.content .topic_wrapper .collect_topic i.is_collect{color:#999}

.content .topic_wrapper .isLoad,.content .topic_wrapper .noNews{font-size:0.13rem;}


</style>
