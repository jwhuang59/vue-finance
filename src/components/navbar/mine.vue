<template>
    <div class="flex">
        <div class="person">
            <div class="person_msg"><i class="el-icon-chat-line-square"></i></div>
            <div class="person_info">
                <div class="person_img">
                    <img :src=userInfo.user_img v-if='userInfo.user_img' @click="toMyinformation()">
                    <img src="../../assets/person_img.png" v-else>
                </div>
                <div class="info_wrapper">
                    <div class="wrapper_left">
                        <h3 v-if="userInfo.nickname" @click="toMyinformation()">{{userInfo.nickname}}</h3>
                        <h3 v-else @click="$router.push('/login')">未登录</h3>
                    </div>
                    <div class="wrapper_right" @click="signIn()">
                        <span v-if="userInfo.sign_status == 1">已签到</span>
                        <span v-else>签到</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="person_other">
                <div class="other_fans"><label>粉丝</label> <span>{{userInfo.fans}}</span></div>
                <div class="other_dynamic"><label>动态</label> <span>{{userInfo.message_num}}</span></div>
            </div>
        </div>
        <ul class="options_wrapper">
            <li @click="toOptional">
                <img src="../../assets/optional.png">
                <h4>我的自选</h4>
            </li>
            <li @click="toIntegral()">
                <img src="../../assets/integral.png">
                <h4>积分</h4>
            </li>
            <li @click="toCollect()">
                <img src="../../assets/collection.png">
                <h4>收藏</h4>
            </li>
            <li @click="$router.push('/train')">
                <img src="../../assets/curriculum.png">
                <h4>训练</h4>
            </li>
        </ul>
        <div class="menu_list">
            <div class="list_lis" @click="toIntegralDetail()">
                <div class="lis_icon"><i class="el-icon-chat-line-square"></i></div>
                <div class="lis_info" >
                    <h3>积分明细</h3>
                    <div class="info_right">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <!-- <div class="list_lis">
                <div class="lis_icon"><i><svg t="1571110797882" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2911" width="18" height="18"><path d="M910.222 432.356c-12.584 0-22.755-10.172-22.755-22.756V240.185L568.525 595.33c-1.912 23.37-21.277 41.825-45.147 41.825-21.231 0-38.89-14.61-43.941-34.248L353.599 476.001c-3.937 1.092-7.988 1.866-12.266 1.866s-8.328-0.774-12.265-1.866L176.082 630.26c-9.102 8.692-23.847 8.692-32.927 0-4.255-4.05-6.349-9.353-6.622-14.7v180.883c0 25.123 20.39 45.512 45.511 45.512h614.4c25.123 0 45.512-20.39 45.512-45.512V568.89c0-12.584 10.171-22.756 22.755-22.756s22.756 10.172 22.756 22.756V819.2c0 37.683-30.584 68.267-68.267 68.267H159.289c-37.683 0-68.267-30.584-68.267-68.267V204.8c0-37.683 30.584-68.267 68.267-68.267H546.133c12.584 0 22.756 10.172 22.756 22.756s-10.172 22.755-22.756 22.755H182.044c-25.122 0-45.51 20.39-45.51 45.512v385.98c0.272-5.326 2.366-10.628 6.621-14.7l154.146-155.49c-0.864-3.527-1.479-7.168-1.479-10.99 0-25.123 20.39-45.512 45.511-45.512s45.511 20.39 45.511 45.512c0 3.822-0.614 7.463-1.479 10.99l110.956 111.89c7.578-5.644 16.885-9.103 27.057-9.103 8.283 0 15.951 2.367 22.619 6.235L858.18 204.8H682.667c-12.584 0-22.756-10.172-22.756-22.756s10.172-22.755 22.756-22.755h227.555c12.584 0 22.756 10.172 22.756 22.755V409.6c0 12.584-10.172 22.756-22.756 22.756z" fill="#769ac3" p-id="2912"></path></svg></i></div>
                <div class="lis_info">
                    <h3>我的自选</h3>
                    <div class="info_right">
                        <span></span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div> -->
            <div class="list_lis" @click="toMypost()">
                <div class="lis_icon"><i class="el-icon-document"></i></div>
                <div class="lis_info">
                    <h3>我的帖子</h3>
                    <div class="info_right">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="list_lis">
                <div class="lis_icon"><i class="el-icon-present"></i></div>
                <div class="lis_info">
                    <h3>参与活动</h3>
                    <div class="info_right">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="list_lis" @click="toMysubscribe()">
                <div class="lis_icon"><i class="el-icon-collection-tag"></i></div>
                <div class="lis_info">
                    <h3>我的订阅</h3>
                    <div class="info_right">
                        <span></span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="list_lis">
                <div class="lis_icon"><i class="el-icon-service"></i></div>
                <div class="lis_info">
                    <h3>客户服务</h3>
                    <div class="info_right">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="list_lis" @click="toSetup()">
                <div class="lis_icon"><i class="el-icon-setting"></i></div>
                <div class="lis_info">
                    <h3>设置</h3>
                    <div class="info_right">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { userSign,personal } from '../../api/api';
