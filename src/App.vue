<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="tw-p-12 tw-bg-gray-100">
    <div class="tw-font-bold tw-shadow-lg tw-ring-2 tw-ring-blue-400 tw-ring-offset-4 tw-bg-green-500 tw-m-11">
      123
    </div>
  </div>
  {{date}}
  {{time}}
  {{$store.state.loadingState.loading}}
  <van-button @click="request">request</van-button>
  <van-button type="danger" @click="show = true">日历</van-button>
  <van-calendar v-model:show="show" v-model="date" color="#1989fa" @confirm="onConfirm" />
  <van-datetime-picker
      type="time"
      v-model="time"
  >
  </van-datetime-picker>
</template>

<script>
import { request } from '@/utils/request'

export default {
  data(){
    return {
      show:false,
      time:undefined,
      date:undefined
    }
  },
  methods:{
    onConfirm(v){
      this.date = v;
      this.show = false
    },
    request(){
      request.post({
        url:"/java/binding/getUserInfo"
      })
    }
  }
}
</script>
