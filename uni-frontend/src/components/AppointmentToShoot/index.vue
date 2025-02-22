<template>
  <view class="appointment-to-shoot">
    <view class="filter">
      <up-radio-group
        v-model="filterType"
        class="up-radio-group"
        @change="handleFilterChange"
      >
        <up-radio label="全部" name="全部" />
        <up-radio label="摄影师" name="摄影师" />
        <up-radio label="模特" name="模特" />
      </up-radio-group>
    </view>

    <view class="appointment-list">
      <view
        class="appointment-item"
        v-for="(item, index) in filteredAppointments"
        :key="index"
        @click="goToAppointmentDetail(item)"
      >
        <view class="type">找{{ item.target }}</view>
        <view class="time"
          >时间：{{ dayjs(item.shootingTime).format("YYYY-MM-DD HH:mm") }}</view
        >
        <view class="location">地点：{{ item.location }}</view>
        <view class="fee">费用：{{ item.cost }} 元</view>
        <view class="publisher">发布者：{{ item.publisher.username }}</view>
      </view>
      <up-loadmore :status="loadStatus" @loadmore="loadMore" />
    </view>
  </view>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  appointments: Array,
});

// 当前显示的约拍信息
const filteredAppointments = ref([]);

// 当前筛选条件
const filterType = ref("全部");

// 是否还有更多数据
const hasMore = ref(true);

// 加载状态
const loadStatus = ref("loadmore");

// 每页显示的条数
const pageSize = 5;

// 当前页码
const currentPage = ref(1);

// 计算筛选后的约拍信息
const filterAppointments = () => {
  if (filterType.value === "全部") {
    return props.appointments;
  } else {
    return props.appointments.filter(
      (item) => item.target === filterType.value
    );
  }
};

// 加载更多约拍信息
const loadMore = () => {
  const filtered = filterAppointments();
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const newAppointments = filtered.slice(startIndex, endIndex);

  if (newAppointments.length > 0) {
    filteredAppointments.value = [
      ...filteredAppointments.value,
      ...newAppointments,
    ];
    currentPage.value += 1;
    loadStatus.value = "loadmore";
  } else {
    hasMore.value = false;
    loadStatus.value = "nomore";
  }
};

// 初始化加载
loadMore();

// 处理筛选条件变化
const handleFilterChange = (value) => {
  filterType.value = value;
  filteredAppointments.value = [];
  currentPage.value = 1;
  hasMore.value = true;
  loadMore();
};

// 跳转到约拍详情页
const goToAppointmentDetail = (item) => {
  // 将对象转换为 JSON 字符串
  const itemString = JSON.stringify(item);
  uni.navigateTo({
    url: `/pages/appointmentDetail/index?appointment=${encodeURIComponent(
      itemString
    )}`,
  });
};

// 监听 appointments 的变化
watch(
  () => props.appointments,
  (newAppointments) => {
    filteredAppointments.value = [];
    currentPage.value = 1;
    hasMore.value = true;
    loadMore();
  }
);

onMounted(() => {});
</script>
<style scoped lang="scss">
.appointment-to-shoot {
  display: flex;
  flex-direction: column;

  .filter {
    width: 70%;
    align-self: center;
    margin-bottom: 20rpx;
  }

  .appointment-list {
    .appointment-item {
      padding: 20rpx;
      border-bottom: 2rpx solid #d9d8d8;
      margin-bottom: 20rpx;
      border-radius: 16rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

      .type {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 16rpx;
      }
      .time,
      .location,
      .fee,
      .publisher {
        font-size: 28rpx;
        color: #666;
        padding: 10rpx 0;
      }
    }

    .load-more {
      text-align: center;
      color: #007aff;
      padding: 20rpx;
      cursor: pointer;
    }
  }
}
</style>
