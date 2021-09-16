<template>
  <div class="flex flex-col">
    <van-tabs class="flex-grow overflow-auto">
      <van-tab title="测试" class="p-4">
        <van-button color="indigo" round to="/abort">Abort</van-button>
        <van-button color="indigo" round @click="testNetwork">
          测试网络请求
        </van-button>
      </van-tab>
      <van-tab title="组件" class="">
        <div class="flex flex-col bg-sky-100">
          <van-notice-bar
            left-icon="volume-o"
            text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
          />
          <van-pull-refresh v-model="refreshing" @refresh="testNetwork(true)">
            <van-list>
              <van-cell v-for="item in 20" :key="item" :title="item" />
              <list-item title="测试"></list-item>
              <van-cell v-for="item in 20" :key="item" :title="item" />
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
    <van-tabbar :fixed="false">
      <van-tabbar-item icon="home-o">标签 1</van-tabbar-item>
      <van-tabbar-item icon="search">标签 2</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签 3</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签 4</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import remote from "@/utils/remote/remote";
import { ref } from "vue";
import ListItem from "@/components/ListItem.vue";

export default {
  components: { ListItem },
  name: "Home",
  setup() {
    const data = ref(10);
    const refreshing = ref(false);
    const testNetwork = async function (refresh) {
      if (refresh) {
        data.value = 0;
      }
      data.value = data.value + 10;
      refreshing.value = false;
      try {
        await remote.post({
          url: "/test",
          taskName: "测试任务",
        });
      } catch (e) {}
    };
    return {
      testNetwork,
      data,
      refreshing,
    };
  },
};
</script>
