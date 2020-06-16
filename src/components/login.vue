<template>
    <div class="flex">
        <div class="flex_bg"><img src="../assets/login_foot_bg.png"></div>
        <div class="content">
            <div class="form_option">
                <div class="login_text">
                    <span :class="{'login_on':quick_login}" @click="quickLogin()">快速登录</span> /
                    <span :class="{'login_on':account_login}" @click="accountLogin()">账号登录</span> 
                    
                </div>
                <div class="register" :class="{'login_on':register_login}" @click="register()">注册</div>
            </div>
            <div class="form_container">
                <div class="login_wrapper" :class="{'show':register_login == false}">
                    <div class="common_login" :class="{'on':account_login}">
                        <div class="phone">
                            <i class="el-icon-user"></i>
                            <input type="number" placeholder="请输入手机号" v-model="account_form.user_name">
                        </div>
                        <div class="password">
                            <i class="el-icon-lock"></i>
                            <input type="password" placeholder="请输入密码" v-model="account_form.password">
                        </div>
                        <div class="login_other">
                            <div class="remember">
                                <div class="radio"><i class="el-icon-circle-check" :class="{'el-icon-success':is_checked}" @click="isChecked()"></i></div>
                                <span>记住密码</span>
                            </div>
                            <div class="forget" @click="forgetSubmit()">忘记密码？</div>
                        </div>
                        
                    </div>
                    <div class="common_login" :class="{'on':quick_login}" >
                        <div class="phone">
                            <i class="el-icon-user"></i>
                            <input type="number" placeholder="请输入手机号" v-model="quick_form.user_name">
                        </div>
                        <div class="code">
                            <i class="el-icon-lock"></i>
                            <input type="number" placeholder="请输入验证码" v-model="quick_form.code">
                            <span @click="sendMsg(2)" :class="{'is_send':quick_form.is_send}">{{quick_form.code_text > 0 ? quick_form.code_text + 's' : quick_form.code_text}}</span>
                        </div>
                        <div class="login_other">
                            <p><i class="el-icon-warning-outline"></i><span>未注册手机号码自动创建享诠财经账号</span></p>
                        </div>
                    </div>

                    <div class="login_submit" @click="loginSubmit()"><input type="submit" value="登录"></div>
                </div>
                <div class="register_wrapper" :class="{'show':register_login}">
                    <div class="phone">
                        <i class="el-icon-user"></i>
                        <input type="number" placeholder="请输入手机号" v-model="register_form.user_name">
                    </div>
                    <div class="password">
                        <i class="el-icon-lock"></i>
                        <input type="password" placeholder="请输入6位以上包含字符和数字密码" v-model="register_form.password">
                    </div>
                   <div class="code">
                        <i class="el-icon-lock"></i>
                        <input type="number" placeholder="请输入验证码" v-model="register_form.code">
                        <span @click="sendMsg(3)" :class="{'is_send':register_form.is_send}">{{register_form.code_text > 0 ? register_form.code_text + 's' : register_form.code_text}}</span>
                        
                    </div>
                    <div class="register_submit"><input type="submit" value="注册登录" @click="loginSubmit()"></div>
                </div>
            </div>
            <!-- <ul class="other_login">
                <li>
                    <img src="../../static/images/wx.png">
                </li>
                <li>
                    <img src="../../static/images/qq.png">
                </li>
                <li>
                    <img src="../../static/images/wb.png">
                </li>
            </ul> -->
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
import utils from '@/utils/utils.js';
import mui from '../../static/js/mui.min.js'
import { chklogin,sendMsg,regAccount } from '../api/api'
export default {
    data () {
        return {
            login_type:1,
            account_login: false,
            quick_login:true,
            register_login:false,
            is_checked:false,
            account_form:{
                user_name:'',
                password:'',
            },
            quick_form:{
                user_name:'',
                code:'',
                code_text:'发送验证码',
                is_send:false
            },
            register_form:{
                user_name:'',
                password:'',
                code:'',
                code_text:'发送验证码',
                is_send:false
            },

        }
    },
    beforeCreate() {
        if(this.$store.state.userInfo.token){
            this.$router.go(-2);
        }
    },
    mounted() {

        if(this.getCookie('isLoginData') != ''){
            this.is_checked = true
            var getLoginData = JSON.parse(this.getCookie('isLoginData'))
            this.account_form.user_name = getLoginData.account
            this.account_form.password = utils.decrypt(getLoginData.password)
        }

    },
    methods: {
        accountLogin(){
            this.login_type = 2
            this.account_login = true
            this.quick_login = false
            this.register_login = false
        },
        quickLogin(){
            this.login_type = 1
            this.account_login = false
            this.quick_login = true
            this.register_login = false
        },
        register(){
            this.login_type = 3
            this.account_login = false
            this.quick_login = false
            this.register_login = true
            
        },
        isChecked(){
            if(this.is_checked == false){
                this.is_checked = true
            }else{
                this.is_checked = false
            }
            
        },
        setCookie(name,value,day){
            var date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = name + '=' + value + ';expires='+ date;
        },
        getCookie(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1){
                var cnameValue = unescape(c.substring(name.length, c.length));
                return cnameValue;
                } 
            }
            return "";
        },
        forgetSubmit(){
            mui.toast("请使用快速登录！",{duration: 1500})
            setTimeout(() => {
                this.login_type = 1
                this.account_login = false
                this.quick_login = true
                this.register_login = false
            },1500)
        },
        loginSubmit(){
            var that = this
            var regPhone = new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
            var regPassword = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/);
            switch (this.login_type){
                case 2:

                    if(!regPhone.test(this.account_form.user_name)){
                        mui.toast("请输入正确的手机号码")
                        return false;

                    }else if(this.account_form.password == "" || this.account_form.password == undefined || this.account_form.password == null){
                        mui.toast("请输入密码")
                        return false;

                    }else{
                        chklogin({
                            login_method:'1',
                            account:this.account_form.user_name,
                            password:md5(this.account_form.password)
                        }).then((res)=>{
                            if(res.status != 0){
                                mui.toast(res.msg)
                            }else{
                                if(this.is_checked){
                                    var loginData = {
                                        account:this.account_form.user_name,
                                        password:utils.encrypt(this.account_form.password)
                                    }
                                    this.setCookie('isLoginData',JSON.stringify(loginData),7)
                                }else{
                                    this.setCookie('isLoginData', null, -1);
                                }
                                sessionStorage.setItem("userInfo",JSON.stringify(res.info))
                                mui.toast("登陆成功！",{duration: 1500})
                                setTimeout(() => {this.$router.push({path:this.globalData.toPath})},1500)
                            }

                        })
                    }

                    break;
                case 1:
                    
                    if(!regPhone.test(this.quick_form.user_name)){
                        mui.toast("请输入正确的手机号码")
                        return false;

                    }else if(this.quick_form.code == "" || this.quick_form.code == undefined || this.quick_form.code == null){
                        mui.toast("请输入验证码")
                        return false;

                    }else{
                        chklogin({
                            login_method:'2',
                            account:this.quick_form.user_name,
                            code:this.quick_form.code
                        }).then((res)=>{
                            if(res.status != 0){
                                mui.toast(res.msg)
                            }else{
                                sessionStorage.setItem("userInfo",JSON.stringify(res.info))
                                mui.toast("登陆成功！",{duration: 1500})
                                setTimeout(() => {this.$router.push({path:this.globalData.toPath})},1500)
                            }

                        })
                    }

                    break;
                case 3:
                    
                    if(!regPhone.test(this.register_form.user_name)){
                        mui.toast("请输入正确的手机号码")
                        return false;

                    }else if(!regPassword.test(this.register_form.password)){
                        mui.toast("请输入6-16位数字与字母组成的密码")
                        return false;

                    }else if(this.register_form.code == "" || this.register_form.code == undefined || this.register_form.code == null){
                        mui.toast("请输入验证码")
                        return false;

                    }else{
                        regAccount({
                            type:'1',
                            tel:this.register_form.user_name,
                            password:md5(this.register_form.password),
                            code:this.register_form.code
                        }).then((res)=>{
                            if(res.status != 0){
                                mui.toast(res.msg)
                            }else{
                                sessionStorage.setItem("userInfo",JSON.stringify(res.info))
                                mui.toast("登陆成功！",{duration: 1500})
                                setTimeout(() => {this.$router.push({path:this.globalData.toPath})},1500)
                            }

                        })
                    }

                    break;
            } 
        },
        sendMsg(send_type){
            var that = this
            var regPhone = new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
            if(send_type == 2){
                if(!regPhone.test(this.quick_form.user_name)){
                    mui.toast("请输入正确的手机号码")
                    return false;

                }else if(!this.quick_form.is_send){
                    that.quick_form.is_send = true
                    that.quick_form.code_text = 60;
                    sendMsg({
                        tel:this.quick_form.user_name
                    }).then((res) => {
                        mui.toast(res.msg)
                        if(res.status == 0){

                            var time = setInterval(function() {
                                that.quick_form.code_text--;

                                if(that.quick_form.code_text == 0) {
                                    clearInterval(time);
                                    that.quick_form.code_text = '重新获取验证码'
                                    that.quick_form.is_send = false
                                }
                            }, 1000);

                        }

                    })

                }

            }else if(send_type == 3){
                if(!regPhone.test(this.register_form.user_name)){
                    mui.toast("请输入正确的手机号码")
                    return false;

                }else if(!this.register_form.is_send){
                    
                    sendMsg({
                        tel:this.register_form.user_name
                    }).then((res) => {
                        if(res.status !=0){
                            mui.toast(res.msg)
                        }else{
                            mui.toast(res.msg)
                            that.register_form.code_text = 60;
                            that.register_form.is_send = true
                            var time = setInterval(function() {
                                that.register_form.code_text--;

                                if(that.register_form.code_text == 0) {
                                    clearInterval(time);
                                    that.register_form.code_text = '重新获取验证码'
                                    that.register_form.is_send = false
                                }
                            }, 1000);

                        }

                    })

                }

            }
        }
    },
}
</script>

