<template>
    <div class="flex">
        <div class="content">
            <div class="header">
                <div class="back" @click="goBack()"><i class="el-icon-arrow-left"></i></div>
                <div class="article_text" v-if="typeValue == 5">享诠财经帖子</div>
                <div class="article_text" v-else>享诠财经文章</div>
                <div class="back" @click="goIndex()"><i class="el-icon-s-home"></i></div>
            </div>
            <div class="article_content">
                <div class="person_info">
                    <img :src=articleDetails.user.user_img v-if="typeValue == 5">
                    <img src="../../assets/person0.png" v-else>
                    <div class="info_wrapper">
                        <div class="wrapper_left" v-if="typeValue == 5">
                            <h3>{{articleDetails.user.nickname}}</h3>
                        </div>
                        <div class="wrapper_left" v-else>
                            <h3>{{articleDetails.author}}</h3>
                            <span>{{articleDetails.source}}</span>
                        </div>
                        <!-- <div class="wrapper_right">
                            <span>+关注</span>
                        </div> -->
                    </div>
                </div>
                <div class="article_title"><h2>{{articleDetails.title}}</h2></div>
                <div class="article_other">
                    <span>{{articleDetails.create_time}}</span>
                    <span>{{articleDetails.reading_num}}人阅读</span>
                </div>
                <div class="article_details" v-html="articleDetails.content"></div>
                <div v-if="typeValue == 5">
                    <div class="operation_share" v-if="articleDetails.sharings.id" @click="$router.push({path:'/article',query: {id:articleDetails.sharings.id,type:articleDetails.sharings.compose_type}})">
                        <img :src=articleDetails.sharings.title_img v-if="articleDetails.sharings.title_img">
                        <p>{{articleDetails.sharings.title}}</p>
                    </div>
                    <div class="operation_img" v-if="articleDetails.imgs.length > 0">
                        <ul>
                            <li v-for="(img,index) in articleDetails.imgs" :key="index" :class="{'bigImg':index < 2}">
                                <img :src="img">
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <div class="article_operation">
                    <div class="operation_item">
                        <i><svg t="1571733392131" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6483" width="18" height="18"><path d="M485.493811 587.391061l62.032822 0c-1.954515 16.158005-5.636371 30.886451-11.08036 44.164872l190.410678 49.591465-29.002544 53.867862c-71.681576-24.290219-135.146003-44.217061-190.408631-59.764152-30.641881 31.984459-92.744287 52.068889-186.326663 60.2185-7.556093-17.502629-17.030885-36.521798-28.547173-57.043181 69.746504-4.065596 118.831432-12.684904 147.187247-25.825179C468.113979 639.460973 483.399103 617.736183 485.493811 587.391061L485.493811 587.391061 485.493811 587.391061zM485.947136 288.540625l61.578474 0 0 52.977585 46.188972 0c11.325953-16.917298 21.883403-33.957393 31.688723-51.170426l51.181683 21.741163-20.608364 29.429263 75.380828 0 0 100.526531-55.244208 0L676.113243 388.613832 358.21601 388.613832l0 53.43091-55.210439 0 0-100.526531 71.752184 0c-5.565762-9.509585-11.377118-19.029402-17.414625-28.538987l48.440246-22.187325c11.656481 17.213034 22.509666 34.123168 32.596396 50.725288l47.567365 0L485.947136 288.540625 485.947136 288.540625 485.947136 288.540625zM339.684958 653.071969 339.684958 529.894555l353.197204 0 0 123.17639-59.765175 0 0-74.28282L399.467529 578.788126l0 74.28282L339.684958 653.070946 339.684958 653.071969 339.684958 653.071969zM377.305787 509.060041l0-99.174744 279.803637 0 0 99.174744L377.305787 509.060041 377.305787 509.060041 377.305787 509.060041zM432.517249 471.927329 601.881588 471.927329l0-24.909319L432.517249 447.01801 432.517249 471.927329 432.517249 471.927329 432.517249 471.927329zM511.946276 65.281819c-246.596328 0-446.656783 200.024639-446.656783 446.700785 0 246.710938 200.059432 446.735577 446.656783 446.735577 246.721171 0 446.763207-200.024639 446.763207-446.735577C958.709483 265.298272 758.667447 65.281819 511.946276 65.281819L511.946276 65.281819 511.946276 65.281819zM511.946276 910.050762c-219.829707 0-397.989363-178.230264-397.989363-398.059971 0-219.828684 178.160679-398.042575 397.989363-398.042575 219.882919 0 398.078391 178.212868 398.078391 398.042575C910.024667 731.821521 731.829196 910.050762 511.946276 910.050762L511.946276 910.050762 511.946276 910.050762zM511.946276 910.050762" p-id="6484" fill="#d81e06"></path></svg></i>
                        <span>赞赏</span>
                    </div>
                    <div class="operation_item">
                        <i><svg t="1571731384003" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2077" width="18" height="18"><path d="M652.189 114.635s-55.86-22.614-140.234-22.614c-84.37 0-140.23 25.903-140.23 25.903l280.549 285.449-0.085-288.738z" fill="#FB5453" p-id="2078"></path><path d="M811.202 217.796c-61.928-58.727-121.8-79.649-121.8-79.649l-2.06 392.072 210.411-199.332c0 0.085-24.535-54.364-86.55-113.09z" fill="#6468F1" p-id="2079"></path><path d="M906.498 368.778L617.205 645.535h292.667s22.95-55.119 22.95-138.419c-0.087-83.215-26.324-138.338-26.324-138.338z" fill="#5283F0" p-id="2080"></path><path d="M696.62 887.697s56.813-22.842 118.033-80.602c61.223-57.757 83.1-113.488 83.1-113.488l-409.132-1.946L696.62 887.697z" fill="#00B2FE" p-id="2081"></path><path d="M371.806 911.213s55.864 22.61 140.234 22.61c84.455 0 140.234-25.902 140.234-25.902l-280.548-285.45 0.08 288.742z" fill="#66D020" p-id="2082"></path><path d="M224.484 808.047c61.934 58.732 121.806 79.65 121.806 79.65l2.057-392.072-210.411 199.33c0.084-0.08 24.619 54.365 86.548 113.092z" fill="#9AD122" p-id="2083"></path><path d="M114.134 368.778s-22.956 55.107-22.956 138.378c0 83.276 26.244 138.379 26.244 138.379l289.372-276.672h-292.66v-0.085z" fill="#FFC71A" p-id="2084"></path><path d="M339.07 138.147s-56.814 22.843-118.034 80.6c-61.222 57.758-83.1 113.494-83.1 113.494l409.132 1.942L339.07 138.147z" fill="#FF7612" p-id="2085"></path></svg></i>
                        <span>1562</span>
                    </div>
                    <div class="operation_item">
                        <i><svg t="1571731406987" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2968" width="18" height="18"><path d="M669.3 369.4c9.8 0 19.6 0 29.4 1.6C671 245.2 536.9 152 383.2 152 211.6 152 71 269.7 71 416.8c0 85 45.8 156.9 124.2 210.9l-31.1 93.2L273.6 667c39.2 8.2 70.3 16.3 109.5 16.3 9.8 0 19.6 0 31.1-1.6-6.5-21.3-9.8-42.5-9.8-65.4 0.1-135.7 116.2-246.9 264.9-246.9z m-168.4-85c24.5 0 39.2 16.3 39.2 39.2 0 22.9-16.3 39.2-39.2 39.2-24.5 0-47.4-16.4-47.4-39.2 0-24.5 24.6-39.2 47.4-39.2z m-216.3 73.1c-24.7 0-47.8-16.2-47.8-38.8 0-24.3 24.7-38.8 47.8-38.8s39.5 16.2 39.5 38.8c0.1 22.7-16.4 38.8-39.5 38.8z" fill="#24DB5A" p-id="2969"></path><path d="M953.8 613c0-125.9-124.2-227.2-264.8-227.2-148.8 0-266.5 103-266.5 227.2 0 125.9 117.7 227.2 266.5 227.2 31.1 0 62.1-8.2 93.2-16.3l85 47.4-22.9-78.5c62.1-47.4 109.5-109.5 109.5-179.8z m-351.5-39.2c-14.7 0-31.1-14.7-31.1-31.1 0-14.7 16.3-31.1 31.1-31.1 22.9 0 39.2 16.3 39.2 31.1 0 16.4-14.7 31.1-39.2 31.1z m178-7.6c-14.8 0-31.3-14.6-31.3-30.7 0-14.6 16.5-30.7 31.3-30.7 23.1 0 39.5 16.2 39.5 30.7 0 16.2-16.4 30.7-39.5 30.7z" fill="#24DB5A" p-id="2970"></path></svg></i>
                        <span>2639</span>
                    </div>
                </div> -->
                <div class="article_ad">
                    <img src="../../assets/article_ad1.png">
                </div>
            </div>
            
            <div class="comment">
                <h3>最新评论</h3>
                <div class="comment_wrapper" v-if="commentList.length>0">
                    <div class="comment_item" v-for="(item,index) in commentList" :key="index" >
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
                        <div class="comment_content">{{item.content}}</div>
                        <div class="comment_totals" v-if="item.reply_count" @click="toReply(item.params)">共{{item.reply_count}}条回复></div>
                    </div>
                </div>
                <div class="no_comment" v-else>暂无评论数据</div>
            </div>
        </div>
        <div class="footer_wrapper">
            <div class="article_footer" v-if="is_comment">
                <div class="wirte_comment" @click="getUserForm(1)">
                    <i class="el-icon-edit-outline"></i>
                    <span>写评论...</span>
                </div>
                <div class="operate_wrapper" v-if="typeValue != 5">
                    <div class="collect" :class="{'is_collect':collect_status == 1}" @click="operation(2)" >
                        <i v-if="collect_status == 0"><svg t="1572864704127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1959" width="20" height="20"><path d="M773.461 1005.431c-14.404 0-30.583-4.13-45.602-11.639L513.57 886.613 297.95 993.621c-13.653 7.27-29.287 11.094-45.227 11.094a96.256 96.256 0 0 1-57.549-18.842c-30.173-22.63-45.636-61.85-38.502-97.553l44.1-228.762-169.028-157.56A104.073 104.073 0 0 1 5.461 401.34l0.342-1.16c12.288-36.83 42.769-62.635 79.735-67.585l234.837-42.7L425.78 75.81c16.93-33.894 51.37-55.671 87.791-55.671 37.99 0 73.319 22.596 88.132 56.286l105.063 213.401 234.871 41.063a95.676 95.676 0 0 1 78.268 68.369 98.987 98.987 0 0 1-24.474 101l-0.58 0.58-168.55 158.72 42.598 229.172c6.86 36.659-7.714 73.66-38.059 96.733a90.283 90.283 0 0 1-57.378 19.968zM513.673 824.286l239.104 119.569c7.031 3.55 15.12 5.768 20.65 5.768 8.534 0 16.452-2.628 22.255-7.475l1.092-0.887c13.585-10.206 20.207-26.385 17.238-42.257l-48.128-259.209L956.21 460.561c11.674-11.844 15.667-28.808 10.48-44.407l-0.513-1.639a39.185 39.185 0 0 0-32.529-28.365l-1.092-0.17-263.339-46.046L550.708 99.19c-5.77-13.448-21.368-23.21-37.138-23.21-15.496 0-30.31 9.694-37.82 24.678L357.99 339.831 93.252 387.925c-16.077 2.014-28.57 12.698-34.338 29.355-4.096 15.223 0.751 33.553 11.947 44.988l190.532 177.561-50.005 259.345c-3.004 14.985 4.096 32.256 17.237 42.12 6.588 4.95 15.121 7.68 24.064 7.68 6.895 0 13.517-1.603 19.217-4.675l0.82-0.478 240.947-119.535z" p-id="1960"></path></svg></i>
                        <i v-else><svg t="1572864745086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2182" width="20" height="20"><path d="M786.309939 1003.349333c-11.093333 0-23.893333-3.754667-34.986666-9.216l-239.616-119.808L270.043273 994.133333c-23.893333 12.970667-55.296 11.093333-77.482667-5.461333s-34.986667-46.08-29.525333-73.728l49.834666-258.048L23.088606 479.914667C2.779273 459.605333-4.559394 428.202667 2.779273 402.432c9.216-27.648 31.402667-47.957333 60.757333-51.541333l263.68-47.957334L445.317939 63.146667c12.970667-25.770667 38.741333-42.325333 66.389334-42.325334S567.003273 37.376 578.096606 63.146667l117.930667 239.616 263.68 46.08c27.648 3.754667 51.541333 23.893333 59.050666 51.541333 9.216 27.648 1.877333 57.173333-18.432 77.482667L810.203273 656.896l47.957333 258.048c5.461333 29.525333-7.338667 57.173333-29.525333 73.728-10.922667 9.216-25.770667 14.677333-42.325334 14.677333z" fill="#d81e06" p-id="2183"></path></svg></i>
                        <span>{{articleDetails.collection_num}}</span>
                    </div>
                    <div class="praise" :class="{'is_praise':praise_status == 1}" @click="operation(1)">
                        <i v-if="praise_status == 0"><svg t="1572864815852" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6314" width="20" height="20"><path d="M794.053805 1023.445187h-1.479502c-46.357715-0.493167-92.71543-0.554813-139.13479-0.554813H582.608377c-47.344049 0-94.626452-0.061646-141.970502-0.616459a220.815604 220.815604 0 0 1-76.502558-16.151225c-41.487689-16.151225-65.159713-52.275721-64.974776-99.188249l0.184938-176.060683c0-97.462164 0.061646-194.985973 0.863042-292.448136 0.184938-26.569382 17.199205-51.351032 31.747638-64.481609 56.34435-51.474324 117.558726-115.770995 143.265065-202.445127 7.150924-24.165192 9.863344-50.796219 12.699055-78.968394C493.591701 36.556017 529.962781 0 578.539748 0c18.986936 0 38.097165 5.671423 56.714225 16.82933 37.480706 22.500753 62.50894 57.885498 76.317621 108.311842 22.130877 80.078021 10.788032 157.751851-1.602793 224.267774-1.849377 10.048281-3.945337 20.034917-6.16459 30.329781h192.643429c27.863946 0 67.810487 3.45217 92.468846 33.412077 17.938956 21.761002 22.99392 51.166095 15.411474 89.941364-23.178857 119.346457-51.53597 239.679249-78.660165 351.936428-8.445488 34.953224-22.500753 67.378966-36.062849 98.695081l-5.794715 13.438806c-15.534766 36.309434-47.405695 56.282704-89.756426 56.282704z m-140.614292-80.69448c46.665944 0 93.331889 0.061646 139.997833 0.554813l0.616459 40.069834v-40.069834c12.822347 0 13.993619-2.835711 16.027933-7.644091l5.918006-13.747035c12.822347-29.528385 24.843297-57.39233 31.685991-85.687797 26.939257-111.332491 55.049786-230.617302 77.920415-348.422612 3.390524-17.260851 1.417856-23.302149 1.109626-24.103546-0.493167 0-7.459154-3.883692-30.329782-3.883691h-242.51496a40.193125 40.193125 0 0 1-39.145145-48.453675l5.979653-27.185841c3.883692-17.260851 7.459154-33.288785 10.418156-49.378364 10.788032-57.762206 20.774667-124.648004 3.205587-188.328216-8.322196-30.453073-20.774667-49.193426-40.316417-60.906147a31.007886 31.007886 0 0 0-15.47312-5.424839c-8.198904 0-10.294865 14.548432-10.788032 18.986937-3.205587 32.117512-6.411173 63.803504-15.719704 95.119619-31.25447 105.537776-101.592439 180.00602-166.197339 238.939498a24.473421 24.473421 0 0 0-5.794715 8.383842c-0.431521 94.749744-0.493167 192.02697-0.554813 289.304196l-0.184937 176.307267c-0.061646 17.384143 6.226236 21.267835 13.808681 24.226837 17.815664 6.90434 34.583348 10.603094 48.453675 10.788032 47.03582 0.493167 94.009993 0.616459 141.107459 0.616459l70.76949-0.061646zM206.814987 1023.260249l-4.130275-0.061646a867.789296 867.789296 0 0 0-29.466739-0.554813l-34.829932 0.246584-13.500451-0.061646c-50.672928-0.431521-76.872434-25.151526-80.078021-75.701162-7.397508-116.079225-14.548432-232.158449-21.63771-348.237674C20.582731 556.662453 18.425125 514.496659 16.267519 472.269219l-0.431522-8.815363c-1.109626-20.897959 0.123292-44.693276 17.260851-62.817169 17.199205-18.18554 41.302751-20.713021 62.570586-20.836314l47.713925-0.123292 47.652278 0.123292c59.05677 0.184938 86.674132 27.49407 86.85907 85.934381 0.184938 57.39233 0.123292 114.784661 0.123291 172.176991l-0.123291 135.436037c-0.123292 57.885498-0.246584 115.832641 0.493167 173.718138 0.123292 9.061947 0.493167 36.740955-19.295166 56.714226-12.637409 12.945638-30.20649 19.480104-52.275721 19.480103z m-1.35621-78.413581l1.35621 38.343748v-39.206791c-0.431521 0.246584-0.924688 0.493167-1.35621 0.863043z m-32.240804-2.40419c6.719403 0 14.301848 0.061646 24.658359 0.369875-0.308229-59.919812-0.184938-114.784661-0.061646-169.587863l0.123292-135.374391c0-57.269039 0.061646-114.538077-0.123292-171.868761l-0.123292-5.856361a106.400819 106.400819 0 0 0-6.90434-0.184937l-47.405695-0.123292-47.344049 0.123292h-0.123292l0.369875 8.26055c2.157606 41.91921 4.315213 83.83842 6.842695 125.819276 7.027632 116.017579 14.178556 232.035157 21.576064 348.052736v0.678105h0.801397l12.822346 0.061646 34.891578-0.369875z" fill="#707070" p-id="6315"></path></svg></i>
                        <i v-else><svg t="1572864863749" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6673" width="20" height="20"><path d="M665.999897 412.65082h263.08427c62.134578 0 86.198259 21.489705 74.405858 82.067926-24.781999 127.322012-54.412651 253.805985-84.941201 379.870938-9.517724 39.447675-26.996816 77.159414-43.099129 114.691573-10.415623 24.36298-29.929951 34.958183-58.542985 34.658883-127.262152-1.316918-254.524304 0.11972-381.786455-1.257058-22.746763-0.23944-46.451284-6.34515-67.821269-14.605816-28.912333-11.193802-42.79983-34.479304-42.680111-66.863511 0.538739-169.343663-0.17958-338.747186 1.137339-508.090849 0.05986-12.869879 9.996604-28.852473 20.112927-38.130757 73.986839-67.40225 138.815113-141.269369 167.907025-239.439609 9.098705-30.52855 12.33114-63.212057 15.563575-95.177244 5.387391-53.275313 47.588622-75.483337 94.099766-47.588622 34.838463 20.891106 52.856294 53.933772 63.271916 91.76523 20.651666 74.824878 11.253662 149.410316-2.633835 223.816174-4.968372 26.697516-11.373381 53.095733-18.077691 84.282742zM252.607413 723.922311c0 87.096158-0.718319 174.192315 0.41902 261.288472 0.359159 27.475695-8.859266 39.447675-37.23286 38.489917-41.063893-1.376778-82.187646-0.11972-123.311398-0.419019-32.144767-0.23944-41.842072-9.278285-43.937168-41.482912-8.021227-125.885374-15.743154-251.770748-23.405222-377.656122-2.933135-48.72596-5.447251-97.57164-7.961367-146.417321-1.855657-36.51454 6.16557-44.894927 43.398429-45.014646 46.990023-0.17958 93.980046-0.17958 140.91021 0 39.926555 0.17958 50.880917 10.595203 51.000636 49.923158 0.2993 87.096158 0.05986 174.192315 0.11972 261.288473z" fill="#d81e06" p-id="6674"></path></svg></i>
                        <span>{{articleDetails.praise_num}}</span>
                    </div>
                    <div class="forward" @click="sendForward()">
                        <i><svg t="1572864927147" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11353" width="20" height="20"><path d="M866.0736 916.1728H157.9264a50.56 50.56 0 0 1-50.5856-50.5856V157.4144c0-27.9296 22.6304-50.5856 50.5856-50.5856h404.6592v50.5856H208.512a50.56 50.56 0 0 0-50.5856 50.5856v607.0016c0 27.9552 22.6304 50.5856 50.5856 50.5856h607.0016a50.56 50.56 0 0 0 50.5856-50.5856V460.928h50.5856v404.6592a50.6112 50.6112 0 0 1-50.6112 50.5856z m0-732.7232L535.5008 523.7504l-35.7888-35.7632L830.2848 157.4144h-166.528V106.8288h252.9024v252.9024h-50.5856V183.4496z m0 0" p-id="11354" fill="#515151"></path></svg></i>
                        <span>{{articleDetails.share_num}}</span>
                    </div>
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
</template>

