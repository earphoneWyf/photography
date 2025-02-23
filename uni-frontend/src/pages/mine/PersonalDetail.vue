<template>
  <view class="personal-detail">
    <UserDetail
      :showEditButton="false"
      :showReservationButton="true"
      :userInfo="publisher"
    />
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

  ::v-deep .user-detail {
    .u-textarea {
      width: 100%;
      height: 300rpx;
      border: 2rpx solid #bbbaba;
    }
  }
}
</style>
