<template>
    <div class="flex">
        <div class="header">
            <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
            <div class="header_text" v-if="restType == 1">修改登录密码</div>
            <div class="header_text" v-if="restType == 2">修改昵称</div>
            <div class="header_text" v-if="restType == 3">修改手机号</div>
            <div class="header_text" v-if="restType == 4">修改邮箱</div>
            <div class="back"></div>
        </div>
        <div class="content">
            <div class="password_wrapper" v-if="restType == 1">
                <h4>输入新登录密码</h4>
                <div class="reset_password reset_wrapper">
                    <input type="password" placeholder="6-16位数字与字母组成的密码" v-model='password'>
                    <input type="password" placeholder="请再次输入新登录密码" v-model='passwordAgain'>
                    <input type="submit" value="完成" class="submit" @click="resetSubmit()">
                </div>
            </div>
            <div class="nickname_wrapper" v-if="restType == 2">
                <h4>输入新昵称</h4>
                <div class="reset_nickname reset_wrapper">
                    <input type="text" placeholder="不超过8个字符" v-model='nickname' maxlength="8" minlength="2">
                    <input type="submit" value="完成" class="submit" @click="resetSubmit()">
                </div>
            </div>
            <div class="phone_wrapper" v-if="restType == 3">
                <h4>输入新手机号</h4>
                <div class="reset_phone reset_wrapper">
                    <input type="number" placeholder="请输入新手机号" v-model='phone'>
                    <div class="get_code">
                        <input type="number" placeholder="请输入验证码" v-model="code">
                        <span @click="sendMsg()" :class="{'is_send':is_send}">{{code_text > 0 ? code_text + 's' : code_text}}</span>
                    </div>
                    <input type="submit" value="完成" class="submit" @click="resetSubmit()">
                </div>
            </div>
            <div class="nickname_wrapper" v-if="restType == 4">
                <h4>输入新邮箱</h4>
                <div class="reset_email reset_wrapper">
                    <input type="text" placeholder="请输入邮箱" v-model='email'>
                    <input type="submit" value="完成" class="submit" @click="resetSubmit()">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
import mui from '../../../static/js/mui.min.js'
import { updateUserInfo,sendMsg } from '../../api/api'
export default {

    data () {
        return {
            restType:this.$route.query.type,
            password:'',
            passwordAgain:'',
            nickname:'',
            phone:'',
            code:'',
            code_text:'发送验证码',
            is_send:false,
            email:'',
        }
    },

    mounted() {

    },
    methods:{
        goBack(){
            this.$router.go(-1);
    
        },
        resetSubmit(){

            var regPhone = new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
            var regPassword = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/);
            var regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(this.restType == 1){
                if(!regPassword.test(this.password)){
                    mui.toast("请输入6-16位数字与字母组成的密码")
                    return false;

                }else if(this.password != this.passwordAgain){
                    mui.toast("两次输入的密码不一致")
                    return false;

                }else{
                    updateUserInfo({
                        type:'password',
                        info:md5(this.password),
                        token:this.$store.state.userInfo.token,
                    }).then((res) => {
                        mui.toast(res.msg,{duration: 1500})
                        if(res.status == 0){
                            setTimeout(() => {this.$router.push('/mine')},1500)
                        }

                    })


                }
            }else if(this.restType == 2){

                if(this.nickname.length < 2 && this.nickname.length > 8){
                    mui.toast("请输入正确的昵称")
                    return false;

                }else{
                    updateUserInfo({
                        type:'nickname',
                        info:this.nickname,
                        token:this.$store.state.userInfo.token,
                    }).then((res) => {
                        mui.toast(res.msg,{duration: 1500})
                        if(res.status == 0){
                            setTimeout(() => {this.$router.push('/mine')},1500)
                        }

                    })


                }

            }else if(this.restType == 3){
                if(!regPhone.test(this.phone)){
                    mui.toast("请输入正确的手机号码")
                    return false;

                }else if(this.code == "" || this.code == undefined || this.code == null){
                    mui.toast("请输入验证码")
                    return false;

                }else{
                    updateUserInfo({
                        type:'tel',
                        info:this.phone,
                        code:this.code,
                        token:this.$store.state.userInfo.token,
                    }).then((res) => {
                        mui.toast(res.msg,{duration: 1500})
                        if(res.status == 0){
                            setTimeout(() => {this.$router.push('/mine')},1500)
                        }

                    })
                }

            }else if(this.restType == 4){
                if(!regEmail.test(this.email)){
                    mui.toast("请输入正确的邮箱")
                    return false;

                }else{
                    updateUserInfo({
                        type:'email',
                        info:this.email,
                        token:this.$store.state.userInfo.token,
                    }).then((res) => {
                        mui.toast(res.msg,{duration: 1500})
                        if(res.status == 0){
                            setTimeout(() => {this.$router.push('/mine')},1500)
                        }

                    })
                }

            }
  
        },
        sendMsg(){
            var that = this
            var regPhone = new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
            if(!regPhone.test(this.phone)){
                mui.toast("请输入正确的手机号码")
                return false;

            }else if(!this.is_send){
                that.is_send = true
                that.code_text = 60;
                sendMsg({
                    tel:this.phone
                }).then((res) => {
                    mui.toast(res.msg)
                    if(res.status == 0){

                        var time = setInterval(function() {
                            that.code_text--;

                            if(that.code_text == 0) {
                                clearInterval(time);
                                that.code_text = '重新获取验证码'
                                that.is_send = false
                            }
                        }, 1000);

                    }

                })

            }
        }
        
        
    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;bottom:0;left:0;right:0;background:#fff}
.flex .header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;position:fixed;top:0;left:0;right:0;}
.flex .header .back i{font-size:0.22rem;color:#fff;}
.flex .header .header_text{text-align: center;color:#fff;font-size:0.15rem;}
.content{margin-top:0.46rem;padding:0.15rem;}

.content h4{text-align:left;font-size:0.15rem}
.content .reset_wrapper{margin:0.15rem 0}
.content .reset_wrapper input{width:100%;height:auto;font-size:0.13rem;padding:0.07rem 0.1rem;background:#E9F1F7;border:0}
.content input.submit{font-size:0.14rem;background:#168CE3}

.phone_wrapper .get_code{width:100%;margin-bottom:0.14rem;display: flex;flex-direction: row;justify-content: center;align-items: center;}
.phone_wrapper .get_code input{width:60%;border:0;outline:0;padding:0.05rem 0.1rem;font-size:0.13rem;margin:0;display:block;}
.phone_wrapper .get_code span{width:40%;font-size:0.11rem;padding:0.05rem;margin-left:0.05rem;background:#0AA7EC;color:#fff;border-radius:0.1rem;display:block;}

.phone_wrapper .get_code span.is_send{background:#ccc;}



</style>
