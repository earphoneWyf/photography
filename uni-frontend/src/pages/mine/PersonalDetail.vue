<template>
  <view class="personal-detail">
    <UserDetail :showEditButton="false" :userInfo="publisher" />
  </view>
</template>

<script setup>
import UserDetail from "@/components/UserDetail/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const publisher = ref(null);

onLoad((options) => {
  if (options.publisher) {
    publisher.value = JSON.parse(decodeURIComponent(options.publisher));
  }
});
</script>

<style scoped lang="scss">
.personal-detail {
  height: 100vh;
}
</style>
