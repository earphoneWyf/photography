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
      <view class="buttons">
        <up-button
          v-if="showEditButton"
          class="edit"
          text="编辑信息"
          shape="circle"
          @click="goToMineDetail"
          style="width: 180rpx"
        ></up-button>
        <up-button
          v-if="showReservationButton && userStore.userInfo.id !== userInfo.id"
          class="reservation"
          :text="reservationButtonText"
          shape="circle"
          style="width: 180rpx"
          @click="openReservationDialog(reservationButtonText)"
        ></up-button>
      </view>
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
      <view
        class="reservationWrapper"
        v-if="activeTab === 2 && !showReservationButton"
      >
        <ReservationSection
          :initiatedReservations="initiatedReservations"
          :receivedReservations="receivedReservations"
          @editReservation="editReservation"
          @deleteReservation="deleteReservation"
          @acceptReservation="acceptReservation"
        />
      </view>
    </view>

    <!-- 预约弹窗 -->
    <up-popup :show="isReservationDialogOpen" :mode="`bottom`">
      <view class="dialog-content">
        <view class="input-group">
          <text>发起预约</text>
          <up-textarea
            v-model="reservationContent"
            placeholder="请输入预约内容"
            count
            autoHeight
            :confirmType="null"
          ></up-textarea>
        </view>
        <view class="button-group">
          <up-button text="确认" @click="sendReservation" type="primary" />
          <up-button text="取消" @click="closeReservationDialog" />
        </view>
      </view>
    </up-popup>
  </view>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { baseURL } from "@/config/index";
import AppointmentToShoot from "@/components/AppointmentToShoot/index.vue";
import SampleCollection from "@/components/SampleCollection/index.vue";
import ReservationSection from "@/components/ReservationSection/index.vue";
import { getShootingDemandsByUserIdApi } from "@/api/shooting";
import { getSamplePhotosByUserIdApi } from "@/api/sample";
import { useUserStore } from "@/stores/user";
import {
  initiateReservationApi,
  editReservationApi,
  deleteReservationApi,
  getReservationsByUserIdApi,
  editReservationContentApi,
  checkReservationStatusApi,
} from "@/api/reservation";

const userStore = useUserStore();

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
  showEditButton: {
    type: Boolean,
    default: false,
  },
  showReservationButton: {
    type: Boolean,
    default: false,
  },
});

const activeTab = ref(0);

// 使用计算属性动态生成 tabs 数组
const tabs = computed(() => {
  if (props.showReservationButton) {
    return [{ name: "约拍" }, { name: "样片" }];
  }
  return [{ name: "约拍" }, { name: "样片" }, { name: "预约" }];
});

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

// 预约弹窗相关
const isReservationDialogOpen = ref(false);
const reservationContent = ref("");
const reservationButtonText = ref("预约");

// 我发起的预约
const initiatedReservations = ref([]);
// 我接收的预约
const receivedReservations = ref([]);

const openReservationDialog = (text) => {
  if (text !== "预约") return;
  isReservationDialogOpen.value = true;
};

const closeReservationDialog = () => {
  isReservationDialogOpen.value = false;
  reservationContent.value = "";
};

// 发送预约
const sendReservation = async () => {
  if (!reservationContent.value) {
    uni.showToast({ title: "请输入预约内容", icon: "none" });
    return;
  }
  const initiator = userStore.userInfo.id;
  const receiver = props.userInfo.id;
  try {
    const response = await initiateReservationApi({
      content: reservationContent.value.replace(/\n/g, "<br>"),
      initiator,
      receiver,
    });
    if (response.code === 200) {
      reservationButtonText.value = "等待验证";
      closeReservationDialog();
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
  }
};

// 判断和档期那用户是否有预约
const checkReservationStatus = async () => {
  try {
    const response = await checkReservationStatusApi(
      userStore.userInfo.id,
      props.userInfo.id
    );
    if (response.code === 200) {
      const { isReserved, status } = response.data;
      if (isReserved) {
        reservationButtonText.value = status;
      } else {
        reservationButtonText.value = "预约";
      }
      getReservations();
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
  }
};

// 获取当前用户的预约数据
const getReservations = async () => {
  const userId = userStore.userInfo.id;
  try {
    const response = await getReservationsByUserIdApi(userId);
    if (response.code === 200) {
      initiatedReservations.value = response.data.initiated;
      receivedReservations.value = response.data.received;
      console.log("发起的数据", initiatedReservations.value);
      console.log("收到的数据", receivedReservations.value);
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
  }
};

// 发起者更新预约内容
const editReservation = async (data) => {
  try {
    const response = await editReservationContentApi(data.id, data);
    if (response.code === 200) {
      uni.showToast({ title: "预约内容更新成功", icon: "success" });
      getReservations();
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
  }
};

// 发起者删除自己的预约
const deleteReservation = async (reservationId) => {
  const confirm = await uni.showModal({
    title: "确认删除",
    content: "是否确认删除该预约？",
  });
  if (confirm.confirm) {
    try {
      const response = await deleteReservationApi(reservationId);
      if (response.code === 200) {
        uni.showToast({ title: "预约删除成功", icon: "success" });
        getReservations();
      } else {
        uni.showToast({ title: response.message, icon: "none" });
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// 接收者接受预约
const acceptReservation = async (data) => {
  try {
    const response = await editReservationApi(data.id, data);
    if (response.code === 200) {
      if (data.is_agreed) {
        uni.showToast({ title: "接受预约", icon: "success" });
      } else {
        uni.showToast({ title: "拒绝预约", icon: "success" });
      }
      getReservations();
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  // console.log("详情页用户数据", props.userInfo, userStore.userInfo);
  getShootingDemandsByUser(props.userInfo.id);
  getSamplePhotosByUser(props.userInfo.id);
  checkReservationStatus();
});

watch(
  () => props.userInfo,
  (newUserInfo) => {
    getShootingDemandsByUser(newUserInfo.id);
    getSamplePhotosByUser(newUserInfo.id);
    checkReservationStatus();
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

    .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
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

  .dialog-content {
    padding: 20rpx;
    margin-bottom: 80rpx;

    .input-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20rpx;
      padding: 0 40rpx;

      text {
        margin-bottom: 20rpx;
        font-size: 36rpx;
        font-weight: bold;
      }
    }

    .button-group {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
