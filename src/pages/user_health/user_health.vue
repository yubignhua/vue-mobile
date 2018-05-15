<template>
  <div class="user_health">

    <Scroll ref="scroll" :class="[scroll_normal,{my_scroll_height:showTopOption}]">

      <div v-if="showUserEdit" class="user_edit" @click="editHealth">
        <div class="edit_left">
          <img class="edit_icon" src="../../assets/images/user_icon/edit.png">
          <span class="edit_text">编辑更新资料，及时记录</span>
        </div>
        <div class="edit_link"></div>
      </div>

      <group>
        <cell title="姓名" :value="userHealth.name" value-align="left" class="mLabelWidth"></cell>
        <cell title="性别" :value="userHealth.sex=='f'?'女':'男'" value-align="left" class="mLabelWidth"></cell>
        <cell title="年龄" :value="userHealth.age" value-align="left" class="mLabelWidth"></cell>
        <cell title="身高/CM" :value="userHealth.height" value-align="left" class="mLabelWidth"></cell>
        <cell title="体重/KG" :value="userHealth.weight" value-align="left" class="mLabelWidth"></cell>
        <cell title="疾病史" :value="userHealth.illness_history" value-align="left" class="mLabelWidth"></cell>
        <cell title="BMI值" :value="userHealth.bmi" value-align="left" class="mLabelWidth"></cell>
        <cell title="每周锻炼身体/次" :value="userHealth.exercise" value-align="left" class="lLabelWidth"></cell>
        <cell title="每天吸烟频率/次" :value="userHealth.smoke" value-align="left" class="lLabelWidth"></cell>
        <cell title="睡眠情况" :value="userHealth.sleep_time" value-align="left" class="mLabelWidth"></cell>
      </group>

      <div class="health_tip">
        <span class="tip">*</span> 以下信息填写最后一次测量值
      </div>

      <group>
        <cell title="有无高血压" :value="userHealth.have_HTN?'有':'无'" value-align="left" class="mLabelWidth"></cell>
        <cell title="高压" :value="userHealth.high_blood" value-align="left" class="mLabelWidth"></cell>
        <cell title="低压" :value="userHealth.low_blood" value-align="left" class="mLabelWidth"></cell>

        <cell title="血糖异常" :value="userHealth.have_BS_exc?'有':'无'" value-align="left" class="mLabelWidth"></cell>
        <cell title="血脂异常" :value="userHealth.have_BL_exc?'有':'无'" value-align="left" class="mLabelWidth"></cell>
        <cell title="尿酸异常" :value="userHealth.have_UA_exc?'有':'无'" value-align="left" class="mLabelWidth"></cell>

        <cell title="症状"></cell>
        <cell-box>
          <div class="tag" v-for="(symptom,index) in userHealth.symptoms" :key="index">{{ symptom }}</div>
        </cell-box>

        <cell title="直系亲属高血压病史"></cell>
        <cell-box>
          <div class="tag" v-for="(hbp,index) in userHealth.HBP_relations" :key="index">{{ hbp }}</div>
        </cell-box>

        <cell title="直系亲属糖尿病病史"></cell>
        <cell-box>
          <div class="tag" v-for="(dms,index) in userHealth.DMS_relations" :key="index">{{ dms }}</div>
        </cell-box>

        <cell title="直系亲属冠心病病史"></cell>
        <cell-box>
          <div class="tag" v-for="(cad,index) in userHealth.CAD_relations" :key="index">{{ cad }}</div>
        </cell-box>
      </group>

    </Scroll>

  </div>
</template>

