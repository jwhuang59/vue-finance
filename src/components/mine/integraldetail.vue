<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">积分明细</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <!-- <ul>
                <li :class="{'show':currNum == 0}"><span>积分明细</span></li>
                <li :class="{'show':currNum == 1}"><span>失效积分</span></li>
            </ul> -->
            <div class="operation_wrapper">
                <div class="operation_container" v-if="currNum == 0">
                    <div class="totals_num">
                        <div class="up"><label>新增积分:</label><span>{{integralAdd}}</span></div>
                        <div class="down"><label>新增积分:</label><span>{{integralReduce}}</span></div>
                        <div class="drop_down">筛选</div>
                    </div>
                    <div class="operation_item" v-for="(item,index) in integralList" :key="index">
                        <img src="../../../static/images/integral_up.png" v-if="item.type == 1">
                        <img src="../../../static/images/integral_down.png" v-if="item.type == 2">
                        <div class="operation_info">
                            <h4>{{item.task_name}}</h4>
                            <span>{{item.create_time}}</span>
                        </div>
                        <div class="follow" v-if="item.type == 1"> + {{item.integral}}</div>
                        <div class="follow" v-if="item.type == 2"> - {{item.integral}}</div>
                    </div>
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="noIntegralData">暂无更多数据</div>
                </div>
                <!-- <div class="operation_container" v-if="currNum == 1">
                    <div class="operation_item" v-for="(item,index) in operationItem[1].operationList" :key="index">
                        <h4>{{item.article.title}}</h4>
                        <div class="operation_type">
                            <div>
                                <i><svg t="1572606065341" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3764" width="14" height="14"><path d="M1024 505.929143c0-10.642286-4.642743-20.143543-11.856457-26.8928L608 130.0352c-6.429257-5.463771-14.6432-8.892343-23.714743-8.892343-20.286171 0-36.642743 16.393143-36.642743 36.642743l0 154.499657C238.714514 362.143086 21.215086 589.249829 0 880.714971c1.000229 12.357486 11.143314 22.178743 23.714743 22.178743 4.856686 0 9.428114-1.464686 13.215086-3.964343 0.071314-0.071314 0 0.213943 0.071314 0.213943 53.357714-37.893486 99.499886-66.143086 135.5008-85.141943 87.356343-48.071314 222.999771-86.893714 375.1424-102.500571l0 143.1424c0 20.286171 16.356571 36.642743 36.642743 36.642743 8.643657 0 16.427886-3.249371 22.714514-8.285257l404.214857-349.070629c0-0.036571-0.142629-0.071314-0.071314-0.107886C1019.000686 527.1424 1024 517.1072 1024 505.929143zM620.929829 774.178743l0-142.142171-39.356343 2.929371c-159.213714 11.856457-371.143314 58.177829-490.929371 143.892114 58.357029-214.571886 244.000914-368.107886 497.929143-398.357943l32.356571-3.856457 0-138.642286 310.357943 268.106971L620.929829 774.178743z" p-id="3765"></path></svg></i>
                                <span>转发</span>
                            </div>
                            <div>
                                <i class="el-icon-chat-line-square"></i>
                                <span>{{item.article.review_num}}</span>
                            </div>
                            <div>
                                <i><svg t="1572605884556" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2324" width="14" height="14"><path d="M936.24990606 410.90076786L665.56644238 410.90076786c104.88668387-387.37260658-72.26779421-407.15747214-72.2677942-407.15747215-75.08538823 0-59.51992718 59.37206158-65.19819378 69.26973384 0 189.4424485-201.21579975 337.88773831-201.21579975 337.88773831l0 537.22669397c0 53.02898233 72.26779421 72.12807851 100.61721372 72.12807851l406.70106852 0c38.27619954 0 69.44554325-100.37969806 69.44554325-100.37969807 100.61837881-342.13625173 100.61837881-443.93522517 100.61837881-443.93522517C1004.2680229 405.25277298 936.24990606 410.90076786 936.24990606 410.90076786L936.24990606 410.90076786 936.24990606 410.90076786zM936.24990606 410.90076786" p-id="2325" fill="#8a8a8a"></path><path d="M215.80392107 411.07890517L53.72007765 411.07890517c-33.47348253 0-33.98926563 32.8773632-33.98926563 32.8773632l33.47348252 541.8128532c0 34.48525483 34.54463431 34.48525483 34.54463431 34.48525482L228.03367595 1020.25437639c29.22497024 0 28.96649671-22.81203257 28.96649671-22.81203257L257.00017266 452.16571278C257.00017266 410.55264313 215.80392107 411.07890517 215.80392107 411.07890517L215.80392107 411.07890517 215.80392107 411.07890517zM215.80392107 411.07890517" p-id="2326" fill="#8a8a8a"></path></svg></i>
                                <span>{{item.article.praise_num}}</span>
                            </div>
                            
                        </div>
                    </div>
                    <div class="isLoad" v-if="isLoad"><i class='el-icon-loading'></i>加载中</div>
                    <div class="noNews" v-if="operationItem[1].noOperationData">暂无更多数据</div>
                </div> -->
            </div>

        </div>

    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { operationList,integralList } from '../../api/api'
