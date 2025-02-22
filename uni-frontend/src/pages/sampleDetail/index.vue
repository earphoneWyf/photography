<template>
  <view class="sample-detail" v-if="sample">
    <!-- 自定义顶部导航栏 -->
    <view class="user-info">
      <view class="navbar-left">
        <up-avatar
          :src="getImageUrl(sample.publisher.avatar)"
          size="40"
        ></up-avatar>
        <view class="user-name">{{ sample.publisher.username }}</view>
      </view>
      <view class="navbar-right">
        <view class="user-role">{{ sample.publisher.role }}</view>
      </view>
    </view>

    <!-- 样片详细信息 -->
    <view class="detail-content">
      <view class="section">
        <view class="section-title">标题</view>
        <view class="section-value">{{ sample.title }}</view>
      </view>
      <view class="section">
        <view class="section-title">描述</view>
        <view class="section-value parse-wrapper">
          <up-parse :content="sample.description" :selectable="true" />
        </view>
      </view>
      <view class="section">
        <view class="section-title">图片</view>
        <view class="swiper-wrapper">
          <up-swiper
            :list="imageList"
            :indicator="true"
            :indicatorMode="'dot'"
            height="600rpx"
          ></up-swiper>
        </view>
      </view>
    </view>

    <!-- 按钮 -->
    <view class="action-button">
      <up-button
        v-if="sample.isMine"
        type="primary"
        text="编辑样片"
        @click="show = true"
      >
      </up-button>
    </view>

    <!-- 编辑样片弹出层 -->
    <up-popup
      :show="show"
      :mode="bottom"
      :closeable="true"
      @close="show = false"
      @open="show = true"
      v-if="sampleForm"
    >
      <SampleEditor
        :isEdit="true"
        :initialForm="sampleForm"
        @updateSample="updateSample"
      />
    </up-popup>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { baseURL } from "@/config/index";
import { useUserStore } from "@/stores/user";
import SampleEditor from "@/components/SampleEditor/index.vue";

// 样片详情数据
const sample = ref(null);

// 图片列表
const imageList = ref([]);

const show = ref(false);
const sampleForm = ref(null);

// 获取完整的图片 URL
const getImageUrl = (url) => {
  if (url && url.startsWith(baseURL)) {
    return url;
  }
  return url ? `${baseURL}${url}` : "";
};

// 页面加载时获取样片详情
onLoad((options) => {
  const userStore = useUserStore();
  const sampleData = JSON.parse(decodeURIComponent(options.sample));
  sample.value = {
    ...sampleData,
    isMine: userStore.userInfo.id === sampleData.publisher.id,
  };

  sampleForm.value = sample.value;

  // 设置图片列表
  sample.value.images.forEach((image) => {
    imageList.value.push(getImageUrl(image.url));
  });
});

// 更新后的约拍信息
const updateSample = (newForm) => {
  console.log("更新后的样片", newForm);
  sample.value = Object.assign({}, sample.value, newForm);
  imageList.value = newForm.images.map((image) => getImageUrl(image.url));
  show.value = false;
};
</script>

<style scoped lang="scss">
.sample-detail {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  height: 95vh;
  box-sizing: border-box;
  overflow-y: scroll;

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
        font-size: 36rpx;
        color: #333;
        font-weight: bold;
        margin-bottom: 10rpx;
      }

      .section-value {
        font-size: 32rpx;
        color: #999;
      }
    }

    .parse-wrapper {
      background: #4d9ef130;
      border-radius: 16rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
      padding: 20rpx;
    }

    .swiper-wrapper {
      border: 2rpx solid #cfcece;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    }
  }

  ::v-deep .sample-editor {
    padding: 40rpx 40rpx 80rpx;

    .u-textarea {
      height: 300rpx;
      border: 2rpx solid #bbbaba;
    }
  }
}
</style>
