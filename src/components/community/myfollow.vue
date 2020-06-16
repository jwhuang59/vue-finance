<template>

    <div class="flex">
        <div class="header">
            <ul class="nav_menu">
                <li :class="{show:show}">关注</li>
                <li @click="$router.push('/community')">推荐</li>
                <li @click="$router.push('/community/postnews')">帖子</li>
                <!-- <li>圈子</li> -->
            </ul>
        </div>
        <div class="content">
            <div class="community_wrapper">
                <div class="operation_container" >
                    <div class="operation_item" v-for="(item,index) in followMenu" :key="index">
                        <div class="operation_person">
                            <img :src=item.user.user_img>
                            <div class="operation_info">
                                <h4>{{item.user.nickname}}</h4>
                                <span>{{item.create_time}}</span>
                            </div>
                            <div class="follow" @click="operation(3,item.status,item.user.id)" :class="{'is_follow':item.status == 1}">
                                <span v-if="item.status == 0" >+ 关注</span>
                                <span v-else>已关注</span>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="noTalkList">暂无更多数据</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { getMessage,praise,operationList } from '../../api/api';
export default {

    data () {
        return {
            show:true,
            followMenu:'',
            page:1,
            isLoad:true,
            noTalkList:false,
            praise_status:0, 
            praise_num:'',
            collect_status:0,
            collect_num:'',
            follow_status:0
        }
    },
    mounted() {
        
        this.getFollowList()
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods: {
        getFollowList(){
            var getFollow = JSON.parse(sessionStorage.getItem("followInfoTalk"))
            operationList({
                page:this.page,
                operation_type: 3,
                token:this.$store.state.userInfo.token
            }).then((res) => {
                this.isLoad = false
                if(res.status == 0){
                    if(this.followMenu){
                        this.followMenu.push.apply(this.followMenu,res.info)

                    }else{
                        this.followMenu = res.info
                    }

                    if(getFollow){

                        for(var i in getFollow){
                            for(var a in this.followMenu){
                                if(getFollow[i].id == this.followMenu[a].user.id){

                                    this.followMenu[a].status = getFollow[i].status
                                }
                            }
                        }
                    }

                }else{
                    this.noTopicList = true
                    
                }

            })
        },
        operation(type,status,id,num){

            var followList = JSON.parse(sessionStorage.getItem("followInfoTalk"))
            
            if(this.$store.state.userInfo.token){
                
                switch(type){
                    case 3:
                        this.follow_status = status
                        if(this.follow_status == 0){
                            this.follow_status = 1
                        }else{
                            this.follow_status = 0
                            
                        }
                        praise({
                            token:this.$store.state.userInfo.token,
                            status:this.follow_status,
                            id:id,
                            type:5,
                            operation_type:3,
                            
                        }).then((res) => {

                            mui.toast(res.msg,{duration: 1500})
                            if(res.status == 0){ 
                                let followArr = {
                                    status:this.follow_status,
                                    id:id,
                                }

                                if(followList){

                                    var currIndex = "";
                                    for(var i in followList){
                                        if(followList[i].id == id){
                                            currIndex = i
                                            
                                        }
                                    }

                                    if(currIndex){
                                        followList[currIndex].status = this.follow_status
                                        sessionStorage.setItem("followInfoTalk",JSON.stringify(followList))
                                        for(var i in this.followMenu){
                                            if(id == this.followMenu[i].user.id){
                                                this.followMenu[i].status = followList[currIndex].status

                                            }
                                        }
                                        
                                    }else{
                                          
                                        followList.push(followArr)
                                        sessionStorage.setItem("followInfoTalk",JSON.stringify(followList))
                                        for(var i in this.followMenu){
                                            
                                            if(id == this.followMenu[i].user.id){
                                                this.followMenu[i].status = this.follow_status

                                            }
                                        } 
                                    }       
                                    
                                }else{
                                    for(var i in this.followMenu){
                                        if(id == this.followMenu[i].user.id){
                                            this.followMenu[i].status = this.follow_status
                                            
                                        }
                                    }
                                    let followList0 = [];
                                    followList0.push(followArr)
                                    sessionStorage.setItem("followInfoTalk",JSON.stringify(followList0))
                                }
                                

                            }else if(res.status == 100){

                                sessionStorage.removeItem("userInfo")
                                setTimeout(() => {
                                    this.$store.commit('getUserInfo','')
                                    this.$router.push({path:'/login'})
                                },1500)
                            }

                        })
                        break;
    
                }

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
                    
                    if(!this.noTalkList){

                        this.isLoad = true
                        this.getFollowList() 
                        
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


.operation_container{display: flex;flex-direction: column;padding:0 0.1rem;}
.operation_container .operation_item{margin-top:0.1rem;border-bottom:0.01rem solid #ddd;padding-bottom:0.1rem;display:flex;flex-direction: column;}
.operation_container .operation_item .operation_person{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;text-align:left;position:relative;}
.operation_container .operation_item .operation_person img{width:0.4rem;margin-right:0.05rem;}
.operation_container .operation_item .operation_person h4{font-size:0.14rem;}
.operation_container .operation_item .operation_person span{font-size:0.13rem;color:#666}
.operation_container .operation_item .operation_person .follow{position:absolute;right:0;top:50%;transform: translate(0,-50%)}
.operation_container .operation_item .operation_person .follow span{padding:0.03rem 0.05rem;color:#fff;font-size:0.13rem;background:#168CE3}
.operation_container .operation_item .operation_person .follow.is_follow span{color:#666;background:#ddd;}

.operation_container .operation_item .operation_words{font-size:0.13rem;font-weight:normal;text-align:left;padding:0.1rem 0;}
.operation_container .operation_item .operation_img ul{display:flex;flex-direction: row;justify-content: flex-start;}
.operation_container .operation_item .operation_img ul li{width:30%;display: flex;flex-direction: row;justify-content: center;align-items: center;}
.operation_container .operation_item .operation_img ul li img{width:100%;}
.operation_container .operation_item .operation_type{display: flex;flex-direction: row;margin-top:0.1rem;}
.operation_container .operation_item .operation_type>div{width:33.3%;display: flex;flex-direction: row;justify-content: center;align-items: center;font-size:0.12rem;color:#666;}
.operation_container .operation_item .operation_type>div i{font-size:0.16rem;margin-top:0.01rem;}
.operation_container .operation_item .operation_type>div span{margin-left:0.02rem;}
.operation_container .operation_item .operation_share{background:#eee;display:flex;flex-direction: row;justify-content: center;align-items: center;padding:0.05rem 0.1rem;}
.operation_container .operation_item .operation_share img{width:0.5rem;}
.operation_container .operation_item .operation_share p{font-size:0.13rem;text-align: left;margin-left:0.05rem;}


.operation_container .operation_item .operation_type .is_praise span{color:#d81e06}
.operation_container .operation_item .operation_type .is_collect span{color:#d81e06}


.operation_container .isLoad{font-size:0.13rem;padding:0.1rem;}
.operation_container .noNews{font-size:0.13rem;padding:0.1rem;margin-bottom:0.5rem}



</style>
