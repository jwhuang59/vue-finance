<template>
    <div class="flex"> 
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="article_text">漫画财经</div>
            <div></div>
        </div>
        <div class="content">
            <div class="comics_bg"><img src="../../../static/images/index1-1.png"></div>
            <div class="comics_menu">
                <div class="comics_wrapper">
                    <ul>
                        <li v-for="(item,index) in getComicList" :key="index"><a :href=item.get_url target="_black">{{item.title}}</a></li>
                    </ul>
                    <div class="tab_jump" @click="tabComics()"><i class="el-icon-refresh"></i><span>换一批</span></div>
                </div>
                <div class="comics_footer">
                    <img src="../../../static/images/index1-2.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { getComicClass } from '../../api/api';
export default {
    data () {
        return {
            getComicList:'',
            page:1,
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
                page:this.page,
                limit:6
            }).then((res) => {
                if(res.status == 0){

                    this.getComicList = res.info
                }else{
                    mui.toast("暂无更多数据",{duration: 1500})
                }
                

            })
        },
        tabComics(){
            this.page += 1
            this.getComicClass()
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
.content .comics_menu{background:#3e72c5;padding:0.15rem 0}
.content .comics_wrapper{width:80%;margin:0 auto;background:#fff;border-radius: 0.1rem;}
.content .comics_menu ul{padding:0.1rem}
.content .comics_menu ul li{border-bottom:0.01rem solid #000;font-size:0.14rem;padding:0.08rem 0;text-align:left;}
.content .comics_menu ul li a{color:#103D63}
.content .comics_menu .comics_footer img{width:90%;margin-top:0.2rem;}
.content .comics_wrapper .tab_jump{padding-bottom:0.1rem}
.content .comics_wrapper .tab_jump i{font-size:0.12rem;}
.content .comics_wrapper .tab_jump span{font-size:0.13rem;}
</style>