export default {

    data () {
        return {
            userInfo: '',
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo(){
            if(this.$store.state.userInfo.token){
                personal({
                    token:this.$store.state.userInfo.token
                }).then((res) => {
                    res.info.token = this.$store.state.userInfo.token
                    this.userInfo = res.info
                    if(res.status == 0){
                        sessionStorage.setItem("userInfo",JSON.stringify(res.info))
                    }
                    
                })
            }
            
        },
        toCollect(){
            this.isLogin('collection');
        },
        toOptional(){
            this.isLogin('optional');
        },
        toSetup(){
            this.isLogin('setup');
        },
        toMypost(){
            this.isLogin('mypost');
        },
        toMyinformation(){
            this.isLogin('myinformation');
        },
        toMysubscribe(){
            this.isLogin('mysubscribe');
        },
        toIntegral(){
            this.isLogin('integralarea');
        },
        toIntegralDetail(){
            this.isLogin('integraldetail');
        },
        isLogin(route){
            if(!this.$store.state.userInfo.token){
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }else{
                this.$router.push('/mine/' + route)
            }
        },
        signIn(){
            if(this.$store.state.userInfo.token){
                if(this.userInfo.sign_status == 0){
                    userSign({
                        token:this.$store.state.userInfo.token
                    }).then((res) => {
                        if(res.status == 0){
                            this.userInfo.sign_status = 1
                            mui.toast(res.msg,{duration: 1500})
                        }
                        
                    })
                }else{
                    mui.toast("今天已签到",{duration: 1500})
                }
            }else{
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }
        }
        
    },  
    // watch: {
    //     userInfo:{
    //         handler(newVal, oldVal) {
    //             if (newVal != '') {
    //                 console.log(this.globalData.userInfo)

    //             }
    //         },
    //         deep:true
    //     }
    // },
    // computed: {
    //     userInfo () {
    //         return this.$store.state.userInfo
    //     }
    // }
}
</script>

<style scoped>
.flex{display: flex;flex-direction: column;margin-bottom:0.5rem;}
.flex .person{display: flex;flex-direction: column;background:#168CE3;padding:0.1rem;}
.flex .person .person_msg{display: flex;flex-direction: row;justify-content: flex-end;}
.flex .person .person_msg i{color:#fff;font-size:0.18rem;}
.person_info{width:100%;height:0.55rem;display: flex;flex-direction: row;align-items:center;position:relative;}
.person_info .person_img{width:0.55rem;height:0.55rem;position:absolute;z-index:3}
.person_info .person_img img{width:100%;height:100%;}
.person_info .info_wrapper{width:100%;display:flex;flex-direction: row;justify-content: space-between;color:#fff;padding:0 0 0 0.6rem;position:absolute;left:0;}
.person_info .wrapper_left{display: flex;flex-direction: row;justify-content: center;align-items: center;}
.person_info .wrapper_left span{color:#ddd;margin-left:0.1rem;font-size:0.13rem;}
.person_info .info_wrapper h3{font-size:0.15rem;font-weight:normal;}
.person_info .wrapper_right{display: flex;flex-direction: row;justify-content: center;align-items: center}
.person_info .wrapper_right span{font-size:0.13rem;}
.person_info .wrapper_right i{font-size:0.14rem}

.person_other{display: flex;flex-direction: row;}
.person_other>div{width:50%;text-align: center;display:block;color:#fff;margin-top:0.15rem;font-size:0.13rem;}
.person_other>div:nth-child(1){border-right:0.01rem solid #ddd;}
.options_wrapper{display: flex;flex-direction: row;padding:0.1rem 0}
.options_wrapper li{width:25%;padding:0.01rem;display: flex;flex-direction: column;justify-content: center;align-items: center;}
.options_wrapper li img{width:45%;}
.options_wrapper li h4{font-size:0.13rem;font-weight:normal;margin-top:0.03rem;}

.menu_list{display: flex;flex-direction: column;padding:0 0.1rem;}
.menu_list .list_lis{display: flex;flex-direction: row;padding:0.12rem 0.05rem;border-bottom:0.01rem solid #ddd;}
.menu_list .list_lis .lis_icon{display: flex;align-items: center;margin-right:0.05rem;align-items: center;}
.menu_list .list_lis i{font-size:0.16rem;color:#769ac3;background:transparent}
.menu_list .list_lis .lis_info{width:100%;display: flex;flex-direction: row;justify-content: space-between}
.menu_list .list_lis .lis_info h3{font-size:0.14rem;color:#444;font-weight: normal;}
.menu_list .list_lis .lis_info .info_right{display: flex;align-items: center;}
.menu_list .list_lis .lis_info .info_right i{color:#666;}
.menu_list .list_lis .lis_info .info_right span{color:#999;}

</style>
