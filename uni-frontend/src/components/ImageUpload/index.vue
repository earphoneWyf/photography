<template>
  <up-upload
    :fileList="fileList"
    @afterRead="afterRead"
    @delete="deletePic"
    :name="name"
    :multiple="multiple"
    :maxCount="maxCount"
  />
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  uploadUrl: {
    type: String,
    required: true,
  },
  fileList: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    default: "file",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  maxCount: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["updateFileList"]);

const localFileList = ref([...props.fileList]);
console.log("localFileList", localFileList.value);

watch(localFileList.value, (newList) => {
  emit("updateFileList", newList);
});

const deletePic = (event) => {
  localFileList.value.splice(event.index, 1);
};

const afterRead = async (event) => {
  try {
    let lists = [].concat(event.file);
    let fileListLen = localFileList.value.length;
    lists.forEach((item) => {
      localFileList.value.push({
        ...item,
        status: "uploading",
        message: "上传中",
      });
    });

    for (let i = 0; i < lists.length; i++) {
      const result = await uploadFilePromise(lists[i].url);
      let item = localFileList.value[fileListLen];
      localFileList.value.splice(fileListLen, 1, {
        ...item,
        status: "success",
        message: "",
        url: result,
      });
      fileListLen++;
    }

    console.log("localFileList:", localFileList.value);
  } catch (error) {
    console.error("上传文件时出错:", error);
    uni.showToast({ title: "上传文件时出错", icon: "none" });
  }
};

const uploadFilePromise = (url) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: props.uploadUrl,
      filePath: url,
      name: props.name,
      success: (res) => {
        try {
          const data = JSON.parse(res.data);
          console.log('data',data )
          if (data.code === 200) {
            resolve(data.imageUrl);
          } else {
            reject(data.message);
          }
        } catch (error) {
          reject("解析响应数据时出错");
        }
      },
      fail: (err) => {
        console.log("出错了", err);
        reject(err.errMsg);
      },
    });
  });
};
</script>