<script>
import mui from '../../../static/js/mui.min.js'
import { getArticleInfo,praise,comment } from '../../api/api'
export default {

    data () {
        return {
            typeValue:this.$route.query.type,
            articleDetails: {
                user:{},
                imgs:[],
                sharings:[],
            },
            praise_status:0, 
            collect_status:0,
            commentList:'',
            is_comment:true,
            commentValue:'',
            commentType:'',
            commentId:'',
            toUserId:'',
            replyType:'',
            commentUser:'',
            commentStatus:false,
        }
    },
    mounted() {
        
        this.getArticleInfo(); 
    },
    methods:{
        goBack(){
            this.$router.go(-1);

        },
        goIndex(){
            this.$router.push('/')

        },
        getArticleInfo(){
            
            var getPraise = JSON.parse(sessionStorage.getItem("praiseInfo"))
            var getCollect = JSON.parse(sessionStorage.getItem("collectInfo"))
            getArticleInfo({
                id:this.$route.query.id,
                type:this.$route.query.type,
                token:this.$store.state.userInfo.token
            }).then((res) => {
                
                if(res.status == 0){
                    if(res.info.review.length > 0){
                        for(var i in res.info.review){
                            let params = {
                                id:res.info.review[i].id,
                                userId:res.info.review[i].user_id,
                                nickname:res.info.review[i].nickname,
                                user_img:res.info.review[i].user_img,
                                create_time:res.info.review[i].create_time,
                                content:res.info.review[i].content,
                            }
                            res.info.review[i].params = JSON.stringify(params)
                        }
                    }

                    this.articleDetails = res.info.article
                    this.commentList = res.info.review
                    this.toUserId = res.info.review.length>0 ? res.info.review[0].user_id : ''

                    if(getPraise){

                        for(var i in getPraise){
                            if(getPraise[i].id == this.$route.query.id){

                                this.articleDetails.praise_num = getPraise[i].praiseNum
                                this.praise_status = getPraise[i].status

                            }else{
                                // console.log(this.articleDetails.praise_status)
                                this.praise_status = this.articleDetails.praise_status
                            }
                        }

                    }else{     

                        this.praise_status = this.articleDetails.praise_status    
                        
                    }
                    if(getCollect){

                        for(var i in getCollect){
                            if(getCollect[i].id == this.$route.query.id){
                                
                                this.articleDetails.collection_num = getCollect[i].collectNum
                                this.collect_status = getCollect[i].status

                            }else{
                                this.collect_status = this.articleDetails.collection_status
                            }
                        }

                    }else{
                        this.collect_status = this.articleDetails.collection_status
                    }
                }else{
                    mui.toast(res.msg,{duration: 1500})
                }
                
            })

        },
        operation(type){

            var praiseList = JSON.parse(sessionStorage.getItem("praiseInfo"))
            var collectList = JSON.parse(sessionStorage.getItem("collectInfo"))
            
            if(this.$store.state.userInfo.token){
                
                switch(type){
                    case 1:
                        if(this.praise_status == 0){
                            this.articleDetails.praise_num = parseInt(this.articleDetails.praise_num) + 1
                            this.praise_status = 1
                        }else{
                            this.articleDetails.praise_num = parseInt(this.articleDetails.praise_num) - 1
                            this.praise_status = 0
                            
                        }
                        praise({
                            token:this.$store.state.userInfo.token,
                            status:this.praise_status,
                            id:this.$route.query.id,
                            type:this.$route.query.type,
                            operation_type:1,
                            
                        }).then((res) => {
                            mui.toast(res.msg,{duration: 1500})
                            if(res.status == 0){

                                let praiseArr = {
                                    status:this.praise_status,
                                    praiseNum:parseInt(this.articleDetails.praise_num),
                                    type:this.$route.query.type,
                                    id:this.$route.query.id,
                                }

                                if(praiseList){

                                    var currIndex = "";
                                    for(var i in praiseList){
                                        if(praiseList[i].id == this.$route.query.id){
                                            currIndex = i

                                        }
                                    }

                                    if(currIndex){
                                        
                                        praiseList[currIndex].status = this.praise_status
                                        praiseList[currIndex].praiseNum = parseInt(this.articleDetails.praise_num)
                                        sessionStorage.setItem("praiseInfo",JSON.stringify(praiseList))
                                    }else{
                                        
                                        
                                        praiseList.push(praiseArr)
                                        sessionStorage.setItem("praiseInfo",JSON.stringify(praiseList)) 
                                    }       
                                    
                                }else{
                                    
                                    let praiseList0 = [];
                                    praiseList0.push(praiseArr)
                                    sessionStorage.setItem("praiseInfo",JSON.stringify(praiseList0))
                                }
                                
                            }else if(res.status == 100){

                                sessionStorage.removeItem("userInfo")
                                setTimeout(() => {
                                    this.$store.commit('getUserInfo','')
                                    this.$router.push({path:'/login'})
                                },1500)
                            }

                        })

                        break;
                    case 2:
                        if(this.collect_status == 0){
                            this.articleDetails.collection_num = parseInt(this.articleDetails.collection_num) + 1
                            this.collect_status = 1
                        }else{
                            this.articleDetails.collection_num = parseInt(this.articleDetails.collection_num) - 1
                            this.collect_status = 0
                            
                        }
                        praise({
                            token:this.$store.state.userInfo.token,
                            status:this.collect_status,
                            id:this.$route.query.id,
                            type:this.$route.query.type,
                            operation_type:2,
                            
                        }).then((res) => {
                            mui.toast(res.msg,{duration: 1500})
                            if(res.status == 0){ 
                                let collectArr = {
                                    status:this.collect_status,
                                    collectNum:parseInt(this.articleDetails.collection_num),
                                    type:this.$route.query.type,
                                    id:this.$route.query.id,
                                }

                                if(collectList){

                                    var currIndex = "";
                                    for(var i in collectList){
                                        if(collectList[i].id == this.$route.query.id){
                                            currIndex = i

                                        }
                                    }

                                    if(currIndex){
                                        
                                        collectList[currIndex].status = this.collect_status
                                        collectList[currIndex].collectNum = parseInt(this.articleDetails.collection_num)
                                        sessionStorage.setItem("collectInfo",JSON.stringify(collectList))
                                    }else{
                                          
                                        collectList.push(collectArr)
                                        sessionStorage.setItem("collectInfo",JSON.stringify(collectList)) 
                                    }       
                                    
                                }else{
                                    
                                    let collectList0 = [];
                                    collectList0.push(collectArr)
                                    sessionStorage.setItem("collectInfo",JSON.stringify(collectList0))
                                }
                                

                            }else if(res.status == 100){

                                sessionStorage.removeItem("userInfo")
                                setTimeout(() => {
                                    this.$store.commit('getUserInfo','')
                                    this.$router.push({path:'/login'})
                                },1500)
                            }

                        })
                        break;
                    case 3:
                        if(this.commentValue){
                            comment({
                                token:this.$store.state.userInfo.token,
                                id:this.commentId || this.$route.query.id,
                                type:this.commentType || this.$route.query.type,
                                content:this.commentValue,
                                to_uid:this.toUserId,
                                reply_type:this.replyType
                                
                            }).then((res) => {
                                mui.toast(res.msg,{duration: 1500})
                                if(res.status == 0){
                                    this.is_comment = true
                                    this.commentStatus = true  

                                }else if(res.status == 100){
                                    sessionStorage.removeItem("userInfo")
                                    setTimeout(() => {
                                        this.$store.commit('getUserInfo','')
                                        this.$router.push({path:'/login'})
                                    },1500)
                                }

                            })

                        }else{
                            mui.toast("请输入评论内容")
                        }
                        break
    
                }

            }else{
                mui.toast("请先登录哟",{duration: 1500})
                setTimeout(() => {this.$router.push({path:'/login'})},1500)
            }
        },
        getUserForm(i,id,user){
            this.commentValue = ''
            if(i == 1){
                this.is_comment = false
                this.commentUser = ''
                this.commentType = ''
                this.commentId = ''
                this.replyType = ''
            }else if(i == 2){
                this.is_comment = false,
                this.commentUser = user
                this.commentId = id
                this.commentType = 6
                this.replyType = 1
            }else{
                this.is_comment = true
                
            }

        },
        sendForward(){
            this.$router.push({path:'/pages/talking',query:{id:this.$route.query.id,type:this.$route.query.type,title_img:this.articleDetails.title_img,title:this.articleDetails.title}})
        },
        toReply(params){
            localStorage.setItem('params',params)
            this.$router.push({path:'/article/reply'})
        }    
        
    },
    watch: {
        commentStatus:{
            handler(newVal, oldVal) {
                if (newVal) {
                    this.getArticleInfo();
                    this.commentStatus = false

                }
            },
            deep:true
        },
        $route: {
            handler: function(newVal, oldVal){
                this.typeValue = newVal.query.type
                this.getArticleInfo()
            },
            deep: true
        },

    },
    

}
</script>