<script>
  import {Group, Cell, CellBox} from 'vux'
  import Scroll from '../../components/scroll'
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default {
    name: "user_health",
    components: {
      Group,
      Cell,
      CellBox,
      Scroll
    },
    data() {
      return {
        showUserEdit: false,
        userRole: "",
        showTopOption: false,
        scroll_normal: "my_scroll",
        user_id: 0
      }
    },
    computed: {
      ...mapState('userHealth', {
        userHealth: state => state.userHealth,
        isUpdate: state => state.isUpdate
      })
    },
    watch: {
      "isUpdate": function (isUpdate) {
        if (isUpdate) {
          this.SET_USER_HEALTH_UPDATE(false);
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
        if (this.userHealth.name.length <= 0) {
          this.initData();
        }
      }
    },
    activated() {
      this.user_id = this.$route.query.user_id || 0;
      this.userRole = this.$store.state.$userInfo.roles[0];

      if (this.userRole !== "doctor") {
        this.showUserEdit = true;
        this.showTopOption = true;
      }
      else {
        this.showUserEdit = false;
        this.showTopOption = false;
      }
      this.$refs.scroll.refresh();
    },
    methods: {
      ...mapActions('userHealth', ['saveUserHealth']),
      ...mapMutations('userHealth', ['SET_USER_HEALTH_UPDATE']),
      initData() {
        var self = this;
        self.saveUserHealth(this.user_id).then(value => {
          self.$refs.scroll.forceUpdate();

          if (value.error_code !== 0) {
            self.$vux.toast.show({
              type: "warn",
              text: "数据获取失败！" + value.error_msg,
              position: "middle"
            })
          }
          else {
            if (self.userRole === "user") {
              self.isAccept();
            }
          }
        })
      },
      isAccept() {
        var self = this;
        if (self.userRole === "user") {
          if (self.userHealth.name === ""
            || self.userHealth.sex === ""
            || self.userHealth.age === "" || self.userHealth.age <= 0
            || self.userHealth.height === "" || self.userHealth.height <= 0
            || self.userHealth.weight === "" || self.userHealth.weight <= 0
            || self.userHealth.illness_history === "") {
            self.$router.replace({
              path: "/cdm/cdm_mobile/health_edit",
              query: {
                "user_id": self.user_id
              }
            });
          }
        }
      },
      editHealth() {
        var self = this;
        self.$router.push({
          path: "/cdm/cdm_mobile/health_edit",
          query: {
            "user_id": self.user_id
          }
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';

  .user_health {

    .my_scroll {
      top: rem(92);
      background: transparent;

      &.my_scroll_height {
        top: rem(170);
      }

      .user_edit {
        height: rem(45);
        padding: 0 rem(15);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #FFFFFF;
        margin-bottom: rem(10);

        .edit_left {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          .edit_icon {
            height: rem(20);
            width: rem(20);
            margin-right: rem(6);
          }

          .edit_text {
            font-size: rem(14);
            color: #323232;
          }
        }

        .edit_link {
          width: rem(7);
          height: rem(13);
          background: url("../../assets/images/user_icon/next.png");
          background-size: 100% 100%;
        }

      }

      .health_tip {
        padding: rem(11) 0 rem(11) rem(16);
        color: #666666;
        font-size: rem(13);
        letter-spacing: rem(-0.31);
        .tip {
          color: #FF6134;
        }
      }

      .weui-cells {
        margin-top: 0;
        font-size: rem(14);
        &:before {
          border-top: none;
        }
        &:after {
          border-bottom: none;
        }

        .weui-cell {
          padding: rem(12) rem(15);
          &:before {
            left: 0;
          }

          .vux-label {
            color: #999999;
          }
          .weui-cell__ft {
            color: #323232;
          }

          &.vux-cell-box {
            &:before {
              border-top: none;
            }
            padding-top: 0;
            padding-right: 0;

            .tag {
              margin-right: rem(8);
              &:last-child {
                margin-right: 0;
              }

              background: #1B91E0;
              color: #FFFFFF;
              font-size: rem(13);
              height: rem(25);
              line-height: rem(25);
              padding: 0 rem(10);
              border-radius: rem(1);
            }
          }
        }

        .mLabelWidth {
          .vux-label {
            width: rem(79);
          }
        }
        .lLabelWidth {
          .vux-label {
            width: rem(125);
          }
        }
      }
    }
  }
</style>
