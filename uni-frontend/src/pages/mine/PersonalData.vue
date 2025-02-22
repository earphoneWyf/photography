<template>
  <view class="personal-data">
    <up-form
      labelPosition="left"
      labelWidth="80"
      :model="form"
      ref="formRef"
      class="up-form"
    >
      <up-form-item label="用户名" prop="username">
        <up-input v-model="form.username" placeholder="请输入用户名"></up-input>
      </up-form-item>
      <up-form-item label="密码" prop="password">
        <up-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        ></up-input>
      </up-form-item>
      <up-form-item label="重输密码" prop="confirmPassword">
        <up-input
          v-model="form.confirmPassword"
          type="password"
          placeholder="请再次输入密码"
        ></up-input>
      </up-form-item>
      <up-form-item label="用户角色" prop="role">
        <up-radio-group v-model="form.role">
          <up-radio
            v-for="(item, index) in roles"
            :key="index"
            :label="item.name"
            :name="item.name"
          />
        </up-radio-group>
      </up-form-item>
      <up-form-item label="联系方式" prop="contact">
        <up-input v-model="form.contact" placeholder="请输入联系方式"></up-input>
      </up-form-item>
      <up-form-item label="用户头像">
        <ImageUpload
          :uploadUrl="`${baseURL}/upload/image/avatar`"
          :fileList="fileList"
          :name="'image'"
          @updateFileList="updateFileList"
          :multiple="false"
          :maxCount="1"
        />
      </up-form-item>
      <up-button
        class="up-button"
        type="primary"
        text="提交修改"
        @click="handleSubmit"
      />
      <!-- 退出登录按钮 -->
      <up-button class="up-button" text="退出登录" @click="handleLogout" />
    </up-form>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { updateUserInfoApi } from "@/api/user";
import ImageUpload from "@/components/ImageUpload/index.vue";
import { baseURL } from "@/config/index";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const formRef = ref(null);
const form = ref({
  ...userStore.userInfo,
  confirmPassword: userStore.userInfo.password,
});

const roles = reactive([
  {
    name: "模特",
    disabled: false,
  },
  {
    name: "摄影师",
    disabled: false,
  },
]);

const fileList = ref([
  {
    message: "上传完成",
    size: 0,
    status: "success",
    thumb: `http://tmp/${userStore.userInfo.avatar.slice(
      userStore.userInfo.avatar.indexOf("-") + 1
    )}`,
    type: "image",
    url: userStore.userInfo.avatar,
  },
]);

const updateFileList = (newList) => {
  fileList.value = newList;
};

// 提交修改
const handleSubmit = async () => {
  form.value.avatar = fileList.value[0].url;

  if (!form.value.avatar) {
    uni.showToast({ title: "请选择用户头像", icon: "none" });
    return;
  }

  try {
    const response = await updateUserInfoApi(form.value);
    if (response.code === 200) {
      userStore.setUserInfo(form.value);
      uni.showToast({ title: "资料修改成功", icon: "success" });
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
    uni.showToast({ title: "请求出错", icon: "none" });
  }
};

const handleLogout = () => {
  // 跳转到登录页面
  uni.navigateTo({ url: "/pages/login/index" });
};
</script>

<style scoped lang="scss">
/* 可以在这里添加样式 */
.personal-data {
  height: 100vh;
  padding: 40rpx;
  box-sizing: border-box;

  .up-form {
    padding: 40rpx;
    background: #fff;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    border-radius: 24rpx;
  }

  .up-button {
    width: 400rpx;
    margin-top: 20px;
    border-radius: 32rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  }
}
</style>
