<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="code_text">
                <h3>{{klineText.name}}</h3>
                <span>{{klineText.code}}</span>
            </div>
            <div class="search" @click="$router.push('../search')"><i class="el-icon-search"></i></div>
        </div>
        <div class="content">
            <div class="kline_text">
                <div class="kline_price">
                    <h2 :class="{'low':klineText.zf_bfb<0}">{{klineText.price}}</h2>
                    <p :class="{'low':klineText.zf_ds<0}"><span>{{klineText.zf_bfb}}%</span>&nbsp<span>{{klineText.zf_ds}}</span></p>
                </div>
                <div class="kline_details">
                    <div class="details_items">
                        <div>
                            <label>今开</label>
                            <span class="up" :class="{'low':klineText.price_o<klineText.price}">{{klineText.price_o}}</span>
                        </div>
                        <div>
                            <label>换手</label>
                            <span>{{klineText.turnover_rate}}</span>
                        </div>
                    </div>
                    <div class="details_items">
                        <div>
                            <label>最高</label>
                            <span class="up" :class="{'low':klineText.price_h<klineText.price}">{{klineText.price_h}}</span>
                        </div>
                        <div>
                            <label>总手</label>
                            <span>{{klineText.cj_num}}</span>
                        </div>
                    </div>
                    <div class="details_items">
                        <div>
                            <label>最低</label>
                            <span class="up" :class="{'low':klineText.price_l<klineText.price}">{{klineText.price_l}}</span>
                        </div>
                        <div>
                            <label>金额</label>
                            <span>{{klineText.cj_money}}</span>
                        </div>
                    </div>
                </div>

            </div>
            <ul class="kline_tab">
               <li v-for="(item,index) in klineTab" :key="index"><span :class="{'active':index == tabNum}"  @click="kLineChart(index,'',item.type)">{{item.name}}</span></li> 

            </ul>
            <div class="chart_wrapper">
                <div id="kline_chart" style="width:100%;height:1.8rem"></div>
                <div id="strip_chart" style="width:100%;height:0.8rem"></div>
            </div>

            <div class="diagnostic_stocks" @click="$router.push('/pages/intelligent-investment')">
                <label>AI诊股</label>
                <p>免费名额有限，已有38641人申请</p>
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="guess_wrapper">
                <div class="guess_share">
                    <div class="guess_up">
                        <h3>涨</h3>
                        <span>赔率 0.7</span>
                    </div>
                    <div class="guess_label">
                        竞猜
                    </div>
                    <div class="guess_low">
                        <h3>涨</h3>
                        <span>赔率 0.3</span>
                    </div>
                </div>
                <div class="guess_amount">
                    <div class="amount_total">
                        
                        <p class="amount_up">70</p>
                        <label>vs</label>
                        <p class="amount_low">30</p>
                    </div>
                </div>
            </div>

            <div class="share_news">
                <ul :class="{'is_top':isTop}">
                    <li :class="{'on':index == newsNum}" v-for="(item,index) in newsList" :key="index" @click="getNews(index,item.page,item.type,true)"><span v-if="isShare && index == 0">智能点评</span><span v-else>{{item.name}}</span></li>
                        
                </ul>
                <div class="news_wrapper" :class="{'is_margin':isTop}">
                    <div class="news_item news_lis_comment" v-if="newsNum == 0">
                        <div class="comment_share" v-if="isShare">
                            <h4>最新点评</h4>
                            <div class="comment_text">
                                <p>{{newsList[0].comment.institutional_participation}}</p>
                                <p>{{newsList[0].comment.money_flows}}</p>
                                <p>{{newsList[0].comment.main_cost}}</p>
                            </div>
                        </div>
                        <div class="comment_index" v-else>
                            <div class="table">
                                <table>
                                    <thead>
                                        <th>名称代码</th>
                                        <th>最新价</th>
                                        <th>涨幅</th>
                                        <th>涨幅价</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in newsList[0].comment" :key="index" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                                            <td class="name_code">{{item.name}}<br><label>{{item.code}}</label></td>
                                            <td class="color" :class="{'red':item.zf_ds >= 0}">{{item.price}}</td>
                                            <td class="color" :class="{'red':item.zf_ds >= 0}">{{item.zf_bfb}}%</td>
                                            <td class="color" :class="{'red':item.zf_ds >= 0}">{{item.zf_ds}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                                <div class="noNews" v-if="newsList[0].noNews">暂无更多数据</div>
                            </div>

                        </div>
                        
                    </div>
                    <div class="news_item news_content" v-if="newsNum == 1">
                        <h4>最新咨询</h4>
                        <div class="news_lis_information" v-for="(item,index) in newsList[1].information" :key="index" @click="$router.push({path:'/article',query: {id:item.id,type:'1'}})">
                            <h4>{{item.title}}</h4>
                            <span>{{item.create_time.split(" ")[0]}}</span>
                        </div>
                        <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                        <div class="noNews" v-if="newsList[1].noNews">暂无更多数据</div>
                    </div>
                    <div class="news_item" v-if="newsNum == 2">
                        <h4>最新公告</h4>
                        <div class="news_lis_notice" v-for="(item,index) in newsList[2].notice" :key="index" @click="toNotice(item.url)" v-if="isShare">
                            <h4>{{item.title}}</h4>
                            <span>{{item.create_time.split(" ")[0]}}</span>
                        </div>
                        <div class="news_lis_notice" v-for="(item,index) in newsList[2].notice" :key="index" @click="$router.push({path:'/article',query: {id:item.id,type:'1'}})" v-else>
                            <h4>{{item.title}}</h4>
                            <span>{{item.create_time.split(" ")[0]}}</span>
                        </div>
                        <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                        <div class="noNews" v-if="newsList[2].noNews">暂无更多数据</div>
                    </div>
                    <div class="news_item news_content" v-if="newsNum == 3">
                        <h4>最新研报</h4>
                        <div class="news_lis_report" v-for="(item,index) in newsList[3].report" :key="index" @click="toReport(item.encodeUrl)">
                            <h4>{{item.title}}</h4>
                            <div class="report_other">
                                <div class="report_bond">
                                    <label>{{item.orgSName}}</label>
                                    <span>{{item.emRatingName}}</span>
                                </div>
                                <div class="report_time">{{item.publishDate}}</div>
                            </div>
                            
                        </div>
                        <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                        <div class="noNews" v-if="newsList[3].noNews">暂无更多数据</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="footer_kline">
            <div class="menu">
                <ul class="menu_left">
                    <li>
                        <i><svg t="1571909602043" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6679" width="20" height="20"><path d="M699.392 598.528c-36.352 0-66.048 19.456-79.872 49.664L443.904 573.44c10.24-15.872 15.872-35.328 15.872-56.32 0-8.704-1.024-17.408-3.072-25.6l112.128-87.04c14.848 11.264 33.792 17.92 54.784 17.92 50.688 0 88.576-37.888 88.576-88.064s-37.888-88.064-88.576-88.064-88.064 37.888-88.064 88.064c0 12.8 2.56 24.576 6.656 34.816l-103.424 79.36c-20.48-30.72-54.272-52.224-92.672-52.224-62.976 0-113.664 50.688-113.664 113.664s50.688 113.664 113.664 113.664c23.552 0 45.568-6.144 63.488-17.408l201.728 86.016c2.56 47.616 39.424 82.944 88.064 82.944 50.688 0 88.064-37.888 88.064-88.064s-37.888-88.576-88.064-88.576z m-75.776-315.392c25.088 0 50.688 18.944 50.688 50.688s-18.944 50.688-50.688 50.688-50.688-25.088-50.688-50.688 25.6-50.688 50.688-50.688zM346.112 585.728c-37.888 0-69.632-31.744-69.632-69.632s31.744-69.632 69.632-69.632 69.632 31.744 69.632 69.632c-0.512 37.888-31.744 69.632-69.632 69.632z m353.28 151.552c-31.744 0-50.688-18.944-50.688-50.688s25.088-50.688 50.688-50.688 50.688 18.944 50.688 50.688c-0.512 31.744-19.456 50.688-50.688 50.688z" p-id="6680" fill="#515151"></path><path d="M509.952 970.752c-61.952 0-122.368-12.288-179.2-36.352-54.784-23.04-103.936-56.32-146.432-98.816s-75.776-91.648-98.816-146.432c-24.064-56.832-36.352-117.248-36.352-179.2s12.288-122.368 36.352-179.2c23.04-54.784 56.32-103.936 98.816-146.432s91.648-75.776 146.432-98.816C387.584 61.44 448 49.152 509.952 49.152s122.368 12.288 179.2 36.352c54.784 23.04 103.936 56.32 146.432 98.816s75.776 91.648 98.816 146.432c24.064 56.832 36.352 117.248 36.352 179.2s-12.288 122.368-36.352 179.2c-23.04 54.784-56.32 103.936-98.816 146.432S743.936 911.36 689.152 934.4c-56.832 24.064-117.248 36.352-179.2 36.352z m0-875.52c-228.864 0-414.72 185.856-414.72 414.72s185.856 414.72 414.72 414.72 414.72-185.856 414.72-414.72-185.856-414.72-414.72-414.72z" p-id="6681" fill="#515151"></path></svg></i>
                        <span>分享</span>                    
                    </li>
                    <li>
                        <i><svg t="1571909552789" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5695" width="18" height="18"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 960C262.144 960 64 761.344 64 512S262.144 64 512 64s448 198.656 448 448-198.144 448-448 448z" p-id="5696" fill="#707070"></path><path d="M454.656 774.144c0 31.744 25.6 57.856 57.344 57.856s57.856-25.6 57.856-57.344-25.6-57.344-57.344-57.344c-32.256-0.512-58.368 25.088-57.856 56.832zM512 192c-96.256 0-173.056 64-173.056 159.744V371.2c0 25.6 19.456 45.056 51.2 45.056h12.8C422.4 422.4 448 396.8 448 371.2v-18.944s0-70.656 64-70.656c38.4 0 64 25.6 64 64 0 19.456-12.8 38.4-25.6 51.2l-57.856 89.6C473.088 512 460.8 531.456 460.8 569.344v31.744c0 31.744 25.6 51.2 51.2 51.2 31.744 0 51.2-25.6 51.2-51.2v-25.6c0-12.8 6.656-31.744 12.8-38.4l57.344-76.8c25.6-31.744 38.4-57.344 38.4-102.4C685.056 249.856 601.6 192 512 192z" p-id="5697" fill="#707070"></path></svg></i>
                        <span>问股</span>
                    </li>
                    <li @click="addOptional()" v-if="shareStatus == 0">
                        <i class="optional"><svg t="1573441496483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4622" width="20" height="20"><path d="M510.12507762 967.58469632c-250.93545643 0-454.35920043-203.46473813-454.35920043-454.43255751S259.18962119 58.73468416 510.12507762 58.73468416c250.93761365 0 454.36135765 203.44963527 454.36135765 454.41745465S761.06269127 967.58469632 510.12507762 967.58469632zM510.12507762 115.53470919c-219.57095083 0-397.56349099 178.01843029-397.56349099 397.61742962S290.55412565 910.77172679 510.12507762 910.77172679s397.56349099-178.02058752 397.56349099-397.61958798S729.69602845 115.53470919 510.12507762 115.53470919zM680.51004643 541.55862357L538.52508957 541.55862357l0 142.00653369c0 15.67685859-12.71452331 28.39569749-28.39785472 28.39569749-15.68333141 0-28.39569749-12.7188389-28.3956975-28.39569749l0-142.00653369-141.98927246 0c-15.68333141 0-28.39785472-12.71668053-28.39785472-28.40648476 0-15.67901582 12.71668053-28.39569749 28.39785472-28.3956975l141.98927246 0 0-142.0130065c0-15.67685859 12.71452331-28.38922467 28.3956975-28.38922468 15.68548864 0 28.39785472 12.71020771 28.39785472 28.38922468l0 142.0130065 141.984958 0c15.68548864 0 28.39785472 12.71668053 28.39785472 28.3956975C708.90790115 528.84194304 696.19553507 541.55862357 680.51004643 541.55862357z" p-id="4623" fill="#515151"></path></svg></i>
                        <span>自选</span>
                    </li>
                    <li @click="removeOptional()" v-else>
                        <i class="optional"><svg t="1573441375514" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3577" width="20" height="20"><path d="M270.828 481.708c-16.894 0-30.292 13.398-30.292 30.292v1.747c0 16.311 13.398 30.292 30.292 30.292h482.345c16.311 0 30.292-13.398 30.292-30.292v-1.747c0-16.311-13.981-30.292-30.292-30.292z" p-id="3578" fill="#d81e06"></path><path d="M512 59.948c-249.91 0-452.052 202.142-452.052 452.052 0 249.328 202.142 452.052 452.052 452.052 249.328 0 452.052-202.142 452.052-452.052 0-249.91-202.724-452.052-452.052-452.052zM512 903.469c-216.123 0-391.469-175.345-391.469-391.469s175.345-391.469 391.469-391.469 391.469 175.345 391.469 391.469-175.345 391.469-391.469 391.469z" p-id="3579" fill="#d81e06"></path></svg></i>
                        <span>自选</span>
                    </li>
                </ul>
                <ul class="menu_right">
                    <li class="sell_out">
                        <span>看涨</span>
                    </li>
                    <li class="sell_in">
                        <span>看跌</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import mui from '../../../static/js/mui.min.js'
import { timeNode } from '../../../static/js/timeNode'
import echarts from 'echarts'
import { kLineChart,getMarkrtInfo,insertOptional,removeOptional } from '../../api/api';

export default {
    inject: ['reload'],
    data () {
        return {
            isShare:'',
            shareKey:'',
            klineText: "",
            klineData: "",
            klineTab:[
                {
                    name:'分时',
                    type:'1'
                },
                {
                    name:'日K',
                    type:'k'
                },
                {
                    name:'周K',
                    type:'wk'
                },
                {
                    name:'月K',
                    type:'mk'
                },
            ],
            tabNum:0,
            option:'',
            klineChart:'',
            getType:'',//分时线刷新
            getKline:'',
            newsList:[
                {
                    comment:"",
                    name:"成份股",
                    type:1,
                    page:1,
                    noNews:false,
                },
                {
                    information:"",
                    name:"资讯",
                    type:2,
                    page:1,
                    noNews:false,
                },
                {
                    notice:"",
                    name:"公告",
                    type:3,
                    page:1,
                    noNews:false,
                },
                {
                    report:"",
                    name:"研报",
                    type:4,
                    page:1,
                    noNews:false,
                },
            ],
            newsNum:0,
            isLoad:false,
            isTop:false,
            shareStatus:'',
        }
    },
    // created() {
    //     if(this.$route.query) {
    //         this.id = this.$route.query.id;
    //         this.init();
    //     }
	// },
    mounted() {
        if(this.$route.query.key == 'stock'){
            this.isShare = true
        }
        this.kLineChart(0,"","1")
        this.getNews(0,1,1)
        this.getNews(0,1,2)
        this.getNews(0,1,3)
        this.getNews(0,1,4)
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods: {
        kLineChart(i,code,type){
            this.tabNum = i
            this.getType = type
            var that = this
            var params = {
                code:this.$route.query.code,
                type:type,
                token:this.$store.state.userInfo.token
            }
            kLineChart(params).then((res)=>{
                this.shareStatus = res.info.data2.status
                this.klineData = res.info.data
                this.klineText = res.info.data2
                this.shareKey = res.info.data2.share_key
                var klineData = this.klineData
                if(type != 1){
                    var klineStr = {
                        k_data:[],//日K
                        date:[],//时间
                        price_o:[],//开盘价
                        price_c:[],//收盘价
                        price_l:[],//最低价
                        price_h:[],//最高价
                        volume:[],//成交量
                        volume_price:[],//成交额
                        zf_bfb:[],//振幅
                    }

                    for(var i in klineData){
                        var k = "[" + klineData[i].price_o + "," + klineData[i].price_c + "," + klineData[i].price_l + "," + klineData[i].price_h + "]"
                        klineStr.k_data.push(eval(k))

                        klineStr.date.push(klineData[i].time)
                        klineStr.price_o.push(klineData[i].price_o)
                        klineStr.price_c.push(klineData[i].price_c)
                        klineStr.price_l.push(klineData[i].price_l)
                        klineStr.price_h.push(klineData[i].price_h)

                        klineStr.volume.push(klineData[i].volume)
                        klineStr.volume_price.push(klineData[i].volume_price)
                        klineStr.zf_bfb.push(klineData[i].zf_bfb + "%")

                    }
                    this.$nextTick(this.drawKLine(klineStr))
                    this.$nextTick(this.drawSline(klineStr,klineStr.date))
                }else{
                    var klineStr = {
                        date:[],//时间
                        price:[],//实时价格
                        volume:[],//成交量
                        average:[],//均价
                    }

                    for(var i in klineData){
                        klineStr.date.push(klineData[i].time.split(" ")[1])
                        klineStr.price.push(klineData[i].price)
                        klineStr.volume.push(klineData[i].volume)
                        klineStr.average.push(klineData[i].average)


                    }
                    this.$nextTick(this.drawBline(klineStr))
                    this.$nextTick(this.drawSline(klineStr,timeNode))
                }

            })

        },
        // K线图
        drawKLine(str){
            
            $("#kline_chart").removeAttr("_echarts_instance_").empty();
            var klineChart = this.$echarts.init(document.getElementById('kline_chart'))

            var that = this
            function calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = str.k_data.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += str.k_data[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
            }


            var kOption = {
                
                tooltip: {
                    trigger: 'axis',
                    
                    formatter: function(params, ticket, callback) {
                        var result = "";
                        //console.log(params[0])
                        return result;
                    },
                    axisPointer: {
                        animation: true,
                        type: 'cross',
                        lineStyle: {
                            width: 0.5,
                        }
                    }
                },
                grid: {
                    top:'10',
                    left: '15',
                    right: '15',
                    bottom: '30'
                },
                xAxis: {
                    type: 'category',
                    data: str.date,
                    scale: true,
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            width:0.3,
                        },
                    },
                    axisLine: {
                        lineStyle:{
                            width:0.2,
                        },
                    },
                    splitNumber: 30,
                    axisLabel: { interval: 18 },
                    min: 'dataMin',
                    max: 'dataMax',
                    
                },
                yAxis: {
                    type:"value",
                    scale: true,
                    splitArea: {
                        show: false
                    },
                    splitLine: {
                        lineStyle:{
                            width:0.3,
                        },
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitNumber:5,
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100
                    },
                    {
                        show: false,
                        type: 'slider',
                        start: 50,
                        end: 100
                    },
                    
                ],
                animation: false,
                series: [
                    {
                        name: '日k',
                        type: 'candlestick',
                        data: str.k_data,
                        itemStyle: {
                            normal: {
                                color: "#fff",
                                color0: "#090",
                                borderColor: "#f00",
                                borderColor0: "#090"
                            }
                        },
                        
                    },
                    
                    {
                        name: '开盘',
                        type: 'line',
                        data: str.price_c,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {opacity: 0}
                        }
                    },
                    {
                        name: '收盘',
                        type: 'line',
                        data: str.price_c,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {opacity: 0}
                        }
                    },
                    {
                        name: '最高',
                        type: 'line',
                        data: str.price_h,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {opacity: 0}
                        }
                    },
                    {
                        name: '最低',
                        type: 'line',
                        data: str.price_l,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {opacity: 0}
                        }
                    },{
                        name: 'MA5',
                        type: 'line',
                        data: calculateMA(5),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: calculateMA(10),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        data: calculateMA(20),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    },
                    {
                        name: 'MA30',
                        type: 'line',
                        data: calculateMA(30),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    },

                ]
            };
            klineChart.setOption(kOption);
        
        },
        //折线图
        drawBline(str){
            $("#kline_chart").removeAttr("_echarts_instance_").empty();
            var klineChart = this.$echarts.init(document.getElementById('kline_chart'))

            var bOption = {

                tooltip: {
                    trigger: 'axis',
                    formatter: function(params) {

                        var result = "";
                        return result;
                    },
                    axisPointer: {
                        animation: true,
                        type: 'cross',
                        lineStyle: {
                            width: 0.5,
                        }
                    }
                },
                grid: {
                    top:'10',
                    left: '15',
                    right: '15',
                    bottom: '10',
                    containLabel: true
                },

                xAxis: {
                    type: 'category',
                    scale: false,
                    boundaryGap: false,
                    axisLine: {onZero: false},
                    splitNumber: 20,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show:true,
                        lineStyle:{
                            width:0.2,
                        },
                    },
                    axisLine: {
                        lineStyle:{
                            width:0.2,
                        },
                    },
                    axisLabel: { interval: 119 },
                    data: timeNode
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                    splitArea: {
                        show: false
                    },
                    splitLine: {
                        lineStyle:{
                            width:0.3,
                        },
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitNumber:4,
                },
                animation: false,
                series: [
                    {
                        name:'',
                        type:'line',
                        stack: '价格',
                        smooth: true,
                        showSymbol: false,
                        data:str.price,
                        itemStyle : {
                            normal : {
                                color:'#0061c2', //改变折线点的颜色
                                lineStyle:{
                                    color:'#0061c2', //改变折线颜色
                                    width:1
                                }
                            }
                        },
                    },

                ]


            }

            klineChart.setOption(bOption);


        },
        // 条形图
        drawSline(str,time){
            var stripChart = echarts.init(document.getElementById('strip_chart'));
            var sOption = {
                title:{
                    text:'成交量',
                    right: "10",
                    top:"0",
                    textStyle:{
                        color:"#666",
                        fontSize:"10",
                        fontWeight:"normal"
                    }

                },
                tooltip: {
                    show:false
                },
                grid: {
                    top:"-10",
                    left: '15',
                    right: '15',
                    bottom: '10'
                },
                xAxis: {
                    type: 'category',
                    data: time,
                    scale: true,
                    boundaryGap : false,
                    axisLine: {
                        onZero: false,
                    },
                    splitLine: {show: false},
                    splitNumber: 20,
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    },
                    axisLine: {
                        lineStyle:{
                            width:0.2,
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: { 
                        show:false,
                        interval: 119 
                    },
                    splitLine: {
                        show:false
                    },
                    min: 'dataMin',
                    max: 'dataMax',

                },
                yAxis: {
                    axisLabel:{
                        show:true,
                        formatter: function(value) {
                            var texts = []

                        if(value.toString().length > 4 && value.toString().length <9){
                            value = (value/10000).toFixed(1) + '万'
                        }else if(value.toString().length > 8){
                            value = (value/100000000).toFixed(1) + '亿'
                        }
                    
                            texts.push(value)
                            return texts
                        }
                    },
                    scale: true,
                    splitArea: {
                        show: false
                    },
                    splitLine: {
                        show:false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitNumber:2,
                    splitLine: {show:false},             
                    
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        filterMode:"filter",
                        end: 100
                    },
                    {
                        show: false,
                        type: 'slider',
                        start: 0,
                        end: 100
                    }
                ],
                series: [
                
                    {
                        name: '成交量',
                        type: 'bar',
                        data: str.volume,
                        showSymbol: false,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList;
                                    if(str.average != "" || str.average != undefined || str.average != null){
                                        var showColor = str.volume[params.dataIndex] - str.volume[params.dataIndex+1]
                                    }else{
                                        var showColor = str.price_c[params.dataIndex] - str.price_o[params.dataIndex]
                                    }
                                    
                                    if (showColor >= 0) {
                                        colorList = '#ef232a';
                                    } else {
                                        colorList = '#14b143';
                                    }

                                    return colorList;
                                },
                            }
                        }
                    },
                ]

            }
            stripChart.setOption(sOption);

        },
        goBack(){
            this.$router.go(-1);

        },
        getNews(i,page,type,isClick){
            this.newsNum = i

            if(!isClick){
                switch (type){
                    case 1:
                        getMarkrtInfo({
                            page:this.newsList[0].page,
                            type:type,
                            code:this.$route.query.code
                        }).then((res) => {
                            this.isLoad = false
                            if(res.status == 0){
                                
                                if(this.newsList[0].comment){
                                    this.newsList[0].comment.push.apply(this.newsList[0].comment,res.info)

                                }else{
                                    this.newsList[0].comment = res.info
                                }
                            }else{
                                this.newsList[0].noNews = true

                            }
                        })
                        break;
                    case 2:
                        getMarkrtInfo({
                            page:this.newsList[1].page,
                            type:type,
                            code:this.$route.query.code
                        }).then((res) => {
                            this.isLoad = false
                            if(res.status == 0){
                                
                                if(this.newsList[1].information){
                                    this.newsList[1].information.push.apply(this.newsList[1].information,res.info)

                                }else{
                                    this.newsList[1].information = res.info
                                }
                            }else{
                                this.newsList[1].noNews = true

                            }
                        })
                        break;
                    case 3:
                        getMarkrtInfo({
                            page:this.newsList[2].page,
                            type:type,
                            code:this.$route.query.code
                        }).then((res) => {
                            this.isLoad = false
                            if(res.status == 0){
                                if(this.newsList[2].notice){
                                    this.newsList[2].notice.push.apply(this.newsList[2].notice,res.info)

                                }else{
                                    this.newsList[2].notice = res.info
                                }
                                
                            }else{
                                this.newsList[2].noNews = true

                            }
                        })
                        break;
                    case 4:
                        getMarkrtInfo({
                            page:this.newsList[3].page,
                            type:type,
                            code:this.$route.query.code
                        }).then((res) => {
                            this.isLoad = false
                            if(res.status == 0){
                                if(this.newsList[3].report){
                                    this.newsList[3].report.push.apply(this.newsList[3].report,res.info)

                                }else{
                                    this.newsList[3].report = res.info
                                }
                                
                            }else{
                                this.newsList[3].noNews = true

                            }

                        })
                        break;
                } 

            }
                
            
        },
        scrollLoad(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let offestHeight = document.body.offsetHeight
            let isTop = $(".share_news ul").offset().top

            if(scrollTop + innerHeight >= offestHeight  && !this.isLoad){

                var currIndex = ''

                for(var i in this.newsList){
                    if(this.newsList[i].type == this.newsNum + 1){
                        currIndex = i
                        this.newsList[i].page += 1
                        
                    }
                }
                setTimeout(() => {

                    if(!this.newsList[currIndex].noNews){
                        if(this.isShare && currIndex == 0){
                            
                        }else{
                            this.isLoad = true
                            this.getNews(this.newsNum,this.newsList[currIndex].page,this.newsList[currIndex].type,false)
                        }
                        
                    }
                },0)

            }
            if(!this.isTop){

                if(scrollTop >= isTop){

                    this.isTop = true
                    this.isHeight = $(".share_news ul").offset().top

                }

            }else{

                if(scrollTop <= this.isHeight){
                    this.isTop = false
                }
            }

        },
        addOptional(){
            if(this.$store.state.userInfo.token){
                insertOptional({
                    id:this.klineText.id,
                    token:this.$store.state.userInfo.token
                }).then((res) => {
                    this.shareStatus = 1
                    mui.toast(res.msg,{duration: 1500})

                })
            }else{
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }
            
        },
        removeOptional(id){
            if(this.$store.state.userInfo.token){
                removeOptional({
                    id:this.klineText.id,
                    token:this.$store.state.userInfo.token
                }).then((res) => {
                    this.shareStatus = 0
                    mui.toast(res.msg,{duration: 1500})
                })
            }else{
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }
        },
        toReport(url){
            if(url){
                window.location.href = url
            }
            
        },
        getRefresh(){
            this.reload();
        },
        toNotice(url){
            window.location.href = url
        }
    },
    watch:{
        getType:{
            handler(newVal, oldVal) {
                if (newVal == 1) {

                    this.getKline = setInterval(()=>{
                        this.kLineChart(0,"",this.getType)
                    },5000)

                } else {

                    clearInterval(this.getKline); 
                    this.getKline = null;

                }
            },
            deep:true
        },
        '$route' (to, from) {   

            this.getRefresh();

        }

    },
    beforeDestroy() {
        clearInterval(this.getKline);    
        this.getKline = null;
        window.removeEventListener('scroll', this.scrollLoad);  
    }
}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;margin-bottom:0.4rem;}
.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.header .code_text{height:0.46rem;color:#fff;display: flex;flex-direction: column;align-items:center;justify-content: center;padding-top:0.05rem;}
.header .code_text h3{font-size:0.14rem;}
.header .code_text span{font-size:0.12rem;}
.header .search i{color:#fff;font-size:0.18rem;}

.content .kline_text{width:100%;padding:0.1rem 0.05rem;display: flex;flex-direction: row;}
.content .kline_text .kline_price{margin-right:0.05rem;}
.content .kline_text .kline_price h2{font-size:0.2rem;font-weight:normal;color:#FF0000}
.content .kline_text .kline_price p{display: flex;flex-direction: row;justify-content: space-between;}
.content .kline_text .kline_price p span{font-size: 0.12rem;color:#FF0000}
.content .kline_text .kline_price .low span,.content .kline_text .kline_price .low{color:#4B904D}

.content .kline_details{width:100%;display: flex;flex-direction: row;}
.content .kline_details .details_items{width:35%;padding-left:0.05rem;display:flex;flex-direction: column;justify-content: space-between;}
.content .kline_details .details_items:nth-child(1){width:30%;}
.content .kline_details .details_items>div{color:#444;display: flex;flex-direction: row;justify-content: space-between}
.content .kline_details .details_items>div label{font-size:0.11rem;color:#444;}
.content .kline_details .details_items>div span{font-size: 0.11rem;}
.content .kline_details .details_items>div span.up{color:#FF0000}
.content .kline_details .details_items>div span.low{color:#4B904D}

.content .kline_tab{width:100%;display: flex;flex-direction: row;padding:0.07rem 0;border-top:0.01rem solid #ddd;border-bottom:0.01rem solid #ddd;}
.content .kline_tab li{width:25%;}
.content .kline_tab li span{padding:0.07rem;}
.content .kline_tab li span.active{border-bottom:0.02rem solid #168CE3;}


.content .diagnostic_stocks{width:100%;height:0.2rem;display: flex;flex-direction: row;align-items:center;background:#D9EAFF;font-size:0.12rem;justify-content: space-between}
.content .diagnostic_stocks label{width:0.7rem;background:#8BBFFF;color:#160CDC}
.content .diagnostic_stocks p{color:#666;}
.content .diagnostic_stocks i{font-size:0.14rem;margin-right:0.05rem;}

.content .guess_wrapper{padding:0.1rem;}
.content .guess_wrapper .guess_share{display: flex;flex-direction: row;justify-content: space-around;align-items: center;}

.content .guess_wrapper .guess_up{width:0.8rem;height:0.3rem;background:linear-gradient(0deg,rgba(255,54,52,1) 0%,rgba(225,108,111,1) 100%);color:#fff;border-radius:0.05rem;}
.content .guess_wrapper .guess_up h3{font-size:0.12rem;font-weight:normal;}
.content .guess_wrapper .guess_up span{font-size:0.10rem;vertical-align: top;}

.content .guess_wrapper .guess_low{width:0.8rem;height:0.3rem;background:linear-gradient(0deg,rgba(0,100,237,1) 0%,rgba(94,230,255,1) 100%);color:#fff;border-radius:0.05rem;}
.content .guess_wrapper .guess_low h3{font-size:0.12rem;font-weight:normal;}
.content .guess_wrapper .guess_low span{font-size:0.10rem;vertical-align: top;}

.content .guess_wrapper .guess_label{width:0.26rem;height:0.26rem;line-height:0.26rem;font-size:0.11rem;border-radius: 50%;background:linear-gradient(0deg,rgba(255,110,2,1) 0%,rgba(255,255,0,1) 100%);color:#fff;}
.content .guess_wrapper .guess_amount{margin-top:0.1rem;}
.content .guess_wrapper .amount_total{height:0.18rem;display: flex;flex-direction: row;justify-content: space-around;align-items: center;position:relative;}

.content .guess_wrapper .amount_total .amount_up{width:70%;background:linear-gradient(0deg,rgba(253,57,55,1) 0%,rgba(226,106,108,1) 100%);border-radius: 0.05rem 0 0 0.05rem;color:#fff;text-align:left;padding-left:0.1rem;}
.content .guess_wrapper .amount_total .amount_low{width:30%;background:linear-gradient(0deg,rgba(8,112,239,1) 0%,rgba(92,228,254,1) 100%);border-radius: 0 0.05rem 0.05rem 0;color:#fff;text-align:right;padding-right:0.1rem;}
.content .guess_wrapper .amount_total label{position:absolute;left:50%;top:0;transform: translate(-50%,0);color:#fff;}

.share_news{width:100%;background:#fff;border-top:0.02rem solid #efeff4}
.share_news ul{height:0.36rem;display: flex;flex-direction: row;justify-content: space-between;padding:0 0.2rem;}
.share_news ul li{height:0.34rem;line-height:0.34rem;font-size:0.14rem;}
.share_news ul li.on{border-bottom:0.02rem solid #F35353;color:#F35353}

.share_news .is_top{background:#fff;position:fixed;top:0;left:0;right:0;z-index:999;display: flex;flex-direction: row;justify-content: space-between;padding:0 0.2rem;}
.news_wrapper.is_margin{margin-top:0.36rem;}

.share_news .news_wrapper .news_item{background:#fff;}

.news_item>h4,.comment_share h4{font-size:0.13rem;font-weight:normal;color:#F35353;text-align: left;padding:0.1rem 0.1rem 0 0.1rem;}

.news_lis_comment .comment_text{padding:0 0.1rem;text-align: left;}
.news_lis_comment p{margin:0.1rem 0;font-size:0.12rem;color:#444;}


.news_lis_comment table{width:100%;margin:0.06rem 0}
.news_lis_comment table thead{padding:0.07rem 0;display: flex;flex-direction: row;justify-content: space-around;}
.news_lis_comment table th{width:33.3%;font-size:0.13rem;}
.news_lis_comment table tr{margin:0.05rem 0;height:0.3rem;display: flex;flex-direction: row;align-items: center;}
.news_lis_comment table tr td{width:33.3%;font-size:0.13rem;}
.news_lis_comment table tbody{display: flex;flex-direction: column;}
.news_lis_comment table .color{color:#15A143}
.news_lis_comment table .red{color:#F0353C}

.news_lis_comment table .name_code{display: flex;font-size:0.13rem;line-height:0.13rem;flex-direction: column;justify-content: center;}
.news_lis_comment table .name_code label{font-size:0.11rem;color:#666}


.news_lis_information{padding:0.1rem 0.1rem 0 0.1rem}
.news_lis_information h4{line-height:0.18rem;font-size:0.13rem;text-align: left;color:#444;font-weight:normal;}
.news_lis_information span{text-align: right;display: block;font-size:0.11rem;color:#888;margin-top:0.05rem;}

.news_lis_notice{padding:0.1rem 0.1rem 0 0.1rem}
.news_lis_notice h4{line-height:0.18rem;font-size:0.13rem;text-align: left;color:#444;font-weight:normal;}
.news_lis_notice span{text-align: right;display: block;font-size:0.11rem;color:#888;margin-top:0.05rem;}


.news_lis_report{padding:0.1rem 0.1rem 0 0.1rem}
.news_lis_report h4{line-height:0.18rem;font-size:0.13rem;text-align: left;color:#444;font-weight:normal;}
.news_lis_report .report_other{display: flex;flex-direction: row;justify-content: space-between;margin-top:0.05rem;}
.news_lis_report .report_other .report_bond{font-size:0.11rem;color:#888;display: flex;justify-content: flex-start}
.news_lis_report .report_other .report_bond span{color:#F35353;margin-left:0.05rem;}
.news_lis_report .report_other .report_time{font-size:0.11rem;color:#888}



.footer_kline .menu{width:100%;height:0.4rem;background:#fff;display:flex;flex-direction: row;position: fixed;bottom:0;left:0;right:0;border-top:0.01rem solid #ddd;z-index:9999}
.footer_kline .menu .menu_left{width:50%;display:flex;flex-direction: row;}
.footer_kline .menu .menu_left li{width:33.3%;}
.footer_kline .menu .menu_left li i{padding-top:0.05rem;font-size:0.18rem;display:inline;font-style: normal;line-height:0.9}
.footer_kline .menu .menu_left li .optional{line-height:0.8;}
.footer_kline .menu .menu_right{width:50%;display:flex;flex-direction: row;}
.footer_kline .menu .menu_right li{width:50%;}
.footer_kline .menu li{font-size:0.12rem;display: flex;flex-direction: column;align-content: center;justify-content: center;}
.footer_kline .menu li.sell_out{background:#FFAD01;color:#fff;}
.footer_kline .menu li.sell_in{background:#F35353;color:#fff;}

.news_wrapper .isLoad,.news_wrapper .noNews{font-size:0.13rem;border-top:0.01rem solid #ddd;margin:0.1rem 0.1rem 0 0.1rem;padding:0.08rem 0}




</style>
