 
import Index from '../components/index.vue'
import Login from '../components/login.vue'
import Search from '../components/search.vue'
import Information from '../components/navbar/information.vue'
import Quotation from '../components/navbar/quotation.vue'
import Community from '../components/navbar/community.vue'
import Train from '../components/navbar/train.vue'
import Mine from '../components/navbar/mine.vue'
import Kline from '../components/quotation/kline.vue'
import Article from '../components/information/article.vue'
import Reply from '../components/pages/reply.vue'
import Collection from '../components/mine/collection.vue'
import Optional from '../components/mine/optional.vue'
import Integralmall from '../components/mine/integralmall.vue'
import Integralarea from '../components/mine/integralarea.vue'
import Integraldetail from '../components/mine/integraldetail.vue'
import Goodsdetails from '../components/pages/goodsdetails.vue'
import Orderdetails from '../components/pages/orderdetails.vue'
import Exchangedetails from '../components/pages/exchangedetails.vue'
import Exchangelist from '../components/pages/exchangelist.vue'
import Addressmanage from '../components/pages/addressmanage.vue'

import Talking from '../components/pages/talking.vue'
import Lecturer from '../components/community/lecturer.vue'
import Course from '../components/course/course.vue'
import Setup from '../components/mine/setup.vue'
import Mypost from '../components/mine/mypost.vue'
import Myfollow from '../components/community/myfollow.vue'
import Mysubscribe from '../components/mine/mysubscribe.vue'
import Myinformation from '../components/mine/myinformation.vue'
import Playvideo from '../components/course/playvideo.vue'
import Videocenter from '../components/course/videocenter.vue'
import Classroom from '../components/course/classroom.vue'
import Resetpassword from '../components/pages/reset-password.vue'
import Postnews from '../components/community/postnews.vue'
import Topiccenter from '../components/community/topiccenter.vue'
import Topicdetails from '../components/community/topicdetails.vue'

import ComicsFinance from '../components/pages/comics-finance.vue'
import TrumpColumn from '../components/pages/trump-column.vue'
import IntelligentInvestment from '../components/pages/intelligent-investment.vue'
import AiDiagnosis from '../components/pages/ai-diagnosis.vue'

import Article0 from '../components/information/article0.vue'
import Community0 from '../components/navbar/community0.vue'


let routes = [
    {
        path: '',
        component: Index,
        // name: 'Index',
        children: [
            { path: '/', component: Information, name: '资讯',icon:"../../static/images/footer1.png",icon0:"../../static/images/footer_1.png",meta: {title: '咨询'}},
            { path: '/quotation', component: Quotation, name: '行情',icon:"../../static/images/footer2.png",icon0:"../../static/images/footer_2.png",meta: {title: '行情'}},
            { path: '/community', component: Community, name: '社区',icon:"../../static/images/footer3.png",icon0:"../../static/images/footer_3.png",meta: {title: '社区'}},
            { path: '/course/classroom', component: Classroom, name: '课堂',icon:"../../static/images/footer4.png",icon0:"../../static/images/footer_4.png",meta: {title: '课堂'}},
            { path: '/mine', component: Mine, name: '我的',icon:"../../static/images/footer5.png",icon0:"../../static/images/footer_5.png",meta: {title: '我的'}},
        ]
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta:{
            hidden: true
        },
        
    },
    {
        path: '/search',
        component: Search,
        name: 'search',
        meta:{
            hidden: true,
        },
        
    },
    {
        path: '/kline',
        component: Kline,
        name: 'kline',
        meta:{
            hidden: true,
            // keepAlive: true,
        },
    },
    {
        path: '/article',
        component: Article,
        name: 'article',
        meta:{
            hidden: true
        },
    },
    {
        path: '/article/reply',
        component: Reply,
        name: 'reply',
        meta:{
            hidden: true
        },
    },
    {
        path: '/mine/collection',
        component: Collection,
        name: 'collection',
        meta:{
            hidden: true
        },
    },
    {
        path: '/mine/optional',
        component: Optional,
        name: 'optional',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/talking',
        component: Talking,
        name: 'talking',
        meta:{
            hidden: true
        },
    },
    {
        path: '/community/lecturer',
        component: Lecturer,
        name: 'lecturer',
        meta:{
            hidden: true
        },
    },
    {
        path: '/course/course',
        component: Course,
        name: 'course',
        meta:{
            hidden: true
        },
    },
    {
        path: '/mine/setup',
        component: Setup,
        name: 'setup',
        meta:{
            hidden: true
        },
    },
    {
        path: '/mine/mypost',
        component: Mypost,
        name: 'mypost',
        meta:{
            hidden: true
        },
    },
    {
        path: '/community/myfollow',
        component: Myfollow,
        name: 'myfollow',
        meta:{
            hidden: false
        },
    },
    {
        path: '/mine/mysubscribe',
        component: Mysubscribe,
        name: 'mysubscribe',
        meta:{
            hidden: true
        },
    },
    {
        path: '/mine/myinformation',
        component: Myinformation,
        name: 'myinformation',
        meta:{
            hidden: true
        },
    },
    {
        path: '/mine/integralarea',
        component: Integralarea,
        name: 'integralarea',
        meta:{
            hidden: true
        },
    },
    {
        path: '/mine/integralmall',
        component: Integralmall,
        name: 'integralmall',
        meta:{
            hidden: true
        },
    },
    {
        path: '/mine/integraldetail',
        component: Integraldetail,
        name: 'integraldetail',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/goodsdetails',
        component: Goodsdetails,
        name: 'goodsdetails',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/orderdetails',
        component: Orderdetails,
        name: 'orderdetails',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/exchangedetails',
        component: Exchangedetails,
        name: 'exchangedetails',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/exchangelist',
        component: Exchangelist,
        name: 'exchangelist',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/addressmanage',
        component: Addressmanage,
        name: 'addressmanage',
        meta:{
            hidden: true
        },
    },
    {
        path: '/course/playvideo',
        component: Playvideo,
        name: 'playvideo',
        meta:{
            hidden: true
        },
    },
    {
        path: '/course/videocenter',
        component: Videocenter,
        name: 'videocenter',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/reset-password',
        component: Resetpassword,
        name: 'reset-password',
        meta:{
            hidden: true
        },
    },
    {
        path: '/community/postnews',
        component: Postnews,
        name: 'postnews',
        meta:{
            hidden: false
        },
    },
    {
        path: '/community/topiccenter',
        component: Topiccenter,
        name: 'topiccenter',
        meta:{
            hidden: true
        },
    },
    {
        path: '/community/topicdetails',
        component: Topicdetails,
        name: 'topicdetails',
        meta:{
            hidden: true
        },
    },
    {
        path: '/train',
        component: Train,
        name: 'train',
        meta:{
            hidden: true
        },
    },



    {
        path: '/pages/comics-finance',
        component: ComicsFinance,
        name: 'comics-finance',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/trump-column',
        component: TrumpColumn,
        name: 'trump-column',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/ai-diagnosis',
        component: AiDiagnosis,
        name: 'ai-diagnosis',
        meta:{
            hidden: true
        },
    },
    {
        path: '/pages/intelligent-investment',
        component: IntelligentInvestment,
        name: 'intelligent-investment',
        meta:{
            hidden: true
        },
    },
    {
        path: '/article0',
        component: Article0,
        name: 'article0',
        meta:{
            hidden: true
        },
    },
    {
        path: '/community0',
        component: Community0,
        name: 'community0',
        meta:{
            hidden: true
        },
    },

]
export default routes