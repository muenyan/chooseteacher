import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  //只有mutations里的方法才能改变state的值，没有第二种方式
  state: {
    curruser:sessionStorage.getItem('curruser') ? JSON.parse(sessionStorage.getItem('curruser')) : null,
    permission: null
  },
  //不允许有异步的方法，这里放的是同步的方法
  mutations: {
    setuser(state,payload){
      state.curruser=payload
    },
    setPermission(state,payload){
      state.permission = payload
    }
  },


  //和mutations差不多都是放的方法，这是异步操作,这里可以放Ajax请求
  actions: {

  },
  modules: {
  }
})
