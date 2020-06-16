<template>
    <div class="flex"> 
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">视频中心</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="video_menu">
                <ul>
                    <li :class="{'active':isActive == index}" v-for="(item,index) in videoMenu" :key="index" @click="toVideoType(index)"><font>{{item}}</font></li>
                </ul>
            </div>
            <div class="video_container" id="scrollBox">
                <div class="video_flex">
                    <div class="video_column">
                        <div class="video_ad"><img src="../../../static/images/video_ad0.jpg"></div>
                        <div class="video_info">
                            <h3>全部视频</h3>
                            <ul class="video_info_box">
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_bg.png"></div>
                                    <div class="video_info_text">
                                        <h4>不可不知的牛人</h4>
                                        <span>讲师：泉霳</span>
                                        <span>2019-11-10</span>
                                        <label>金融 | 股票</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_bg.png"></div>
                                    <div class="video_info_text">
                                        <h4>不知的牛人投资技巧</h4>
                                        <span>讲师：泉霳</span>
                                        <span>2019-11-10</span>
                                        <label>金融 | 股票</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_bg.png"></div>
                                    <div class="video_info_text">
                                        <h4>不可不知的牛人</h4>
                                        <span>讲师：泉霳</span>
                                        <span>2019-11-10</span>
                                        <label>金融 | 股票</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_bg.png"></div>
                                    <div class="video_info_text">
                                        <h4>不知的牛人投资技巧</h4>
                                        <span>讲师：泉霳</span>
                                        <span>2019-11-10</span>
                                        <label>金融 | 股票</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="video_column">
                        <div class="video_ad"><img src="../../../static/images/video_ad1.jpg"></div>
                        <div class="video_info">
                            <h3>最新推荐</h3>
                            <ul class="video_info_box">
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_bg.png"></div>
                                    <div class="video_info_text">
                                        <h4>不可不知的牛人</h4>
                                        <span>讲师：泉霳</span>
                                        <span>2019-11-10</span>
                                        <label>金融 | 股票</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_bg.png"></div>
                                    <div class="video_info_text">
                                        <h4>不知的牛人投资技巧</h4>
                                        <span>讲师：泉霳</span>
                                        <span>2019-11-10</span>
                                        <label>金融 | 股票</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="video_column">
                        <div class="video_ad"><img src="../../../static/images/video_ad2.jpg"></div>
                        <div class="video_info">
                            <h3>免费视频</h3>
                            <ul class="video_info_box">
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_bg.png"></div>
                                    <div class="video_info_text">
                                        <h4>不可不知的牛人</h4>
                                        <span>讲师：泉霳</span>
                                        <span>2019-11-10</span>
                                        <label>金融 | 股票</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_bg.png"></div>
                                    <div class="video_info_text">
                                        <h4>不知的牛人投资技巧</h4>
                                        <span>讲师：泉霳</span>
                                        <span>2019-11-10</span>
                                        <label>金融 | 股票</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="video_column">
                        <div class="video_ad"><img src="../../../static/images/video_ad0.jpg"></div>
                        <div class="video_info">
                            <h3>投资实践</h3>
                            <ul class="video_info_box0">
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_share_1.png"></div>
                                    <div class="video_info_text">
                                        <h4>股票</h4>
                                        <span>共1400课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_share_2.png"></div>
                                    <div class="video_info_text">
                                        <h4>期货</h4>
                                        <span>共1080课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_share_3.png"></div>
                                    <div class="video_info_text">
                                        <h4>黄金</h4>
                                        <span>共1050课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_img"><img src="../../../static/images/video_share_4.png"></div>
                                    <div class="video_info_text">
                                        <h4>外汇</h4>
                                        <span>共1110课</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="video_column">
                        <div class="video_ad"><img src="../../../static/images/video_ad1.jpg"></div>
                        <div class="video_info">
                            <h3>金融考试</h3>
                            <ul class="video_info_box0 video_info_box1">
                                <li>
                                    <div class="video_info_name"><p>SAC</p></div>
                                    <div class="video_info_text">
                                        <h4>证券资格证</h4>
                                        <span>共1400课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>AMAC</p></div>
                                    <div class="video_info_text">
                                        <h4>基金从业证</h4>
                                        <span>共1080课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>CFA</p></div>
                                    <div class="video_info_text">
                                        <h4>期货资格证</h4>
                                        <span>共1050课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>CIIA</p></div>
                                    <div class="video_info_text">
                                        <h4>投资分析师</h4>
                                        <span>共1110课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>FRM</p></div>
                                    <div class="video_info_text">
                                        <h4>风险管理师</h4>
                                        <span>共1050课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>CQF</p></div>
                                    <div class="video_info_text">
                                        <h4>金融工程师</h4>
                                        <span>共1110课</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="video_column">
                        <div class="video_ad"><img src="../../../static/images/video_ad2.jpg"></div>
                        <div class="video_info">
                            <h3>理财资质</h3>
                            <ul class="video_info_box0 video_info_box1">
                                <li>
                                    <div class="video_info_name"><p>CEP</p></div>
                                    <div class="video_info_text">
                                        <h4>金融理财师</h4>
                                        <span>共1400课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>QCBP</p></div>
                                    <div class="video_info_text">
                                        <h4>银行业专员</h4>
                                        <span>共1080课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>CAA</p></div>
                                    <div class="video_info_text">
                                        <h4>保险精算师</h4>
                                        <span>共1050课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>CWM</p></div>
                                    <div class="video_info_text">
                                        <h4>财富管理师</h4>
                                        <span>共1110课</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="video_column">
                        <div class="video_ad"><img src="../../../static/images/video_ad0.jpg"></div>
                        <div class="video_info">
                            <h3>财会职称</h3>
                            <ul class="video_info_box0 video_info_box1">
                                <li>
                                    <div class="video_info_name"><p>CPA</p></div>
                                    <div class="video_info_text">
                                        <h4>注册会计师</h4>
                                        <span>共1400课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>RFP</p></div>
                                    <div class="video_info_text">
                                        <h4>财务策划师</h4>
                                        <span>共1080课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>CFC</p></div>
                                    <div class="video_info_text">
                                        <h4>财务顾问师</h4>
                                        <span>共1050课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>CIA</p></div>
                                    <div class="video_info_text">
                                        <h4>内部审计师</h4>
                                        <span>共1110课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>RFC</p></div>
                                    <div class="video_info_text">
                                        <h4>财务顾问师</h4>
                                        <span>共1050课</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="video_info_name"><p>ACCA</p></div>
                                    <div class="video_info_text">
                                        <h4>公认会计师</h4>
                                        <span>共1110课</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {

    data () {
        return {
            isActive:0,
            videoMenu:['全部视频','最新推荐','免费视频','投资实践','金融考试','理财资质','财会职称'],
        }
    },
    mounted(){
        document.getElementById('scrollBox').addEventListener('scroll', this.onScroll)
        
    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        toVideoType(active){
            
            let scrollTop = $(".video_container").scrollTop()
            let isTop = $(".video_container .video_column").eq(active).offset().top - 60
            $(".video_container").animate({scrollTop:isTop + scrollTop},500,function(){
                this.isActive = active
            })
        },
        onScroll(){
            let scrollBox = $(".video_container .video_column")
            let scrollTop = $(".video_container").scrollTop()
            let offsetTopArr = []
            scrollBox.each((index,item) => {
                offsetTopArr.push(item.offsetTop-20)
            })
            let navIndex = 0
            for(var i in offsetTopArr){
                if(scrollTop >= offsetTopArr[i]){
                    navIndex = i
                }
            }
            this.isActive = navIndex
        }
    },

}
</script>


