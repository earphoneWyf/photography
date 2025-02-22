<template>
  <view class="publish">
    <!-- tab 切换 -->
    <up-tabs
      :list="tabList"
      :itemStyle="{
        flex: 1,
        height: '88rpx',
        fontWeight: 'bold',
        fontSize: '36rpx',
      }"
      lineWidth="120rpx"
      @click="handleTabClick"
    />

    <view class="content">
      <!-- 发布约拍 -->
      <view v-show="activeTab === 0">
        <AppointmentEditor :isEdit="false" :initialForm="shootingForm" />
      </view>
      <!-- 发布样片 -->
      <view v-show="activeTab === 1">
        <SampleEditor :isEdit="false" :initialForm="sampleForm" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import dayjs from "dayjs";
import AppointmentEditor from "@/components/AppointmentEditor/index.vue";
import SampleEditor from "@/components/SampleEditor/index.vue";

// tab 切换相关
const activeTab = ref(0);
const tabList = reactive([{ name: "发布约拍" }, { name: "发布样片" }]);

const handleTabClick = (item) => {
  activeTab.value = item.index;
};

// 发布约拍表单
const shootingForm = reactive({
  target: "模特",
  shootingTime: dayjs().format("YYYY-MM-DD HH:mm"),
  location: "",
  cost: 0,
  requirement: "",
});

// 发布样片表单
const sampleForm = ref({
  title: "",
  description: "",
  images: [],
});
</script>

<style lang="scss" scoped>
/* 使用 rpx 进行样式布局 */
.publish {
  .u-tabs {
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  }

  .content {
    padding: 40rpx;

    ::v-deep .appointment-editor {
      .u-datetime-picker,
      .u-input {
        border: 2rpx solid #bbbaba;
      }

      .u-textarea {
        height: 300rpx;
        border: 2rpx solid #bbbaba;
      }
    }

    ::v-deep .sample-editor {
      .u-input {
        border: 2rpx solid #bbbaba;
      }

      .u-textarea {
        height: 300rpx;
        border: 2rpx solid #bbbaba;
      }
    }
  }
}
</style>
