<template>

    <div class="flex">
        <div class="header">
            <ul class="nav_menu">
                <li @click="$router.push('/community/myfollow')">关注</li>
                <li @click="$router.push('/community')">推荐</li>
                <li :class="{show:show}">帖子</li>
                <!-- <li>圈子</li> -->
            </ul>
        </div>
        <div class="content">
            <div class="community_wrapper">
                <div class="operation_container" >
                    <div class="operation_item" v-for="(item,index) in talkList" :key="index">
                        <div class="operation_person">
                            <img :src=item.user.user_img>
                            <div class="operation_info">
                                <h4>{{item.user.nickname}}</h4>
                                <span>{{item.create_time}}</span>
                            </div>
                            <div class="follow" @click="operation(3,item.attention_status,item.user.id)" :class="{'is_follow':item.attention_status == 1}">
                                <span v-if="item.attention_status == 0" >+ 关注</span>
                                <span v-else>已关注</span>
                            </div>
                        </div>
                        <div class="operation_details">
                            <div class="operation_words" @click="$router.push({path:'/article',query: {id:item.id,type:'5'}})">{{item.content}}</div>
                            <div class="operation_share" v-if="item.sharings.id"  @click="$router.push({path:'/article',query: {id:item.id,type:'5'}})">
                                <img :src=item.sharings.title_img v-if="item.sharings.title_img">
                                <p>{{item.sharings.title}}</p>
                            </div>
                            <div class="operation_img" v-if="item.imgs.length > 0">
                                <ul>
                                    <li v-for="(img,index) in item.imgs" :key="index">
                                        <img :src="img" v-image-preview>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="operation_type">
                            <div @click="operation(2,item.collection_status,item.id,item.collection_num)" :class="{'is_collect':item.collection_status == 1}">
                                <i v-if="item.collection_status == 0"><svg t="1573703174059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2001" width="15" height="15"><path d="M773.458 1005.43c-14.403 0-30.592-4.132-45.599-11.638L513.567 886.61 297.948 993.618c-13.655 7.27-29.286 11.09-45.225 11.09a96.164 96.164 0 0 1-57.549-18.842c-30.177-22.64-45.64-61.85-38.502-97.561l44.099-228.772L31.744 501.996a104.059 104.059 0 0 1-26.281-100.66l0.338-1.162c12.288-36.828 42.772-62.633 79.734-67.584l234.839-42.7L425.779 75.811c16.932-33.895 51.37-55.675 87.788-55.675 37.99 0 73.318 22.6 88.13 56.29l105.068 213.4L941.64 330.89a95.672 95.672 0 0 1 78.264 68.373 98.97 98.97 0 0 1-24.474 101.002l-0.578 0.579-168.55 158.72L868.9 888.745c6.86 36.649-7.716 73.672-38.062 96.742a90.409 90.409 0 0 1-57.38 19.943z m-259.81-196.055l227.667 113.853c6.686 3.37 14.392 5.489 19.665 5.489 8.116 0 15.652-2.499 21.187-7.117l1.03-0.85c12.937-9.707 19.245-25.134 16.414-40.238l-45.814-246.804 181.212-170.65c11.126-11.28 14.93-27.433 9.995-42.286l-0.497-1.562a37.31 37.31 0 0 0-30.971-27.003l-1.034-0.163L661.76 348.21 548.91 118.99c-5.478-12.805-20.347-22.098-35.359-22.098-14.75 0-28.861 9.236-36.009 23.496L365.414 348.109l-252.062 45.788c-15.31 1.92-27.203 12.088-32.697 27.945-3.901 14.49 0.722 31.949 11.372 42.834l181.422 169.057-47.61 246.933c-2.863 14.28 3.9 30.714 16.409 40.1 6.272 4.715 14.397 7.316 22.917 7.316 6.569 0 12.866-1.531 18.294-4.45l0.783-0.46 229.407-113.797z" p-id="2002"></path></svg></i>
                                <i v-else><svg t="1573798450055" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2228" width="15" height="15"><path d="M786.309939 1003.349333c-11.093333 0-23.893333-3.754667-34.986666-9.216l-239.616-119.808L270.043273 994.133333c-23.893333 12.970667-55.296 11.093333-77.482667-5.461333s-34.986667-46.08-29.525333-73.728l49.834666-258.048L23.088606 479.914667C2.779273 459.605333-4.559394 428.202667 2.779273 402.432c9.216-27.648 31.402667-47.957333 60.757333-51.541333l263.68-47.957334L445.317939 63.146667c12.970667-25.770667 38.741333-42.325333 66.389334-42.325334S567.003273 37.376 578.096606 63.146667l117.930667 239.616 263.68 46.08c27.648 3.754667 51.541333 23.893333 59.050666 51.541333 9.216 27.648 1.877333 57.173333-18.432 77.482667L810.203273 656.896l47.957333 258.048c5.461333 29.525333-7.338667 57.173333-29.525333 73.728-10.922667 9.216-25.770667 14.677333-42.325334 14.677333z" fill="#d81e06" p-id="2229"></path></svg></i>
                                <span>{{item.collection_num}}</span>
                            </div>
                            <div @click="$router.push({path:'/article',query: {id:item.id,type:'5'}})">
                                <i class="el-icon-chat-line-square"></i>
                                <span>{{item.review_num}}</span>
                            </div>
                            <div @click="operation(1,item.praise_status,item.id,item.praise_num)" :class="{'is_praise':item.praise_status == 1}">
                                <i v-if="item.praise_status == 0"><svg t="1572605884556" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2324" width="14" height="14"><path d="M936.24990606 410.90076786L665.56644238 410.90076786c104.88668387-387.37260658-72.26779421-407.15747214-72.2677942-407.15747215-75.08538823 0-59.51992718 59.37206158-65.19819378 69.26973384 0 189.4424485-201.21579975 337.88773831-201.21579975 337.88773831l0 537.22669397c0 53.02898233 72.26779421 72.12807851 100.61721372 72.12807851l406.70106852 0c38.27619954 0 69.44554325-100.37969806 69.44554325-100.37969807 100.61837881-342.13625173 100.61837881-443.93522517 100.61837881-443.93522517C1004.2680229 405.25277298 936.24990606 410.90076786 936.24990606 410.90076786L936.24990606 410.90076786 936.24990606 410.90076786zM936.24990606 410.90076786" p-id="2325" fill="#8a8a8a"></path><path d="M215.80392107 411.07890517L53.72007765 411.07890517c-33.47348253 0-33.98926563 32.8773632-33.98926563 32.8773632l33.47348252 541.8128532c0 34.48525483 34.54463431 34.48525483 34.54463431 34.48525482L228.03367595 1020.25437639c29.22497024 0 28.96649671-22.81203257 28.96649671-22.81203257L257.00017266 452.16571278C257.00017266 410.55264313 215.80392107 411.07890517 215.80392107 411.07890517L215.80392107 411.07890517 215.80392107 411.07890517zM215.80392107 411.07890517" p-id="2326" fill="#8a8a8a"></path></svg></i>
                                <i v-else><svg t="1573725130693" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3377" width="16" height="16"><path d="M884.875894 423.143253 646.970506 423.143253c92.185562-340.464205-63.516616-357.853247-63.516616-357.853247-65.993017 0-52.312436 52.182476-57.3031 60.881602 0 166.502152-176.849824 296.971645-176.849824 296.971645l0 472.171899c0 46.607504 63.516616 63.393819 88.433098 63.393819l357.452111 0c33.641191 0 61.036122-88.224344 61.036122-88.224344 88.434122-300.70569 88.434122-390.177444 88.434122-390.177444C944.657442 418.179195 884.875894 423.143253 884.875894 423.143253L884.875894 423.143253 884.875894 423.143253zM884.875894 423.143253" fill="#d81e06" p-id="3378"></path><path d="M251.671415 423.299819 109.214912 423.299819c-29.420053 0-29.873378 28.89612-29.873378 28.89612l29.420053 476.202703c0 30.309306 30.361495 30.309306 30.361495 30.309306L262.420223 958.707948c25.686009 0 25.458835-20.049638 25.458835-20.049638L287.879058 459.411271C287.879058 422.837284 251.671415 423.299819 251.671415 423.299819L251.671415 423.299819 251.671415 423.299819zM251.671415 423.299819" fill="#d81e06" p-id="3379"></path></svg></i>
                                <span>{{item.praise_num}}</span>
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
import { getMessage,praise } from '../../api/api';
export default {

    data () {
        return {
            show:true,
            talkList:'',
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
        this.getTalkList()
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods: {
        getTalkList(){
            var getPraise = JSON.parse(sessionStorage.getItem("praiseInfoTalk"))
            var getCollect = JSON.parse(sessionStorage.getItem("collectInfoTalk"))
            var getFollow = JSON.parse(sessionStorage.getItem("followInfoTalk"))

            getMessage({
                page:this.page,
                token:this.$store.state.userInfo.token
            }).then((res) => {
                this.isLoad = false
                if(res.status == 0){
                    if(this.talkList){
                        this.talkList.push.apply(this.talkList,res.info)

                    }else{
                        this.talkList = res.info
                    }
                    
                    if(getPraise){

                        for(var i in getPraise){
                            for(var a in this.talkList){
                                if(getPraise[i].id == this.talkList[a].id){

                                    this.talkList[a].praise_num = getPraise[i].praiseNum
                                    this.talkList[a].praise_status = getPraise[i].status

                                }
                            }
                        }

                    }
                    if(getCollect){

                        for(var i in getCollect){
                            for(var a in this.talkList){
                                if(getCollect[i].id == this.talkList[a].id){
                                    
                                    this.talkList[a].collection_num = getCollect[i].collectNum
                                    this.talkList[a].collection_status = getCollect[i].status

                                }
                            }
                        }
                    }

                    if(getFollow){

                        for(var i in getFollow){
                            for(var a in this.talkList){
                                if(getFollow[i].id == this.talkList[a].user.id){

                                    this.talkList[a].attention_status = getFollow[i].status
                                }
                            }
                        }
                    }

                }else{
                    this.noTalkList = true
                    
                }

            })
        },
        operation(type,status,id,num){

            var praiseList = JSON.parse(sessionStorage.getItem("praiseInfoTalk"))
            var collectList = JSON.parse(sessionStorage.getItem("collectInfoTalk"))
            var followList = JSON.parse(sessionStorage.getItem("followInfoTalk"))
            
            if(this.$store.state.userInfo.token){
                
                switch(type){
                    case 1:
                        this.praise_status = status
                        if(this.praise_status == 0){
                            this.praise_num = parseInt(num) + 1
                            this.praise_status = 1
                        }else{
                            this.praise_num = parseInt(num) - 1
                            this.praise_status = 0
                            
                        }
                        praise({
                            token:this.$store.state.userInfo.token,
                            status:this.praise_status,
                            id:id,
                            type:5,
                            operation_type:1,
                            
                        }).then((res) => {
                            mui.toast(res.msg,{duration: 1500})
                            if(res.status == 0){

                                let praiseArr = {
                                    status:this.praise_status,
                                    praiseNum:this.praise_num,
                                    id:id,
                                }

                                if(praiseList){

                                    var currIndex = "";
                                    for(var i in praiseList){
                                        if(praiseList[i].id == id){
                                            currIndex = i

                                        }
                                    }

                                    if(currIndex){
                                        
                                        praiseList[currIndex].status = this.praise_status
                                        praiseList[currIndex].praiseNum = this.praise_num
                                        sessionStorage.setItem("praiseInfoTalk",JSON.stringify(praiseList))
                                        for(var i in this.talkList){
                                            if(id == this.talkList[i].id){
                                                this.talkList[i].praise_status = praiseList[currIndex].status
                                                this.talkList[i].praise_num = praiseList[currIndex].praiseNum

                                            }
                                        }
                                    }else{
                                        praiseList.push(praiseArr)
                                        sessionStorage.setItem("praiseInfoTalk",JSON.stringify(praiseList)) 
                                        for(var i in this.talkList){
                                            
                                            if(id == this.talkList[i].id){
                                                this.talkList[i].praise_status = this.praise_status
                                                this.talkList[i].praise_num = this.praise_num

                                            }
                                        } 

                                    }       
                                    
                                }else{
                                    for(var i in this.talkList){
                                        if(id == this.talkList[i].id){
                                            this.talkList[i].praise_status = this.praise_status
                                            this.talkList[i].praise_num = this.praise_num
                                            
                                        }
                                    }
                                    let praiseList0 = [];
                                    praiseList0.push(praiseArr)
                                    sessionStorage.setItem("praiseInfoTalk",JSON.stringify(praiseList0))
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
                    case 2:
                        this.collect_status = status
                        if(this.collect_status == 0){
                            this.collect_num = parseInt(num) + 1
                            this.collect_status = 1
                        }else{
                            this.collect_num = parseInt(num) - 1
                            this.collect_status = 0
                            
                        }
                        praise({
                            token:this.$store.state.userInfo.token,
                            status:this.collect_status,
                            id:id,
                            type:5,
                            operation_type:2,
                            
                        }).then((res) => {
                            mui.toast(res.msg,{duration: 1500})
                            if(res.status == 0){ 
                                let collectArr = {
                                    status:this.collect_status,
                                    collectNum:this.collect_num,
                                    id:id,
                                }

                                if(collectList){

                                    var currIndex = "";
                                    for(var i in collectList){
                                        if(collectList[i].id == id){
                                            currIndex = i

                                        }
                                    }

                                    if(currIndex){
                                        collectList[currIndex].status = this.collect_status
                                        collectList[currIndex].collectNum = this.collect_num
                                        sessionStorage.setItem("collectInfoTalk",JSON.stringify(collectList))
                                        for(var i in this.talkList){
                                            if(id == this.talkList[i].id){
                                                this.talkList[i].collection_status = collectList[currIndex].status
                                                this.talkList[i].collection_num = collectList[currIndex].collectNum

                                            }
                                        }
                                    }else{
                                          
                                        collectList.push(collectArr)
                                        sessionStorage.setItem("collectInfoTalk",JSON.stringify(collectList))
                                        for(var i in this.talkList){
                                            
                                            if(id == this.talkList[i].id){
                                                this.talkList[i].collection_status = this.collect_status
                                                this.talkList[i].collection_num = this.collect_num

                                            }
                                        } 
                                    }       
                                    
                                }else{
                                    for(var i in this.talkList){
                                        if(id == this.talkList[i].id){
                                            this.talkList[i].collection_status = this.collect_status
                                            this.talkList[i].collection_num = this.collect_num
                                            
                                        }
                                    }
                                    let collectList0 = [];
                                    collectList0.push(collectArr)
                                    sessionStorage.setItem("collectInfoTalk",JSON.stringify(collectList0))
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
                                        for(var i in this.talkList){
                                            if(id == this.talkList[i].user.id){
                                                this.talkList[i].attention_status = followList[currIndex].status

                                            }
                                        }
                                        
                                    }else{
                                          
                                        followList.push(followArr)
                                        sessionStorage.setItem("followInfoTalk",JSON.stringify(followList))
                                        for(var i in this.talkList){
                                            
                                            if(id == this.talkList[i].user.id){
                                                this.talkList[i].attention_status = this.follow_status

                                            }
                                        } 
                                    }       
                                    
                                }else{
                                    for(var i in this.talkList){
                                        if(id == this.talkList[i].user.id){
                                            this.talkList[i].attention_status = this.follow_status
                                            
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
                        this.getTalkList() 
                        
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
