<template>
  <view class="reservation-section">
    <up-tabs
      :list="reservationTabs"
      :itemStyle="{
        flex: 1,
        height: '88rpx',
        fontWeight: 'bold',
        fontSize: '36rpx',
        background: '#ffffff',
      }"
      lineWidth="120rpx"
      @click="handleTabClick"
    >
    </up-tabs>

    <view class="initiate-wrapper" v-if="activeReservationTab === 0">
      <view class="initiate" v-if="initiatedReservations.length">
        <view
          class="reservation-item"
          v-for="reservation in initiatedReservations"
          :key="reservation.id"
        >
          <view class="reservation-info">
            <view class="section">
              <view class="section-title">接收者:</view>
              <view class="section-value">{{
                reservation.receiver.username
              }}</view>
            </view>
            <view class="section">
              <view class="section-title">状态:</view>
              <view class="section-value">{{
                reservation.is_agreed ? "成功" : "等待验证"
              }}</view>
            </view>
            <view class="section">
              <view class="section-title">内容:</view>
              <view class="parse-wrapper section-value">
                <up-parse :content="reservation.content" :selectable="true" />
              </view>
            </view>
          </view>
          <view class="reservation-actions">
            <up-button
              text="编辑"
              @click="openEditDialog(reservation.id, reservation.content)"
              type="primary"
            />
            <up-button
              text="删除"
              @click="deleteReservation(reservation.id)"
              type="error"
            />
          </view>
        </view>
      </view>
      <up-empty v-else text="发起的预约为空" />
    </view>
    <view class="receive-wrapper" v-if="activeReservationTab === 1">
      <view class="receive" v-if="receivedReservations.length">
        <view
          class="reservation-item"
          v-for="reservation in receivedReservations"
          :key="reservation.id"
        >
          <view class="reservation-info">
            <view class="section">
              <view class="section-title">发起者:</view>
              <view class="section-value">{{
                reservation.initiator.username
              }}</view>
            </view>
            <view class="section">
              <view class="section-title">内容:</view>
              <view class="parse-wrapper section-value">
                <up-parse :content="reservation.content" :selectable="true" />
              </view>
            </view>
          </view>
          <view class="reservation-actions">
            <up-button
              :text="reservation.is_agreed === 1 ? '取消' : '同意'"
              @click="
                handleAcceptReservation(reservation.id, reservation.is_agreed)
              "
              :type="reservation.is_agreed === 1 ? 'default' : 'primary'"
            />
          </view>
        </view>
      </view>
      <up-empty v-else text="收到的预约为空" />
    </view>

    <!-- 编辑弹窗 -->
    <up-popup :show="isEditDialogOpen" :mode="`bottom`">
      <view class="dialog-content">
        <view class="input-group">
          <text>编辑预约内容</text>
          <up-textarea
            v-model="editReservationContent"
            placeholder="请输入编辑预约内容"
            count
            autoHeight
            :confirmType="null"
          ></up-textarea>
        </view>
        <view class="button-group">
          <up-button
            text="确认"
            @click="saveEditedReservation"
            type="primary"
          />
          <up-button text="取消" @click="closeEditDialog" />
        </view>
      </view>
    </up-popup>

    <up-modal
      :show="showModal"
      :content="'是否删除预约'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    ></up-modal>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const props = defineProps({
  initiatedReservations: {
    type: Array,
    default: () => [],
  },
  receivedReservations: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "editReservation",
  "deleteReservation",
  "acceptReservation",
]);

const reservationTabs = reactive([{ name: "我发起的" }, { name: "我接收的" }]);
const activeReservationTab = ref(0);

const isEditDialogOpen = ref(false);
const editReservationId = ref(null);
const editReservationContent = ref("");

const handleTabClick = (item) => {
  activeReservationTab.value = item.index;
};

const openEditDialog = (id, content) => {
  editReservationId.value = id;
  editReservationContent.value = content.replace(/<br>/g, "\n");
  isEditDialogOpen.value = true;
};

const closeEditDialog = () => {
  isEditDialogOpen.value = false;
  editReservationId.value = null;
  editReservationContent.value = "";
};

// 编辑预约内容
const saveEditedReservation = async () => {
  if (!editReservationId.value || !editReservationContent.value) return;
  emit("editReservation", {
    id: editReservationId.value,
    content: editReservationContent.value.replace(/\n/g, "<br>"),
  });
  closeEditDialog();
};

const showModal = ref(false);

const handleConfirm = () => {
  emit("deleteReservation", editReservationId.value);
  showModal.value = false;
  editReservationId.value = null;
};

const handleCancel = () => {
  showModal.value = false;
};

// 删除预约
const deleteReservation = async (id) => {
  // 显示模态框
  showModal.value = true;
  editReservationId.value = id;
};

// 接受/取消预约
const handleAcceptReservation = async (id, isAgreed) => {
  const data = { id, is_agreed: Number(!isAgreed) };
  emit("acceptReservation", data);
};
</script>

<style scoped lang="scss">
.reservation-section {
  padding: 20rpx;
  background-color: #f5f5f5;

  .initiate,
  .receive {
    padding: 20rpx;
  }

  .reservation-item {
    margin-bottom: 20rpx;
    padding: 20rpx;
    background-color: #ffffff;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

    .reservation-info {
      margin-bottom: 10rpx;

      .section {
        margin-bottom: 20rpx;
        display: flex;
        align-items: center;

        .section-title {
          font-size: 32rpx;
          color: #333;
          margin-bottom: 10rpx;
          width: 160rpx;
          text-align: center;
        }

        .section-value {
          font-size: 32rpx;
          color: #999;
        }

        .parse-wrapper {
          flex: 1;
          background: #4d9ef130;
          border-radius: 16rpx;
          box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
          padding: 20rpx;
        }
      }
    }

    .reservation-actions {
      display: flex;

      up-button {
        margin-right: 10rpx;
      }
    }
  }

  .dialog-content {
    padding: 20rpx;

    .input-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20rpx;
      padding: 0 40rpx;

      text {
        margin-bottom: 20rpx;
        font-size: 36rpx;
        font-weight: bold;
      }
    }

    .button-group {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
