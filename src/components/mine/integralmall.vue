<template>
    <div class="flex">
        <div class="header_bg">
            <div class="header">
                <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
                <div class="header_text">积分商城</div>
                <div class="address"></div>
            </div>
            <div class="integral_info">
                <div class="integral_num"><b>{{curIntegral}}</b>分</div>
                <div class="integral_details" @click="$router.push('/pages/exchangelist')">兑换明细</div>
            </div>
        </div>
        <div class="content">
            <div class="integral_activity">
                <div class="activity_left">
                    <img src="../../../static/images/activity.png">
                </div>
                <div class="activity_right">
                    <div class="integral_value">
                        <label>特惠活动</label>
                        <p>积分特惠，好礼换不停</p>
                    </div>
                    <div><i class="el-icon-arrow-right"></i></div>
                </div>
                
            </div>
            <div class="goods_list">
                <li v-for="(item,index) in integralInfo" :key="index" @click="$router.push({path:'../pages/goodsdetails',query:{info:JSON.stringify(item)}})">
                    <img :src=item.img>
                    <div class="goods_title">
                        <h4>{{item.name}}</h4>
                    </div>
                    <!-- <div class="goods_des">{{item.desc}}</div> -->
                    <div class="goods_other">
                        <div class="goods_price"><i><svg t="1576062248645" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2186" width="16" height="16"><path d="M112.127 284.09a390.766 200.815 0 1 0 799.746 0 390.766 200.815 0 1 0-799.746 0z" fill="#168CE3" p-id="2187"></path><path d="M512 551.409c-163.335 0-303.792-50.328-365.87-122.452-21.857 25.394-34.003 53.489-34.003 83.043 0 113.492 179.03 205.495 399.873 205.495S911.873 625.492 911.873 512c0-29.554-12.145-57.649-34.003-83.043C815.792 501.08 675.335 551.409 512 551.409z" fill="#168CE3" p-id="2188"></path><path d="M512 784.985c-165.467 0-307.456-51.648-368.263-125.285-20.35 24.644-31.61 51.752-31.61 80.21 0 113.492 179.03 205.495 399.873 205.495s399.873-92.003 399.873-205.495c0-28.46-11.26-55.566-31.61-80.21C819.456 733.337 677.467 784.985 512 784.985z" fill="#168CE3" p-id="2189"></path></svg></i><h5>{{item.integral}}</h5><label>{{item.price}}</label></div>
                        <div class="stock">库存{{item.number}}</div>
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { integralList,taskProgress,integralStore } from '../../api/api'
export default {

    data () {
        return {
            integralInfo:'',
            curIntegral:'',
        }
    },
    beforeCreate() {

        if(!this.$store.state.userInfo.token){
            this.$router.push("/login")
        }
    },
    mounted() {
        this.integralStore();
    },
    methods:{
        goBack(){
            this.$router.push('/mine/integralarea')

        },
        integralStore(){
            integralStore({
                token:this.$store.state.userInfo.token
            }).then((res) => {
                this.integralInfo = res.info
                this.curIntegral = res.integral
            })
        },
        toGoodsdetails(item){

            // this.$router.push({path:'../pages/goodsdetails',query:{info:JSON.stringify(item)}})
        }
        
        
    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;left:0;right:0;}
.header_bg{height:1.8rem;background:url('../../../static/images/activity_bg.png') no-repeat center;background-size:cover;display: flex;flex-direction: row;justify-content: center;align-items: center;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;position:absolute;top:0;left:0;right:0;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.flex .header .address{font-size:0.13rem;color:#fff;}
.flex .integral_info{margin-top:0.2rem;}
.flex .integral_info .integral_num{font-size:0.15rem;color:#fff;margin-bottom:0.1rem}
.flex .integral_info .integral_num b{font-size:0.4rem;margin-right:0.02rem;}
.flex .integral_info .integral_details{color:#fff;border:0.01rem solid #fff;font-size:0.13rem;border-radius: 0.1rem;padding:0.03rem 0.1rem;display: inline;}


.integral_activity{height:0.8rem;display: flex;flex-direction: row;justify-content: center;align-items:center;background:#fff;}
.integral_activity .activity_left{width:20%;}
.integral_activity .activity_left img{width: 100%;}
.integral_activity .activity_right{width:60%;display:flex;flex-direction: row;justify-content: space-between;align-items: center;text-align:left;padding-left:0.1rem;}
.integral_activity .activity_right label{font-size:0.15rem;color:#333;}
.integral_activity .activity_right p{font-size:0.12rem;margin-top:0.05rem;}
.integral_activity .integral_mall{margin-right:0.2rem;padding:0.05rem;background:linear-gradient(90deg,rgba(45,109,255,1) 0%,rgba(122,115,255,1) 100%);font-size:0.12rem;color:#fff;border-radius:0.08rem;}

.content .goods_list{display: flex;flex-flow:row wrap;padding:0 0.05rem 0.1rem;margin:0.1rem 0;background: #fff;}
.content .goods_list li{width:48%;margin:0.1rem 1% 0;border:0.01rem solid #eee;box-sizing: border-box;}
.content .goods_list li img{width:100%;}
.goods_title{display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin:0 0.03rem}
.goods_title h4{font-size:0.12rem;text-align: left;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}

.goods_other{display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin:0.1rem 0.03rem 0.03rem;}
.goods_price{display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
.goods_other h5{font-size:0.15rem;color:#168CE3}
.goods_other label{font-size:0.11rem;text-decoration: line-through;color:#999;margin-left:0.03rem;}
.goods_other i{padding-top:0.03rem;}
.goods_other .stock{font-size:0.11rem;padding:0.01rem 0.03rem;color:#fff;color:#666}

</style>
