<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text">收货地址</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="address" v-for="(item,index) in addressList" :key="index">
                <div class="address_info">
                    <div class="address_info_left" @click="$router.push({path:'../pages/orderdetails',query:{info:JSON.stringify(goodsDetails),id:JSON.stringify(item)}})">
                        <div class="receive_name">
                            <span>{{item.name}}</span>，
                            <span>{{item.mobile}}</span>
                            <span class="tag" v-if="item.tag != 0">{{item.tag_c}}</span>
                        </div>
                        <div class="receive_address">
                            <span>{{item.province}} {{item.city}} {{item.district}} {{item.remark}}</span>
                        </div>
                    </div>
                    <div class="icon" @click="delAddress(item.id)"><i class="el-icon-close"></i></div>
                </div>
                <div class="address_other">
                    <div class="default" v-if="item.is_default == 1"><i class="el-icon-success"></i><label>默认地址</label></div>
                    <div v-else></div>
                    <div class="edit_address" @click="mangeAddress(2,item.id)">编辑</div>
                </div>
            </div>
            <div class="add_address" @click="mangeAddress(1)">
                <i class="el-icon-circle-plus"></i>
                <span>新增地址</span>
            </div>
        </div>
        <transition name="el-fade-in-linear">
            <div class="address_flex" v-show="isshow">
                <div class="shade"></div>
                <div class="address_container">
                    <h5 v-html=addressInfo.title></h5>
                    <div class="address_name">
                        <input type="text" placeholder="收货姓名" v-model=addressInfo.name maxlength="5" minlength="1">
                        <input type="number" placeholder="手机号码" v-model=addressInfo.mobile>
                    </div>
                    <div class="option_city" @click="selectAddress()">
                        <label v-if=!addressInfo.district>选择地区</label>
                        <div class="city_value" v-else>{{addressInfo.province}} {{addressInfo.city}} {{addressInfo.district}}</div>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <div class="address_explicit">
                        <textarea type="text" placeholder="详细地址（如街道，小区，乡镇，村）" v-model=addressInfo.remark></textarea>
                    </div>
                    <div class="address_default_tags">
                        <label>标签</label>
                        <ul class="tag_list">
                            <li v-for="(item,index) in tagsList" :key="index" :class="{'active' : item.state == addressInfo.tag }" @click="selectTag(item.state,item.value)">{{item.value}}</li>
                        </ul>
                    </div>
                    <div class="default_address">
                        <el-switch v-model="addressInfo.is_default" active-color="#13ce66"></el-switch>
                        <label>设为默认</label>
                    </div>
                    <div class="submit_address" @click="submitAddress()">保存</div>
                    <div class="icon" @click="close"><i class="el-icon-close"></i></div>
                </div>
            </div>
        </transition>
        <div class="select_address" v-show="showAddress">
            <v-distpicker type="mobile" @selected='selectedAddress'></v-distpicker>
        </div>

        <div class="address_shade" v-show="showAddress" @click="closeShade()"></div>

    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import VDistpicker from 'v-distpicker'

