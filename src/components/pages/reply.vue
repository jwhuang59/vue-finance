<template>
    <div class="flex">
        <div class="content">
            <div class="header">
                <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
                <div class="article_text">{{replyList.length}}条回复</div>
                <div class="back"></div>
            </div>
            <div class="one_reply">
                <div class="comment_item">
                    <div class="comment_info">
                        <img :src="params.user_img">
                        <div class="info_wrapper">
                            <div class="wrapper_left">
                                <h3>{{params.nickname}}</h3>
                                <span>{{params.create_time}}</span>
                            </div>
                            <div class="wrapper_right">
                                
                            </div>
                        </div>
                    </div>
                    <div class="comment_content">{{params.content}}</div>
                </div>
            </div>
            <div class="comment">
                <h3>全部评论</h3>
                <div class="comment_wrapper">
                    <div class="comment_item" v-for="(item,index) in replyList" :key="index" >
                        <div class="comment_info">
                            <img :src="item.user_img">
                            <div class="info_wrapper">
                                <div class="wrapper_left">
                                    <h3>{{item.nickname}}</h3>
                                    <span>{{item.create_time}}</span>
                                </div>
                                <div class="wrapper_right" @click="getUserForm(2,item.id,item.nickname)">
                                    <div class="reply"><i><svg t="1572865066123" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12171" width="20" height="20"><path d="M508.586667 955.733333c-23.893333 0-44.373333-10.24-58.026667-30.72l-71.68-102.4H109.226667c-34.133333 0-64.853333-30.72-64.853334-68.266666V136.533333c0-37.546667 27.306667-68.266667 64.853334-68.266666h795.306666c34.133333 0 64.853333 30.72 64.853334 68.266666v617.813334c0 37.546667-27.306667 68.266667-64.853334 68.266666h-266.24l-71.68 102.4c-13.653333 20.48-34.133333 30.72-58.026666 30.72zM112.64 750.933333h266.24c20.48 0 40.96 10.24 51.2 27.306667l71.68 102.4c0 3.413333 3.413333 3.413333 3.413333 3.413333s3.413333 0 3.413334-3.413333l75.093333-105.813333c13.653333-17.066667 30.72-27.306667 51.2-27.306667h262.826667v-614.4h-785.066667V750.933333z m180.906667-327.68c-23.893333 0-44.373333 20.48-44.373334 44.373334S269.653333 512 293.546667 512c23.893333 0 44.373333-20.48 44.373333-44.373333s-20.48-44.373333-44.373333-44.373334z m228.693333 0c-23.893333 0-44.373333 20.48-44.373333 44.373334s20.48 44.373333 44.373333 44.373333c23.893333 0 44.373333-20.48 44.373333-44.373333s-20.48-44.373333-44.373333-44.373334z m221.866667 0c-23.893333 0-44.373333 20.48-44.373334 44.373334s20.48 44.373333 44.373334 44.373333c23.893333 0 44.373333-20.48 44.373333-44.373333s-20.48-44.373333-44.373333-44.373334z m0 0" p-id="12172" fill="#515151"></path></svg></i></div>
                                    <!-- <div class="thumbs_up"><i><svg t="1571736066203" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8021" width="16" height="16"><path d="M800.924 962.534H154.771c-44.531 0-80.77-36.227-80.77-80.758V466.392c0-44.531 36.238-80.77 80.77-80.77h138.135c28.373-27.81 58.019-65.94 58.019-103.846v-69.23c0-95.44 77.637-173.077 173.077-173.077s173.077 77.637 173.077 173.077v69.23c0 27.381-2.806 55.721-6.378 80.77h110.224c95.44 0 173.077 77.637 173.077 173.077v4.541l-92.465 346.751c-2.672 42.142-37.806 75.619-80.613 75.619zM154.771 454.853c-6.367 0-11.539 5.172-11.539 11.539v415.385c0 6.354 5.172 11.526 11.539 11.526h646.153c6.366 0 11.538-5.172 11.538-11.526v-4.541l92.219-345.828c-2.209-55.314-47.912-99.631-103.757-99.631h-193.19l8.034-41.23c5.511-28.316 12.079-70.177 12.079-108.77v-69.23c0-57.264-46.582-103.846-103.846-103.846s-103.846 46.582-103.846 103.846v69.23c0 54.132-30.322 109.311-90.122 164.006l-9.916 9.07H154.771z" p-id="8022" fill="#707070"></path><path d="M289.39 939.445c-19.122 0-34.615-15.493-34.615-34.615V443.304c0-19.123 15.493-34.615 34.615-34.615 19.121 0 34.615 15.492 34.615 34.615V904.83c0 19.122-15.494 34.615-34.615 34.615z" p-id="8023" fill="#707070"></path></svg></i><span>63</span></div> -->
                                    
                                </div>
                            </div>
                        </div>
                        <div class="comment_content" v-if="item.reply_type == 1">{{item.content}}</div>
                        <div class="comment_content" v-else><span>@{{item.to_nickname}}: </span>{{item.content}}</div>
                    </div>
                </div>
            </div>
            <div class="footer_wrapper">
                <div class="article_footer" v-if="is_comment">
                    <div class="wirte_comment" @click="getUserForm(1)">
                        <i class="el-icon-edit-outline"></i>
                        <span>写评论...</span>
                    </div>
                </div>  
                <div class="form_wrapper" v-else>

                    <div class="shade" @touchstart="getUserForm(3)" @touchend="getUserForm(3)"></div>
                    <div class="form_footer">
                        <div class="comment_content">
                            <textarea cols="3" rows="3" :placeholder="'评论 '+ commentUser + ' 的发言'" v-model="commentValue" v-if="commentUser" v-focus></textarea>
                            <textarea cols="3" rows="3" placeholder="请发表您的评论..." v-model="commentValue" v-else ref="commentInput" v-focus></textarea>
                            </div>
                        <div class="comment_operation">
                            <div class="icon"><i><svg t="1572939806414" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2191" width="30" height="30"><path d="M288.0289 400.288396c0 30.777933 24.953082 55.731014 55.732613 55.731014s55.733013-24.953082 55.733013-55.731014c0-30.778532-24.953482-55.731014-55.733013-55.731014S288.0289 369.509864 288.0289 400.288396zM622.406792 400.288396c0 30.777933 24.953881 55.731014 55.733013 55.731014 30.779132 0 55.732014-24.953082 55.732014-55.731014 0-30.778532-24.953082-55.731014-55.732014-55.731014C647.360873 344.557382 622.406792 369.509864 622.406792 400.288396zM510.941765 762.511409c-78.007911 0-156.033809-39.054521-200.61998-100.314787-16.763035-22.293685-27.822536-50.114822-39.05632-72.407708-5.528652-16.763634 5.525654-33.437329 16.763634-39.054521 16.763634-5.53025 27.823136 5.529251 33.440327 16.761636 5.528652 22.292885 16.763035 39.05552 27.822137 55.731014 44.586171 55.731014 100.318784 83.640092 161.558463 83.640092 61.266261 0 122.616666-27.820937 156.055794-78.0229 11.146443-16.762635 22.293685-38.968579 27.822936-55.731014 5.616192-16.761636 22.292885-22.292885 33.438329-16.761636 16.764634 5.528252 22.294884 22.290887 16.764634 33.437329-5.617192 27.822137-22.292885 50.114023-39.05652 72.407708C666.993562 723.54283 588.966665 762.511409 510.941765 762.511409zM510.941765 956.900214c-243.33382 0-445.129003-201.789787-445.129003-445.149589 0-243.344412 201.795183-445.134998 445.129003-445.134998 243.351408 0 445.14719 201.790586 445.14719 445.134998C956.088756 755.110427 754.293173 956.900214 510.941765 956.900214zM510.941765 125.999564c-213.638553 0-385.743466 172.100316-385.743466 385.751061 0 213.665135 172.104913 385.761054 385.743466 385.761054 213.655542 0 385.756457-172.095919 385.756457-385.761054C896.698223 298.09988 724.597307 125.999564 510.941765 125.999564z" p-id="2192" fill="#666666"></path></svg></i></div>
                            <div class="report_submit" @click="operation(3)" :class="{'disabled':commentValue == ''}">发表</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { comment,commentReply } from '../../api/api'
