<template>
    <div class="flex"> 
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="article_text">AI诊股</div>
            <div class="back" @click="goIndex()"><i class="el-icon-s-home"></i></div>
        </div>
        <div class="content">
            <div class="zhpj_wrapper">
                <h3>综合评价</h3>
                <div class="zhpj_info">
                    <div class="code_text">
                        <h2>{{diagnose_zhpj.cbjg.Name}}</h2>
                        <span>{{diagnose_zhpj.cbjg.Code}}</span>
                    </div>
                    <div class="zhpj_rote">
                        <div class="circle">
                            
                            <el-progress type="circle" :percentage="diagnose_zhpj.TotalScore" :show-text="false" color="#E34856" :width="120" :stroke-width="10"></el-progress>
                            <div class="circle_text">
                                <label>评分</label>
                                <span>{{diagnose_zhpj.TotalScore}}</span>
                            </div>
                        </div>
                        <div class="zhpj_text">
                            <h4>打败了{{diagnose_zhpj.BeatPercent}}%的股票</h4>
                            <p>{{diagnose_zhpj.Comment}}</p>
                        </div>
                    </div>
                </div>
                <h3>涨跌预测</h3>
                <div class="down_up">
                    <div class="one_day">
                        <label>次日</label>
                        <div class="down_up_text">
                            <p>上涨概率 <span>{{Number(diagnose_zhpj.RiseAndFallPredict.NextDayRoseProbability).toFixed(2)}}%</span></p>
                            <p>平均涨跌 <span>{{Number(diagnose_zhpj.RiseAndFallPredict.NextDayChgAvg).toFixed(2)}}%</span></p>
                            <p>样本数量 {{Number(diagnose_zhpj.RiseAndFallPredict.NextDaySampleNum)}}个</p>
                        </div>
                    </div>
                    <div class="five_day">
                        <label>五日</label>
                        <div class="down_up_text">
                            <p>上涨概率 <span>{{Number(diagnose_zhpj.RiseAndFallPredict.NextFiveDayRoseProbability).toFixed(2)}}%</span></p>
                            <p>平均涨跌 <span>{{Number(diagnose_zhpj.RiseAndFallPredict.NextFiveDayChgAvg).toFixed(2)}}%</span></p>
                            <p>样本数量 {{Number(diagnose_zhpj.RiseAndFallPredict.NextFiveDaySampleNum)}}个</p>
                        </div>
                    </div>
                </div>
                <h3>主力控盘</h3>
                <div class="zlkp_wrapper">
                    <i class="el-icon-message-solid"><label>点评：</label><p>机构参与度为{{Number(diagnose_zhpj.cbjg.JGCYD*100).toFixed(2)}}%,属于完全控盘,最近1日主力成本{{Number(diagnose_zhpj.cbjg.ZLCB).toFixed(2)}}元，最近20日主力成本{{Number(diagnose_zhpj.cbjg.ZLCB20R).toFixed(2)}}元</p></i>
                    <div class="zlkp_chart">
                        <div class="chart_wrapper">
                            <img src="../../../static/images/diagnosis/wqkp.png" v-if="diagnose_zhpj.cbjg.JGCYDType == '完全控盘'">
                            <img src="../../../static/images/diagnosis/bkp.png" v-if="diagnose_zhpj.cbjg.JGCYDType == '不控盘'">
                            <img src="../../../static/images/diagnosis/qdkp.png" v-if="diagnose_zhpj.cbjg.JGCYDType == '轻度控盘'">
                            <img src="../../../static/images/diagnosis/zdkp.png" v-if="diagnose_zhpj.cbjg.JGCYDType == '中度控盘'">
                            <p class="tips">注解：机构参与度为{{Number(diagnose_zhpj.cbjg.JGCYD*100).toFixed(2)}}%，属于完全控盘</p>
                        </div>
                        <div class="chart_wrapper">
                            <div id="chart1" style="width:100%;height:2rem"></div>
                            <p class="tips">注解：曲线为股票成本价变化图</p>
                            <div id="chart2" style="width:100%;height:1.5rem"></div>
                            <p class="tips">注解：曲线为机构参与程度变化图</p>
                        </div>
                    </div>
                </div>
                <h3>趋势研判</h3>
                <div class="qsyp_wrapper">
                    <i class="el-icon-message-solid"><label>点评：</label><p>{{diagnose_zhpj.dianping}}</p></i>
                    <div class="qsln_info">
                        <div class="qsln_other">
                            <i class="el-icon-bottom"></i>
                            <span>支撑位：{{diagnose_zhpj.Energy.SupportPosition}}元</span>
                        </div>
                        <div class="qsln_other">
                            <i class="el-icon-top"></i>
                            <span>压力位：{{diagnose_zhpj.Energy.PressurePosition}}元</span>
                        </div>
                        
                    </div>
                </div>
                <h3>资金动向</h3>
                <div class="zjdx_wrapper">
                    <i class="el-icon-message-solid"><label>点评：</label><p>{{diagnose_zhpj.Summary}}</p></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import echarts from 'echarts'
