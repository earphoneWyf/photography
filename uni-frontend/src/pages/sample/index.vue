<template>
  <view class="sample">
    <SampleCollection :samples="sampleStore.samples" />
  </view>
</template>

<script setup>
import SampleCollection from "@/components/SampleCollection/index.vue";
import { onShow } from "@dcloudio/uni-app";
import { useSampleStore } from "@/stores/sample";
const sampleStore = useSampleStore();

onShow(async () => {
  await sampleStore.fetchAllSamples();
  console.log("全部样片信息", sampleStore.samples);
});
</script>

<style scoped lang="scss">
/* 可以在这里添加样式 */
.sample {
  height: 100vh;
  background-color: rgb(240, 240, 240);
}
</style>
