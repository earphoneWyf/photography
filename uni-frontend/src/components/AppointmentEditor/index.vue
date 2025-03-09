<template>
  <view class="appointment-editor">
    <up-form labelWidth="80" labelPosition="left" :model="form" ref="formRef">
      <up-form-item label="约拍对象">
        <up-button @click="showTargetPicker = true">{{
          form.target
        }}</up-button>
        <up-picker
          :show="showTargetPicker"
          :columns="targetColumns"
          @confirm="onTargetConfirm"
          @cancel="showTargetPicker = false"
        ></up-picker>
      </up-form-item>
      <up-form-item label="拍摄时间">
        <up-datetime-picker
          hasInput
          :show="showDateTimePicker"
          v-model="form.shootingTime"
          mode="datetime"
          @confirm="onShootingTimeConfirm"
          @cancel="showDateTimePicker = false"
        ></up-datetime-picker>
      </up-form-item>
      <up-form-item label="拍摄地点">
        <up-input
          v-model="form.location"
          placeholder="请输入拍摄地点"
        ></up-input>
      </up-form-item>
      <up-form-item label="拍摄费用">
        <up-input
          v-model="form.cost"
          type="number"
          placeholder="请输入拍摄费用"
        ></up-input>
      </up-form-item>
      <up-form-item label="拍摄要求">
        <up-textarea
          v-model="form.requirement"
          placeholder="请输入拍摄要求"
          count
          autoHeight
          :confirmType="null"
        ></up-textarea>
      </up-form-item>
      <up-button type="primary" @click="submitForm">{{
        isEdit ? "确认提交" : "发布约拍"
      }}</up-button>
    </up-form>
  </view>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import dayjs from "dayjs";
import { useUserStore } from "@/stores/user";
import {
  publishShootingDemandApi,
  updateShootingDemandApi,
} from "@/api/shooting";
import { useAppointmentStore } from "@/stores/shooting";

const appointmentStore = useAppointmentStore();

const props = defineProps({
  isEdit: Boolean,
  initialForm: Object,
});

const emit = defineEmits(["updateAppointment"]);

const formRef = ref(null);
const form = reactive({
  target: props.initialForm?.target || "模特",
  shootingTime:
    dayjs(props.initialForm?.shootingTime).valueOf() || dayjs().valueOf(),
  location: props.initialForm?.location || "",
  cost: props.initialForm?.cost || 0,
  requirement: props.initialForm?.requirement.replace(/<br>/g, "\n") || "",
});
const showTargetPicker = ref(false);
const showDateTimePicker = ref(false);
const targetColumns = reactive([["模特", "摄影师"]]);

const onTargetConfirm = (e) => {
  const { value } = e;
  form.target = value[0];
  showTargetPicker.value = false;
};

const onShootingTimeConfirm = () => {
  showDateTimePicker.value = false;
};

const submitForm = async () => {
  // 新增校验逻辑
  if (!form.target) {
    uni.showToast({ title: "请选择约拍对象", icon: "none" });
    return;
  }

  if (!form.shootingTime) {
    uni.showToast({ title: "请选择拍摄时间", icon: "none" });
    return;
  }

  if (!form.location.trim()) {
    uni.showToast({ title: "请填写拍摄地点", icon: "none" });
    return;
  }

  if (Number(form.cost) < 0) {
    uni.showToast({ title: "拍摄费用需大于或等于0", icon: "none" });
    return;
  }

  if (!form.requirement.trim()) {
    uni.showToast({ title: "请填写拍摄要求", icon: "none" });
    return;
  }

  const userStore = useUserStore();
  const { target, shootingTime, location, cost, requirement } = form;

  try {
    const data = {
      user_id: userStore.userInfo.id,
      target,
      shooting_time: dayjs(shootingTime).format("YYYY-MM-DD HH:mm"),
      location,
      cost,
      requirement: requirement.replace(/\n/g, "<br>"),
    };

    // 回显数据
    emit("updateAppointment", {
      ...form,
      shootingTime: dayjs(shootingTime).format("YYYY-MM-DD HH:mm"),
      requirement: requirement.replace(/\n/g, "<br>"),
    });

    let response;
    if (props.isEdit) {
      response = await updateShootingDemandApi(props.initialForm.id, data);
    } else {
      response = await publishShootingDemandApi(data);
    }

    if (response.code === 200) {
      uni.showToast({
        title: props.isEdit ? "约拍编辑成功" : "约拍发布成功",
        icon: "success",
      });
      if (!props.isEdit) {
        form.target = "模特";
        form.shootingTime = dayjs().format("YYYY-MM-DD HH:mm");
        form.location = "";
        form.cost = 0;
        form.requirement = "";
      }

      // 发布/编辑成功后更新全局的appointment
      await appointmentStore.fetchAllAppointments();
    } else {
      uni.showToast({ title: response.message, icon: "none" });
    }
  } catch (error) {
    console.error(error);
    uni.showToast({
      title: props.isEdit ? "约拍编辑失败" : "约拍发布失败",
      icon: "none",
    });
  }
};
</script>

<style lang="scss" scoped>
.appointment-editor {
}
</style>
