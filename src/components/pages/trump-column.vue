<template>
    <div class="flex"> 
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="article_text">川普专栏</div>
            <div></div>
        </div>
        <div class="content">
            <div class="comics_bg"><img src="../../../static/images/index1-3.png"></div>
            <div class="person_info">
                <div class="flex_info">
                    <img src="../../../static/images/index_person.png">
                    <div class="follow">
                        <!-- <span>2019-12-03 13:23:00</span> -->
                    </div>
                </div>
                <h3>川普中文同步推</h3>
                <h4>@Trump_Chinese</h4>
                <p>实时跟上美国总统川普的推特步伐，向全球华人即使更新推文，了解川普实时动态！</p>
            </div>
            <div class="article_menu">
                <ul>
                    <li>
                        <img src="../../../static/images/trump/999.jpg">
                        <img src="../../../static/images/trump/888.jpg">
                        <img src="../../../static/images/trump/777.jpg">
                        <img src="../../../static/images/trump/666.jpg">
                        <img src="../../../static/images/trump/555.jpg">
                        <img src="../../../static/images/trump/444.jpg">
                        <img src="../../../static/images/trump/333.jpg">
                        <img src="../../../static/images/trump/222.jpg">
                        <img src="../../../static/images/trump/111.png">
                        <img src="../../../static/images/trump1/0-2.jpg">
                        <img src="../../../static/images/trump1/0-1.jpg">
                        <img src="../../../static/images/trump1/组32@2x.png">
                        <img src="../../../static/images/trump1/组31@2x.png">
                        <img src="../../../static/images/trump1/组30@2x.png">
                        <img src="../../../static/images/trump1/组29@2x.png">
                        <img src="../../../static/images/trump1/组28@2x.png">
                        <img src="../../../static/images/trump1/组27@2x.png">
                        <img src="../../../static/images/trump1/组26@2x.png">
                        <img src="../../../static/images/trump1/组25@2x.png">
                        <img src="../../../static/images/trump1/组24@2x.png">
                        <img src="../../../static/images/trump1/组23@2x.png">
                        <img src="../../../static/images/trump1/组22@2x.png">
                        <img src="../../../static/images/trump1/组21@2x.png">
                        <img src="../../../static/images/trump1/组20@2x.png">
                        <img src="../../../static/images/trump1/组19@2x.png">
                        <img src="../../../static/images/trump1/组18@2x.png">
                        <img src="../../../static/images/trump1/组17@2x.png">
                        <img src="../../../static/images/trump1/组16@2x.png">
                        <img src="../../../static/images/trump1/组15@2x.png">
                        <img src="../../../static/images/trump1/组14@2x.png">
                        <img src="../../../static/images/trump1/组13@2x.png">
                        <img src="../../../static/images/trump1/组12@2x.png">
                        <img src="../../../static/images/trump1/组11@2x.png">
                        <img src="../../../static/images/trump1/组10@2x.png">
                        <img src="../../../static/images/trump1/组9@2x.png">
                        <img src="../../../static/images/trump1/组8@2x.png">
                        <img src="../../../static/images/trump1/组7@2x.png">
                        <img src="../../../static/images/trump1/组6@2x.png">
                        <img src="../../../static/images/trump1/组5@2x.png">
                        <img src="../../../static/images/trump1/组4@2x.png">
                        <img src="../../../static/images/trump1/组3@2x.png">
                        <img src="../../../static/images/trump1/组2@2x.png">
                        <img src="../../../static/images/trump1/组1@2x.png">
                        <img src="../../../static/images/trump1/21@2x.png">
                        <img src="../../../static/images/trump1/20@2x.png">
                        <img src="../../../static/images/trump1/19@2x.png">
                        <img src="../../../static/images/trump1/18@2x.png">
                        <img src="../../../static/images/trump1/17@2x.png">
                        <img src="../../../static/images/trump1/16@2x.png">
                        <img src="../../../static/images/trump1/15@2x.png">
                        <img src="../../../static/images/trump1/14@2x.png">
                        <img src="../../../static/images/trump1/13@2x.png">
                        <img src="../../../static/images/trump1/12@2x.png">
                        <img src="../../../static/images/trump1/11@2x.png">
                        <img src="../../../static/images/trump1/10@2x.png">
                        <img src="../../../static/images/trump1/9@2x.png">
                        <img src="../../../static/images/trump1/8@2x.png">
                        <img src="../../../static/images/trump1/7@2x.png">
                        <img src="../../../static/images/trump1/6@2x.png">
                        <img src="../../../static/images/trump1/5@2x.png">
                        <img src="../../../static/images/trump1/4@2x.png">
                        <img src="../../../static/images/trump1/3@2x.png">
                        <img src="../../../static/images/trump1/2@2x.png">
                        <img src="../../../static/images/trump1/1@2x.png">
                        <img src="../../../static/images/trump/13.png">
                        <img src="../../../static/images/trump/12.png">
                        <img src="../../../static/images/trump/11.png">
                        <img src="../../../static/images/trump/10.png">
                        <img src="../../../static/images/trump/9.png">
                        <img src="../../../static/images/trump/8.png">
                        <img src="../../../static/images/trump/7.png">
                        <img src="../../../static/images/trump/6.png">
                        <img src="../../../static/images/trump/5.png">
                        <img src="../../../static/images/trump/4.png">
                        <img src="../../../static/images/trump/3.png">
                        <img src="../../../static/images/trump/2.png">
                        <img src="../../../static/images/trump/1.png">
                        <!-- <div class="article_header">
                            <img src="../../../static/images/index_person.png">
                            <div class="author_info">
                                <div class="author_name">
                                    <h3>川普中文同步推</h3>
                                    <span>@Trump_Chinese·19时</span>
                                </div>
                                <p>在排灯节开始时，@FLOTUS 梅拉尼亚和我祝愿那些庆祝排灯节的人们有一个幸福快乐的庆祝活动！#HappyDiwali</p>
                            </div>
                        </div>
                        <div class="article_wrapper">
                            <img src="../../../static/images/screen/screen2.png">
                        </div>
                        <div class="operation_type">
                            <div>
                                <i><svg t="1573703174059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2001" width="15" height="15"><path d="M773.458 1005.43c-14.403 0-30.592-4.132-45.599-11.638L513.567 886.61 297.948 993.618c-13.655 7.27-29.286 11.09-45.225 11.09a96.164 96.164 0 0 1-57.549-18.842c-30.177-22.64-45.64-61.85-38.502-97.561l44.099-228.772L31.744 501.996a104.059 104.059 0 0 1-26.281-100.66l0.338-1.162c12.288-36.828 42.772-62.633 79.734-67.584l234.839-42.7L425.779 75.811c16.932-33.895 51.37-55.675 87.788-55.675 37.99 0 73.318 22.6 88.13 56.29l105.068 213.4L941.64 330.89a95.672 95.672 0 0 1 78.264 68.373 98.97 98.97 0 0 1-24.474 101.002l-0.578 0.579-168.55 158.72L868.9 888.745c6.86 36.649-7.716 73.672-38.062 96.742a90.409 90.409 0 0 1-57.38 19.943z m-259.81-196.055l227.667 113.853c6.686 3.37 14.392 5.489 19.665 5.489 8.116 0 15.652-2.499 21.187-7.117l1.03-0.85c12.937-9.707 19.245-25.134 16.414-40.238l-45.814-246.804 181.212-170.65c11.126-11.28 14.93-27.433 9.995-42.286l-0.497-1.562a37.31 37.31 0 0 0-30.971-27.003l-1.034-0.163L661.76 348.21 548.91 118.99c-5.478-12.805-20.347-22.098-35.359-22.098-14.75 0-28.861 9.236-36.009 23.496L365.414 348.109l-252.062 45.788c-15.31 1.92-27.203 12.088-32.697 27.945-3.901 14.49 0.722 31.949 11.372 42.834l181.422 169.057-47.61 246.933c-2.863 14.28 3.9 30.714 16.409 40.1 6.272 4.715 14.397 7.316 22.917 7.316 6.569 0 12.866-1.531 18.294-4.45l0.783-0.46 229.407-113.797z" p-id="2002"></path></svg></i>
                                <span>562</span>
                            </div>
                            <div>
                                <i class="el-icon-chat-line-square"></i>
                                <span>456</span>
                            </div>
                            <div>
                                <i><svg t="1572605884556" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2324" width="14" height="14"><path d="M936.24990606 410.90076786L665.56644238 410.90076786c104.88668387-387.37260658-72.26779421-407.15747214-72.2677942-407.15747215-75.08538823 0-59.51992718 59.37206158-65.19819378 69.26973384 0 189.4424485-201.21579975 337.88773831-201.21579975 337.88773831l0 537.22669397c0 53.02898233 72.26779421 72.12807851 100.61721372 72.12807851l406.70106852 0c38.27619954 0 69.44554325-100.37969806 69.44554325-100.37969807 100.61837881-342.13625173 100.61837881-443.93522517 100.61837881-443.93522517C1004.2680229 405.25277298 936.24990606 410.90076786 936.24990606 410.90076786L936.24990606 410.90076786 936.24990606 410.90076786zM936.24990606 410.90076786" p-id="2325" fill="#8a8a8a"></path><path d="M215.80392107 411.07890517L53.72007765 411.07890517c-33.47348253 0-33.98926563 32.8773632-33.98926563 32.8773632l33.47348252 541.8128532c0 34.48525483 34.54463431 34.48525483 34.54463431 34.48525482L228.03367595 1020.25437639c29.22497024 0 28.96649671-22.81203257 28.96649671-22.81203257L257.00017266 452.16571278C257.00017266 410.55264313 215.80392107 411.07890517 215.80392107 411.07890517L215.80392107 411.07890517 215.80392107 411.07890517zM215.80392107 411.07890517" p-id="2326" fill="#8a8a8a"></path></svg></i>
                                <span>126</span>
                            </div>
                            
                        </div> -->
                    </li>
                    
                </ul>
                <div class="no_news">暂无更多数据</div>
            </div>
        </div>
    </div>
