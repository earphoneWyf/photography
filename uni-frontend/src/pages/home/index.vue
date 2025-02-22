<template>
  <view class="content">
    <!-- 通知 -->
    <view class="notice-bar-wrapper">
      <up-notice-bar
        :text="noticeText"
        direction="column"
        justifyContent="center"
      />
    </view>

    <!-- 轮播图 -->
    <view class="swiper-wrapper" indicator indicatorMode="dot" circular
      ><up-swiper :list="list"></up-swiper
    ></view>

    <!-- 推荐摄影师 -->
    <Recommend
      v-if="photographers"
      :users="photographers"
      :role="photographerType"
    />

    <!-- 推荐模特 -->
    <Recommend v-if="models" :users="models" :role="modelType" />

    <!-- 约拍信息 -->
    <view class="appointment">
      <view class="title">约拍信息</view>
      <AppointmentToShoot
        v-if="appointmentStore.appointments.length"
        :appointments="appointmentStore.appointments"
      />
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import Recommend from "@/components/Recommend/index.vue";
import AppointmentToShoot from "@/components/AppointmentToShoot/index.vue";
import { onShow } from "@dcloudio/uni-app";
import { useAppointmentStore } from "@/stores/shooting";
import { getVerifiedCarousels } from "@/api/carousel";
import { getRecommendedUsersApi } from "@/api/user";
import { baseURL } from "@/config/index";

const appointmentStore = useAppointmentStore();

// 定义通知栏的文本内容
const noticeText = reactive([
  "欢迎各位摄影师和模特报名参加户外摄影！",
  "近期约拍需求大增，模特们抓紧接单啦！",
  "平台将举办摄影技巧线上分享会，欢迎报名！",
]);

// 轮播图内容
const list = ref([]);

// 推荐摄影师
const photographers = ref([]);
// 推荐模特
const models = ref([]);

const photographerType = ref("摄影师");
const modelType = ref("模特");

// 获取轮播图数据
const fetchAllCarousels = async () => {
  try {
    const response = await getVerifiedCarousels();
    if (response.code === 200) {
      list.value = response.data.carousels.map(
        (carousel) => `${baseURL}${carousel.image_url}`
      );
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
    uni.showToast({ title: "获取轮播图数据失败", icon: "none" });
  }
};

// 获取推荐的用户数据
const fetchAllUsers = async () => {
  try {
    const response = await getRecommendedUsersApi();
    if (response.code === 200) {
      photographers.value = response.data.photographers;
      models.value = response.data.models;
      console.log("推荐的摄影师、模特", photographers.value, models.value);
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
    uni.showToast({ title: "获取推荐用户数据失败", icon: "none" });
  }
};

onShow(async () => {
  await fetchAllCarousels();
  await fetchAllUsers();
  await appointmentStore.fetchAllAppointments();
});
</script>

<style scoped lang="scss">
.content {
  .appointment {
    display: flex;
    flex-direction: column;
    margin: 20rpx;
    padding: 20rpx;
    background: #fff;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    border-radius: 16rpx;

    .title {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }
}
</style>
