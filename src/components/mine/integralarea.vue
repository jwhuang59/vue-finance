<template>
    <div class="flex">
        <div class="header_bg">
            <div class="header">
                <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
                <div class="header_text">积分专区</div>
                <div class="back"></div>
            </div>
        </div>
        <div class="content">
            <div class="integral_wrapper">
                <div class="integral_value">
                    <label>当前积分</label>
                    <p><b>{{integral}}</b> 分</p>
                </div>
                <div class="integral_mall" @click="$router.push('/mine/integralmall')">积分商城</div>
            </div>
            <div class="signin">
                <div class="signin_day"><h4>已连续签到 <span>{{signInfo.sign_sum}}天</span></h4></div>
                <div class="signin_integral"><p>{{signInfo.desc}}</p></div>
                <ul>
                    <li :class="{'active':item.status == 1}" v-for="(item,index) in signInfo.sign_list" :key="index">
                        <span>+{{item.integral}}</span>
                        <label>{{item.sign_time}}</label>
                    </li>
                    
                </ul>
            </div>
            <div class="daily_tasks">
                <h3>未完成任务</h3>
                <div class="tasks_wrapper">
                    <div class="tasks_info" v-for="(item,index) in progressMenu" :key="index">
                        <div class="tasks_icon"><img :src=item.task_img></div>
                        <div class="tasks_details">
                            <p>{{item.task_name}}<span>{{item.up_limit}}</span></p>
                            <div class="tasks_details_value">
                                <i><svg t="1574847559713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1902" width="13" height="13"><path d="M6.02112 230.2464C6.02112 107.04896 233.03168 7.17824 512.98304 7.17824c279.9616 0 506.97216 99.86048 506.97216 223.06816 0 123.17696-227.01056 223.05792-506.97216 223.05792C233.03168 453.31456 6.02112 353.4336 6.02112 230.2464" fill="#FDC400" p-id="1903"></path><path d="M512.98304 563.1488c218.39872 0 397.80352-63.36512 475.7504-150.40512 15.60576 31.66208 31.22176 55.37792 31.22176 87.02976 0 134.59456-226.1504 237.43488-506.97216 237.43488C232.18176 737.20832 6.02112 626.42176 6.02112 499.77344c0-31.65184 7.77216-55.36768 31.21152-87.02976 77.95712 87.04 257.42336 150.40512 475.7504 150.40512" fill="#FDC400" p-id="1904"></path><path d="M512.98304 847.06304c218.39872 0 397.80352-63.37536 475.7504-150.40512 15.60576 31.65184 31.22176 55.35744 31.22176 87.01952 0 134.58432-226.1504 237.43488-506.97216 237.43488C232.18176 1021.11232 6.02112 910.32576 6.02112 783.67744c0-31.66208 7.77216-63.31392 31.21152-87.01952 77.95712 87.01952 257.42336 150.40512 475.7504 150.40512" fill="#FDC400" p-id="1905"></path></svg></i>
                                <label>{{item.integral}}积分</label>
                            </div>
                        </div>
                        <!-- <div class="tasks_progress">去完成</div> -->
                    </div>
                    <!-- <div class="tasks_info">
                        <div class="tasks_icon"><img src="../../../static/images/train2-1.png"></div>
                        <div class="tasks_details">
                            <p>分享活动，邀请好友赚钱积分</p>
                            <div class="tasks_details_value">
                                <i><svg t="1574847559713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1902" width="13" height="13"><path d="M6.02112 230.2464C6.02112 107.04896 233.03168 7.17824 512.98304 7.17824c279.9616 0 506.97216 99.86048 506.97216 223.06816 0 123.17696-227.01056 223.05792-506.97216 223.05792C233.03168 453.31456 6.02112 353.4336 6.02112 230.2464" fill="#FDC400" p-id="1903"></path><path d="M512.98304 563.1488c218.39872 0 397.80352-63.36512 475.7504-150.40512 15.60576 31.66208 31.22176 55.37792 31.22176 87.02976 0 134.59456-226.1504 237.43488-506.97216 237.43488C232.18176 737.20832 6.02112 626.42176 6.02112 499.77344c0-31.65184 7.77216-55.36768 31.21152-87.02976 77.95712 87.04 257.42336 150.40512 475.7504 150.40512" fill="#FDC400" p-id="1904"></path><path d="M512.98304 847.06304c218.39872 0 397.80352-63.37536 475.7504-150.40512 15.60576 31.65184 31.22176 55.35744 31.22176 87.01952 0 134.58432-226.1504 237.43488-506.97216 237.43488C232.18176 1021.11232 6.02112 910.32576 6.02112 783.67744c0-31.66208 7.77216-63.31392 31.21152-87.01952 77.95712 87.01952 257.42336 150.40512 475.7504 150.40512" fill="#FDC400" p-id="1905"></path></svg></i>
                                <label>5积分</label>
                            </div>
                        </div>
                        <div class="tasks_progress">去分享</div>
                    </div> -->
                </div>
            </div>
            <!-- <div class="daily_tasks">
                <h3>进阶任务</h3>
                <div class="tasks_wrapper">
                    <div class="tasks_info">
                        <div class="tasks_icon"><img src="../../../static/images/train2-1.png"></div>
                        <div class="tasks_details">
                            <p>分享活动，邀请好友赚钱积分</p>
                            <div class="tasks_details_value">
                                <i><svg t="1574847559713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1902" width="13" height="13"><path d="M6.02112 230.2464C6.02112 107.04896 233.03168 7.17824 512.98304 7.17824c279.9616 0 506.97216 99.86048 506.97216 223.06816 0 123.17696-227.01056 223.05792-506.97216 223.05792C233.03168 453.31456 6.02112 353.4336 6.02112 230.2464" fill="#FDC400" p-id="1903"></path><path d="M512.98304 563.1488c218.39872 0 397.80352-63.36512 475.7504-150.40512 15.60576 31.66208 31.22176 55.37792 31.22176 87.02976 0 134.59456-226.1504 237.43488-506.97216 237.43488C232.18176 737.20832 6.02112 626.42176 6.02112 499.77344c0-31.65184 7.77216-55.36768 31.21152-87.02976 77.95712 87.04 257.42336 150.40512 475.7504 150.40512" fill="#FDC400" p-id="1904"></path><path d="M512.98304 847.06304c218.39872 0 397.80352-63.37536 475.7504-150.40512 15.60576 31.65184 31.22176 55.35744 31.22176 87.01952 0 134.58432-226.1504 237.43488-506.97216 237.43488C232.18176 1021.11232 6.02112 910.32576 6.02112 783.67744c0-31.66208 7.77216-63.31392 31.21152-87.01952 77.95712 87.01952 257.42336 150.40512 475.7504 150.40512" fill="#FDC400" p-id="1905"></path></svg></i>
                                <label>5积分</label>
                            </div>
                        </div>
                        <div class="tasks_progress">去分享</div>
                    </div>
                    <div class="tasks_info">
                        <div class="tasks_icon"><img src="../../../static/images/train2-1.png"></div>
                        <div class="tasks_details">
                            <p>分享活动，邀请好友赚钱积分</p>
                            <div class="tasks_details_value">
                                <i><svg t="1574847559713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1902" width="13" height="13"><path d="M6.02112 230.2464C6.02112 107.04896 233.03168 7.17824 512.98304 7.17824c279.9616 0 506.97216 99.86048 506.97216 223.06816 0 123.17696-227.01056 223.05792-506.97216 223.05792C233.03168 453.31456 6.02112 353.4336 6.02112 230.2464" fill="#FDC400" p-id="1903"></path><path d="M512.98304 563.1488c218.39872 0 397.80352-63.36512 475.7504-150.40512 15.60576 31.66208 31.22176 55.37792 31.22176 87.02976 0 134.59456-226.1504 237.43488-506.97216 237.43488C232.18176 737.20832 6.02112 626.42176 6.02112 499.77344c0-31.65184 7.77216-55.36768 31.21152-87.02976 77.95712 87.04 257.42336 150.40512 475.7504 150.40512" fill="#FDC400" p-id="1904"></path><path d="M512.98304 847.06304c218.39872 0 397.80352-63.37536 475.7504-150.40512 15.60576 31.65184 31.22176 55.35744 31.22176 87.01952 0 134.58432-226.1504 237.43488-506.97216 237.43488C232.18176 1021.11232 6.02112 910.32576 6.02112 783.67744c0-31.66208 7.77216-63.31392 31.21152-87.01952 77.95712 87.01952 257.42336 150.40512 475.7504 150.40512" fill="#FDC400" p-id="1905"></path></svg></i>
                                <label>5积分</label>
                            </div>
                        </div>
                        <div class="tasks_progress">去分享</div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { integralList,taskProgress } from '../../api/api'
