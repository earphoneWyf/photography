<template>
  <view class="user-detail" v-if="userInfo">
    <!-- 头像、用户名和身份信息 -->
    <view class="user-info">
      <image
        class="avatar"
        :src="`${baseURL}${userInfo.avatar}`"
        alt="头像"
      ></image>
      <view class="info">
        <text class="username">{{ userInfo.username }}</text>
        <text class="identity">{{ userInfo.role }}</text>
        <text class="contact">联系：{{ userInfo.contact }}</text>
      </view>
      <up-button
        v-if="showEditButton"
        class="edit"
        text="编辑信息"
        shape="circle"
        @click="goToMineDetail"
        style="width: 180rpx"
      ></up-button>
    </view>

    <view class="content">
      <!-- 标签切换 -->
      <up-tabs :list="tabs" @click="handleTabClick"></up-tabs>

      <view class="shootingWrapper" v-if="activeTab === 0">
        <!-- 约拍信息 -->
        <AppointmentToShoot
          v-if="appointments.length"
          :appointments="appointments"
        />
        <up-empty v-else text="约拍数据为空" />
      </view>
      <view class="sampleWrapper" v-if="activeTab === 1">
        <!-- 样片信息 -->
        <SampleCollection v-if="samples.length" :samples="samples" />
        <up-empty v-else text="样片数据为空" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { baseURL } from "@/config/index";
import AppointmentToShoot from "@/components/AppointmentToShoot/index.vue";
import SampleCollection from "@/components/SampleCollection/index.vue";
import { getShootingDemandsByUserIdApi } from "@/api/shooting";
import { getSamplePhotosByUserIdApi } from "@/api/sample";

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
  showEditButton: {
    type: Boolean,
    default: false,
  },
});

const activeTab = ref(0);
// 创建响应式数据
const tabs = reactive([{ name: "约拍" }, { name: "样片" }]);

const goToMineDetail = () => {
  // 跳转到编辑个人信息
  uni.navigateTo({ url: "/pages/mine/PersonalData" });
};

const handleTabClick = (item) => {
  activeTab.value = item.index;
};

// 约拍信息
const appointments = ref([]);

// 样片信息
const samples = ref([]);

// 获取个人约拍数据
const getShootingDemandsByUser = async (id) => {
  try {
    const response = await getShootingDemandsByUserIdApi(id);

    if (response.code === 200) {
      appointments.value = [];
      appointments.value = response.data.map((item) => {
        return {
          id: item.id,
          target: item.target,
          shootingTime: item.shooting_time,
          location: item.location,
          cost: item.cost,
          requirement: item.requirement,
          publisher: props.userInfo,
        };
      });
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
  }
};

// 获取个人样片数据
const getSamplePhotosByUser = async (id) => {
  try {
    const response = await getSamplePhotosByUserIdApi(id);

    if (response.code === 200) {
      samples.value = [];
      samples.value = response.data;
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  console.log("详情页用户数据", props.userInfo);
  getShootingDemandsByUser(props.userInfo.id);
  getSamplePhotosByUser(props.userInfo.id);
});

watch(
  () => props.userInfo,
  (newUserInfo) => {
    console.log("newUserInfo", newUserInfo);
    getShootingDemandsByUser(newUserInfo.id);
    getSamplePhotosByUser(newUserInfo.id);
  }
);
</script>

<style scoped lang="scss">
.user-detail {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: -36rpx;
    background-color: #2196f359;
    padding: 40rpx 20rpx 76rpx 20rpx;

    .avatar {
      width: 180rpx;
      height: 180rpx;
      border-radius: 50%;
      margin-right: 40rpx;
      border: 2rpx solid snow;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;

      .username {
        font-size: 40rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      .identity,
      .contact {
        font-size: 32rpx;
        margin-bottom: 10rpx;
        color: #918f8f;
      }
    }

    .edit {
      width: 240rpx;
      margin: 0;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    }
  }

  .content {
    flex: 1;
    border-radius: 50rpx 50rpx 0 0;
    background: #ffffff;
    padding-top: 20rpx;

    .u-tabs {
      margin-bottom: 20rpx;
    }

    .shootingWrapper {
      padding: 0 40rpx;
    }
  }
}
</style>
