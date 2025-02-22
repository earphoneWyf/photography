<template>
  <view class="information">
    <view class="news-list" v-if="displayedNews.length">
      <view v-for="news in displayedNews" :key="news.id" class="news-item">
        <view class="title">{{ news.title }}</view>
        <view class="parse-wrapper">
          <up-parse :content="news.content" :selectable="true" />
        </view>
      </view>
      <up-loadmore :status="loadStatus" @loadmore="loadMore" />
    </view>
    <up-empty v-else text="资讯数据为空" />
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { getAllDisplayed } from "@/api/information";

const newsList = ref([]);

const displayedNews = ref([]);

// 是否还有更多数据
const hasMore = ref(true);

// 加载状态
const loadStatus = ref("loadmore");

// 每页显示的条数
const pageSize = 5;

// 当前页码
const currentPage = ref(1);

const loadMore = () => {
  loadStatus.value = "loading";
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const newNews = newsList.value.slice(startIndex, endIndex);

  if (newNews.length > 0) {
    displayedNews.value = [...displayedNews.value, ...newNews];
    currentPage.value += 1;
    loadStatus.value = "loadmore";
  } else {
    hasMore.value = false;
    loadStatus.value = "nomore";
  }
};

// 获取资讯列表数据
const fetchAllInformation = async () => {
  try {
    const response = await getAllDisplayed();
    if (response.code === 200) {
      newsList.value = response.data.informations;
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
    uni.showToast({ title: "获取资讯列表数据失败", icon: "none" });
  }
};

onMounted(() => {
  fetchAllInformation().then(() => {
    loadMore();
  });
});

// 滚动加载
onReachBottom(() => {
  // 模拟数据加载
  setTimeout(() => {
    loadMore();
  }, 1000);
});
</script>

<style scoped lang="scss">
/* 可以在这里添加样式 */
.information {
  .news-list {
    display: flex;
    flex-direction: column;
    padding: 40rpx;

    .news-item {
      margin-bottom: 30rpx;
      background: #4d9ef130;
      border-radius: 16rpx;
      padding: 20rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
      border: 2rpx dashed #c3c0c0;

      .title {
        margin: 0;
        font-size: 36rpx;
        font-weight: bold;
        border-bottom: 2rpx dashed #b3a7a7;
        padding-bottom: 10rpx;
      }

      .parse-wrapper {
        margin-top: 20rpx;
        border: 2rpx dashed #eee;
      }
    }
  }
}
</style>