</template>

<script>

import { getComicClass } from '../../api/api';
export default {
    data () {
        return {
            getComicList:''
        }
    },
    mounted(){
        this.getComicClass();
    },
    methods: {
        goBack(){
            this.$router.go(-1);

        },
        getComicClass(){
            getComicClass({
                page:1,
                limit:6
            }).then((res) => {
                this.getComicList = res.info

            })
        }
    },
}
</script>


<style scoped>
.flex{display: flex;flex-direction: column;background:#fff;}
.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.header .article_text{text-align: center;color:#fff;font-size:0.15rem;}

.content{margin:0;padding:0}
.content .comics_bg img{width:100%;display:block;}
.content .person_info{display: flex;flex-direction: column;text-align:left;padding:0.1rem;border-bottom:0.02rem solid #ddd;}
.content .person_info .flex_info{display:flex;flex-direction: row;justify-content: space-between;align-items: center;position:relative;}
.content .person_info img{width:0.7rem;position:absolute;top:-0.4rem;left:0;}
.content .person_info .follow{position:absolute;right:0;top:50%;transform: translate(0,-30%)}
.content .person_info .follow span{padding:0.03rem 0.05rem;color:#000;font-size:0.13rem;}
.person_info h3{font-size:0.18rem;margin-top:0.35rem;}
.person_info h4{font-size:0.15rem;font-weight:normal;}

.article_menu li{display: flex;flex-direction: column;padding:0.1rem;border-bottom:0.02rem solid #ddd;background:#fff;}
.article_menu li img{width:100%;margin:0.05rem 0}

.article_menu .no_news{margin:0.05rem 0;font-size:0.13rem;}
/* .article_menu .article_header{display: flex;flex-direction: row;justify-content: flex-start;align-items: flex-start;}
.article_menu .article_header img{width:0.4rem;margin-right:0.05rem;}
.article_menu .article_header .author_info{display: flex;flex-direction: column;align-items: flex-start;text-align:left;justify-content:center}
.article_menu .article_header .author_name{display: flex;flex-direction: row;justify-content: flex-start} 
.article_menu .article_header h3{font-size:0.15rem;}
.article_menu .article_header span{font-size:0.13rem;}
.article_menu .article_header p{font-size:0.13rem;}
.article_wrapper img{width:100%;padding:0.1rem}

.article_menu .operation_type{display: flex;flex-direction: row;}
.article_menu .operation_type>div{width:33.3%;display: flex;flex-direction: row;justify-content: center;align-items: center;font-size:0.12rem;color:#666;}
.article_menu .operation_type>div i{font-size:0.16rem;margin-top:0.01rem;}
.article_menu .operation_type>div span{margin-left:0.02rem;} */

</style>
