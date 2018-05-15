<template>
  <div class="user_drug">
    <Scroll :class="[scroll_normal,{my_scroll_height:showTopOption}]" ref="scroll" @pullingUp="loadMore"
            pullUpLoad="true">
      <div class="drug_info">
        <div class="info_text">近期服用药物情况</div>
        <div v-if="showBtn" class="info_btn" @click="newDrug">新增用药</div>
      </div>
      <div class="drug" v-for="drug in drugList" :key="drug.record_id">
        <div class="drug_line">
          <div class="drug_record_time">{{drug.record_time}}</div>
        </div>
        <div class="drug_line">
          <div class="drug_title">药物名称</div>
          <div class="drug_detail">{{drug.name}}</div>
        </div>
        <div class="drug_line">
          <div class="drug_title">用药剂量</div>
          <div class="drug_detail">{{drug.dose}}</div>
        </div>
        <div class="drug_line">
          <div class="drug_title">服药频次</div>
          <div class="drug_detail">{{drug.take_drug_feq}}</div>
        </div>
        <div class="drug_line">
          <div class="drug_title">服用时间</div>
          <div class="drug_detail">{{drug.take_start_time}} - {{drug.take_end_time}}</div>
        </div>
        <div class="drug_line">
          <div class="drug_title">备注</div>
          <div class="drug_detail">{{drug.remark}}</div>
        </div>
        <div class="drug_line">
          <div class="drug_title">服药状态</div>
          <div class="drug_detail">
            <div :class="getStatusClass(drug.status)">{{getStatus(drug.status)}}</div>
            <div v-if="showBtn&&drug.status===1" class="info_btn" @click="stopDrug(drug)">停止用药</div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from '../../components/scroll'
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "user_drug",
    components: {
      Scroll
    },
    data() {
      return {
        showBtn: false,
        drugList: [],
        user_id: 0,

        showTopOption: false,

        currentPage: 1,

        scroll_normal: "my_scroll",

        getStatus: function (status) {
          if (status === 1) {
            return "服药中";
          }
          else if (status === 3) {
            return "停止用药";
          }
          else if (status === 2) {
            return "服药结束";
          }
          else {
            return "";
          }
        },
        getStatusClass: function (status) {
          if (status === 1) {
            return "usingClass";
          }
          else if (status === 3) {
            return "stopClass";
          }
          else {
            return "";
          }
        }
      }
    },
    computed: {
      ...mapState("userDrug", {
        isUpdate: state => state.isUpdate
      })
    },
    watch: {
      "isUpdate": function (isUpdate) {
        if (isUpdate) {
          this.SET_USER_DRUG_UPDATE(false);
          this.initData();
        }
      },
      "user_id": function () {
        this.initData();
      }
    },
    created() {
      this.userRole = this.$store.state.$userInfo.roles[0];
      if (this.userRole === "user") {
        this.initData();
      }
    },
    activated() {
      this.user_id = this.$route.query.user_id || 0;
      this.userRole = this.$store.state.$userInfo.roles[0];

      if (this.userRole === "assistant") {
        this.showBtn = true;
      }
      else {
        this.showBtn = false;
      }

      if (this.userRole !== "doctor") {
        this.showTopOption = true;
      }
      else {
        this.showTopOption = false;
      }

      this.$refs.scroll.refresh();
    },
    methods: {
      ...mapMutations("userDrug", ["SET_USER_DRUG_UPDATE"]),
      initData() {
        this.currentPage = 1;
        this.getDrugList(true);
      },
      getDrugList(isInit) {
        var self = this;
        self.request.get('/cdm/user/get_drug_list', {
          params: {
            user_id: self.user_id,
            page: self.currentPage
          }
        }).then(function (res) {
          if (res.data.error_code === 0) {
            if (isInit) {
              self.drugList = res.data.drug_list;
            }
            else{
              self.drugList = [...self.drugList, ...res.data.drug_list];
            }
            self.$refs.scroll.forceUpdate();
          }
          else {
            self.$vux.toast.show({
              type: "warn",
              text: res.data.error_msg,
              position: "middle"
            })
          }
        });
      },
      newDrug() {
        var self = this;
        self.$router.push({
          path: '/cdm/cdm_mobile/drug_add',
          query: {
            "user_id": self.user_id
          }
        });
      },
      stopDrug(drug) {
        var self = this;
        self.request.post("/cdm/user/drug/stop", {
          user_id: self.user_id,
          record_id: drug.record_id
        }).then(function (res) {
          if (res.data.error_code === 0) {
            self.$vux.toast.show({
              type: "success",
              text: "停止用药成功",
              position: "middle",
              onHide() {
                drug.status = 3;
              }
            })
          }
          else {
            self.$vux.toast.show({
              type: "warn",
              text: res.data.error_msg,
              position: "middle"
            })
          }
        });
      },
      loadMore() {
        this.currentPage++;
        this.getDrugList();
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin.scss";

  .user_drug {

    .my_scroll {
      top: rem(92);
      background: transparent;

      &.my_scroll_height {
        top: rem(170);
      }

      .info_btn {
        height: rem(25);
        width: rem(70);
        border: 1px solid #1C91E0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: rem(13);
        color: #1C91E0;
      }

      .drug_info {
        height: rem(43);
        padding: 0 rem(15);
        font-size: rem(13);
        letter-spacing: rem(-0.32);
        color: #323232;

        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;

        box-sizing: border-box;
        border-bottom: 1px solid #E7E7E7;
      }

      .drug {
        border-top: 1px solid #E7E7E7;
        padding: rem(15) 0;
        background: #ffffff;

        .drug_line {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          font-size: rem(14);
          line-height: rem(28);
          padding: 0 rem(15);

          .drug_record_time {
            color: #999999;
          }

          .drug_title {
            flex: 1;
            color: #999999;
          }

          .drug_detail {
            flex: 3;
            color: #323232;

            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .usingClass {
            color: #1E8FE0;
          }

          .stopClass {
            color: #FFA800;
          }
        }
      }
    }
  }
</style>