<style scoped>
.flex{position:absolute;top:0;bottom:0;right:0;left:0;}
.flex .flex_bg{width:100%;position: absolute;top:0;bottom:0;right:0;left:0;background:linear-gradient(15deg,rgba(15,101,219,1),rgba(10,143,236,1),rgba(10,196,236,1));}
.flex .flex_bg img{width:100%;position:absolute;bottom:0;right:0;left:0}

.flex .content{margin:0 0.2rem;padding:0.1rem;background:#fff;position: absolute;border-radius: 0.1rem;top:50%;left:0;right:0;transform: translate(0,-50%)}

.content .form_option{display: flex;flex-direction: row;justify-content: space-between;align-items: center;font-size:0.15rem;padding:0.1rem;color:#888;}
.content .form_option .login_on{color:#444;}
.form_container>div{display: none;}
.form_container>div.show{display: block}
.form_container>div .common_login{display: none;}
.form_container>div .common_login.on{display: flex;flex-direction: column;}
.form_container>div .phone{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin:0.05rem 0.2rem;border-bottom:0.01rem solid #ddd;}
.form_container>div .phone i{font-size:0.18rem;color:#666;}
.form_container>div .phone input{border:0;outline:0;padding:0.05rem;font-size:0.13rem;margin:0}
.form_container>div .password{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin:0.05rem 0.2rem;border-bottom:0.01rem solid #ddd;}
.form_container>div .password i{font-size:0.18rem;color:#666;}
.form_container>div .password input{border:0;outline:0;padding:0.05rem;font-size:0.13rem;margin:0}
.form_container>div .code{display: flex;flex-direction: row;justify-content: space-between;align-items: center;margin:0.05rem 0.2rem;border-bottom:0.01rem solid #ddd;}
.form_container>div .code .code_input{display: flex;flex-direction: row;justify-content: space-between}
.form_container>div .code i{font-size:0.18rem;color:#666;}
.form_container>div .code input{width:50%;border:0;outline:0;padding:0.05rem;font-size:0.13rem;margin:0}
.form_container>div .code span{width:45%;font-size:0.11rem;padding:0.04rem 0.05rem;background:#0AA7EC;color:#fff;border-radius:0.1rem;}

.form_container>div .code span.is_send{background:#ccc;}


.form_container .login_submit{display:flex;background:#0B80E7;margin:0.1rem 0.2rem;justify-content: center;border-radius: 0.1rem;font-size:0.14rem;}
.form_container .register_submit{display:flex;background:#0B80E7;margin:0.15rem 0.2rem 0.1rem 0.2rem;justify-content: center;border-radius: 0.1rem;font-size:0.14rem;}
.form_container .login_submit input,.form_container .register_submit input{font-size:0.14rem;background:transparent;border:none;}
.form_container .login_other{display: flex;font-size:0.12rem;padding:0 0.2rem;margin:0.05rem 0 0.15rem 0;flex-direction: row;flex-direction: row;justify-content: space-between}
.form_container .login_other .remember{display: flex;flex-direction: row;justify-content: flex-start;align-items: center}
.form_container .login_other .radio{width:0.1rem;height:0.1rem;display: flex;align-items: center;}
.form_container .login_other .radio i{font-size:0.14rem;color:#888;}
.form_container .login_other .radio i.el-icon-success{color:#0B80E7}
.form_container .login_other .remember span{margin-left:0.06rem;font-size:0.12rem;color:#888}
.form_container .login_other .forget{color:#888;font-size:0.12rem;}
.form_container>div .login_other p{font-size:0.12rem;display: flex;align-items: center;}
.form_container>div .login_other p i{font-size:0.12rem;}
.content .other_login{width:80%;display: flex;flex-direction: row;justify-content: space-around;margin:0.15rem auto 0.1rem;}
.content .other_login li img{width:0.2rem;}





</style>