export default {

    data () {
        return {
            params: JSON.parse(localStorage.getItem('params')),
            replyList:'',
            praise_status:0, 
            collect_status:0,
            commentList:'',
            is_comment:true,
            commentValue:'',
            commentId:'',
            toUserId:'',
            replyType:'',
            commentUser:'',
            commentStatus:false
        }
    },
    mounted() {

        this.getCommentInfo(); 

    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        getCommentInfo(){

            commentReply({
                id:this.params.id
            }).then((res) => {
                this.replyList = res.info

            })

        },
        operation(type,id,userId){

            if(this.$store.state.userInfo.token){
                
                if(this.commentValue){
                    comment({
                        token:this.$store.state.userInfo.token,
                        id:id || this.params.id,
                        type:6,
                        content:this.commentValue,
                        to_uid:userId || this.params.userId,
                        reply_type:this.replyType
                        
                    }).then((res) => {
                        mui.toast(res.msg,{duration: 1500})
                        if(res.status == 0){
                            this.is_comment = true
                            this.commentStatus = true  

                        }

                    })

                }else{
                    mui.toast("请输入评论内容")
                }

            }else{
                mui.toast("请先登录哟")
            }
        },
        getUserForm(i,id,user){
            this.commentValue = ''
            if(i == 1){
                this.is_comment = false
                this.commentUser = ''
                this.commentType = ''
                this.commentId = ''
                this.replyType = 1
            }else if(i == 2){
                this.is_comment = false,
                this.commentUser = user
                this.commentId = id
                this.commentType = 6
                this.replyType = 2
            }else{
                this.is_comment = true
                
            }

        },
        
        
    },
    beforeDestroy() {
        // localStorage.removeItem('params')
    },
    watch: {
        commentStatus:{
            handler(newVal, oldVal) {
                if (newVal) {
                    this.getCommentInfo();
                    this.commentStatus = false

                }
            },
            deep:true
        }
    },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;margin-bottom:0.46rem;}