export default {

    data () {
        return {
            currNum:0,
            integralList:'',
            integralAdd:0,
            integralReduce:0,
            currNum:0,
            page:1,
            isLoad:true,
            noIntegralData:false,
            scrollHeight:0,
        }
    },
    mounted() {
        this.getIntegralList();
        window.addEventListener('scroll', this.scrollLoad)
    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        getIntegralList(i){
            
            integralList({
                token:this.$store.state.userInfo.token,
                page:this.page
            }).then((res) => {
                this.isLoad = false
                if(res.status == 0){
                    if(this.integralList){
                        this.integralList.push.apply(this.integralList,res.info)

                    }else{
                        this.integralList = res.info
                        this.integralAdd = res.integral_add
                        this.integralReduce = res.integral_reduce
                    }
                    
                }else{
                    this.noIntegralData= true

                } 
                
            })
            
        },
        scrollLoad(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let offestHeight = document.body.offsetHeight

            if(scrollTop + innerHeight >= offestHeight  && !this.isLoad){
                
                var currIndex = ''

                for(var i in this.integralList){
                    if(i == this.currNum){
                        currIndex = i
                        this.page += 1
                        
                    }
                }
                
                setTimeout(() => {
                    
                    if(!this.noIntegralData){

                        this.isLoad = true
                        this.getIntegralList()
                        
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
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}

.content ul{height:0.4rem;display:flex;flex-direction: row;justify-content: center;align-items: center;background:#fff;}
.content ul li{width:33.3%;font-size:0.14rem;color:#444;padding:0.1rem 0;}
.content ul .show span{border-bottom:0.02rem solid #F35353;color:#F35353;padding:0.1rem 0}

/* .operation_wrapper{} */
.operation_wrapper .operation_container{display: flex;flex-direction: column;padding:0 0.1rem;background:#fff;}
.operation_container .totals_num{display: flex;flex-direction: row;justify-content: flex-start;padding:0.1rem 0;position:relative;}
.operation_container .totals_num label{font-size:0.13rem;color:#666;}
.operation_container .totals_num>div{margin-left:0.1rem;}
.operation_container .totals_num .up span{font-size:0.13rem;color:#52B3BD;font-size:0.15rem;}
.operation_container .totals_num .down span{font-size:0.13rem;color:#EC414D;font-size:0.15rem;}
.operation_container .totals_num .drop_down{position:absolute;right:0.1rem;font-size:0.13rem;}
.operation_wrapper .operation_item{border-bottom:0.01rem solid #ddd;padding:0.1rem 0;}
.operation_wrapper .operation_item h4{font-size:0.13rem;font-weight:normal;text-align:left;}
.operation_wrapper .operation_item .operation_type{display: flex;flex-direction: row;margin-top:0.1rem;}
.operation_wrapper .operation_item .operation_type>div{width:33.3%;display: flex;flex-direction: row;justify-content: center;align-items: center;font-size:0.12rem;color:#666;}
.operation_wrapper .operation_item .operation_type>div i{font-size:0.16rem;margin-top:0.01rem;}

.operation_wrapper .operation_item{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;text-align:left;position:relative;}
.operation_wrapper .operation_item img{width:0.4rem;margin-right:0.05rem;}
.operation_wrapper .operation_item h4{font-size:0.14rem;}
.operation_wrapper .operation_item span{font-size:0.13rem;color:#666}
.operation_wrapper .operation_item .follow{position:absolute;right:0;top:50%;transform: translate(0,-50%);font-size:0.16rem;}


.operation_container .isLoad,.operation_container .noNews{font-size:0.13rem;margin:0.1rem;}



</style>
