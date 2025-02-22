<template>
  <view class="recommend">
    <view class="title">推荐的{{ role }}</view>
    <view class="users" v-if="users">
      <view
        v-for="user in users"
        :key="user.id"
        class="user"
        @click="goToMine(user)"
      >
        <image :src="`${baseURL}${user.avatar}`" class="avatar" />
        <view class="name">{{ user.username }}</view>
      </view>
    </view>
    <view v-else>loading......</view>
  </view>
</template>

<script setup>
import { baseURL } from "@/config/index";
const props = defineProps({
  users: Array,
  role: String,
});

const goToMine = (publisher) => {
  console.log("publisher", publisher);
  uni.navigateTo({
    url: `/pages/mine/PersonalDetail?publisher=${encodeURIComponent(
      JSON.stringify(publisher)
    )}`,
  });
};
</script>

<style scoped lang="scss">
.recommend {
  margin: 20rpx;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  border-radius: 16rpx;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
  }
  .users {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .name {
    margin-top: 5px;
    font-size: 14px;
  }
}
</style>
