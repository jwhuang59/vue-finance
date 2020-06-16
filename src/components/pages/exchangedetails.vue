<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">订单详情</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="address">
                <div class="address_info">
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
            </div>
            <div class="goods_wrapper">
                <div class="goods_info">
                    <img :src=goodsDetails.thumb_img>
                    <div class="goods_name">
                        <h4>{{goodsDetails.store_name}}</h4>
                        <div class="goods_other">
                            <span>{{goodsDetails.integral}}积分</span>
                            <label>x1</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="delivery">
                <label>订单编号</label>
                <span>{{goodsDetails.order_num}}</span>
            </div>
            <div class="delivery">
                <label>兑换时间</label>
                <span>{{goodsDetails.create_time}}</span>
            </div>
            <div class="delivery">
                <label>配送方式</label>
                <span>快递包邮</span>
            </div>
            <div class="view_logistics"><span>查看物流</span></div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { exchangeList } from '../../api/api'
export default {

    data () {
        return {
            goodsDetails:'',
            myAddress:'',
        }
    },
    mounted() {
        this.exchangeList()
    },
    methods:{
        goBack(){
            this.$router.push('/pages/exchangelist')

        },
        exchangeList(){
            exchangeList({
                token:this.$store.state.userInfo.token,
                id:this.$route.query.id
                
            }).then((res) => {
                this.goodsDetails = res.info.order
                this.myAddress = res.info.address
            })
        },
        
        
    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.content{background:#fff;}
.address{display:flex;flex-direction: row;justify-content: space-between;align-items: center;padding:0.1rem;}
.address_info{width:92%;}
.address_info>div{display:flex;flex-direction: row;justify-content: flex-start;align-items: flex-start;}
.address_info>div label{height:0.2rem;line-height:0.2rem;white-space:nowrap; font-size:0.13rem;color:#999}
.address_info>div span{font-size:0.13rem;text-align:left;}
.address_info .receive_name span{height:0.2rem;line-height:0.2rem;margin:0 0.05rem 0.05rem 0}
.address_info .receive_address span{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}

.add_address{font-size:0.14rem;}

.goods_wrapper{margin:0 0.1rem;padding:0.1rem 0;border-top:0.01rem solid #ddd;border-bottom:0.01rem solid #ddd;display:flex;flex-direction: row;justify-content: space-between;align-items: center;}
.goods_wrapper .goods_info{width:100%;display:flex;flex-direction: row;justify-content: flex-start;align-items: flex-start;position:relative;}
.goods_wrapper .goods_info img{width:25%;}
.goods_name{width:75%;display: flex;flex-direction: column;justify-content: center;align-items: space-between;padding-left:0.05rem;}
.goods_name h4{font-size:0.14rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;text-align: left;}
.goods_name .goods_other{width:75%;display:flex;flex-direction: row;justify-content:space-between;align-items: center;position:absolute;bottom:0;right:0;padding-left:0.05rem;}
.goods_name .goods_other label,.goods_name .goods_other span{font-size:0.13rem;}

.delivery{margin:0 0.1rem;padding-top:0.1rem;display:flex;flex-direction: row;justify-content: space-between;align-items: center}
.delivery label,.delivery span{font-size:0.13rem;}
.view_logistics{display: flex;flex-direction: row;justify-content: flex-end;align-items: center;border-top:0.01rem solid #ddd;margin:0.1rem}
.view_logistics span{border:0.01rem solid #999;padding:0.01rem 0.1rem;border-radius: 0.1rem;margin-top:0.1rem;font-size:0.14rem;}


</style>
