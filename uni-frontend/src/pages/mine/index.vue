<template>
  <view class="mine">
    <UserDetail :showEditButton="true" :userInfo="userStore.userInfo" />
  </view>
</template>

<script setup>
import { watch, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { onShow } from "@dcloudio/uni-app";
import UserDetail from "@/components/UserDetail/index.vue";

const userStore = useUserStore();
const userInfo = ref({
  id: userStore.userInfo ? userStore.userInfo.id : 0,
  username: userStore.userInfo ? userStore.userInfo.username : "",
  role: userStore.userInfo ? userStore.userInfo.role : "",
  avatar: userStore.userInfo ? userStore.userInfo.avatar : "",
});

// 监听 userStore.userInfo 的变化
watch(
  () => userStore.userInfo,
  (newUserInfo) => {
    userInfo.value = newUserInfo;
  }
);

onShow(() => {
  console.log("userStore.userInfo", userStore.userInfo);
  userInfo.value = {
    id: userStore.userInfo ? userStore.userInfo.id : 0,
    username: userStore.userInfo ? userStore.userInfo.username : "",
    role: userStore.userInfo ? userStore.userInfo.role : "",
    avatar: userStore.userInfo ? userStore.userInfo.avatar : "",
  };
});
</script>

<style lang="scss" scoped>
.mine {
  height: 100vh;

  ::v-deep .user-detail {
    .edit {
      width: 240rpx;
      margin: 0;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
