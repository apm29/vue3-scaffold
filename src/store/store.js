import {createStore} from 'vuex'
import { loadingState } from '@/utils/request'

export default createStore({
  state () {
    return {
      app:{
        name:"vue3-scaffold"
      }
    }
  },
  mutations: {

  },
  modules:{
    loadingState
  }
})
