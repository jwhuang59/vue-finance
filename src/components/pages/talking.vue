<template>
    <div class="flex">
        <div class="content">
            <div class="header">
                <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
                <div class="article_text">发帖</div>
                <div class="talk" @click="setTalk()">发布</div>
            </div>
            <div class="talk_wrapper">
                <div class="talk_input">
                    <textarea cols="4" rows="4" placeholder="请发表您想说的话..." v-model="talkValue" v-focus></textarea>
                </div>
                <div class="send_out" v-if="!forwardParams.id">
                    <div class="upload_container" id="img_wrapper">
                        <div class="upload_wrapper" v-for="(item,index) in imgList" :key="index" v-if="imgList.length>0">
                            <img v-image-preview :src=item>
                            <i class="remove_img el-icon-error" @click="removeImg(index)"></i>
                        </div>
                        <div class="upload_wrapper" v-if="imgList.length<9">
                            <div class="add_img"><i class="el-icon-plus"></i></div>
                            <input type="file" class="upload" @change="addImg" ref="img0" multiple accept="image/*" />
                        </div>
                        
                    </div>
                    
                </div>
                <div class="forward" v-else>
                    <img :src=forwardParams.title_img v-if="forwardParams.title_img">
                    <p>{{forwardParams.title}}</p>
                </div>
                <div class="talk_type">
                    <label>分类专栏</label>
                    <div class="type_wrapper" @click="showType()">
                        <span>{{typeValue}}</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="to_type_wrapper">
            <div class="type_header" :class="{'istop':toTop}">
                <i class="el-icon-close" @click="closeType()"></i>
                <h4>栏目列表</h4>
                <span></span>
            </div>
            
            <ul>
                <li v-for="(item,index) in topicType" :key="index" @click="setType(item.topic_name,item.id)">
                    <img :src=item.topic_img>
                    <span>{{item.topic_name}}</span> 
                </li>
            </ul>
        </div>
        <div id="loading" @touchmove.prevent v-show="loading">
            <div class="loading_wrapper">
                <i class="el-icon-loading"></i>
                <span>发布中</span>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import mui from '../../../static/js/mui.min.js'