.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.header .article_text{text-align: center;color:#fff;font-size:0.15rem;}

.content .one_reply{padding:0.1rem;}
.one_reply .comment_content{font-size:0.13rem;text-align: left;margin-left:0.45rem;}

.comment{padding:0 0.1rem;}
.comment>h3{text-align:left;font-size:0.15rem;color:#444;position:relative;padding:0.05rem 0 0.05rem 0.05rem}
.comment>h3:before{content:"";height:0.16rem;border-left:0.03rem solid #EA5727;position:absolute;left:0;top:50%;transform:translate(0,-50%)}

.comment .comment_wrapper .comment_item{padding:0.05rem 0;border-bottom:0.01rem solid #ddd;}
.comment_info{display: flex;flex-direction: row;}
.comment_info img{width:0.4rem;height:0.4rem;display:block;}
.comment_info .info_wrapper{width:100%;display:flex;flex-direction: row;justify-content: space-between;padding:0 0.05rem;}
.comment_info .wrapper_left{display: flex;flex-direction: column;justify-content: center;}
.comment_info .info_wrapper h3{font-size:0.14rem;font-weight:normal;text-align: left;}
.comment_info .info_wrapper span{font-size:0.11rem;color:#666}
.comment_info .wrapper_right{display: flex;flex-direction: row;justify-content: center;align-items: center}
.comment_info .wrapper_right .thumbs_up{padding-top:0.04rem;display: flex;flex-direction: row;justify-content: center;align-items: center;}
.comment_info .wrapper_right .reply{display: flex;flex-direction: row;justify-content: center;align-items: center;}
.comment_info .wrapper_right .reply i{font-size:0.15rem;}
.comment_info .wrapper_right .thumbs_up i{margin-right:0.02rem;}
.comment .comment_wrapper .comment_content{font-size:0.13rem;text-align: left;margin-left:0.45rem;}
.comment_content span{color:#168CE3}
.comment .comment_wrapper .comment_totals{font-size:0.13rem;color:#168CE3;text-align: left;margin-left:0.45rem;margin-top:0.06rem;}

.comment .no_comment{padding:0.05rem 0.1rem;font-size:0.13rem;}

.article_footer{height:0.4rem;position:fixed;bottom:0;left:0;right:0;display: flex;flex-direction: row;align-items:center;justify-content:space-between;background:#fff;padding:0 0.1rem}
.article_footer .wirte_comment{width:100%;height:0.28rem;padding:0 0.05rem;display:flex;flex-direction: row;justify-content: flex-start;background:#eee;align-items:center;}
.article_footer .wirte_comment span{font-size:0.14rem;background:transparent;border:0;outline:0;margin:0;padding:0}
.article_footer .wirte_comment i{font-size:0.16rem;margin-right:0.05rem;}
/* .form_wrapper{position:relative;} */
.form_wrapper .shade{position:fixed;right:0;left:0;bottom:0;top:0;background:rgba(0, 0, 0, 0.5)}
.form_wrapper .form_footer{position:fixed;bottom:0;left:0;right:0;display: flex;flex-direction: column;align-items:center;justify-content:space-between;background:#eee;padding:0.1rem}
.form_wrapper .form_footer .comment_content{width:100%;}
.form_wrapper .form_footer .comment_content textarea{padding:0.05rem;margin:0;font-size:0.14rem;}
.form_wrapper .form_footer .comment_operation{width:100%;display:flex;flex-direction: row;justify-content: space-between;align-content: center;margin-top:0.1rem;}
.form_wrapper .form_footer .comment_operation .icon{padding-top:0.03rem;}
.form_wrapper .form_footer .comment_operation .report_submit{padding:0.07rem 0.15rem 0.05rem 0.15rem;background:#168CE3;color:#fff;font-size:0.14rem;}
.form_wrapper .form_footer .comment_operation .disabled{background:#ccc;}


</style>
