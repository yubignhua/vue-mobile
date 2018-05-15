<template>
  <div :class="['upload_btn',boxClass?btnClass:'']">
    <input type="file" ref="uploadInput" :class="['qi_upload',fileClass?inputClass:'']" :accept="acceptType"/>
    <div v-transfer-dom>
      <loading :show="showLoading" text="上传中"></loading>
    </div>
  </div>
</template>

<script>
  import Qupload from '../assets/mUtils/qiniu_upload/qiniu_upload_2'
  import {Toast, Loading, TransferDomDirective as TransferDom} from 'vux'

  export default {
    name: "upload_btn",
    directives: {
      TransferDom
    },
    components: {
      Toast,
      Loading
    },
    props: {
      acceptType: {
        default: "application/pdf"
      },
      btnClass: {},
      inputClass: {},
      maxFilesSize: {
        default: 10 * 1024 * 1024,
      },
      maxNums: {
        default: 1
      },
      autoStart: {
        default: false
      },
      myLoginUrl: {
        default: '/cdm/cdm_mobile/login'
      },
    },
    data() {
      return {
        fileClass: this.inputClass,
        boxClass: this.btnClass,
        showLoading: false
      }
    },
    mounted() {
      this.upload();
    },
    methods: {
      upload() {
        let self = this;
        self.qupload = new Qupload({
          btn: self.$refs.uploadInput,
          max_file_size: self.maxFilesSize,
          nums: self.maxNums,
          auto_start: self.autoStart,
          loginUrl: self.myLoginUrl,
          before() {
            self.$emit("getFileName", self.$refs.uploadInput.files[0].name);
          },
          next(res) {
            this.showLoading = true;
            // self.$emit("getUploadPercent", res.total.percent);
          },
          complete(res) {
            this.showLoading = false;
            if (res.success) {
              self.$emit("getFileUrl", res.img_url);
              self.$vux.toast.show({
                type: "success",
                text: "文件上传成功",
                position: "middle"
              })
            }
          },
          error(res) {
            this.showLoading = false;
            let errorMsg = "";
            switch (res.type) {
              case "numsError":
                errorMsg = "上传个数不得超过" + self.maxNums;
                break;
              case  "sizeError":
                errorMsg = "上传文件大小不得超过10M";
                break;
              default:
                errorMsg = "文件上传错误！" + res.message;
            }
            self.$vux.toast.show({
              type: "text",
              text: errorMsg
            })
          }
        })
      },
      startUpload() {
        if (this.qupload.subscribe) {
          this.qupload.subscribe();
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .qi_upload {
    opacity: 0;
    height: 100%;
    width: 100%;
  }
</style>
