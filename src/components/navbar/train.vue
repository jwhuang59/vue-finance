<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <h2>股票训练</h2>
            <div></div>
        </div>
        <div class="content">
            <div class="account">
                <div class="account_person">
                    <div class="person_info">
                        <img src="../../assets/person0.png">
                        <div class="person_name">
                            <span>用户名</span>
                            <span>当前排名68位</span>
                        </div>
                    </div>
                    <div class="person_operate">
                        <span>充值</span>
                        <span>提现</span>
                        <div class="switch_account"><label>切换账户</label><i class="el-icon-arrow-right"></i></div>
                    </div>
                </div>
                <div class="account_assets">
                    <div class="assets_wrapper">
                        <div>
                            <label>总资产</label>
                            <span>100,000.00</span>
                        </div>
                        <div>
                            <label>总收益率</label>
                            <span>8.60%</span>
                        </div>
                        <div>
                            <label>持仓盈亏</label>
                            <span>1,000.00</span>
                        </div>
                    </div>
                    <div class="marketVal_wrapper">
                        <div>
                            <label>总市值</label>
                            <span>100,000.00</span>
                        </div>
                        <div>
                            <label>可用交易金</label>
                            <span>100,000.00</span>
                        </div>
                        <div>
                            <label>当日盈亏</label>
                            <span>2,000.00</span>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <img src="../../../static/images/train1-1.png">
                            <label>买入</label>
                        </li>
                        <li>
                            <img src="../../../static/images/train1-2.png">
                            <label>卖出</label>
                        </li>
                        <li>
                            <img src="../../../static/images/train1-3.png">
                            <label>持仓</label>
                        </li>
                        <li>
                            <img src="../../../static/images/train1-4.png">
                            <label>订单</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="investing">
                <div class="investing_header">
                    <h3>交易牛人</h3>
                    <span>查看全部</span>
                </div>
                <div class="investing_user">
                    <div class="user_info">
                        <img src="../../assets/person0.png">
                        <div class="user_name">
                            <span>王先生</span>
                            <span>35.81% 周收益率</span>
                        </div>
                    </div>
                    <div class="user_info">
                        <img src="../../assets/person0.png">
                        <div class="user_name">
                            <span>张先生</span>
                            <span>38.62% 周收益率</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="train_menu">
                <div class="train_item">
                    <img src="../../../static/images/train2-1.png">
                    <div class="train_name">
                        <span>更多比赛</span>
                        <span>千万模拟赛进行中</span>
                    </div>
                </div>
                <div class="train_item">
                    <img src="../../../static/images/train2-2.png">
                    <div class="train_name">
                        <span>股票开户</span>
                        <span>踏出实盘交易第一步</span>
                    </div>
                </div>
                <div class="train_item">
                    <img src="../../../static/images/train2-3.png">
                    <div class="train_name">
                        <span>大咖牛人</span>
                        <span>晒单、吐槽、学炒股</span>
                    </div>
                </div>
                <div class="train_item">
                    <img src="../../../static/images/train2-4.png">
                    <div class="train_name">
                        <span>财经课堂</span>
                        <span>新手入门教程</span>
                    </div>
                </div>
                <div class="train_item">
                    <img src="../../../static/images/train2-5.png">
                    <div class="train_name">
                        <span>漫话财经</span>
                        <span>通俗易懂了解资讯</span>
                    </div>
                </div>
                <div class="train_item">
                    <img src="../../../static/images/train2-6.png">
                    <div class="train_name">
                        <span>智能投顾</span>
                        <span>投资理财新技能</span>
                    </div>
                </div>
            </div>

            <div class="trading_rules">股票交易规则详解</div>
            <div class="feedback">帮助与意见反馈</div>
        </div>

    </div>
</template>

<script>
export default {

    data () {
        return {
            msg: '训练'
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
            
        },
    },
}
</script>

<style scoped>

.flex{display: flex;flex-direction: column;}
.flex .header{width:100%;height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.flex .header h2{line-height:0.46rem;font-size:0.18rem;font-weight:normal;color:#fff;}
.flex .content{padding-top:0.1rem;display: flex;flex-direction: column;}
.account{padding:0 0.1rem}
.account .account_person{display: flex;flex-direction: row;justify-content: space-between;border-bottom:0.01rem solid #ddd;padding-bottom:0.1rem;}

.account_person .person_info{width:50%;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;}
.account_person .person_info img{width:30%;margin-right:0.03rem;}
.account_person .person_info .person_name{display: flex;flex-direction: column;justify-content: space-between;align-items: flex-start;font-size:0.14rem;}
.account_person .person_info .person_name span:nth-child(2){font-size:0.12rem;color:#666}
.account_person .person_operate{display: flex;flex-direction: row;justify-content: flex-end;align-items: center;}
.account_person .person_operate span{font-size:0.14rem;margin-right:0.08rem;}
.account_person .person_operate .switch_account{padding-left:0.1rem;}
.account_person .person_operate .switch_account label{font-size:0.13rem;color:#666;}
.account_person .person_operate .switch_account i{font-size:0.12rem;color:#666}

.account_assets{display: flex;flex-direction: column;padding-bottom:0.05rem;}
.account_assets>div{width:90%;display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin:0.1rem auto 0;}
.account_assets>div div{display: flex;flex-direction: column;justify-content: space-around;align-items: center;font-size:0.14rem;}
.account_assets>div div label{color:#666;margin-bottom:0.03rem;}
.account_assets ul{width:100%;display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin-top:0.15rem;}
.account_assets ul li{display: flex;flex-direction: column;justify-content: center;align-items: center;}
.account_assets ul li img{width:40%;}
.account_assets ul li label{font-size:0.14rem;margin-top:0.03rem;}
.investing{border-top:0.05rem solid #efeef3;border-bottom:0.05rem solid #efeef3;padding:0.05rem 0.1rem;}
.investing .investing_header{display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
.investing .investing_header h3{font-size:0.16rem;}
.investing .investing_header span{font-size:0.12rem;color:#666;}
.investing .investing_user{display: flex;flex-direction: row;margin:0.1rem 0}
.investing .investing_user .user_info{width:50%;display: flex;flex-direction: row;}
.investing .investing_user .user_info img{width:30%;height:100%;margin-right:0.03rem;}
.investing .investing_user .user_info .user_name{display: flex;flex-direction: column;justify-content: center;align-items: flex-start;font-size:0.14rem;}
.investing .investing_user .user_info .user_name span:nth-child(2){font-size:0.12rem;color:#666}
.train_menu{display: flex;flex-flow: row wrap;padding:0.1rem}
.train_menu .train_item{width:50%;display: flex;flex-direction: row;align-items:center;margin-bottom:0.1rem;}
.train_menu .train_item img{width:30%;margin-right:0.03rem;}
.train_menu .train_item .train_name{display: flex;flex-direction: column;justify-content: space-between;align-items: flex-start;font-size:0.14rem;}
.train_menu .train_item span:nth-child(2){font-size:0.11rem;color:#666}

.trading_rules{height:0.5rem;line-height:0.4rem;border-top:0.05rem solid #efeef3;border-bottom:0.05rem solid #efeef3;text-align:left;padding-left:0.15rem;font-size:0.15rem;}
.feedback{height:0.4rem;line-height:0.4rem;text-align:left;padding-left:0.15rem;font-size:0.15rem;}



</style>