import { getComicClass,stockAssessment } from '../../api/api';
export default {
    data () {
        return {
            code:this.$route.query.code,
            diagnose_zhpj:{
                RiseAndFallPredict:'',
                cbjg:'',
                jgcyd:'',
                Energy:'',
            },

        }
    },
    mounted(){
        this.diagnoseResult();
        this.$nextTick(this.drawSline())
    },
    methods: {
        goBack(){
            this.$router.go(-1);

        },
        goIndex(){
            this.$router.push('/')
            
        },
        diagnoseResult(){

            stockAssessment({
                code:this.code
            }).then((res) => {
                if(!res.HasError){
                    var res = res.info
                    let diagnose_zhpj = {}
                    diagnose_zhpj.TotalScore = parseInt(res.ApiResults.zhpj.ComprehensiveReview[0].TotalScore)
                    diagnose_zhpj.Comment = res.ApiResults.zhpj.ComprehensiveReview[0].Comment
                    diagnose_zhpj.BeatPercent = Number(res.ApiResults.zhpj.ComprehensiveScoreRank2[0][0].BeatPercent).toFixed(2)
                    diagnose_zhpj.RiseAndFallPredict = res.ApiResults.zhpj.RiseAndFallPredict[0]
                    diagnose_zhpj.cbjg = res.ApiResults.zlkp.cbjg[0]
                    diagnose_zhpj.jgcyd = res.ApiResults.zlkp.jgcyd
                    diagnose_zhpj.cbarr = eval("[" + Number(res.ApiResults.zlkp.cbjg[0].ZLCB).toFixed(2) + "," + Number(res.ApiResults.zlkp.cbjg[0].ZLCB20R).toFixed(2)  + "," + Number(res.ApiResults.zlkp.cbjg[0].ZLCB60R).toFixed(2)  + "]")
                    diagnose_zhpj.dianping = res.ApiResults.qsyp.dianping[0].Comment
                    diagnose_zhpj.Energy = res.ApiResults.qsyp.Energy[0][0]
                    diagnose_zhpj.Summary = res.ApiResults.zjdx.Summary[0].Comment

                    this.diagnose_zhpj = diagnose_zhpj

                    var option1 = {
                        title:{
                            text:'成本价',
                            textStyle:{
                                color:"#444",
                                fontSize:"14",
                                fontWeight:"normal"
                            }
                        },
                        color: ['#3398DB'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {           
                                type : 'shadow'        
                            }
                        },
                        grid: {
                            top:'30',
                            left: '0',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : ['最近1日', '最近20日', '最近60日',],
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                scale: true,
                                type : 'value',
                                splitNumber:3,
                            }
                        ],
                        series : [
                            {
                                name:'成本价',
                                type:'bar',
                                barWidth: '60%',
                                data:diagnose_zhpj.cbarr
                            }
                        ]
                    };
                    var chart1 = echarts.init(document.getElementById('chart1'));
                    chart1.setOption(option1);

                    var option2 = {
                        title:{
                            text:'(百分比%)',
                            textStyle:{
                                color:"#444",
                                fontSize:"14",
                                fontWeight:"normal"
                            }
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'line',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        grid: {
                            top:'30',
                            left: '0',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : res.ApiResults.zlkp.jgcyd.XData
                            }
                        ],
                        yAxis : [
                            {
                                scale: true,
                                type : 'value',
                                splitNumber:3,
                            }
                        ],
                        series : [
                            {
                                name:'机构参与度',
                                type:'line',
                                data:res.ApiResults.zlkp.jgcyd.Ydata.JGCYD
                            },
                        ]
                    };
                    
                    var chart2 = echarts.init(document.getElementById('chart2'));
                    chart2.setOption(option2);

                }

            })

        },
    },
}
</script>


