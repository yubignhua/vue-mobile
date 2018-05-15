<template>
  <div class="user_pressure_report">
    <div class="tip">动态血压文件导入</div>
    <div class="report_form">
      <input type="text" class="input_box" readonly v-model="reportData.fileName"/>
      <div class="btn cancel" @click="cancelFile"></div>
      <div class="btn upload" @click="uploadFile"></div>
      <upload-btn ref="myUploadBtn" btnClass="btn select" inputClass="upload_file" @getFileUrl="subUrl"
                  @getFileName="setFileName"></upload-btn>
    </div>
  </div>

</template>

<script>
  import uploadBtn from '../../components/upload_btn'
  import {mapActions} from 'vuex'

  export default {
    name: "user_pressure_report",
    components: {
      uploadBtn
    },
    data() {
      return {
        reportData: {
          user_id: 0,
          fileUrl: "",
          fileName: ""
        },
      }
    },
    created() {
      if (this.$route.query.user_id) {
        this.reportData.user_id = this.$route.query.user_id;
      }
    },
    methods: {
      ...mapActions("userPressure", ["uploadReportPressure"]),
      setFileName(fileName) {
        this.reportData.fileName = fileName;
      },
      uploadFile() {
        this.$refs.myUploadBtn.startUpload();
      },
      cancelFile() {
        $(".upload_file").val("");
        this.reportData.fileName = "";
      },
      subUrl(fileUrl) {
        let self = this;
        self.reportData.fileUrl = fileUrl;
        self.uploadReportPressure(self.reportData).then(res => {
          if (res.error_code === 0) {
            self.$vux.toast.show({
              type: "success",
              text: "动态血压上传成功！",
              middle: "position",
              onHide() {
                self.$router.replace({
                  path: '/cdm/cdm_mobile/userdetail/pressure',
                  query: {
                    "user_id": self.reportData.user_id
                  }
                })
              }
            })
          }
          else {
            self.$vux.toast.show({
              type: "success",
              text: "动态血压上传失败！" + res.error_msg,
              middle: "position"
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin.scss";

  .user_pressure_report {
    min-height: 100%;
    background: #FFFFFF;
    padding: rem(25) rem(10) 0 rem(10);

    .tip {
      color: #999999;
      line-height: rem(14);
    }

    .report_form {
      margin-top: rem(12);
      border: 1px solid #E7E7E7;
      height: rem(39);
      display: flex;
      flex-direction: row;
      align-items: center;

      .input_box {
        flex: 5;
        padding-left: rem(5);
        height: 100%;
        border: none;
        outline: none;
      }
      .btn {
        flex: 1;
        border-left: 1px solid #E7E7E7;
        height: rem(39);
        background-color: #FBFBFB;
        background-repeat: no-repeat;
        background-position: center center;

        &.cancel {
          background-image: url("../../assets/images/user_icon/delete.png");
          background-size: rem(21) rem(21);
        }

        &.upload {
          background-image: url("../../assets/images/user_icon/upload.png");
          background-size: rem(21) rem(21);
        }

        &.select {
          background-image: url("../../assets/images/user_icon/select.png");
          background-size: rem(22) rem(20);
        }
      }
    }
  }
</style>
