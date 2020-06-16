<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">确认订单</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="address" @click="$router.push({path:'../pages/addressmanage',query:{info:JSON.stringify(goodsDetails)}})">
                <div class="address_info" v-if="!noAddress">
                    <div class="receive_name">
                        <label>收货人：</label>
                        <span>{{myAddress.name}}</span>
                        <span>{{myAddress.mobile}}</span>
                    </div>
                    <div class="receive_address">
                        <label>收货地址：</label>
                        <span>{{myAddress.province}} {{myAddress.city}} {{myAddress.district}} {{myAddress.remark}}</span>
                    </div>
                </div>
                <div class="add_address" v-else>添加收货地址</div>
                <div class="icon"><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="goods_wrapper" @click="$router.push({path:'../pages/goodsdetails',query:{info:JSON.stringify(goodsDetails)}})">
                <div class="goods_info">
                    <img :src=goodsDetails.img>
                    <div class="goods_name">
                        <h4>{{goodsDetails.name}}</h4>
                        <div class="goods_other">
                            <label>x1</label>
                            <span>需积分<font>{{goodsDetails.integral}}</font></span>
                        </div>
                    </div>
                </div>
                <div class="icon"><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="delivery">
                <label>配送方式</label>
                <span>快递包邮</span>
            </div>
            <div class="goods_change">
                <div class="goods_value">
                    <label>合计</label>
                    <span>{{goodsDetails.integral}}积分</span>
                </div>
                <div class="exchange" @click="submitExchange()">确认兑换</div>
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { addressDefault,integralOrder } from '../../api/api'
export default {

    data () {
        return {
            goodsDetails:JSON.parse(this.$route.query.info),
            myAddress:'',
            noAddress:false
        }
    },
    mounted() {
        this.getAddress()
    },
    methods:{
        goBack(){
            this.$router.push({path:'../pages/goodsdetails',query:{info:JSON.stringify(this.goodsDetails)}})

        },
        exchange(){
            this.$router.push({path:'../pages/orderdetails',query:{info:JSON.stringify(this.goodsDetails)}})
        },
        getAddress(){
            addressDefault({
                token:this.$store.state.userInfo.token,
            }).then((res) => {
                if(res.status == 0){
                    if(this.$route.query.id){
                        this.myAddress = JSON.parse(this.$route.query.id)
                    }else{
                        this.myAddress = res.info
                    }
                    this.noAddress =false
                }else{
                    this.noAddress =true
                }
                
            })
        },
        submitExchange(){
            var that = this
            mui.confirm("确认兑换该商品吗？",function(e){
                
                if(e.index == 1){
                    integralOrder({
                        token:that.$store.state.userInfo.token,
                        store_id:that.goodsDetails.id,
                        address:that.myAddress.id 
                    }).then((res) => {
                        mui.toast(res.msg,{duration: 1500})
                        if(res.status == 0){
                            setTimeout(() => {this.$router.push('/pages/exchangedetails');},1500)
                            
                        }

                    })
                }

            })
        }
        
    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;background:#fff;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.address{display:flex;flex-direction: row;justify-content: space-between;align-items: center;padding:0.1rem;}
.address_info{width:92%;}
.address_info>div{display:flex;flex-direction: row;justify-content: flex-start;align-items: flex-start;}
.address_info>div label{height:0.2rem;line-height:0.2rem;white-space:nowrap; font-size:0.13rem;color:#999}
.address_info>div span{font-size:0.13rem;text-align:left;}
.address_info .receive_name span{height:0.2rem;line-height:0.2rem;margin:0 0.05rem 0.05rem 0}
.address_info .receive_address span{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}

.add_address{font-size:0.14rem;}

.goods_wrapper{margin:0 0.1rem;padding:0.1rem 0;border-top:0.01rem solid #ddd;display:flex;flex-direction: row;justify-content: space-between;align-items: center;}
.goods_wrapper .goods_info{width:92%;display:flex;flex-direction: row;justify-content: flex-start;align-items: flex-start;position:relative;}
.goods_wrapper .goods_info img{width:25%;}
.goods_name{width:75%;display: flex;flex-direction: column;justify-content: center;align-items: space-between;padding-left:0.05rem;}
.goods_name h4{font-size:0.14rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;text-align: left;}
.goods_name .goods_other{width:75%;display:flex;flex-direction: row;justify-content:space-between;align-items: center;position:absolute;bottom:0;right:0;padding-left:0.05rem;}
.goods_name .goods_other label,.goods_name .goods_other span{font-size:0.13rem;}
.goods_name .goods_other font{font-size:0.14rem;vertical-align: middle;}

.delivery{margin:0 0.1rem;padding-top:0.1rem;border-top:0.01rem solid #ddd;display:flex;flex-direction: row;justify-content: space-between;align-items: center}
.delivery label,.delivery span{font-size:0.13rem;}

.goods_change{position:absolute;left:0;right:0;bottom:0;display: flex;flex-direction: row;justify-content:flex-end;align-items: center;}
.goods_change .goods_value{display: flex;flex-direction: column;justify-content:center;align-items: center;}
.goods_change .goods_value label{font-size:0.12rem;}
.goods_change .goods_value span{font-size:0.12rem;color:#168CE3}

.exchange{padding:0.1rem 0.2rem;background:#fff;font-size:0.14rem;background:#168CE3;color:#fff;margin-left:0.05rem;}



</style>