<style scoped>
.flex{display: flex;flex-direction: column;}

.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.header .article_text{text-align: center;color:#fff;font-size:0.15rem;}

.content{margin:0;padding:0}
.zhpj_wrapper{display: flex;flex-direction: column;padding:0.1rem;}
.zhpj_wrapper h3{text-align: left;font-size:0.15rem;}
.zhpj_wrapper .zhpj_info{background:linear-gradient(107deg,rgba(22,140,227,1) 0%,rgba(118,188,244,1) 100%);border-radius:10px;padding:0.1rem;margin:0.1rem 0;}
.zhpj_wrapper .zhpj_rote{display: flex;flex-direction: row;align-items: center;justify-content: space-around;}
.zhpj_wrapper .circle{position: relative;}
.zhpj_wrapper .code_text{display: flex;flex-direction: row;align-items: flex-end;justify-content: flex-start;margin-bottom:0.1rem}
.zhpj_wrapper .code_text h2{font-size:0.14rem;font-weight:normal;color:#fff;}
.zhpj_wrapper .code_text span{font-size:0.13rem;color:#fff;margin-left:0.03rem;}
.zhpj_wrapper .circle_text{display: flex;flex-direction: column;justify-content: center;align-content: center;position:absolute;top:50%;left:50%;transform: translate(-50%,-50%)}
.zhpj_wrapper .circle_text label{font-size:0.14rem;color:#fff}
.zhpj_wrapper .circle_text span{font-size:0.24rem;font-weight:bold;color:#E34856}
.zhpj_wrapper .zhpj_text{margin-left:0.1rem;text-align: left;color:#fff}
.zhpj_text h4{font-size:0.14rem;font-weight:normal;margin-bottom:0.05rem;}
.zhpj_text p{font-size:0.12rem;color:#fff;}

.down_up>div{display: flex;flex-direction: row;justify-content: center;align-items: flex-start;margin-top:0.1rem}
.down_up>div label{width:20%;}
.down_up>div .down_up_text{width:80%;display: flex;flex-flow: row wrap;}
.down_up>div .down_up_text p{margin:0 0.1rem 0.05rem 0;color:#333;}
.down_up>div .down_up_text p:nth-child(1) span{color:red;}
.down_up>div .down_up_text p:nth-child(2) span{color:#090;}

.zlkp_wrapper i{font-size:0.15rem;color:#ea5504;text-align:left;margin:0.1rem 0;}
.zlkp_wrapper label{font-size:0.14rem;color:#ea5504}
.zlkp_wrapper i p{line-height:0.18rem;font-size:0.13rem;color:#333;margin-top:0.1rem;}

.chart_wrapper img{width:100%;margin-top:0.1rem;}
.zlkp_wrapper .tips{margin:0.1rem 0}

.qsyp_wrapper i{font-size:0.15rem;color:#ea5504;text-align:left;margin-top:0.1rem;}
.qsyp_wrapper label{font-size:0.14rem;color:#ea5504}
.qsyp_wrapper i p{line-height:0.18rem;font-size:0.13rem;color:#333;margin-top:0.1rem;}

.qsln_info{display:flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-bottom:0.1rem}

.qsln_info .qsln_other{margin-right:0.05rem}
.qsln_info .qsln_other i{font-size:0.15rem;font-weight:bold;}
.qsln_info .qsln_other:nth-child(2) i{color:rgba(118,188,244,1)}
.qsln_info .qsln_other span{font-size:0.12rem;}

.zjdx_wrapper i{font-size:0.15rem;color:#ea5504;text-align:left;margin:0.1rem 0;}
.zjdx_wrapper label{font-size:0.14rem;color:#ea5504}
.zjdx_wrapper i p{line-height:0.18rem;font-size:0.13rem;color:#333;margin-top:0.1rem;}


</style>
