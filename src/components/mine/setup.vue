<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">设置</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="menu_list">
                <div class="list_lis" @click="$router.push({path:'/pages/reset-password',query:{'type':'1'}})">
                    <div class="lis_info">
                        <h3>修改密码</h3>
                        <div class="info_right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info">
                        <h3>安全中心</h3>
                        <div class="info_right">
                            <span></span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info">
                        <h3>隐私设置</h3>
                        <div class="info_right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info">
                        <h3>系统权限</h3>
                        <div class="info_right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info">
                        <h3>黑名单设置</h3>
                        <div class="info_right">
                            <span></span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                
                <div class="list_lis">
                    
                    <div class="lis_info">
                        <h3>给软件评分</h3>
                        <div class="info_right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="list_lis">
                    
                    <div class="lis_info">
                        <h3>关于享诠财经</h3>
                        <div class="info_right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu_footer">
                <div class="footer_lis border" @click="logout()">注销登录</div>
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
                        mui.toast(res.msg,{duration: 1500})
                        if(res.status == 0){
                            
                            sessionStorage.removeItem("userInfo")
                            setTimeout(() => {
                                that.$store.commit('getUserInfo','')
                                that.$router.push("/mine")
                            },1500)
                        }
                    })
                }

            })
            
        }
        
        
    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.content{margin-top:0.46rem;}

.menu_list{display: flex;flex-direction: column;padding:0 0.1rem;background:#fff;}
.menu_list .list_lis{display: flex;flex-direction: row;padding:0.12rem 0.05rem;border-bottom:0.01rem solid #ddd;}

.menu_list .list_lis .lis_icon{display: flex;align-items: center;margin-right:0.05rem;align-items: center;}
.menu_list .list_lis i{font-size:0.16rem;color:#769ac3;background:transparent}
.menu_list .list_lis .lis_info{width:100%;display: flex;flex-direction: row;justify-content: space-between}
.menu_list .list_lis .lis_info h3{font-size:0.14rem;color:#444;font-weight: normal;}
.menu_list .list_lis .lis_info .info_right{display: flex;align-items: center;}
.menu_list .list_lis .lis_info .info_right i{color:#666;}
.menu_list .list_lis .lis_info .info_right span{color:#999;}

.menu_footer{position:absolute;bottom:0;left:0;right:0;}
.menu_footer .footer_lis{padding:0.1rem;background:#fff;font-size:0.14rem;}


</style>