<style scoped>
.flex{display: flex;flex-direction: column;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;z-index:99}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}

.content{display:flex;flex-direction: row;position: absolute;bottom:0;top:0.46rem;left:0;right:0;background:#fff}
.content .video_menu{width:25%;position: absolute;bottom:0;top:0;left:0;overflow:scroll;background:#F4F4F4;}
.content .video_menu ul{display: flex;flex-direction: column;}
.content .video_menu ul li{display: flex;flex-direction: row;justify-content: center;align-items: center;padding:0.2rem 0;}
.content .video_menu ul li.active{background:#fff;}
.content .video_menu ul li font{width:100%;font-size:0.14rem;color:#444;display: block;}
.content .video_menu ul li.active font{border-left:0.03rem solid #6685FC}
.content .video_container{width:75%;position: absolute;bottom:0;top:0;right:0;overflow:scroll;}
.content .video_container .video_flex{padding:0.1rem;}
.content .video_column .video_ad img{width:100%;display: block;}
.content .video_info h3{margin-top:0.1rem;text-align: left;font-size:0.15rem;}
.content .video_info_box{display: flex;flex-direction: column;margin-bottom:0.1rem}
.content .video_info_box li{display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top:0.1rem;}
.content .video_info_box .video_info_img{width:70%;}
.content .video_info_box .video_info_img img{width:100%;display: block;}
.content .video_info_box .video_info_text{width:100%;display: flex;flex-direction: column;justify-content: center;align-items:flex-start;margin-left:0.05rem;}
.content .video_info_box .video_info_text h4{font-weight: normal;font-size:0.14rem;}
.content .video_info_box .video_info_text span{font-size:0.11rem;color:#999}
.content .video_info_box .video_info_text label{font-size:0.12rem;color:#666}


.content .video_info_box0{display: flex;flex-direction: row;flex-flow: row wrap;margin:0.06rem 0}
.content .video_info_box0 li{width:48%;display: flex;flex-direction: row;justify-content: center;align-items: center;padding:0.1rem;border:0.01rem solid #ddd;border-radius: 0.1rem;margin:1%;}
.content .video_info_box0 .video_info_img{width:50%;}
.content .video_info_box0 .video_info_img img{width:100%;display: block;}
.content .video_info_box0 .video_info_text{width:100%;display: flex;flex-direction: column;justify-content: center;align-items:flex-start;margin-left:0.05rem;}
.content .video_info_box0 .video_info_text h4{font-weight: normal;font-size:0.14rem;}
.content .video_info_box0 .video_info_text span{font-size:0.11rem;color:#999}
.content .video_info_box0 .video_info_text label{font-size:0.12rem;color:#666}

.content .video_info_box1 .video_info_name p{width:0.3rem;height:0.3rem;line-height:0.3rem;border-radius: 50%;font-size:0.12rem;color:#fff;background:#6685FC}

.content .video_info_box1 .video_info_text h4{font-weight: normal;font-size:0.13rem;}
.content .video_info_box1 .video_info_text span{font-size:0.10rem;color:#999}
.content .video_info_box1 .video_info_text label{font-size:0.11rem;color:#666}


</style>
