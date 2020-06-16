<template>
    <div class="flex"> 
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="article_text">享诠财经资讯</div>
            <div></div>
        </div>
        <div class="article_content">
            <div class="person_info">
                <img src="../../assets/person0.png">
                <div class="info_wrapper">
                    <div class="wrapper_left">
                        <h3>{{articleDetails.author}}</h3>
                        <span>{{articleDetails.source}}</span>
                    </div>
                    <div class="wrapper_right">
                        <span>+关注</span>
                    </div>
                </div>
            </div>
            <div class="article_title"><h2>{{articleDetails.title}}</h2></div>
            <div class="article_other">
                <span>{{articleDetails.create_time}}</span>
                <span>{{articleDetails.reading_num}}万人阅读</span>
            </div>
            <div class="article_details" v-html="articleDetails.content"></div>
            <div class="article_operation">
                <div class="operation_item">
                    <i><svg t="1571733392131" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6483" width="18" height="18"><path d="M485.493811 587.391061l62.032822 0c-1.954515 16.158005-5.636371 30.886451-11.08036 44.164872l190.410678 49.591465-29.002544 53.867862c-71.681576-24.290219-135.146003-44.217061-190.408631-59.764152-30.641881 31.984459-92.744287 52.068889-186.326663 60.2185-7.556093-17.502629-17.030885-36.521798-28.547173-57.043181 69.746504-4.065596 118.831432-12.684904 147.187247-25.825179C468.113979 639.460973 483.399103 617.736183 485.493811 587.391061L485.493811 587.391061 485.493811 587.391061zM485.947136 288.540625l61.578474 0 0 52.977585 46.188972 0c11.325953-16.917298 21.883403-33.957393 31.688723-51.170426l51.181683 21.741163-20.608364 29.429263 75.380828 0 0 100.526531-55.244208 0L676.113243 388.613832 358.21601 388.613832l0 53.43091-55.210439 0 0-100.526531 71.752184 0c-5.565762-9.509585-11.377118-19.029402-17.414625-28.538987l48.440246-22.187325c11.656481 17.213034 22.509666 34.123168 32.596396 50.725288l47.567365 0L485.947136 288.540625 485.947136 288.540625 485.947136 288.540625zM339.684958 653.071969 339.684958 529.894555l353.197204 0 0 123.17639-59.765175 0 0-74.28282L399.467529 578.788126l0 74.28282L339.684958 653.070946 339.684958 653.071969 339.684958 653.071969zM377.305787 509.060041l0-99.174744 279.803637 0 0 99.174744L377.305787 509.060041 377.305787 509.060041 377.305787 509.060041zM432.517249 471.927329 601.881588 471.927329l0-24.909319L432.517249 447.01801 432.517249 471.927329 432.517249 471.927329 432.517249 471.927329zM511.946276 65.281819c-246.596328 0-446.656783 200.024639-446.656783 446.700785 0 246.710938 200.059432 446.735577 446.656783 446.735577 246.721171 0 446.763207-200.024639 446.763207-446.735577C958.709483 265.298272 758.667447 65.281819 511.946276 65.281819L511.946276 65.281819 511.946276 65.281819zM511.946276 910.050762c-219.829707 0-397.989363-178.230264-397.989363-398.059971 0-219.828684 178.160679-398.042575 397.989363-398.042575 219.882919 0 398.078391 178.212868 398.078391 398.042575C910.024667 731.821521 731.829196 910.050762 511.946276 910.050762L511.946276 910.050762 511.946276 910.050762zM511.946276 910.050762" p-id="6484" fill="#d81e06"></path></svg></i>
                    <span>赞赏</span>
                </div>
                <div class="operation_item">
                    <i><svg t="1571731384003" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2077" width="18" height="18"><path d="M652.189 114.635s-55.86-22.614-140.234-22.614c-84.37 0-140.23 25.903-140.23 25.903l280.549 285.449-0.085-288.738z" fill="#FB5453" p-id="2078"></path><path d="M811.202 217.796c-61.928-58.727-121.8-79.649-121.8-79.649l-2.06 392.072 210.411-199.332c0 0.085-24.535-54.364-86.55-113.09z" fill="#6468F1" p-id="2079"></path><path d="M906.498 368.778L617.205 645.535h292.667s22.95-55.119 22.95-138.419c-0.087-83.215-26.324-138.338-26.324-138.338z" fill="#5283F0" p-id="2080"></path><path d="M696.62 887.697s56.813-22.842 118.033-80.602c61.223-57.757 83.1-113.488 83.1-113.488l-409.132-1.946L696.62 887.697z" fill="#00B2FE" p-id="2081"></path><path d="M371.806 911.213s55.864 22.61 140.234 22.61c84.455 0 140.234-25.902 140.234-25.902l-280.548-285.45 0.08 288.742z" fill="#66D020" p-id="2082"></path><path d="M224.484 808.047c61.934 58.732 121.806 79.65 121.806 79.65l2.057-392.072-210.411 199.33c0.084-0.08 24.619 54.365 86.548 113.092z" fill="#9AD122" p-id="2083"></path><path d="M114.134 368.778s-22.956 55.107-22.956 138.378c0 83.276 26.244 138.379 26.244 138.379l289.372-276.672h-292.66v-0.085z" fill="#FFC71A" p-id="2084"></path><path d="M339.07 138.147s-56.814 22.843-118.034 80.6c-61.222 57.758-83.1 113.494-83.1 113.494l409.132 1.942L339.07 138.147z" fill="#FF7612" p-id="2085"></path></svg></i>
                    <span>1562</span>
                </div>
                <div class="operation_item">
                    <i><svg t="1571731406987" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2968" width="18" height="18"><path d="M669.3 369.4c9.8 0 19.6 0 29.4 1.6C671 245.2 536.9 152 383.2 152 211.6 152 71 269.7 71 416.8c0 85 45.8 156.9 124.2 210.9l-31.1 93.2L273.6 667c39.2 8.2 70.3 16.3 109.5 16.3 9.8 0 19.6 0 31.1-1.6-6.5-21.3-9.8-42.5-9.8-65.4 0.1-135.7 116.2-246.9 264.9-246.9z m-168.4-85c24.5 0 39.2 16.3 39.2 39.2 0 22.9-16.3 39.2-39.2 39.2-24.5 0-47.4-16.4-47.4-39.2 0-24.5 24.6-39.2 47.4-39.2z m-216.3 73.1c-24.7 0-47.8-16.2-47.8-38.8 0-24.3 24.7-38.8 47.8-38.8s39.5 16.2 39.5 38.8c0.1 22.7-16.4 38.8-39.5 38.8z" fill="#24DB5A" p-id="2969"></path><path d="M953.8 613c0-125.9-124.2-227.2-264.8-227.2-148.8 0-266.5 103-266.5 227.2 0 125.9 117.7 227.2 266.5 227.2 31.1 0 62.1-8.2 93.2-16.3l85 47.4-22.9-78.5c62.1-47.4 109.5-109.5 109.5-179.8z m-351.5-39.2c-14.7 0-31.1-14.7-31.1-31.1 0-14.7 16.3-31.1 31.1-31.1 22.9 0 39.2 16.3 39.2 31.1 0 16.4-14.7 31.1-39.2 31.1z m178-7.6c-14.8 0-31.3-14.6-31.3-30.7 0-14.6 16.5-30.7 31.3-30.7 23.1 0 39.5 16.2 39.5 30.7 0 16.2-16.4 30.7-39.5 30.7z" fill="#24DB5A" p-id="2970"></path></svg></i>
                    <span>2639</span>
                </div>
            </div>
            <div class="article_ad">
                <img src="../../assets/article_ad1.png">
            </div>
        </div>
        
        <div class="comment">
            <h3>最新评论</h3>
            <div class="comment_wrapper">
                <div class="comment_item">
                    <div class="comment_info">
                        <img src="../../assets/person0.png">
                        <div class="info_wrapper">
                            <div class="wrapper_left">
                                <h3>游客</h3>
                                <span>今天 17:01</span>
                            </div>
                            <div class="wrapper_right">
                                <div class="reply"><i class="el-icon-chat-dot-round icon_reply"></i></div>
                                <div class="thumbs_up"><i><svg t="1571736066203" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8021" width="16" height="16"><path d="M800.924 962.534H154.771c-44.531 0-80.77-36.227-80.77-80.758V466.392c0-44.531 36.238-80.77 80.77-80.77h138.135c28.373-27.81 58.019-65.94 58.019-103.846v-69.23c0-95.44 77.637-173.077 173.077-173.077s173.077 77.637 173.077 173.077v69.23c0 27.381-2.806 55.721-6.378 80.77h110.224c95.44 0 173.077 77.637 173.077 173.077v4.541l-92.465 346.751c-2.672 42.142-37.806 75.619-80.613 75.619zM154.771 454.853c-6.367 0-11.539 5.172-11.539 11.539v415.385c0 6.354 5.172 11.526 11.539 11.526h646.153c6.366 0 11.538-5.172 11.538-11.526v-4.541l92.219-345.828c-2.209-55.314-47.912-99.631-103.757-99.631h-193.19l8.034-41.23c5.511-28.316 12.079-70.177 12.079-108.77v-69.23c0-57.264-46.582-103.846-103.846-103.846s-103.846 46.582-103.846 103.846v69.23c0 54.132-30.322 109.311-90.122 164.006l-9.916 9.07H154.771z" p-id="8022" fill="#707070"></path><path d="M289.39 939.445c-19.122 0-34.615-15.493-34.615-34.615V443.304c0-19.123 15.493-34.615 34.615-34.615 19.121 0 34.615 15.492 34.615 34.615V904.83c0 19.122-15.494 34.615-34.615 34.615z" p-id="8023" fill="#707070"></path></svg></i><span>63</span></div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="comment_content">这是第一条模板数据</div>
                </div>
                <div class="comment_item">
                    <div class="comment_info">
                        <img src="../../assets/person0.png">
                        <div class="info_wrapper">
                            <div class="wrapper_left">
                                <h3>数据宝</h3>
                                <span>今天 14:01</span>
                            </div>
                            <div class="wrapper_right">
                                <div class="reply"><i class="el-icon-chat-dot-round icon_reply"></i></div>
                                <div class="thumbs_up"><i><svg t="1571736066203" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8021" width="16" height="16"><path d="M800.924 962.534H154.771c-44.531 0-80.77-36.227-80.77-80.758V466.392c0-44.531 36.238-80.77 80.77-80.77h138.135c28.373-27.81 58.019-65.94 58.019-103.846v-69.23c0-95.44 77.637-173.077 173.077-173.077s173.077 77.637 173.077 173.077v69.23c0 27.381-2.806 55.721-6.378 80.77h110.224c95.44 0 173.077 77.637 173.077 173.077v4.541l-92.465 346.751c-2.672 42.142-37.806 75.619-80.613 75.619zM154.771 454.853c-6.367 0-11.539 5.172-11.539 11.539v415.385c0 6.354 5.172 11.526 11.539 11.526h646.153c6.366 0 11.538-5.172 11.538-11.526v-4.541l92.219-345.828c-2.209-55.314-47.912-99.631-103.757-99.631h-193.19l8.034-41.23c5.511-28.316 12.079-70.177 12.079-108.77v-69.23c0-57.264-46.582-103.846-103.846-103.846s-103.846 46.582-103.846 103.846v69.23c0 54.132-30.322 109.311-90.122 164.006l-9.916 9.07H154.771z" p-id="8022" fill="#707070"></path><path d="M289.39 939.445c-19.122 0-34.615-15.493-34.615-34.615V443.304c0-19.123 15.493-34.615 34.615-34.615 19.121 0 34.615 15.492 34.615 34.615V904.83c0 19.122-15.494 34.615-34.615 34.615z" p-id="8023" fill="#707070"></path></svg></i><span>39</span></div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="comment_content">这是第二条模板数据</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { getArticleInfo } from '../../api/api'