<style scoped>

.flex{display: flex;flex-direction: column;margin-bottom:0.46rem;}
.header{height:0.46rem;display: flex;flex-direction: row;align-items: center;padding:0 0.1rem 0 0.05rem;justify-content: space-between;background:#168CE3;}
.header .back i{font-size:0.22rem;color:#fff;}
.header .article_text{text-align: center;color:#fff;font-size:0.15rem;}
.article_content{padding:0.1rem }
.article_content .person_info{display: flex;flex-direction: row;}
.article_content .person_info img{width:0.4rem;height:0.4rem;display:block;}
.article_content .person_info .info_wrapper{width:100%;display:flex;flex-direction: row;justify-content: space-between;align-items:center;color:#444;padding:0 0.05rem;}
.article_content .person_info .wrapper_left{display: flex;flex-direction: column;justify-content: center;}
.article_content .person_info .info_wrapper h3{font-size:0.15rem;font-weight:normal;text-align:left;}
.article_content .person_info .info_wrapper span{font-size:0.13rem;color:#666}
.article_content .person_info .wrapper_right span{padding:0.03rem 0.06rem;color:#fff;font-size:0.13rem;background:#168CE3}

.article_content .article_title h2{line-height:0.18rem;font-size:0.15rem;text-align:left;margin:0.1rem 0 0 0}
.article_content .article_other{display: flex;flex-direction: row;justify-content: flex-start;align-items:center;border-bottom:0.01rem solid #ddd;padding-bottom:0.1rem;margin:0.1rem 0}
.article_content .article_other span{font-size:0.13rem;color:#666;margin-right:0.1rem;}

>>>.article_content .article_details{letter-spacing: 0.01rem;text-align:left;font-size:0.13rem}
>>>.article_content .article_details p{width:100% !important;color:#444;font-size:0.13rem;margin:0.05rem 0}
>>>.article_content .article_details span{width:100% !important;color:#444;font-size:0.13rem;margin:0.05rem 0}
>>>.article_content .article_details table{width:100% !important;}
>>>.article_content .article_details table tr{width:100% !important;font-size:0.11rem;}
>>>.article_content .article_details table th{width:100% !important;font-size:0.11rem;}
>>>.article_content .article_details table td{width:100% !important;font-size:0.11rem;text-align: center;}
>>>.article_content .article_details a{width:100% !important;margin:0.1rem 0;}
>>>.article_content .article_details img{width:100% !important;margin:0.1rem 0;}
>>>.article_content .article_details strong{width:100% !important;margin:0.1rem 0;display: block;}


.article_content .operation_share{background:#eee;display:flex;flex-direction: row;justify-content: flex-start;align-items: center;padding:0.05rem 0.1rem;margin-top:0.1rem}
.article_content .operation_share img{width:0.5rem;}
.article_content .operation_share p{font-size:0.13rem;text-align: left;margin-left:0.05rem;}

.article_content .operation_img ul{display:flex;flex-direction: row;justify-content: flex-start;margin-top:0.1rem}
.article_content .operation_img ul li{width:30%;}
.article_content .operation_img ul li img{width:100%;display: block;}
.article_content .operation_img  ul li.bigImg{width:50%}
.article_content .operation_share{background:#eee;display:flex;flex-direction: row;justify-content: flex-start;align-items: center;padding:0.05rem 0.1rem;margin-top:0.1rem}
.article_content .operation_share img{width:0.5rem;}
.article_content .operation_share p{font-size:0.13rem;text-align: left;margin-left:0.05rem;}

.article_content .article_operation{display: flex;flex-direction: row;justify-content: space-around;align-items: center;margin:0.15rem 0;}
.article_content .article_operation .operation_item{border:0.01rem solid #ccc;padding:0 0.06rem;display: flex;justify-content: center;align-items:center;}
.article_content .article_operation .operation_item i{padding-top:0.05rem;}
.article_content .article_operation .operation_item:nth-child(1) i{margin-right:0.02rem;}
.article_content .article_operation .operation_item span{vertical-align: top;font-size:0.13rem;}
.article_content .article_ad img{width:100%;margin-top:0.1rem;}

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
.comment .comment_wrapper .comment_totals{font-size:0.13rem;color:#168CE3;text-align: left;margin-left:0.45rem;margin-top:0.06rem;}

.comment .no_comment{padding:0.05rem 0.1rem;font-size:0.13rem;}

.article_footer{height:0.4rem;position:fixed;bottom:0;left:0;right:0;display: flex;flex-direction: row;align-items:center;justify-content:space-between;background:#fff;padding:0 0.1rem}
.article_footer .wirte_comment{width:100%;height:0.28rem;padding:0 0.05rem;display:flex;flex-direction: row;justify-content: flex-start;background:#eee;align-items:center;}
.article_footer .wirte_comment span{font-size:0.14rem;background:transparent;border:0;outline:0;margin:0;padding:0}
.article_footer .wirte_comment i{font-size:0.16rem;margin-right:0.05rem;}
.article_footer .operate_wrapper{width:35%;display: flex;flex-direction: row;justify-content: space-around;align-items: center;padding-left:0.1rem;}
.article_footer .operate_wrapper>div i{font-size:0.20rem;padding-top:0.02rem;}
.article_footer .operate_wrapper .collect{font-size:0.20rem;padding-top:0.05rem;color:#888;position:relative;margin-right:0.1rem;}
.article_footer .operate_wrapper .praise{font-size:0.20rem;padding-top:0.05rem;position:relative;color:#888;margin-right:0.1rem;}
.article_footer .operate_wrapper .praise span{font-size:0.1rem;position:absolute;left:0.16rem;top:0;z-index:1;}
.article_footer .operate_wrapper .praise.is_praise span{color:#d81e06}
.article_footer .operate_wrapper .collect span{font-size:0.1rem;position:absolute;left:0.16rem;top:0;z-index:1;}
.article_footer .operate_wrapper .collect.is_collect span{color:#d81e06}

.article_footer .operate_wrapper .forward{padding-top:0.06rem;position:relative;color:#888;}
.article_footer .operate_wrapper .forward span{font-size:0.1rem;position:absolute;left:0.16rem;top:0;z-index:1;}


/* .form_wrapper{position:relative;} */
.form_wrapper .shade{position:fixed;right:0;left:0;bottom:0;top:0;background:rgba(0, 0, 0, 0.5)}
.form_wrapper .form_footer{position:fixed;bottom:0;left:0;right:0;display: flex;flex-direction: column;align-items:center;justify-content:space-between;background:#eee;padding:0.1rem}
.form_wrapper .form_footer .comment_content{width:100%;}
.form_wrapper .form_footer .comment_content textarea{padding:0.05rem;margin:0;font-size:0.14rem;}
.form_wrapper .form_footer .comment_operation{width:100%;display:flex;flex-direction: row;justify-content: space-between;align-content: center;margin-top:0.1rem;}
.form_wrapper .form_footer .comment_operation .icon{padding-top:0.03rem;}
.form_wrapper .form_footer .comment_operation .report_submit{padding:0.07rem 0.15rem 0.05rem 0.15rem;background:#168CE3;color:#fff;font-size:0.14rem;}
.form_wrapper .form_footer .comment_operation .disabled{background:#ccc}


</style>
