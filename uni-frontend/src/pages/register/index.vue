<template>
  <view>
    <view class="register">
      <view class="title">注册</view>

      <up-form
        labelPosition="left"
        labelWidth="80"
        :model="form"
        ref="formRef"
        class="up-form"
      >
        <up-form-item label="用户名" prop="username">
          <up-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></up-input>
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
          <up-input
            v-model="form.contact"
            placeholder="请输入联系方式"
          ></up-input>
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
        <up-button class="up-button" type="primary" @click="handleRegister"
          >注册</up-button
        >
        <up-button class="up-button" @click="goToLogin">返回登录</up-button>
      </up-form>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { registerApi } from "@/api/user";
import ImageUpload from "@/components/ImageUpload/index.vue";
import { baseURL } from "@/config/index";

const formRef = ref(null);
const form = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  role: "",
  contact: "",
  avatar: "",
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

const fileList = ref([]);

const updateFileList = (newList) => {
  fileList.value = newList;
};

const handleRegister = async () => {
  // 新增验证逻辑
  if (!form.username?.trim()) {
    uni.showToast({ title: "用户名不能为空", icon: "none" });
    return;
  }

  if (!form.password) {
    uni.showToast({ title: "密码不能为空", icon: "none" });
    return;
  }

  if (form.password !== form.confirmPassword) {
    uni.showToast({ title: "两次输入的密码不一致", icon: "none" });
    return;
  }

  if (!form.role) {
    uni.showToast({ title: "请选择用户角色", icon: "none" });
    return;
  }

  if (!form.contact?.trim()) {
    uni.showToast({ title: "联系方式不能为空", icon: "none" });
    return;
  }

  
  if (fileList && fileList.value && fileList.value.length > 0) {
    form.avatar = fileList.value[0].url;
  }

  if (!form.avatar) {
    uni.showToast({ title: "请选择用户头像", icon: "none" });
    return;
  }

  try {
    await registerApi(form);
    uni.showToast({ title: "注册成功，请等待管理员验证", icon: "none" });
    uni.navigateTo({ url: "/pages/login/index" });
  } catch (error) {
    console.error(error);
  }
};

const goToLogin = () => {
  uni.navigateTo({ url: "/pages/login/index" });
};
</script>

<style scoped lang="scss">
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #a2cdf8;

  .title {
    color: #ffffff;
    font-size: 56rpx;
    font-weight: 600;
    text-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  }

  .up-form {
    width: 60%;
    padding: 40rpx;
    background: #fff;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    border-radius: 24rpx;
    margin: 40rpx 0 30rpx;
  }

  .up-button {
    width: 400rpx;
    margin-top: 20px;
    border-radius: 32rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  }
}
</style>
