import axios from 'axios';

let base = process.env.NODE_ENV === 'production' ?'https://api.17cjw.com':'http://172.17.103.247/index.php';

// let base = 'http://172.17.103.247/index.php';
// let base = 'http://106.14.135.6';
// let base = 'http://api.17cjw.com';

export const getFinancial = params => { return axios.post(`${base}/get_financial`, params).then(res => res.data).catch(error => error); }; //重要指数
export const indexIndustry = params => { return axios.post(`${base}/index_industry`, params).then(res => res.data).catch(error => error); }; //全球行情数据
export const getMarginTrading = params => { return axios.post(`${base}/get_margin_trading`, params).then(res => res.data).catch(error => error); }; //融资融券
export const getMoneyFlows = params => { return axios.post(`${base}/get_money_flows`, params).then(res => res.data).catch(error => error); }; //资金流向
export const upDownStock = params => { return axios.post(`${base}/up_down_stock`, params).then(res => res.data).catch(error => error); }; //股票排行
export const kLineChart = params => { return axios.post(`${base}/k_line_chart`, params).then(res => res.data).catch(error => error); }; //k线数据
export const stockAssessment = params => { return axios.post(`${base}/stock_assessment`, params).then(res => res.data).catch(error => error); }; //智能诊股

export const getStocksReport = params => { return axios.post(`${base}/get_stocks_report`, params).then(res => res.data).catch(error => error); }; //个股研究报告
export const getMarketSearch = params => { return axios.post(`${base}/get_market_search`, params).then(res => res.data).catch(error => error); }; //搜索股票
export const getBroaderMarket = params => { return axios.post(`${base}/get_broader_market`, params).then(res => res.data).catch(error => error); }; //今日大盘
export const getIndustry = params => { return axios.post(`${base}/industry`, params).then(res => res.data).catch(error => error); }; //行业板块
export const getArticleInfo = params => { return axios.post(`${base}/get_article_info`, params).then(res => res.data).catch(error => error); }; //文章详情
export const getMarkrtInfo = params => { return axios.post(`${base}/get_markrt_info`, params).then(res => res.data).catch(error => error); }; //k线行情文章详情
export const getArticleQuanl = params => { return axios.post(`${base}/get_article_quanl`, params).then(res => res.data).catch(error => error); }; //大咖文章
export const getColumnsVideo = params => { return axios.post(`${base}/get_columns_video`, params).then(res => res.data).catch(error => error); }; //大咖视频
export const getComicClass = params => { return axios.post(`${base}/get_comic_class`, params).then(res => res.data).catch(error => error); }; //公众号文章


export const chklogin = params => { return axios.post(`${base}/chklogin`, params).then(res => res.data).catch(error => error); }; //登录
export const sendMsg = params => { return axios.post(`${base}/send_msg`, params).then(res => res.data).catch(error => error); }; //发送短信
export const regAccount = params => { return axios.post(`${base}/regAccount`, params).then(res => res.data).catch(error => error); }; //注册
export const loginOut = params => { return axios.post(`${base}/login_out`, params).then(res => res.data).catch(error => error); }; //注销
export const personal = params => { return axios.post(`${base}/personal`, params).then(res => res.data).catch(error => error); }; //获取个人信息
export const insertOptional = params => { return axios.post(`${base}/insert_optional`, params).then(res => res.data).catch(error => error); }; //添加自选
export const removeOptional = params => { return axios.post(`${base}/deal_optional`, params).then(res => res.data).catch(error => error); }; //删除自选
export const optional = params => { return axios.post(`${base}/optional`, params).then(res => res.data).catch(error => error); }; //自选列表
export const updateUserInfo = params => { return axios.post(`${base}/updateUserInfo`, params).then(res => res.data).catch(error => error); }; //修改用户信息
export const userSign = params => { return axios.post(`${base}/user_sign`, params).then(res => res.data).catch(error => error); }; //用户签到
export const integralList = params => { return axios.post(`${base}/integral_list`, params).then(res => res.data).catch(error => error); }; //积分列表
export const taskProgress = params => { return axios.post(`${base}/task_progress`, params).then(res => res.data).catch(error => error); }; //积分进度
export const integralStore = params => { return axios.post(`${base}/integral_store`, params).then(res => res.data).catch(error => error); }; //积分商城列表
export const addressList = params => { return axios.post(`${base}/address`, params).then(res => res.data).catch(error => error); }; //收货地址列表
export const getAreas = params => { return axios.post(`${base}/get_areas`, params).then(res => res.data).catch(error => error); }; //提交订单
export const delAddress = params => { return axios.post(`${base}/address_del`, params).then(res => res.data).catch(error => error); }; //删除收货地址
export const addressDefault = params => { return axios.post(`${base}/address_default`, params).then(res => res.data).catch(error => error); }; //默认收货地址
export const addressSave = params => { return axios.post(`${base}/address_save`, params).then(res => res.data).catch(error => error); }; //添加修改收货地址
export const integralOrder = params => { return axios.post(`${base}/integral_order`, params).then(res => res.data).catch(error => error); }; //提交订单
export const exchangeList = params => { return axios.post(`${base}/integral_order_list`, params).then(res => res.data).catch(error => error); }; //兑换明细



export const praise = params => { return axios.post(`${base}/praise`, params).then(res => res.data).catch(error => error); }; //点赞收藏
export const operationList = params => { return axios.post(`${base}/operations_list`, params).then(res => res.data).catch(error => error); }; //点赞收藏列表
export const comment = params => { return axios.post(`${base}/comment`, params).then(res => res.data).catch(error => error); }; //评论一级列表
export const commentReply = params => { return axios.post(`${base}/comment_reply`, params).then(res => res.data).catch(error => error); }; //评论二级列表
export const topicType = params => { return axios.post(`${base}/get_hot_topic_cat`, params).then(res => res.data).catch(error => error); }; //话题列表
export const topicArticle = params => { return axios.post(`${base}/get_hot_topic`, params).then(res => res.data).catch(error => error); }; //话题文章
export const messageAdd = params => { return axios.post(`${base}/message_add`, params).then(res => res.data).catch(error => error); }; //发帖
export const getMessage = params => { return axios.post(`${base}/get_message`, params).then(res => res.data).catch(error => error); }; //帖子列表
export const bannerList = params => { return axios.post(`${base}/banner_list`, params).then(res => res.data).catch(error => error); }; //轮播图


