<template>
    <div class="flex"> 
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="article_text">智能投顾</div>
            <div></div>
        </div>
        <div class="content">
            <div class="investment_bg">
                <img src="../../../static/images/index4-1.png">
                <div class="text">
                    <h4>AI智能诊股</h4>
                    <p>大数据个股综合诊断，AI智能模型学习，独家权威诊断模型，5个维度精准诊股。你的股票是涨是跌一测便知！！！</p>
                </div>
            </div>
            <div class="diagnose_wrapper">
                <h5>3000多只股票，今日免费诊</h5>
                <div class="diagnose_form">
                    <input type="text" placeholder="输入股票名称或代码" v-model="keywords" @input="searchShare($event)">
                    <input type="submit" value="立即诊断" @click="toDisgnose()">
                    <ul class="diagnose_menu" v-if="diagnoseData">
                        <li v-for="(item,index) in diagnoseData" :key="index" @click="$router.push({path:'/pages/ai-diagnosis',query:{code:item.code,name:item.name}})">
                            <span>{{item.code}}</span>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="hot_diagnose">热门诊股</div>
            <div class="diagnose_content" @click="$router.push({path:'/pages/ai-diagnosis',query:{code:'600519'}})">
                <img src="../../../static/images/screen/screen3.png">
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { getMarketSearch } from '../../api/api';
export default {
    data () {
        return {
            diagnoseData:'',
            keywords:''
        }
    },
    mounted(){

    },
    methods: {
        goBack(){
            this.$router.go(-1);

        },
        searchShare(e){
            this.keywords = e.currentTarget.value
            if(this.keywords){
                this.getMarketSearch()
            }else{
                this.diagnoseData = ''

            }
            

        },
        getMarketSearch(val){
            getMarketSearch({
                code:this.keywords,
                limit:'7',

            }).then((res) => {

                if(res.status == 0){
                    this.diagnoseData = res.info

                }else{
                    this.diagnoseData = ''
                }

            })

        },
        toDisgnose(){
            if(this.keywords.length>2){
                getMarketSearch({
                    code:this.keywords,
                    limit:'1',

                }).then((res) => {

                    if(res.status == 0){

                        if(res.info.length == 1){
                            this.$router.push({path:'/pages/ai-diagnosis',query:{code:res.info[0].code}})
                        }else{
                            mui.toast("请输入正确的股票代码",{duration: 1500})
                        }

                    }else{
                        mui.toast(res.msg,{duration: 1500})
                    }

                })
            }else{
                mui.toast("请输入正确的股票代码",{duration: 1500})
            }
        },

    },
}
</script>


<style scoped>
.flex{display: flex;flex-direction: column;position:absolute;left:0;top:0;right:0;bottom:0}

.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.header .article_text{text-align: center;color:#fff;font-size:0.15rem;}

.content{margin:0;padding:0}
.content .investment_bg{position:relative;}
.content .investment_bg img{width:100%;}
.content .investment_bg .text{width:60%;display: flex;flex-direction: column;font-size:0.13rem;color:#fff;justify-content: flex-start;align-items: flex-start;position:absolute;top:50%;left:0.1rem;transform: translate(0,-60%)}
.content .investment_bg .text h4{font-weight:normal;}
.content .investment_bg .text p{font-size:0.12rem;color:#fff;text-align: left;}

.diagnose_wrapper{width:90%;margin:-0.2rem auto 0;background:#fff;border-radius: 0.1rem;position:absolute;left:50%;transform: translate(-50%,0);}
.diagnose_wrapper h5{font-size:0.14rem;margin-top:0.1rem}
.diagnose_wrapper .diagnose_form{display:flex;flex-direction: row;padding:0.1rem 0.1rem 0.15rem 0.1rem;align-items: center;justify-content: center;position:relative;}
.diagnose_wrapper .diagnose_form input{height:auto;font-size:0.13rem;margin:0;padding:0.07rem;border-radius: 0;border-right:none;}

.diagnose_menu{width:100%;position:absolute;left:0;top:0.5rem;background:#fff;text-align: left;padding:0.1rem 0;font-size:0.13rem;}
.diagnose_menu li{padding:0.07rem 0.15rem;}


.hot_diagnose{text-align:center;font-size:0.15rem;color:#007BFC;margin-top:0.6rem;padding:0.2rem 0;position:relative;z-index:-1}
.hot_diagnose:before{content:'';width:33%;height:0.01rem;background:#007BFC;position:absolute;left:5%;top:50%;transform: translate(0,-45%)}
.hot_diagnose:after{content:'';width:33%;height:0.01rem;background:#007BFC;position:absolute;right:5%;top:50%;transform: translate(0,-45%)}
.diagnose_content img{width:90%}






</style>