import { topicType,messageAdd } from '../../api/api'
export default {

    data () {
        return {
            topicType:'',
            talkValue:'',
            imgList:[],
            typeValue:'请选择栏目',
            typeId:'',
            toTop:false,
            loading:false,
            talkStatus:false,
            forwardParams:'',
        }
    },
    mounted() {
        this.getTopicType()
        this.forwardParams = this.$route.query

    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        getTopicType(){

            topicType({
                limit:40
            }).then((res) => {
                this.topicType = res.info
                
            })
        },
        showType(){
            if(!this.toTop){
                $(".to_type_wrapper").animate({'top':'0'},200)
                setTimeout(() => {this.toTop = true},200)
            }else{
                this.toTop = false
                $(".to_type_wrapper").animate({'top':'100%'},200)

            }
            
        },
        setType(type,id){
            $(".to_type_wrapper").animate({'top':'100%'},200)
            this.toTop = false
            this.typeValue = type
            this.typeId = id
        },
        closeType(){
            $(".to_type_wrapper").animate({'top':'100%'},200)
            this.toTop = false
        },
        addImg(e) {
            for(var i in e.target.files){
                var file = e.target.files[i]
                var reader = new FileReader();
                reader.readAsDataURL(file);
                var that = this
                reader.onload = function(e) {
                    that.imgList.push(e.target.result)
                    mui.toast("上传成功",{duration: 1500})
                }
            }

        },
        removeImg(i){
            this.imgList.splice(i,1)

        },
        setTalk(){
            if(!this.talkValue){
                mui.toast("请输入帖子内容",{duration: 1500})
            }else if(!this.typeId){
                mui.toast("请选择栏目专栏",{duration: 1500})
            }else{
                this.loading = true
                messageAdd({
                    token:this.$store.state.userInfo.token,
                    content:this.talkValue,
                    hot_topic_id:this.typeId,
                    image_list:this.imgList,
                    id:this.$route.query.id,
                    type:this.$route.query.type

                }).then((res) => {
                    this.loading = false
                    mui.toast(res.msg,{duration: 1500})
                    if(res.status == 0){
                        this.$router.go(-1);
                    }
                    
                })
            }
            
        }
        
        
    },
    beforeDestroy() {
        // localStorage.removeItem('params')
    },
    // watch: {
    //     commentStatus:{
    //         handler(newVal, oldVal) {
    //             if (newVal) {
    //                 this.getCommentInfo();
    //                 this.commentStatus = false

    //             }
    //         },
    //         deep:true
    //     }
    // },

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;position:absolute;top:0;right:0;bottom:0;left:0;background:#fff;}
.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.header .article_text,.header .talk{text-align: center;color:#fff;font-size:0.15rem;}

.talk_wrapper{padding:0.15rem;}
.talk_wrapper .talk_input textarea{padding:0;margin:0;font-size:0.14rem;border:none;}
.talk_wrapper .upload_container{display:flex;flex-flow: row wrap;justify-content: flex-start;align-items:center}
.talk_wrapper .upload_container .upload_wrapper{width:0.8rem;height:0.8rem;margin: 0.08rem 0.08rem;background:#eee;display:flex;flex-direction: row;align-items: center;justify-content: center;position:relative;}
.talk_wrapper .upload_container .upload_wrapper:last-child{margin:0.08rem 0.08rem}
.talk_wrapper .upload_container .upload_wrapper img{width:100%;height:100%;}
.talk_wrapper .upload_container .upload_wrapper i{color:#ccc;font-size:0.5rem;}
.talk_wrapper .upload_container .upload_wrapper i.remove_img{font-size:0.2rem;color:rgba(0,0,0,0.6);position:absolute;right:-0.1rem;top:-0.1rem}
.talk_wrapper .upload_container .upload_wrapper .upload{width:0.8rem;height:0.8rem;position:absolute;top:0;left:0;opacity: 0;}

.vue-directive-image-previewer img{width:100%;height:auto;}


.talk_wrapper .talk_type{display:flex;flex-direction: row;justify-content: space-between;align-items: center;font-size:0.14rem;margin:0.1rem 0;}
.talk_wrapper .talk_type span{color:#999}


.talk_wrapper .forward{background:#eee;display:flex;flex-direction: row;justify-content: flex-start;align-items: center;padding:0.05rem 0.1rem;margin:0.1rem 0;}
.talk_wrapper .forward img{width:0.5rem;}
.talk_wrapper .forward p{font-size:0.13rem;text-align: left;margin-left:0.05rem;}

.to_type_wrapper{position: absolute;top:100%;bottom:0;right:0;left:0;background: #fff;overflow:scroll;}
.to_type_wrapper .type_header{height:0.4rem;line-height:0.4rem;position: absolute;top:0;bottom:0;right:0;left:0;background:#eee;display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
.to_type_wrapper .type_header.istop{position:fixed}
.to_type_wrapper .type_header h4{font-size:0.15rem;color:#444;}
.to_type_wrapper .type_header i{font-size:0.22rem;color:#444;margin-left:0.05rem;}
.to_type_wrapper ul{margin-top:0.4rem;padding:0.1rem 0}
.to_type_wrapper ul li{padding:0.08rem 0.2rem;text-align:left;display:flex;flex-direction: row;justify-content: flex-start;align-items: center;}
.to_type_wrapper ul li img{width:0.2rem;height:0.2rem;}
.to_type_wrapper ul li span{padding-left:0.05rem;font-size:0.14rem;color:#666;}

#loading{position:fixed;top:0;bottom:0;left:0;right:0;background: rgba(0, 0, 0, 0.1);z-index:998}
#loading .loading_wrapper{width:1rem;height:1rem;border-radius:0.1rem;background:rgba(0, 0, 0, 0.6);position:absolute;left:50%;top:50%;margin-left:-0.5rem;margin-top:-0.5rem;z-index:999;display:flex;flex-direction: column;justify-content: center;align-items: center}
#loading .loading_wrapper i{font-size:0.3rem;color:rgba(255, 255, 255, 0.8);}
#loading .loading_wrapper span{font-size:0.13rem;color:rgba(255, 255, 255, 0.8);margin-top:0.01rem;}


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
