<template>
  <div class="cropper-box" v-if="isClient">
    <!-- 上船區 -->
    <div class="" v-show="!file">
      <n-upload @change="fileChange" directory-dnd :max="1" ref="uploadTool">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <ArchiveIcon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
          </n-p>
        </n-upload-dragger>
      </n-upload>
    </div>
    <!-- 編輯區 -->
    <div class="" v-show="file">
      <VueCropperJs
        ref="cropper"
        @ready="getImageSize"
        :zoomOnWheel="false"
        :cropBoxResizable="false"
        drag-mode="none"
        :auto-crop="true"
        :auto-crop-area="0.7"
      />
      <n-space vertical>
        <n-slider
          v-model:value="slideVal"
          :step="1"
          @update:value="updateRoom"
        />
      </n-space>
      <n-space>
        <n-button @click="cropper.rotate(90)">旋轉</n-button>
        <n-button @click="resetImage">還原</n-button>
        <n-button @click="destroyImage">清除</n-button>
        <n-button @click="submit">儲存</n-button>
      </n-space>
    </div>
  </div>
</template>
<script setup>
import $http from "../api/api";
import { ref, onMounted, defineAsyncComponent, nextTick } from "vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import VueCropperJs from "vue-cropperjs";

const isClient = ref(false);
const slideVal = ref(0);
const cropper = ref(null);
const initialZoom = ref(0);
const uploadTool = ref(null);
const file = ref("");
const imageSrc = ref("");

onMounted(async () => {
  isClient.value = true;
});

/**
 * 變更圖片
 */
function fileChange(files) {
  file.value = files.file.file;
  const imageUrl = URL.createObjectURL(file.value);
  cropper.value.replace(imageUrl);
}

/**
 * 取得圖片初始比例
 */
function getImageSize() {
  const imageData = cropper.value.getImageData();
  initialZoom.value = imageData.width / imageData.naturalWidth;
}

/**
 * 變更圖片比例
 */
function updateRoom(value) {
  const zoomRatio = initialZoom.value + value / 100;
  console.log("zoomRatio", zoomRatio);

  cropper.value.zoomTo(zoomRatio); // 使用絕對縮放比例
}

/**
 * 還原圖片初始值
 */
function resetImage() {
  cropper.value.reset();
  slideVal.value = 0;
}

/**
 * 清除目前圖片
 */
function destroyImage() {
  file.value = "";
  uploadTool.value.clear();
}

/**
 * 取得圖片內容
 */
function getImageData() {
  const canvas = cropper.value.getCroppedCanvas();

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      const files = new File([blob], `${file.value.name}`, {
        type: "image/png",
      });

      resolve(files);
    });
  });
}

/**
 * 呼叫API上傳
 */
async function submit() {
  const files = await getImageData();

  const formData = new FormData();
  formData.append("file", files);
  formData.append("fileName", files.name);
  $http.post("/uploadFile", formData).then((res) => {
    console.log("submit", res);
  });
}

/**
 * 取得圖片(目前沒用)
 */
function fetchImage() {
  $http
    .get("/preview", {
      params: {
        index: 0,
      },
      responseType: "blob",
    })
    .then((res) => {
      const imageUrl = URL.createObjectURL(res.data);
      imageSrc.value = imageUrl;
    });
}
</script>
<style lang="scss" scoped>
.cropper-box {
  width: 500px;
  margin: auto;
}
</style>
