<template>
  <view class="sample-collection">
    <up-waterfall v-model="flowList" ref="uWaterfallRef">
      <template v-slot:left="{ leftList }">
        <view
          class="demo-water"
          v-for="(item, index) in leftList"
          :key="index"
          @click="goToSampleDetail(item)"
        >
          <up-lazy-load
            threshold="-450"
            border-radius="10"
            :image="`${baseURL}${item.image}`"
            :index="index"
          ></up-lazy-load>
          <view class="demo-title">{{ item.title }}</view>
          <view class="publisher">
            <image :src="`${baseURL}${item.publisher.avatar}`" alt="头像" />
            <view class="username">{{ item.publisher.username }}</view>
          </view>
        </view>
      </template>
      <template v-slot:right="{ rightList }">
        <view
          class="demo-water"
          v-for="(item, index) in rightList"
          :key="index"
          @click="goToSampleDetail(item)"
        >
          <up-lazy-load
            threshold="-450"
            border-radius="10"
            :image="`${baseURL}${item.image}`"
            :index="index"
          ></up-lazy-load>
          <view class="demo-title">{{ item.title }}</view>
          <view class="publisher">
            <image :src="`${baseURL}${item.publisher.avatar}`" alt="头像" />
            <view class="username">{{ item.publisher.username }}</view>
          </view>
        </view>
      </template>
    </up-waterfall>
    <up-loadmore
      bg-color="rgb(240, 240, 240)"
      height="80rpx"
      :status="loadStatus"
      @loadmore="loadMore"
    ></up-loadmore>
  </view>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { baseURL } from "@/config/index";
import { onReachBottom } from "@dcloudio/uni-app";

const props = defineProps({
  samples: Array,
});

// 每页显示的条数
const pageSize = 5;

// 当前页码
const currentPage = ref(1);

// 是否有更多数据
const hasMore = ref(true);

const flowList = ref([]);

const loadStatus = ref("loadmore");

// 加载数据
function loadMore() {
  if (!hasMore.value) return;

  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const newSamples = props.samples.slice(startIndex, endIndex);

  if (newSamples.length > 0) {
    newSamples.forEach((sample) => {
      flowList.value.push({
        id: sample.id,
        title: sample.title,
        image: sample.images[0].url,
        description: sample.description,
        publisher: sample.publisher,
        images: sample.images,
      });
    });
    currentPage.value += 1;
    loadStatus.value = "loadmore";
  } else {
    hasMore.value = false;
    loadStatus.value = "nomore";
  }
}

// 跳转到样片详情页
const goToSampleDetail = (item) => {
  // 将对象转换为 JSON 字符串
  const itemString = JSON.stringify(item);
  uni.navigateTo({
    url: `/pages/sampleDetail/index?sample=${encodeURIComponent(itemString)}`,
  });
};

// 滚动加载
onReachBottom(() => {
  loadStatus.value = "loading";
  // 模拟数据加载
  setTimeout(() => {
    loadMore();
  }, 1000);
});

// 监听 samples 的变化
watch(
  () => props.samples,
  (newSamples) => {
    flowList.value = [];
    currentPage.value = 1;
    hasMore.value = true;
    loadMore();
  }
);

onMounted(() => {
  flowList.value = [];
  currentPage.value = 1;
  hasMore.value = true;
  loadMore();
});

// const data = {
//   id,
//   title,
//   description,
//   images: [
//     {
//       message: "",
//       size: 139360,
//       status: "success",
//       thumb: "http://tmp/jL3ZLkMO5vbDc6508b96d0dcdf3035c9cea857e05fa4.jpg",
//       type: "image",
//       url: "/images/1739867570746-jL3ZLkMO5vbDc6508b96d0dcdf3035c9cea857e05fa4.jpg",
//     },
//     {
//       message: "",
//       size: 300727,
//       status: "success",
//       thumb: "http://tmp/oG45XsY2t0eOfda64260546d768aae3f2b6972e28c34.png",
//       type: "image",
//       url: "/images/1739867570800-oG45XsY2t0eOfda64260546d768aae3f2b6972e28c34.png",
//     },
//   ],
//   publisher: {
//     avatar:
//       "/images/1739861276624-uJKqO76igioOc2b811cc54fe0172276b071739f7a687.jpg",
//     id: 7,
//     role: "模特",
//     username: "wyf",
//   },
// };
</script>

<style scoped lang="scss">
/* 可以在这里添加样式 */
.sample-collection {
  background-color: rgb(240, 240, 240);
}

.demo-water {
  border-radius: 16rpx;
  margin: 10rpx;
  background-color: #ffffff;
  padding: 16rpx;
  position: relative;
}

.demo-title {
  font-size: 32rpx;
  margin-top: 10rpx;
  color: #333;
}

.publisher {
  display: flex;
  align-items: center;
  margin: 16rpx 0;

  image {
    width: 48rpx;
    height: 48rpx;
    border-radius: 50%;
  }

  .username {
    margin-left: 20rpx;
    color: #78787a;
  }
}
</style>
