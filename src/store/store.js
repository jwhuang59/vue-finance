
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state : {
        loading:false,
        userInfo:'',
	},

	mutations : {
		loading (state,extra) {
			state.loading = extra

        },
        getUserInfo (state,userInfo) {
            state.userInfo = userInfo
        }

    },
    // action : {
    //     getUserInfo (state,userInfo) {

    //         state.userInfo = userInfo
    //     }

    // }

})


export default store