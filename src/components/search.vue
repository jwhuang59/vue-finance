<template>
    <div class="flex"> 
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="search_wrapper">
                <i class="el-icon-search"></i>
                <input type="text" placeholder="股票名称/代码/拼音" @keyup.enter="search" @input="search($event)" v-model="keywords">
                <i class="el-icon-close dot" v-if="keywords" @click="clearKeywords()"></i>
            </div>
            <!-- <div class="submit">搜索</div> -->
        </div>
        <div class="search_content">
            <div class="search_menu" v-if="searchMenu">
                <ul v-if="searchMenu != ''">
                    <li v-for="(item,index) in searchMenu" :key="index" >    
                        <div @click="toKline(item.keywords,item.name,item.index_key)" class="search_lis"> 
                            <span>{{item.exchange}}</span>
                            <div class="share_code">
                                <h3>{{item.name}}</h3>
                                <p>{{item.code}}</p>
                            </div>
                        </div>
                        <div class="add_optional" @click="addOptional(item.id)" v-if="item.status == 0"><i class="el-icon-circle-plus-outline"></i></div>
                        <div class="remove_optional" @click="removeOptional(item.id)" v-else><i class="el-icon-remove-outline"></i></div>
                    </li>
                </ul>
                <div class="no_search" v-else>暂无搜索数据</div>
            </div>

            <div class="search_history" v-else>
                <h4>搜索记录</h4>
                <div class="history_wrapper" v-if="historyMenu[0]">
                    <div class="history_menu">
                        <div class="history_lis" v-for="(item,index) in historyMenu" :key="index" @click="$router.push({path: '/kline', query: { code: item.code,key:item.key }})">
                            {{item.name}}
                        </div>
 
                    </div>
                    <div class="clear_history" @click="clearHistory()">清除搜索记录</div>
                </div>
                <div class="no_history" v-else>
                    暂无搜索记录
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../static/js/mui.min.js'
import { getMarketSearch,insertOptional,removeOptional } from '../api/api'
export default {

    data () {
        return {
            keywords: '',
            searchMenu: '',
            historyMenu: '',
            searchStatus:false,
        }
    },
    mounted() {
        var getHistroy = JSON.parse(localStorage.getItem("historyMenu"))
        if(getHistroy){
            this.historyMenu = getHistroy
        }else{
            this.historyMenu = []
        }

    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        search(e){
            this.keywords = e.currentTarget.value
            if(this.keywords){
                this.getMarketSearch(this.keywords)
            }else{
                this.searchMenu = ''

            }
            

        },
        getMarketSearch(keywords,limit,page){
            getMarketSearch({
                code:keywords,
                limit:'30',
                page:page,
                token:this.$store.state.userInfo.token
            }).then((res) => {

                if(res.status == 0){
                    this.searchMenu = res.info

                }else{
                    this.searchMenu = []
                }

            })

        },
        toKline(code,name,key){

            var getHistroy = {
                code : code,
                name : name,
                key : key
            }
            if(this.historyMenu != ''){
                
                var sub = true;
                for(var i in this.historyMenu){

                    if(this.historyMenu[i].code == getHistroy.code){

                        sub = false
                    }
                }
                if(sub){
                    this.historyMenu.unshift(getHistroy)
                    
                }
                
            }else{
                this.historyMenu.unshift(getHistroy)

            }
            localStorage.setItem("historyMenu",JSON.stringify(this.historyMenu))
            this.$router.push({path: '/kline', query: { code: code,key:key }})
        },
        clearHistory(){
            var that = this
            mui.confirm("您确定要清除搜索记录吗", " ", ["确定","取消"], 
                function(e){
                    if (e.index == 0) {
                        localStorage.removeItem("historyMenu")
                        that.historyMenu = []
                        mui.toast("清除成功")
                    }
                }
            )
            
        },
        clearKeywords(){
            this.keywords = ''

        },
        addOptional(id){
            if(this.$store.state.userInfo.token){
                insertOptional({
                    id:id,
                    token:this.$store.state.userInfo.token
                }).then((res) => {
                    this.searchStatus = true
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
                    id:id,
                    token:this.$store.state.userInfo.token
                }).then((res) => {
                    this.searchStatus = true
                    mui.toast(res.msg,{duration: 1500})
                })
            }else{
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }
        }
        
    },
    watch:{
        keywords:{
            handler(newVal, oldVal) {
                if (newVal == '') {

                    this.searchMenu = ''

                }
            },
            deep:true
        },
        searchStatus:{
            handler(newVal, oldVal) {
                if (newVal) {
                    
                    this.getMarketSearch(this.keywords)
                    this.searchStatus = false

                }
            },
            deep:true
        }
    }

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column}
.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;z-index:9}
.header .back i{font-size:0.22rem;color:#fff;}
.header .search_wrapper{width:100%;height:0.3rem;margin:0 0 0 0.07rem;display: flex;flex-direction: row;justify-content: flex-start;align-items:center;background:#fff;border-radius: 0.05rem;}
.header .search_wrapper i{font-size:0.16rem;color:#666;margin:0 0.06rem}
.header .search_wrapper .dot{font-weight:bold;}
.header .search_wrapper input{height:0.3rem;padding:0.05rem 0;margin:0;font-size:0.12rem;color:#666;border:none;background:transparent}
.header .submit{width:0.5rem;height:0.3rem;line-height:0.3rem;color:#fff;border-radius: 0.05rem;margin-left:0.05rem;border:none;outline:none;font-size:0.13rem;}

.search_content .search_menu ul{display: flex;flex-direction: column;padding:0.06rem 0;position: absolute;top:0.46rem;left:0;right:0;background:#fff;}
.search_content .search_menu ul li{display: flex;flex-direction: row;justify-content: space-between}
.search_content .search_menu ul li .search_lis{width:100%;display: flex;flex-direction: row;justify-content: flex-start}
.search_content .search_menu ul li span{width:0.3rem;height:0.2rem;line-height:0.2rem;padding:0 0.03rem;margin:0.15rem 0.1rem;background:#168CE3;color:#fff;font-size:0.11rem;}
.search_content .search_menu .share_code{display: flex;flex-direction: column;align-items: center;justify-content: center;}
.search_content .search_menu .share_code h3{font-size:0.14rem;color:#444}
.search_content .search_menu .share_code p{font-size:0.12rem;color:#666}

.search_content .search_menu .no_search{padding:0.1rem;font-size:0.12rem;position:absolute;left:0;right:0;bottom:0;top:0.46rem;background:#fff;}

.add_optional{font-size:0.24rem;color:#168CE3;display: flex;margin:0 0.1rem;align-items: center;}
.remove_optional{font-size:0.24rem;color:#d81e06;display: flex;margin:0 0.1rem;align-items: center;}
.search_content .search_history{position:absolute;top:0.46rem;left:0;right:0;bottom:0;background:#fff;}
.search_content .search_history h4{font-size:0.14rem;color:#666;border-bottom:0.01rem solid #ddd;padding:0.1rem;text-align:left;}
.search_content .search_history .no_history{padding:0.1rem;font-size:0.12rem;}
.search_content .search_history .history_menu{padding:0.1rem 0.1rem 0.05rem 0.1rem;overflow:hidden;}
.search_content .search_history .history_menu .history_lis{padding:0.03rem;margin:0 0.05rem 0.05rem 0;color:#444;font-size:0.12rem;display: inline-block;border:0.01rem solid #ddd;float:left;}
.search_content .search_history .clear_history{font-size:0.12rem;color:#666}




</style>
