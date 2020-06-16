<template>
    <div class="flex">
        <div class="header">
            <ul class="nav_menu">
                <li @click="toOptional()">自选</li>
                <li :class="{show:show}">沪深</li>
                <!-- <li>港股</li>
                <li>期货</li> -->
            </ul>
            <div class="search" @click="$router.push('../search')"><i class="el-icon-search"></i></div>
        </div>
        <div class="content">
            <div class="index_num">
                <h2>指数</h2>
                <div class="exponent_wrapper">
                    <div class="swiper-container exponent_swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide ul">
                                <div class="li" :class="{'red':item.zf_ds>0}" v-for="(item,index) in getMarket" :key="index" v-if="index<3" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                    <h3>{{item.name}}</h3>
                                    <span>{{parseFloat(item.price).toFixed(2)}}</span>
                                    <p v-if="item.zf_ds>0">
                                        <span class="value">+ {{item.zf_ds}}</span><span class="percentage">+ {{item.zf_bfb}}%</span>
                                    </p>
                                    <p v-else>
                                        <span class="value">{{item.zf_ds}}</span><span class="percentage">{{item.zf_bfb}}%</span>
                                    </p>
                                </div>

                            </div>
                            <div class="swiper-slide ul">
                                <div class="li" :class="{'red':item.zf_ds>0}" v-for="(item,index) in getMarket" :key="index" v-if="index>2" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                    <h3>{{item.name}}</h3>
                                    <span>{{item.price}}</span>
                                    <p v-if="item.zf_ds>0">
                                        <span class="value">+ {{item.zf_ds}}</span><span class="percentage">+ {{item.zf_bfb}}%</span>
                                    </p>
                                    <p v-else>
                                        <span class="value">{{item.zf_ds}}</span><span class="percentage">{{item.zf_bfb}}%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination0 dot"></div>
                    </div>
                </div>
            </div>

            <div class="real_data">
                <h4>大盘数据</h4>
                <ul>
                    <li>
                        <i class="el-icon-caret-top"></i>
                        <label>上涨</label>
                        <span class="red">{{marketData.up}}家</span>
                    </li>
                    <li>
                        <i class="el-icon-caret-bottom"></i>
                        <label>下跌</label>
                        <span>{{marketData.down}}家</span>
                    </li>
                </ul>
            </div>

            <div class="money_flow">
                <h2>资金流向</h2>
                <div class="money_wrapper">
                    <div class="money_wrapper_slide">
                        <div class="south_down">
                            <label>南下净流入</label>
                            <span>+{{getMoney.nx.total}}</span>
                            <p>{{new Date().getFullYear() + '-' + getMoney.s2nDate}}</p>
                        </div>
                        <div class="sh_share">
                            <h4>沪股通</h4>
                            <p><label>余额</label><span>{{getMoney.hk2sh.dayAmtRemain}}</span></p>
                            <p><label>流入</label><span class="blue">{{getMoney.hk2sh.dayNetAmtIn}}</span></p>
                            <p><label>剩余</label><span>{{getMoney.hk2sh.dayAmtBfb}}</span></p>
                        </div>
                        <div class="sz_share">
                            <h4>深股通</h4>
                            <p><label>余额</label><span>{{getMoney.hk2sz.dayAmtRemain}}</span></p>
                            <p><label>流入</label><span class="blue">{{getMoney.hk2sz.dayNetAmtIn}}</span></p>
                            <p><label>剩余</label><span>{{getMoney.hk2sz.dayAmtBfb}}</span></p>
                        </div>

                    </div>

                    <div class="money_wrapper_slide">
                        <div class="south_down">
                            <label>北上净流入</label>
                            <span>+{{getMoney.bx.total}}</span>
                            <p>{{new Date().getFullYear() + '-' + getMoney.n2sDate}}</p>
                        </div>
                        <div class="sh_share">
                            <h4>港股通(沪)</h4>
                            <p><label>余额</label><span>{{getMoney.sh2hk.dayAmtRemain}}</span></p>
                            <p><label>流入</label><span class="blue">{{getMoney.sh2hk.dayNetAmtIn}}</span></p>
                            <p><label>剩余</label><span>{{getMoney.sh2hk.dayAmtBfb}}</span></p>
                        </div>
                        <div class="sz_share">
                            <h4>港股通(深)</h4>
                            <p><label>余额</label><span>{{getMoney.sz2hk.dayAmtRemain}}</span></p>
                            <p><label>流入</label><span class="blue">{{getMoney.sz2hk.dayNetAmtIn}}</span></p>
                            <p><label>剩余</label><span>{{getMoney.sz2hk.dayAmtBfb}}</span></p>
                        </div>

                    </div>
                </div>
            </div>

            <div class="margin_trading">
                <div class="title">
                    <h2>融资融券</h2>
                    <span>({{getTrading[0].date}})</span>
                </div>
                <div class="table">
                    <table>
                        <thead>
                            <th>类型</th>
                            <th>类别</th>
                            <th>余额</th>
                            <th>买入额</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>融资</td>
                                <td>{{getTrading[0].secname}}</td>
                                <td class="color">{{getTrading[0].rzye}}</td>
                                <td class="color">{{getTrading[0].rzmre}}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>{{getTrading[1].secname}}</td>
                                <td class="color">{{getTrading[1].rzye}}</td>
                                <td class="color">{{getTrading[1].rzmre}}</td>
                            </tr>
                            <tr>
                                <td rowspan="2">融券</td>
                                <td>{{getTrading[0].secname}}</td>
                                <td class="color">{{getTrading[0].rqye}}</td>
                                <td class="color">{{getTrading[0].rqyl}}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>{{getTrading[1].secname}}</td>
                                <td class="color">{{getTrading[1].rqye}}</td>
                                <td class="color">{{getTrading[1].rqyl}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="today_ranking">
                <h2>今日排行榜</h2>
                <div class="ranking_wrapper">
                    <ul>
                        <li :class="{'active':index == tabNum}" v-for="(item,index) in list" :key="index" @click="tabRanking(index,item.sub,item.sort)" >{{item.name}}</li>
                    </ul>
                    <div class="table">
                        <table>
                            <thead>
                                <th>名称代码</th>
                                <th>最新价</th>
                                <th v-for="(item,index) in list" v-if="tabNum == index">{{item.name}}</th>
                            </thead>
                            <tbody>
                                <div class='isLoading' v-if='loading'><i class='el-icon-loading'></i>加载中</div>
                                <template v-else>
                                    <tr v-for="(item,index) in rankingList" :key="index" v-if="tabNum == 0" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                        <td class="name_code">{{item.name}}<br><label>{{item.code}}</label></td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.price}}</td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.zf_bfb}}</td>
                                    </tr>
                                    <tr v-for="(item,index) in rankingList" :key="index" v-if="tabNum == 1" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                        <td class="name_code">{{item.name}}<br><label>{{item.code}}</label></td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.price}}</td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.zf_bfb}}</td>
                                    </tr>
                                    <tr v-for="(item,index) in rankingList" :key="index" v-if="tabNum == 2" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                        <td class="name_code">{{item.name}}<br><label>{{item.code}}</label></td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.price}}</td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.turnover_rate}}</td>
                                    </tr>
                                    <tr v-for="(item,index) in rankingList" :key="index" v-if="tabNum == 3" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                        <td class="name_code">{{item.name}}<br><label>{{item.code}}</label></td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.price}}</td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.swing}}</td>
                                    </tr>
                                    <tr v-for="(item,index) in rankingList" :key="index" v-if="tabNum == 4" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                        <td class="name_code">{{item.name}}<br><label>{{item.code}}</label></td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.price}}</td>
                                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.cc_num}}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="more_ranking" v-if='!loading'><span>查看更多</span><i class="el-icon-arrow-right"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import { getMarginTrading,indexIndustry,getMoneyFlows,upDownStock,getBroaderMarket } from '../../api/api';