import { addressList,delAddress,addressSave,getAreas } from '../../api/api'
export default {
    components: { VDistpicker },
    data () {
        return {
            goodsDetails:JSON.parse(this.$route.query.info),
            addressList:'',
            addressInfo:{
                token:this.$store.state.userInfo.token,
                title:'',
                name:'',
                mobile:'',
                province:'',
                city:'',
                district:'',
                province_id:'',
                city_id:'',
                district_id:'',
                remark:'',
                is_default:false,
                id:'',
                tag:'',
                tag_c:'',
            },
            tagsList:[
                {
                    state:1,
                    value:'家'
                },
                {
                    state:2,
                    value:'公司'
                },
                {
                    state:3,
                    value:'学校'
                }
            ],
            isshow:false,
            showAddress:false
        }
    },
    mounted() {
        this.getAddress()
    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        close(){
            this.isshow = false
        },
        closeShade(){
            this.showAddress = false
        },
        getAddress(){
            addressList({
                token:this.$store.state.userInfo.token,
            }).then((res) => {

                this.addressList = res.info

            })

        },
        delAddress(id){
            var that = this
            mui.confirm("确认删除该收货地址吗？",function(e){
                
                if(e.index == 1){
                    delAddress({
                        token:that.$store.state.userInfo.token,
                        id:id
                    }).then((res) => {
                        mui.toast(res.msg,{duration: 1500})
                        if(res.status == 0){
                            that.getAddress()
                            
                        }

                    })
                }

            })
            
        },
        mangeAddress(type,id){
            this.isshow = true
            switch(type){
                case 1:
                    this.addressInfo.title = "新增收货地址"
                    this.addressInfo.name = ""
                    this.addressInfo.mobile = ""
                    this.addressInfo.province = ""
                    this.addressInfo.city = ""
                    this.addressInfo.district = ""
                    this.addressInfo.province_id = ""
                    this.addressInfo.city_id = ""
                    this.addressInfo.district_id = ""
                    this.addressInfo.remark = ""
                    this.addressInfo.is_default = false
                    this.addressInfo.id = ""
                    this.addressInfo.tag = ""
                    this.addressInfo.tag_c = ""
                    break;
                case 2:
                    this.editId = id
                    for(var i in this.addressList){
                        if(id == this.addressList[i].id){
                            this.addressInfo.title = "编辑地址"
                            this.addressInfo.name = this.addressList[i].name
                            this.addressInfo.mobile = this.addressList[i].mobile
                            this.addressInfo.province = this.addressList[i].province
                            this.addressInfo.city = this.addressList[i].city
                            this.addressInfo.district = this.addressList[i].district
                            this.addressInfo.province_id = this.addressList[i].province_id
                            this.addressInfo.city_id = this.addressList[i].city_id
                            this.addressInfo.district_id = this.addressList[i].district_id
                            this.addressInfo.remark = this.addressList[i].remark
                            this.addressInfo.is_default = this.addressList[i].is_default == 1 ? true : false
                            this.addressInfo.id = this.addressList[i].id
                            this.addressInfo.tag = this.addressList[i].tag
                            this.addressInfo.tag_c = this.addressList[i].tag_c
                        }
                    }
                    break;
            }
        },
        selectTag(state,value){
            this.addressInfo.tag = state
            this.addressInfo.tag_c = value
        },
        selectAddress(){
            this.showAddress = true;
        },
        submitAddress(){
            var regPhone = new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
            if(this.addressInfo.name == '' && this.addressInfo.name == undefined && this.addressInfo.name == null){
                mui.toast('请输入收货人姓名',{duration: 1500})
            }else if(!regPhone.test(this.addressInfo.mobile)){
                mui.toast('请输入正确的手机号',{duration: 1500})
            }else if(this.addressInfo.district == '' && this.addressInfo.district == undefined && this.addressInfo.district == null){
                mui.toast('请输入收货人省市区',{duration: 1500})
            }else if(this.addressInfo.remark == '' && this.addressInfo.remark == undefined && this.addressInfo.remark == null){
                mui.toast('请输入收货人详细地址',{duration: 1500})
            }else{
                addressSave(this.addressInfo).then((res) => {
                    mui.toast(res.msg,{duration: 1500})
                    if(res.status == 0){
                        this.isshow = false
                        this.getAddress()
                        
                    }
                })
            }
            
        },
        selectedAddress(data){
            
            if(data.area.code != undefined && data.area.code != '' && data.area.code != null){
                this.addressInfo.province_id = data.province.code
                this.addressInfo.city_id = data.city.code
                this.addressInfo.district_id = data.area.code
                this.addressInfo.province = data.province.value
                this.addressInfo.city = data.city.value
                this.addressInfo.district = data.area.value
                this.showAddress = false;
            }
            
        },

        
        
    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.address{display:flex;flex-direction: column;justify-content: space-between;align-items: center;padding:0.1rem;background:#fff;margin-bottom:0.1rem;}
.address_info{width:100%;position:relative}
.address_info_left{width:80%;}
.address_info .address_info_left>div{display:flex;flex-direction: row;justify-content: flex-start;align-items: flex-start;}
.address_info .address_info_left>div label{height:0.2rem;line-height:0.2rem;white-space:nowrap; font-size:0.13rem;color:#999}
.address_info .address_info_left>div span{font-size:0.13rem;text-align:left;}
.address_info .receive_name span{height:0.2rem;line-height:0.2rem;margin:0 0.05rem 0.05rem 0}
.address_info .receive_name .tag{height:0.16rem;line-height:0.16rem;padding:0 0.05rem;background:#168CE3;color:#fff;margin:0.02rem 0 0 0.05rem;border-radius: 0.05rem;font-size:0.11rem;}
.address_info .receive_address span{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}

.address_info .icon{width:0.2rem;height:0.2rem;font-size:0.16rem;position:absolute;right:0;top:0;display: flex;flex-direction: row;justify-content: center;align-items: center;}

.address_other{width:100%;display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding-top:0.1rem;margin-top:0.1rem;border-top:0.01rem solid #ddd;}
.address_other .default{font-size:0.13rem;}
.address_other .default i{color:#168CE3;;font-size:0.15rem;}
.address_other .default label{color:#168CE3;vertical-align: top}
.edit_address{font-size:0.13rem;}

.add_address{width:80%;margin:0.1rem auto 0;background:#168CE3;;padding:0.05rem 0;border-radius: 0.05rem;}
.add_address i{font-size:0.16rem;color:#fff;}
.add_address span{font-size:0.15rem;color:#fff;}

.address_flex{position:absolute;left:0;right:0;top:0;bottom:0;transition: all 0.3s}
.address_flex .shade{position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,0.5);z-index:3}
.address_container{width:80%;position:absolute;left:50%;top:25%;transform: translate(-50%,-25%);background:#fff;border-radius: 0.1rem;z-index:5}
.address_container h5{font-size:0.15rem;color:#333;padding:0.1rem 0}
.address_container .icon{width:0.2rem;height:0.2rem;font-size:0.18rem;position:absolute;right:0.05rem;top:0.05rem;display: flex;flex-direction: row;justify-content: center;align-items: center;}
.address_container .address_name{display: flex;flex-direction: row;justify-content: center;}
.address_container .address_name input{width:48%;border:0;border-top:0.01rem solid #ddd;padding:0.1rem;margin:0;font-size:0.13rem;outline:none;}
.address_container .address_name input:nth-child(1){border-right:0.01rem solid #ddd;}
.address_container .option_city{width:96%;display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin:0 auto;padding:0.1rem 0;border-top:0.01rem solid #ddd;}
.address_container .option_city label{font-size:0.13rem;margin-left:0.1rem;color:#999;}
.address_container .option_city i{font-size:0.16rem;color:#666;}
.address_container .option_city .city_value{font-size:0.13rem;margin-left:0.05rem;}
.address_explicit textarea{width:96%;border:0;border-top:0.01rem solid #ddd;padding:0.05rem;margin:0 auto;font-size:0.13rem;outline:none;border-bottom:0.01rem solid #ddd;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}

.address_default_tags{display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding:0.1rem 0.1rem 0.05rem 0.1rem}
.default_address{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;padding:0.05rem 0.1rem}
.default_address label{font-size:0.12rem;color:#666;margin-left:0.03rem}
.address_default_tags ul{display: flex;flex-direction: row;justify-content: flex-end;align-items: center;}
.address_default_tags ul li{width:0.36rem;height:0.2rem;line-height:0.2rem;font-size:0.11rem;color:#666;border:0.01rem solid #ccc;margin-left:0.1rem;border-radius: 0.1rem;}
.address_default_tags ul li.active{background:#168CE3;color:#fff;border:none;}
.submit_address{width:90%;margin:0.08rem auto 0.12rem;background:#168CE3;;padding:0.05rem 0;border-radius: 0.05rem;color:#fff;}


.select_address{height:2.42rem;position:absolute;left:0;right:0;bottom:0;z-index:99;}

.distpicker-address-wrapper{height:100%;position:relative;left:0;right:0;bottom:0;}
>>>.address-header{height:0.42rem;}
>>>.address-container{height:2rem;overflow:scroll;}

.address_shade{position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9;}

</style>
