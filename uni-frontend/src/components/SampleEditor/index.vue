<template>
  <view class="sample-editor">
    <up-form
      labelWidth="80"
      labelPosition="left"
      :model="sampleForm"
      ref="sampleFormRef"
    >
      <up-form-item label="样片标题">
        <up-input
          v-model="sampleForm.title"
          placeholder="请输入样片标题"
        ></up-input>
      </up-form-item>
      <up-form-item label="样片描述">
        <up-textarea
          v-model="sampleForm.description"
          placeholder="请输入样片描述"
          count
          autoHeight
          :confirmType="null"
        ></up-textarea>
      </up-form-item>
      <up-form-item label="样片图片">
        <ImageUpload
          :uploadUrl="`${baseURL}/upload/image/sample`"
          :fileList="sampleForm.images"
          :name="'image'"
          @updateFileList="updateFileList"
          :multiple="true"
          :maxCount="9"
        />
      </up-form-item>
      <up-button type="primary" @click="submitSample">{{
        isEdit ? "确认提交" : "发布样片"
      }}</up-button>
    </up-form>
  </view>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import ImageUpload from "@/components/ImageUpload/index.vue";
import { baseURL } from "@/config/index";
import { publishSamplePhotoApi, updateSamplePhotoApi } from "@/api/sample";
import { useSampleStore } from "@/stores/sample";

const sampleStore = useSampleStore();

const props = defineProps({
  isEdit: Boolean,
  initialForm: Object,
});

const emit = defineEmits(["updateSample"]);

const sampleFormRef = ref(null);
const sampleForm = reactive({
  title: props.initialForm?.title || "",
  description: props.initialForm?.description.replace(/<br>/g, "\n") || "",
  images: props.initialForm?.images || [],
});

const updateFileList = (newList) => {
  sampleForm.images = newList;
};

const submitSample = async () => {
  const userStore = useUserStore();
  const { title, description, images } = sampleForm;

  try {
    const data = {
      user_id: userStore.userInfo.id,
      title,
      description: description.replace(/\n/g, "<br>"),
      images,
    };

    console.log("data", data);

    // 回显数据
    emit("updateSample", {
      ...sampleForm,
      description: description.replace(/\n/g, "<br>"),
    });

    let response;
    if (props.isEdit) {
      response = await updateSamplePhotoApi(props.initialForm.id, data);
    } else {
      response = await publishSamplePhotoApi(data);
    }

    if (response.code === 200) {
      uni.showToast({
        title: props.isEdit ? "样片编辑成功" : "样片发布成功",
        icon: "success",
      });
      if (!props.isEdit) {
        sampleForm.title = "";
        sampleForm.description = "";
        sampleForm.images = [];
      }

      // 发布/编辑成功后更新全局的samples
      await sampleStore.fetchAllSamples();
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
    uni.showToast({
      title: props.isEdit ? "样片编辑失败" : "样片发布失败",
      icon: "none",
    });
  }
};
</script>
<style lang="scss" scoped>
.sample-editor {
}
</style>