export default {

    data () {
        return {
            show:true,
            loading:false,
            getMarket:'',
            getTrading:["",""],
            getMoney:{
                bx:'',
                nx:'',
                hk2sh:'',
                sh2hk:'',
                hk2sz:'',
                sz2hk:'',
            },
            tabNum:0,
            list:[
                {
                    name:"涨幅",
                    sub:"3",
                    sort:"1"
                },
                {
                    name:"跌幅",
                    sub:"3",
                    sort:"0"
                },
                {
                    name:"换手率",
                    sub:"8",
                    sort:"1"
                },
                {
                    name:"振幅",
                    sub:"7",
                    sort:"1"
                },
                {
                    name:"成交额",
                    sub:"6",
                    sort:"1"
                },
            ],
            rankingList:"",
            marketData:"",
        }
    },
    mounted(){

        this.indexIndustry();
        this.getBroaderMarket()
        this.getMoneyFlows();
        this.getMarginTrading();
        this.tabRanking(0,-1)
        var mySwiper = new Swiper('.swiper-container', {

            pagination: {
                el: '.swiper-pagination0',
                clickable:true,
            },

        }) 
    },
    methods: {
        toOptional(){
            if(!this.$store.state.userInfo.token){
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }else{
                this.$router.push('/mine/optional')
            }

        },
        indexIndustry(){
            indexIndustry().then((res) => {

                this.getMarket = res.info
            })

        },
        getBroaderMarket(){
            getBroaderMarket().then((res) => {

                this.marketData = res.info
            })

        },
        getMoneyFlows(){
            getMoneyFlows().then((res) => {

                this.getMoney = res.info

            })

        },
        getMarginTrading(){
            getMarginTrading().then((res) => {

                this.getTrading = res.info

            })

        },
        tabRanking(i,sub,sort){
            this.tabNum = i
            this.loading = true
            var params = 
                {
                    page:1,
                    type:sub,
                    sorting:sort,
                }
            
            upDownStock(params).then((res) => {
                this.loading = false
                this.rankingList = res.info

            })
            
            
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.flex{display: flex;flex-direction: column;margin-bottom:0.5rem;}
.header{height:0.46rem;display: flex;flex-direction: row;padding:0.15rem 0.1rem;justify-content: space-between;background:#168CE3;}
.header .nav_menu{width:80%;display: flex;flex-direction: row;align-items: center;justify-content: center}
.header .nav_menu li{width:25%;color:#ddd;font-size:0.15rem;}
.header .nav_menu li.show{font-size:0.18rem;color:#fff;position:relative}
.header .nav_menu li.show::after{content:"";width:0.05rem;height:0.05rem;border-radius:50%;background:#fff;position: absolute;bottom:-0.08rem;left:50%;transform: translate(-50%,0)}
.header .search i{color:#fff;font-size:0.18rem;}

.content .index_num h2{font-size:0.16rem;font-weight:normal;border-bottom:0.01rem solid #ddd;margin-bottom:0.1rem;text-align: left;padding:0.1rem}

.exponent_wrapper{padding-bottom:0.05rem;}
.exponent_wrapper .ul{width:100%;display:flex;flex-direction: row;justify-content: space-around;}
.exponent_wrapper .ul .li{width:30%;padding:0.05rem 0;border-radius: 0.08rem;background:#15A143;color:#fff;}
.exponent_wrapper .ul .li.red{background:#F0353C;}
.exponent_wrapper .ul .li h3{font-size:0.14rem;font-weight: normal;margin:0 0 0.05rem 0;}
.exponent_wrapper .ul .li span{font-size:0.16rem;padding:0.05rem 0}
.exponent_wrapper .ul .li h4{font-size:0.14rem;font-weight: normal;}
.exponent_wrapper .ul .li p{color:#fff;font-size:0.11rem;}
.exponent_wrapper .ul .li p span{margin-right:0.02rem;font-size:0.11rem;}

.real_data{display: flex;flex-direction: row;justify-content: space-between;padding:0.05rem 0.1rem;border-top:0.01rem solid #ddd;border-bottom:0.01rem solid #ddd;}
.real_data h4{width:0.8rem;font-size:0.12rem;font-weight:normal;color:#168CE3;text-align:left;align-items: center;display: flex;}
.real_data ul{width:100%;display: flex;flex-direction: row;align-items: center;}
.real_data ul li{width:50%;display: flex;flex-direction: row;justify-content: center;align-items:center;font-size:0.12rem;}
.real_data ul li:nth-child(2){border-left:1px solid #ddd;}
.real_data ul li i{font-size:0.24rem;color:#F0353C;}
.real_data ul li span{color:#15A143;}
.real_data ul li span.red{color:#F0353C}
.real_data ul li:nth-child(2) i{color:#15A143}

.money_flow h2{font-size:0.16rem;font-weight:normal;border-bottom:0.01rem solid #ddd;text-align: left;padding:0.1rem}

.money_flow .money_wrapper_slide{display: flex;flex-direction: row;padding:0.1rem;border-bottom:0.01rem solid #ddd;}
.money_wrapper_slide>div{width:33.3%;}
.money_wrapper_slide .south_down{display: flex;flex-direction: column;justify-content: center;align-items: center;}
.money_wrapper_slide .south_down label{font-size:0.13rem;color:#666;}
.money_wrapper_slide .south_down span{font-size:0.15rem;color:#15A143;margin:0.06rem 0;}
.money_wrapper_slide .south_down p{font-size:0.12rem;color:#999;}
.money_wrapper_slide .sh_share{text-align:left;}
.money_wrapper_slide .sh_share h4{font-size:0.14rem;margin-bottom:0.05rem;}
.money_wrapper_slide .sh_share p{font-size:0.13rem;}
.money_wrapper_slide .sh_share p span{margin-left:0.1rem;}
.money_wrapper_slide .sh_share .blue{color:#15A143}

.money_wrapper_slide .sz_share{text-align:left;}
.money_wrapper_slide .sz_share h4{font-size:0.14rem;margin-bottom:0.05rem;}
.money_wrapper_slide .sz_share p{font-size:0.13rem;}
.money_wrapper_slide .sz_share p span{margin-left:0.1rem;}
.money_wrapper_slide .sz_share .blue{color:#15A143}


.margin_trading .title{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;border-bottom:0.01rem solid #ddd;padding:0.1rem}
.margin_trading h2{font-size:0.16rem;font-weight:normal;}
.margin_trading span{font-size:0.13rem;margin-left:0.03rem;}

.margin_trading table{width:100%;margin:0.05rem 0;}
.margin_trading table thead,.margin_trading table tbody tr{height:0.26rem;line-height:0.26rem;display: flex;flex-direction: row;justify-content: space-around}
.margin_trading table th{width:25%;font-size:0.14rem;}
.margin_trading table tr:nth-child(3){border-top:0.01rem solid #ddd}
.margin_trading table tr td{width:25%;font-size:0.13rem;}
.margin_trading table tr td:nth-child(1),.margin_trading table th:nth-child(1){width:13%;}
.margin_trading table tbody{display: flex;flex-direction: column;}
.margin_trading table .color{color:#15A143}
.margin_trading table tr td:nth-child(1){padding-top:0.12rem;}

.today_ranking{display: flex;flex-direction: column}
.today_ranking h2{font-size:0.16rem;font-weight:normal;border-bottom:0.01rem solid #ddd;text-align: left;padding:0.05rem 0.1rem 0.1rem 0.1rem}
.today_ranking .ranking_wrapper{display: flex;flex-direction: column;padding:0 0.1rem;}
.today_ranking .ranking_wrapper ul{display: flex;flex-direction: row;justify-content: space-around;}
.today_ranking .ranking_wrapper ul li{width:16%;font-size:0.14rem;padding:0.06rem 0}
.today_ranking .ranking_wrapper ul li.active{border-bottom:0.02rem solid #168CE3;}
.today_ranking .ranking_wrapper table{width:100%;margin:0.06rem 0}
.ranking_wrapper table thead{padding:0.07rem 0;display: flex;flex-direction: row;justify-content: space-around;}
.ranking_wrapper table th{width:33.3%;font-size:0.13rem;}
.ranking_wrapper table tr{margin:0.05rem 0;height:0.3rem;display: flex;flex-direction: row;align-items: center;}
.ranking_wrapper table tr td{width:33.3%;font-size:0.13rem;}
.ranking_wrapper table tbody{height:4.8rem;display: flex;flex-direction: column;}
.ranking_wrapper table .color{color:#15A143}
.ranking_wrapper table .red{color:#F0353C}

.ranking_wrapper table .name_code{display: flex;font-size:0.13rem;line-height:0.13rem;flex-direction: column;justify-content: center;}
.ranking_wrapper table .name_code label{font-size:0.11rem;color:#666}

.ranking_wrapper .isLoading{font-size:0.12rem;padding:0.08rem 0}
.ranking_wrapper .isLoading i{font-size:0.16rem;margin-right:0.05rem;}

.ranking_wrapper .more_ranking{font-size:0.13rem;padding-bottom:0.1rem;color:#666};


</style>
