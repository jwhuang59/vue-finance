<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">我的自选</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <table>
                <thead>
                    <th>股票名称</th>
                    <th>最新价</th>
                    <th @click="sort()">涨跌幅<div class="updown"><i class="el-icon-caret-top" :class="{'up':upDown == 'up'}"></i><i class="el-icon-caret-bottom" :class="{'down':upDown == 'down'}"></i></div></th>
                </thead>
                <tbody>

                    <tr v-for="(item,index) in optionalList" :key="index" @click="$router.push({path:'/kline',query: {code:item.keywords,key:item.index_key}})">
                        
                        <td class="name_code"><span>{{item.exchange}}</span><div>{{item.name}}<br><label>{{item.code}}</label></div></td>
                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.price}}</td>
                        <td class="color" :class="{'red':item.up_down == 'up'}">{{item.zf_bfb}}%</td>
                    </tr>
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="noOptional">暂无更多数据</div>

                    
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { optional } from '../../api/api'
export default {

    data () {
        return {
            optionalList:'',
            currNum:0,
            isLoad:true,
            noOptional:false,
            upDown:'',
        }
    },
    beforeCreate() {

        if(!this.$store.state.userInfo.token){
            this.$router.push("/login")
        }
    },
    mounted() {
        
        this.getOptional()
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        getOptional(){

            optional({
                token:this.$store.state.userInfo.token,

            }).then((res) => {
                this.isLoad = false
                if(res.status == 0){
                    if(res.info != ''){
                        this.optionalList = res.info
                        
                    }else{
                        this.noOptional = true
                    }
                    
                }else{
                    this.noOptional = true
                    mui.toast(res.msg,{duration: 1500})

                }        

            })
            
        },
        sort(){
            if(this.upDown == 'up'){
                this.upDown = 'down'
                function compare(params){
                    return function sort(a,b){
                        return b[params]-a[params]
                    }
                }
                this.optionalList.sort(compare('zf_bfb'))
            }else if(this.upDown == 'down'){
                this.upDown = 'up'
                function compare(params){
                    return function sort(a,b){
                        return a[params]-b[params]
                    }
                }
                this.optionalList.sort(compare('zf_bfb'))
            }else{
                this.upDown = 'down'
                function compare(params){
                    return function sort(a,b){
                        return b[params]-a[params]
                    }
                }
                this.optionalList.sort(compare('zf_bfb'))
            }
        },
        scrollLoad(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let offestHeight = document.body.offsetHeight

            this.operationItem[this.currNum].scrollHeight = document.documentElement.scrollTop
            if(scrollTop + innerHeight >= offestHeight  && !this.isLoad){
                
                var currIndex = ''

                for(var i in this.operationItem){
                    if(i == this.currNum){
                        currIndex = i
                        this.operationItem[i].page += 1
                        
                    }
                }
                
                setTimeout(() => {
                    
                    if(!this.operationItem[currIndex].noOperationData){

                        this.isLoad = true
                        this.getOperationList(this.currNum,this.operationItem[currIndex].page,this.operationItem[currIndex].type,false) 
                        
                    }
                },0)

            }
            
        }
        
        
    },
    beforeDestroy() {

        window.removeEventListener('scroll', this.scrollLoad);  
    }


}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.content{margin-top:0.46rem;}
.content table{width:100%;margin:0.05rem 0;}
.content table thead{height:0.35rem;line-height:0.35rem;display: flex;flex-direction: row;justify-content: space-around;position:fixed;top:0.46rem;right:0;left:0;background:#fff;}
.content table tbody{margin-top:0.3rem;}
.content table th{width:28%;font-size:0.14rem;}
.content table th:nth-child(1){width:44%;}
.content table th:nth-child(3){display:flex;flex-direction: row;align-items: center;justify-content: center;padding-left:0.1rem;}
.content table th .updown{display: flex;flex-direction: column;justify-content: center;align-items: center;}
.content table th .updown i{line-height:0.5;font-size:0.14rem;}
.content table th .updown .up{color:#d81e06}
.content table th .updown .down{color:#15A143}

.content table tr{display: flex;flex-direction: row;justify-content: space-around;padding:0.05rem 0}
.content table tr td{width:28%;font-size:0.13rem;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;}
.content table tr .name_code{width:44%;display:flex;flex-direction:row;justify-content: center;align-items: center;}
.content table tr .name_code span{content:'';width:0.3rem;height:0.18rem;line-height:0.18rem;background:#168CE3;color:#fff;font-size:0.11rem;position:absolute;;left:0.1rem;top:0.07rem}

.content table tbody{display: flex;flex-direction: column;}
.content table .color{color:#15A143}

.content .isLoad{font-size:0.12rem;padding:0.08rem 0}
.content .noNews{font-size:0.12rem;padding:0.08rem 0}
.content .isLoad i{font-size:0.16rem;margin-right:0.05rem;}


</style>