export default {

    data () {
        return {
            progressMenu:'',
            signInfo:'',
            integral:'',
        }
    },
    beforeCreate() {

        if(!this.$store.state.userInfo.token){
            this.$router.push("/login")
        }
    },
    mounted() {
        this.taskProgress();
    },
    methods:{
        goBack(){
            this.$router.push('/mine')

        },
        taskProgress(){
            taskProgress({
                token:this.$store.state.userInfo.token
            }).then((res) => {
                this.progressMenu = res.info
                this.signInfo = res.sign
                this.integral = res.integral

            })
        }
        
        
    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;left:0;right:0;}
.header_bg{height:0.96rem;background:#168CE3;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;position:absolute;top:0;left:0;right:0;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.content{padding:0.1rem;}
.integral_wrapper{height:0.8rem;background:url('../../../static/images/integral_bg.png') no-repeat center;background-size:cover;display: flex;flex-direction: row;justify-content: space-between;align-items:center;margin-top:-0.5rem;border-radius: 0.05rem;}
.integral_wrapper .integral_value{margin-left:0.2rem;}
.integral_wrapper .integral_value label{font-size:0.12rem;color:#999}
.integral_wrapper .integral_value p{font-size:0.12rem;}
.integral_wrapper .integral_value p b{font-size:0.2rem;color:#168CE3}
.integral_wrapper .integral_mall{margin-right:0.2rem;padding:0.05rem;background:linear-gradient(90deg,rgba(45,109,255,1) 0%,rgba(122,115,255,1) 100%);font-size:0.12rem;color:#fff;border-radius:0.08rem;}

.content .signin{margin-top:0.1rem;padding:0.1rem;display: flex;flex-direction: column;align-items: flex-start;justify-content: center;background:#fff;}
.content .signin_day h4,.content .signin_integral{color:#666;}
.content .signin_day span{color:#5570FF}
.content .signin_integral p{margin-top:0.02rem;font-size:0.12rem;text-align: left;}
/* .content .signin_integral span{color:#5570FF;} */

.signin ul{width:100%;display: flex;flex-direction: row;align-items: center;justify-content:center}
.signin ul li{width:14%;display: flex;flex-direction: column;align-items: center;justify-content: center}
.signin ul li span{width:0.3rem;height:0.3rem;line-height:0.3rem;color:#fff;margin:0.1rem 0 0.05rem 0;display:block;border-radius: 50%;background:#ccc}
.signin ul li label{font-size:0.12rem;color:#999;}
.signin ul li.active span{background:linear-gradient(90deg,rgba(22,140,227,1) 0%,rgba(46,194,243,1) 100%);}


.daily_tasks{display: flex;flex-direction: column;justify-content: center;align-items: flex-start;}
.daily_tasks h3{font-size:0.16rem;margin-top:0.1rem;}
.daily_tasks .tasks_wrapper{width:100%;}
.daily_tasks .tasks_info{background:#fff;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;padding:0.05rem;margin-top:0.1rem;}
.daily_tasks .tasks_info .tasks_icon{width:15%;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-right:0.05rem;}
.daily_tasks .tasks_info .tasks_icon img{width:100%;}
.daily_tasks .tasks_info .tasks_details{width:64%;display: flex;flex-direction: column;align-items: flex-start;}
.daily_tasks .tasks_info .tasks_details p{font-size:0.14rem;color:#444;text-align: left}
.daily_tasks .tasks_info .tasks_details span{font-size:0.12rem;color:#777}
.daily_tasks .tasks_info .tasks_details label{font-size:0.11rem;color:#999;vertical-align: top}

.daily_tasks .tasks_info .tasks_progress{padding:0.02rem 0.05rem;font-size:0.13rem;color:#fff;background:linear-gradient(-57deg,rgba(238,190,43,1),rgba(255,130,54,1));border-radius: 0.08rem;}

</style>
