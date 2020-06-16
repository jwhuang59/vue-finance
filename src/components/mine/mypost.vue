<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">我的帖子</div>
            <div class="back"></div>
        </div>
        <div class="content" ref="scrollBox">
            <div class="operation_container" >
                <div class="operation_item" v-for="(item,index) in talkList" :key="index">
                    <div class="operation_person">
                        <img :src=item.user.user_img>
                        <div class="operation_info">
                            <h4>{{item.user.nickname}}</h4>
                            <span>{{item.create_time}}</span>
                        </div>
                    </div>
                    <div class="operation_details">
                        <div class="operation_words" @click="$router.push({path:'/article',query: {id:item.id,type:'5'}})">{{item.content}}</div>
                        <div class="operation_share" v-if="item.sharings.id" @click="$router.push({path:'/article',query: {id:item.sharings.id,type:item.sharings.compose_type}})">
                            <img :src=item.sharings.title_img v-if="item.sharings.title_img">
                            <p>{{item.sharings.title}}</p>
                        </div>
                        <div class="operation_img" v-if="item.imgs.length > 0">
                            <ul>
                                <li v-for="(img,index) in item.imgs" :key="index" :class="{'bigImg':index < 2}">
                                    <img :src="img" v-image-preview>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                <div class="noNews" v-if="noTalkList">暂无更多数据</div>
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { getMessage } from '../../api/api'
export default {

    data () {
        return {
            show:true,
            talkList:'',
            page:1,
            isLoad:true,
            noTalkList:false,
        }
    },
    beforeCreate() {

        if(!this.$store.state.userInfo.token){
            this.$router.push("/login")
        }
    },
    mounted() {
        this.getTalkList();
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        getTalkList(){

            getMessage({
                page:this.page,
                user_id:this.$store.state.userInfo.user_id,
                token:this.$store.state.userInfo.token
            }).then((res) => {
                this.isLoad = false
                if(res.status == 0){
                    if(this.talkList){
                        this.talkList.push.apply(this.talkList,res.info)

                    }else{
                        this.talkList = res.info
                    }

                }else{
                    this.noTalkList = true
                    
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

.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;z-index:9}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.content{margin-top:0.46rem;}



.operation_container{display: flex;flex-direction: column;padding:0 0.1rem;background:#fff;}
.operation_container .operation_item{margin-top:0.1rem;border-bottom:0.01rem solid #ddd;padding-bottom:0.1rem;display:flex;flex-direction: column;}
.operation_container .operation_item .operation_person{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;text-align:left;position:relative;}
.operation_container .operation_item .operation_person img{width:0.4rem;margin-right:0.05rem;}
.operation_container .operation_item .operation_person h4{font-size:0.14rem;}
.operation_container .operation_item .operation_person span{font-size:0.13rem;color:#666}
.operation_container .operation_item .operation_person .follow{position:absolute;right:0;top:50%;transform: translate(0,-50%)}
.operation_container .operation_item .operation_person .follow span{padding:0.03rem 0.05rem;color:#fff;font-size:0.13rem;background:#168CE3}
.operation_container .operation_item .operation_person .follow.is_follow span{color:#666;background:#ddd;}

.operation_container .operation_item .operation_words{font-size:0.13rem;font-weight:normal;text-align:left;margin:0.1rem 0;}
.operation_container .operation_item .operation_img ul{display:flex;flex-direction: row;justify-content: flex-start;}
.operation_container .operation_item .operation_img ul li{width:30%;display: flex;flex-direction: row;justify-content: center;align-items: center;}
.operation_container .operation_item .operation_img ul li img{width:100%;}
.operation_container .operation_item .operation_img ul li.bigImg{width:50%}

.operation_container .operation_item .operation_share{background:#eee;display:flex;flex-direction: row;justify-content: flex-start;align-items: center;padding:0.05rem 0.1rem;}
.operation_container .operation_item .operation_share img{width:0.5rem;}
.operation_container .operation_item .operation_share p{font-size:0.13rem;text-align: left;margin-left:0.05rem;}


.operation_container .operation_item .operation_type .is_praise span{color:#d81e06}
.operation_container .operation_item .operation_type .is_collect span{color:#d81e06}


.operation_container .isLoad,.operation_container .noNews{font-size:0.13rem;margin:0.1rem;}



</style>
