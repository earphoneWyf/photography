<template>
  <view class="login">
    <view class="title">欢迎登录</view>
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
    </up-form>
    <up-button type="primary" class="up-button" @click="handleLogin"
      >登录</up-button
    >
    <up-button class="up-button" @click="goToRegister">注册</up-button>
  </view>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { loginApi } from "@/api/user";

const formRef = ref(null);
const form = reactive({
  username: "",
  password: "",
});
const userStore = useUserStore();

const handleLogin = async () => {
  // 新增验证逻辑
  if (!form.username?.trim()) {
    uni.showToast({ title: "用户名不能为空", icon: "none" });
    return;
  }

  if (!form.password) {
    uni.showToast({ title: "密码不能为空", icon: "none" });
    return;
  }
  
  try {
    const { data } = await loginApi(form);
    console.log("data", data);

    userStore.setUserInfo(data.user);
    uni.switchTab({ url: "/pages/home/index" });
  } catch (error) {
    console.error(error);
  }
};

const goToRegister = () => {
  uni.navigateTo({ url: "/pages/register/index" });
};
</script>

<style scoped lang="scss">
.login {
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
