<template>
  <view class="appointment-detail" v-if="appointment">
    <!-- 自定义顶部导航栏 -->
    <view class="user-info">
      <view class="navbar-left">
        <up-avatar
          :src="getAvatarUrl(appointment.publisher.avatar)"
          @click="handleContact"
          size="40"
        ></up-avatar>
        <view class="user-name">{{ appointment.publisher.username }}</view>
      </view>
      <view class="navbar-right">
        <view class="user-role">{{ appointment.publisher.role }}</view>
      </view>
    </view>

    <!-- 约拍详细信息 -->
    <view class="detail-content">
      <view class="section">
        <view class="section-title">约拍类型</view>
        <view class="section-value">{{ appointment.target }}</view>
      </view>
      <view class="section">
        <view class="section-title">时间</view>
        <view class="section-value">{{
          dayjs(appointment.shootingTime).format("YYYY-MM-DD HH:mm")
        }}</view>
      </view>
      <view class="section">
        <view class="section-title">地点</view>
        <view class="section-value">{{ appointment.location }}</view>
      </view>
      <view class="section">
        <view class="section-title">费用</view>
        <view class="section-value">{{ appointment.cost }} 元</view>
      </view>
      <view class="section">
        <view class="section-title">描述</view>
        <view class="parse-wrapper">
          <up-parse :content="appointment.requirement" :selectable="true" />
        </view>
      </view>
    </view>

    <!-- 按钮 -->
    <view class="action-button">
      <up-button v-if="appointment.isMine" type="primary" @click="show = true">
        编辑约拍
      </up-button>
      <up-button v-else type="primary" @click="handleContact">
        联系他/她
      </up-button>
    </view>

    <!-- 编辑约拍弹出层 -->
    <up-popup
      :show="show"
      :mode="bottom"
      :closeable="true"
      @close="show = false"
      @open="show = true"
      v-if="shootingForm"
    >
      <AppointmentEditor
        :isEdit="true"
        :initialForm="shootingForm"
        @updateAppointment="updateAppointment"
      />
    </up-popup>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { baseURL } from "@/config/index";
import { useUserStore } from "@/stores/user";
import AppointmentEditor from "@/components/AppointmentEditor/index.vue";
import dayjs from "dayjs";

// 约拍详情数据
const appointment = ref(null);
const show = ref(false);
const shootingForm = ref(null);

// 获取完整的头像 URL
const getAvatarUrl = (avatar) => {
  // 如果 avatar 已经包含 baseURL，则直接返回 avatar
  if (avatar && avatar.startsWith(baseURL)) {
    return avatar;
  }
  // 如果 avatar 是相对路径，则拼接 baseURL
  return avatar ? `${baseURL}${avatar}` : "";
};

// 编辑约拍

// 页面加载时获取约拍详情
onLoad((options) => {
  const userStore = useUserStore();

  // 解码并解析 JSON 字符串
  const appointmentData = JSON.parse(decodeURIComponent(options.appointment));

  appointment.value = {
    ...appointmentData,
    isMine: userStore.userInfo.id === appointmentData.publisher.id,
  };

  shootingForm.value = appointment.value;
  console.log("约拍信息:", appointment.value);
});

// 联系
const handleContact = () => {
  console.log("发布者", appointment.value.publisher);
  const publisher = appointment.value.publisher;
  uni.navigateTo({
    url: `/pages/mine/PersonalDetail?publisher=${encodeURIComponent(
      JSON.stringify(publisher)
    )}`,
  });
};

// 更新后的约拍信息
const updateAppointment = (newForm) => {
  appointment.value = Object.assign({}, appointment.value, newForm);
  show.value = false;
};
</script>

<style scoped lang="scss">
.appointment-detail {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    background-color: #fff;
    border-bottom: 2rpx solid #eee;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

    .navbar-left {
      flex: 3;
      display: flex;
      align-items: center;

      .user-name {
        margin-left: 40rpx;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    .navbar-right {
      flex: 1;
      .user-role {
        margin-left: 20rpx;
        font-size: 28rpx;
        color: #666;
      }
    }
  }

  .detail-content {
    margin-top: 40rpx;

    .section {
      margin-bottom: 40rpx;

      .section-title {
        font-size: 32rpx;
        color: #999;
        margin-bottom: 10rpx;
      }

      .section-value {
        font-size: 32rpx;
        color: #333;
      }
    }
  }

  .action-button {
    width: 40%;
    position: fixed;
    left: 50%;
    bottom: 80rpx;
    transform: translateX(-50%);
  }

  .parse-wrapper {
    background: #4d9ef130;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    padding: 20rpx;
  }

  ::v-deep .appointment-editor {
    padding: 40rpx 40rpx 80rpx;

    .u-textarea {
      height: 300rpx;
      border: 2rpx solid #bbbaba;
    }
  }
}
</style>