export default {
    name: 'Index',
    data () {
        return {
            articleDetails: '',

        }
    },
    mounted() {
    this.getArticleInfo(); 

    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        goIndex(){
            this.$router.push('/')

        },
        getArticleInfo(){
            getArticleInfo({
                id:this.$route.query.id,
                type:this.$route.query.type,
            }).then((res) => {

                this.articleDetails = res.info

            })

        },
        
    }

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column}
.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.header .article_text{text-align: center;color:#fff;font-size:0.15rem;}
.article_content{padding:0.1rem }
.article_content .person_info{display: flex;flex-direction: row;}
.article_content .person_info img{width:0.4rem;height:0.4rem;display:block;}
.article_content .person_info .info_wrapper{width:100%;display:flex;flex-direction: row;justify-content: space-between;align-items:center;color:#444;padding:0 0.05rem;}
.article_content .person_info .wrapper_left{display: flex;flex-direction: column;justify-content: center;}
.article_content .person_info .info_wrapper h3{font-size:0.14rem;font-weight:normal;text-align:left;}
.article_content .person_info .info_wrapper span{font-size:0.12rem;color:#666}
.article_content .person_info .wrapper_right span{padding:0.03rem 0.06rem;color:#fff;font-size:0.12rem;background:#168CE3}

.article_content .article_title h2{line-height:0.18rem;font-size:0.14rem;text-align:left;margin:0.1rem 0 0 0}
.article_content .article_other{display: flex;flex-direction: row;justify-content: flex-start;align-items:center;border-bottom:0.01rem solid #ddd;padding-bottom:0.1rem;margin:0.1rem 0}
.article_content .article_other span{font-size:0.12rem;color:#666;margin-right:0.1rem;}

>>>.article_content .article_details{letter-spacing: 0.01rem;text-align:left;}
>>>.article_content .article_details p{width:100% !important;color:#444;font-size:0.12rem;margin:0.05rem 0}
>>>.article_content .article_details span{width:100% !important;color:#444;font-size:0.12rem;margin:0.05rem 0}
>>>.article_content .article_details table{width:100% !important;}
>>>.article_content .article_details table tr{width:100% !important;font-size:0.11rem;}
>>>.article_content .article_details table th{width:100% !important;font-size:0.11rem;}
>>>.article_content .article_details table td{width:100% !important;font-size:0.11rem;text-align: center;}
>>>.article_content .article_details a{width:100% !important;margin:0.1rem 0;}
>>>.article_content .article_details img{width:100% !important;margin:0.1rem 0;}

.article_content .article_operation{display: flex;flex-direction: row;justify-content: space-around;align-items: center;margin:0.15rem 0;}
.article_content .article_operation .operation_item{border:0.01rem solid #ccc;padding:0 0.06rem;display: flex;justify-content: center;align-items:center;}
.article_content .article_operation .operation_item i{padding-top:0.05rem;}
.article_content .article_operation .operation_item:nth-child(1) i{margin-right:0.02rem;}
.article_content .article_operation .operation_item span{vertical-align: top;font-size:0.12rem;}
.article_content .article_ad img{width:100%;}

.comment{padding:0 0.1rem;margin-bottom:0.46rem;}
.comment>h3{text-align:left;font-size:0.14rem;color:#444;position:relative;padding:0.05rem 0 0.05rem 0.05rem}
.comment>h3:before{content:"";height:0.16rem;border-left:0.03rem solid #EA5727;position:absolute;left:0;top:50%;transform:translate(0,-50%)}

.comment .comment_wrapper .comment_item{padding:0.05rem 0;border-bottom:0.01rem solid #ddd;}
.comment_info{display: flex;flex-direction: row;}
.comment_info img{width:0.4rem;height:0.4rem;display:block;}
.comment_info .info_wrapper{width:100%;display:flex;flex-direction: row;justify-content: space-between;padding:0 0.05rem;}
.comment_info .wrapper_left{display: flex;flex-direction: column;justify-content: center;}
.comment_info .info_wrapper h3{font-size:0.13rem;font-weight:normal;text-align: left;}
.comment_info .info_wrapper span{font-size:0.11rem;color:#666}
.comment_info .wrapper_right{display: flex;flex-direction: row;justify-content: center;align-items: center}
.comment_info .wrapper_right .thumbs_up{padding-top:0.04rem;display: flex;flex-direction: row;justify-content: center;align-items: center;}
.comment_info .wrapper_right .reply{display: flex;flex-direction: row;justify-content: center;align-items: center;}
.comment_info .wrapper_right .reply i{font-size:0.15rem;margin-right:0.05rem;}
.comment_info .wrapper_right .thumbs_up i{margin-right:0.02rem;}
.comment .comment_wrapper .comment_content{font-size:0.12rem;text-align: left;margin-left:0.45rem;}

</style>
