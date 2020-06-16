<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">商品详情</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="goods_info">
                <img :src=goodsDetails.img>
                <div class="goods_title">
                    <h4>{{goodsDetails.name}}</h4>
                </div>
                <div class="goods_desc">{{goodsDetails.desc}}</div>
                <div class="goods_other">
                    <div class="goods_price"><i><svg t="1576062248645" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2186" width="16" height="16"><path d="M112.127 284.09a390.766 200.815 0 1 0 799.746 0 390.766 200.815 0 1 0-799.746 0z" fill="#168CE3" p-id="2187"></path><path d="M512 551.409c-163.335 0-303.792-50.328-365.87-122.452-21.857 25.394-34.003 53.489-34.003 83.043 0 113.492 179.03 205.495 399.873 205.495S911.873 625.492 911.873 512c0-29.554-12.145-57.649-34.003-83.043C815.792 501.08 675.335 551.409 512 551.409z" fill="#168CE3" p-id="2188"></path><path d="M512 784.985c-165.467 0-307.456-51.648-368.263-125.285-20.35 24.644-31.61 51.752-31.61 80.21 0 113.492 179.03 205.495 399.873 205.495s399.873-92.003 399.873-205.495c0-28.46-11.26-55.566-31.61-80.21C819.456 733.337 677.467 784.985 512 784.985z" fill="#168CE3" p-id="2189"></path></svg></i><h5>{{goodsDetails.integral}}</h5><label>¥{{goodsDetails.price}}</label></div>
                    <div class="stock">库存{{goodsDetails.number}}</div>
                </div>
            </div>
            <div class="goods_change">
                <div class="exchange" @click="exchange()">立即兑换</div>
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import {  } from '../../api/api'
export default {

    data () {
        return {
            goodsDetails:JSON.parse(this.$route.query.info)
        }
    },
    mounted() {

    },
    methods:{
        goBack(){
            this.$router.push('/mine/integralmall');

        },
        exchange(){
            this.$router.push({path:'../pages/orderdetails',query:{info:JSON.stringify(this.goodsDetails)}})
        }
        
        
    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;background:#fff;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.goods_info img{width:100%;}
.goods_title{display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding:0 0.1rem;}
.goods_title h4{font-size:0.15rem;text-align: left;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}

.goods_other{display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin:0.1rem 0 0.05rem;padding:0 0.1rem;}
.goods_price{display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
.goods_other h5{font-size:0.16rem;color:#168CE3}
.goods_other label{font-size:0.11rem;text-decoration: line-through;color:#999;margin-left:0.03rem;}
.goods_other i{padding-top:0.03rem;}
.goods_other .stock{font-size:0.12rem;padding:0.01rem 0.03rem;color:#fff;color:#666}
.goods_desc{font-size:0.13rem;padding:0.01rem 0.03rem;color:#777;color:#666;margin-top:0.1rem;text-align: left;padding:0 0.1rem;}

.goods_change{position:absolute;left:0;right:0;bottom:0;}
.exchange{padding:0.1rem;background:#fff;font-size:0.14rem;background:#168CE3;color:#fff;}

</style>
