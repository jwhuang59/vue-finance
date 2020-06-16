<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">个人资料</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="menu_list">
                <div class="list_lis">
                    <div class="lis_info">
                        <h3>头像</h3>
                        <div class="info_right">
                            <img :src=userInfo.user_img>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info" @click="$router.push({path:'/pages/reset-password',query:{'type':'2'}})">
                        <h3>昵称</h3>
                        <div class="info_right">
                            <span>{{userInfo.nickname}}</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info">
                        <h3>个性签名</h3>
                        <div class="info_right">
                            <span>什么都没留下~</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info" @click="$router.push({path:'/pages/reset-password',query:{'type':'3'}})">
                        <h3>手机号</h3>
                        <div class="info_right">
                            <span>{{userInfo.tel.replace(userInfo.tel.substring(3,7), "****")}}</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info" @click="$router.push({path:'/pages/reset-password',query:{'type':'4'}})">
                        <h3>邮箱</h3>
                        <div class="info_right">
                            <span>{{userInfo.email}}</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info">
                        <h3>积分</h3>
                        <div class="info_right">
                            <span>{{userInfo.integral}}</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                
                <div class="list_lis">
                    
                    <div class="lis_info">
                        <h3>我的地址</h3>
                        <div class="info_right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { loginOut } from '../../api/api'
export default {

    data () {
        return {

        }
    },
    beforeCreate() {

        if(!this.$store.state.userInfo.token){
            this.$router.push("/login")
        }
    },
    mounted() {

    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        logout(){
            var that = this
            mui.confirm("确认注销登录吗？",function(e){
                
                if(e.index == 1){
                    loginOut({
                        token:that.$store.state.userInfo.token
                    }).then((res) => {
                        
                        if(res.status == 0){
                            mui.toast("注销成功",{duration: 1500})
                            sessionStorage.removeItem("userInfo")
                            setTimeout(() => {that.$store.commit('getUserInfo','')},1500)
                        }else{
                            this.$store.state.userInfo.token
                        }
                    })
                }

            })
            
        }
        
        
    },
    computed: {
        userInfo () {
            return this.$store.state.userInfo
        }
    }
}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.content{margin-top:0.46rem;}

.menu_list{display: flex;flex-direction: column;}
.menu_list .list_lis{display: flex;flex-direction: row;border-bottom:0.01rem solid #ddd;background:#fff;padding:0 0.1rem;}
.menu_list .list_lis:last-child{margin-top:0.06rem;}
.menu_list .list_lis span{font-size:0.12rem;}
.menu_list .list_lis img{height:0.4rem;}
.menu_list .list_lis i{font-size:0.16rem;color:#769ac3;background:transparent}
.menu_list .list_lis .lis_info{width:100%;display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding:0.1rem 0.05rem;}
.menu_list .list_lis .lis_info h3{font-size:0.14rem;color:#444;font-weight: normal;}
.menu_list .list_lis .lis_info .info_right{display: flex;align-items: center;}
.menu_list .list_lis .lis_info .info_right i{color:#666;}
.menu_list .list_lis .lis_info .info_right span{color:#999;}

.menu_footer{position:absolute;bottom:0;left:0;right:0;}
.menu_footer .footer_lis{padding:0.1rem;background:#fff;font-size:0.14rem;}


</style>
