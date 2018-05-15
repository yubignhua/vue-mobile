<template>
  <div class="user_health_edit">
    <div class="user_edit">
      <div class="user_edit_box">
        <div class="edit_des">
          <img class="edit_icon" src="../../assets/images/user_icon/edit.png">
          <div class="edit_text">
            带<span class="tip">*</span>为必填信息,请填写完整,有助于医生诊疗
          </div>
        </div>
        <div class="edit_btn" @click="saveEdit">保 存</div>
      </div>
    </div>

    <Scroll ref="scroll" class="my_new_scroll">
      <group>
        <!--<cell title="姓名" :value="userHealth.name" value-align="left" class="mLabelWidth"></cell>-->
        <x-input title="姓名" v-model="userHealth.name" placeholder="请输入" :show-clear="false"
                 class="mLabelWidth">
          <div slot="label" class="my_cell_title">
            <img src="../../assets/images/user_icon/tip.png" class="title_icon">
            <span class="title_text">姓名</span>
          </div>
        </x-input>
        <cell value-align="left" class="mLabelWidth">
          <div slot="title" class="my_cell_title">
            <img src="../../assets/images/user_icon/tip.png" class="title_icon">
            <span class="title_text">性别</span>
          </div>
          <div slot="default">
            <checker class="my_check_box" v-model="userHealth.sex" radio-required selected-item-class="my_checked">
              <div class="options">
                <checker-item value="m" class="my_check_icon"></checker-item>
                <span>男</span>
              </div>
              <div class="options">
                <checker-item value="f" class="my_check_icon"></checker-item>
                <span>女</span>
              </div>
            </checker>
          </div>
        </cell>
        <x-input title="年龄" v-model="userHealth.age" placeholder="请输入" :show-clear="false"
                 class="mLabelWidth">
          <div slot="label" class="my_cell_title">
            <img src="../../assets/images/user_icon/tip.png" class="title_icon">
            <span class="title_text">年龄</span>
          </div>
        </x-input>
        <x-input title="身高/CM" v-model="userHealth.height" placeholder="请输入" :show-clear="false"
                 class="mLabelWidth">
          <div slot="label" class="my_cell_title">
            <img src="../../assets/images/user_icon/tip.png" class="title_icon">
            <span class="title_text">身高</span>
          </div>
        </x-input>
        <x-input title="体重/KG" v-model="userHealth.weight" placeholder="请输入" :show-clear="false"
                 class="mLabelWidth">
          <div slot="label" class="my_cell_title">
            <img src="../../assets/images/user_icon/tip.png" class="title_icon">
            <span class="title_text">体重/KG</span>
          </div>
        </x-input>
        <x-input title="疾病史" v-model="userHealth.illness_history" placeholder="请输入,没有则填写无" :show-clear="false"
                 class="mLabelWidth">
          <div slot="label" class="my_cell_title">
            <img src="../../assets/images/user_icon/tip.png" class="title_icon">
            <span class="title_text">疾病史</span>
          </div>
        </x-input>
        <cell title="BMI值" :value="userHealth.bmi" value-align="left" class="mLabelWidth"></cell>
        <x-input title="每周锻炼身体/次" v-model="userHealth.exercise" placeholder="请输入" :show-clear="false"
                 class="lLabelWidth"></x-input>
        <x-input title="每天吸烟频率/次" v-model="userHealth.smoke" placeholder="请输入" :show-clear="false"
                 class="lLabelWidth"></x-input>
        <selector title="睡眠情况" :options="sleepTimeArr" v-model="userHealth.sleep_time" class="mLabelWidth"></selector>
      </group>

      <div class="health_tip">
        <span class="tip">*</span> 以下信息填写最后一次测量值
      </div>

      <group>
        <cell title="有无高血压" value-align="left" class="mLabelWidth">
          <div slot="default">
            <checker class="my_check_box" v-model="is_Have_HTN" radio-required selected-item-class="my_checked"
                     @on-change="getHaveHTN">
              <div class="options">
                <checker-item value="有" class="my_check_icon"></checker-item>
                <span>有</span>
              </div>
              <div class="options">
                <checker-item value="无" class="my_check_icon"></checker-item>
                <span>无</span>
              </div>
            </checker>
          </div>
        </cell>
        <cell title="高压" :value="userHealth.high_blood" value-align="left" class="mLabelWidth"></cell>
        <cell title="低压" :value="userHealth.low_blood" value-align="left" class="mLabelWidth"></cell>
        <cell title="血糖异常" value-align="left" class="mLabelWidth">
          <div slot="default">
            <checker class="my_check_box" v-model="is_Have_BS" radio-required selected-item-class="my_checked"
                     @on-change="getHaveBS">
              <div class="options">
                <checker-item value="有" class="my_check_icon"></checker-item>
                <span>有</span>
              </div>
              <div class="options">
                <checker-item value="无" class="my_check_icon"></checker-item>
                <span>无</span>
              </div>
            </checker>
          </div>
        </cell>
        <cell title="血脂异常" value-align="left" class="mLabelWidth">
          <div slot="default">
            <checker class="my_check_box" v-model="is_Have_BL" radio-required selected-item-class="my_checked"
                     @on-change="getHaveBL">
              <div class="options">
                <checker-item value="有" class="my_check_icon"></checker-item>
                <span>有</span>
              </div>
              <div class="options">
                <checker-item value="无" class="my_check_icon"></checker-item>
                <span>无</span>
              </div>
            </checker>
          </div>
        </cell>
        <cell title="尿酸异常" value-align="left" class="mLabelWidth">
          <div slot="default">
            <checker class="my_check_box" v-model="is_Have_UA" radio-required selected-item-class="my_checked"
                     @on-change="getHaveUA">
              <div class="options">
                <checker-item value="有" class="my_check_icon"></checker-item>
                <span>有</span>
              </div>
              <div class="options">
                <checker-item value="无" class="my_check_icon"></checker-item>
                <span>无</span>
              </div>
            </checker>
          </div>
        </cell>

        <cell title="症状"></cell>
        <cell-box>
          <checker v-model="userHealth.symptoms" type="checkbox" class="tag_content"
                   selected-item-class="my_checked_box">
            <checker-item v-for="(symptom,index) in symptomsArr" :value="symptom" :key="index" class="my_cb_option">
              {{symptom}}
            </checker-item>
          </checker>
        </cell-box>

        <cell title="直系亲属高血压病史"></cell>
        <cell-box>
          <checker v-model="userHealth.HBP_relations" type="checkbox" class="tag_content"
                   selected-item-class="my_checked_box">
            <checker-item v-for="(relation,index) in relationArr" :value="relation" :key="index" class="my_cb_option">
              {{relation}}
            </checker-item>
          </checker>
        </cell-box>

        <cell title="直系亲属糖尿病病史"></cell>
        <cell-box>
          <checker v-model="userHealth.DMS_relations" type="checkbox" class="tag_content"
                   selected-item-class="my_checked_box">
            <checker-item v-for="(relation,index) in relationArr" :value="relation" :key="index" class="my_cb_option">
              {{relation}}
            </checker-item>
          </checker>
        </cell-box>

        <cell title="直系亲属冠心病病史"></cell>
        <cell-box>
          <checker v-model="userHealth.CAD_relations" type="checkbox" class="tag_content"
                   selected-item-class="my_checked_box">
            <checker-item v-for="(relation,index) in relationArr" :value="relation" :key="index" class="my_cb_option">
              {{relation}}
            </checker-item>
          </checker>
        </cell-box>
      </group>
    </Scroll>

  </div>
</template>

<script>
  import {Group, Cell, CellBox, XInput, Checker, CheckerItem, Selector} from 'vux'
  import {mapActions} from 'vuex'
  import {getSleepTime} from '../../assets/mUtils/common'
  import Scroll from '../../components/scroll'

  export default {
    name: "user_health_edit",
    components: {
      Group,
      Cell,
      CellBox,
      XInput,
      Checker,
      CheckerItem,
      Scroll,
      Selector
    },
    data() {
      return {
        userHealth: {
          name: "",  //姓名
          sex: "",  //性别
          age: 0,  //年龄
          height: 0,  //身高
          weight: 0,  //体重
          sleep_time: "",  //睡眠时间
          illness_history: "",  //疾病史
          bmi: 0,  //BMI指数
          exercise: 0,  //锻炼次数
          smoke: 0,  //吸烟次数
          have_HTN: false,  //有无高血压
          high_blood: 0,  //高压
          low_blood: 0,  //低压
          have_BS_exc: false, //血糖异常
          have_BL_exc: false,  //血脂异常
          have_UA_exc: false,  //尿酸异常
          symptoms: [],  //症状
          HBP_relations: [], //亲属高血压病史
          DMS_relations: [],  //亲属糖尿病史
          CAD_relations: [],  //亲属冠心病史

        },
        user_id: 0,
        is_Have_HTN: "",
        is_Have_BS: "",
        is_Have_BL: "",
        is_Have_UA: "",

        sleepTimeArr: [],
        symptomsArr: ["头痛", "头晕", "恶心", "视物模糊", "注意力不集中"],
        relationArr: ["爸爸", "妈妈", "爷爷", "奶奶", "外公", "外婆"]
      }
    },
    created() {
      this.user_id = this.$route.query.user_id || 0;

      let myUserHealth = this.$store.state.userHealth.userHealth;
      if (myUserHealth.name) {
        this.userHealth = JSON.parse(JSON.stringify(myUserHealth));
      }
      else {
        this.saveUserHealth(this.user_id).then(res => {
          if (res.error_code !== 0) {
            this.$vux.toast.show({
              type: "warn",
              text: "数据获取失败！" + res.error_msg,
              position: "middle"
            })
          }
          else {
            this.userHealth = JSON.parse(JSON.stringify(myUserHealth));
          }
        })
      }

      this.sleepTimeArr = getSleepTime();
      this.userHealth.sleep_time = this.sleepTimeArr[0];
      this.is_Have_HTN = this.userHealth.have_HTN ? "有" : "无";
      this.is_Have_BS = this.userHealth.have_BS_exc ? "有" : "无";
      this.is_Have_BL = this.userHealth.have_BL_exc ? "有" : "无";
      this.is_Have_UA = this.userHealth.have_UA_exc ? "有" : "无";

      this.userHealth.age = this.userHealth.age === 0 ? "" : this.userHealth.age;
      this.userHealth.height = this.userHealth.height === 0 ? "" : this.userHealth.height;
      this.userHealth.weight = this.userHealth.weight === 0 ? "" : this.userHealth.weight;
    },
    methods: {
      ...mapActions('userHealth', ['saveUserHealth']),
      ...mapActions('userHealth', ['updateUserHealth']),
      getHaveHTN() {
        if (this.is_Have_HTN === "有") {
          this.userHealth.have_HTN = true;
        }
        else {
          this.userHealth.have_HTN = false;
        }
      },
      getHaveBS() {
        if (this.is_Have_BS === "有") {
          this.userHealth.have_BS_exc = true;
        }
        else {
          this.userHealth.have_BS_exc = false;
        }
      },
      getHaveBL() {
        if (this.is_Have_BL === "有") {
          this.userHealth.have_BL_exc = true;
        }
        else {
          this.userHealth.have_BL_exc = false;
        }
      },
      getHaveUA() {
        if (this.is_Have_UA === "有") {
          this.userHealth.have_UA_exc = true;
        }
        else {
          this.userHealth.have_UA_exc = false;
        }
      },
      saveEdit() {
        var self = this;

        if (self.userHealth.name.trim().length < 1) {
          self.$vux.toast.show({
            type: "text",
            text: "姓名不能为空！"
          });
          return;
        }

        if (self.userHealth.sex.trim().length < 1) {
          self.$vux.toast.show({
            type: "text",
            text: "性别不能为空！"
          });
          return;
        }

        if (self.userHealth.age <= 0) {
          self.$vux.toast.show({
            type: "text",
            text: "年龄不能为空或小于等于0！"
          });
          return;
        }
        if (self.userHealth.height <= 0) {
          self.$vux.toast.show({
            type: "text",
            text: "身高不能为空或小于等于0！"
          });
          return;
        }

        if (self.userHealth.weight <= 0) {
          self.$vux.toast.show({
            type: "text",
            text: "体重不能为空或小于等于0！"
          });
          return;
        }

        if (self.userHealth.illness_history.trim().length < 1) {
          self.$vux.toast.show({
            type: "text",
            text: "疾病史不能为空！"
          });
          return;
        }

        var updateData = {};
        updateData.user_id = self.user_id;
        updateData.userHealth = self.userHealth;

        self.updateUserHealth(updateData).then(res => {
          if (res.error_code !== 0) {
            self.$vux.toast.show({
              type: "warn",
              text: "数据获取失败！" + res.error_msg,
              position: "middle"
            })
          }
          else {
            self.$vux.toast.show({
              type: "success",
              text: "用户健康信息更新成功！",
              position: "middle",
              onHide() {
                self.$router.replace({
                  path: "/cdm/cdm_mobile/userdetail/health",
                  query: {
                    "user_id": self.user_id
                  }
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';

  .user_health_edit {

    .tip {
      color: #FF6134;
    }

    .user_edit {
      height: rem(55);
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      background: #F1F1F1;

      .user_edit_box {
        flex: 1;
        height: rem(45);
        padding: 0 rem(15);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #FFFFFF;

        .edit_des {
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
            font-size: rem(13);
            color: #323232;
            letter-spacing: rem(-0.31);
          }
        }

        .edit_btn {
          font-size: rem(13);
          background: #1B91E0;
          padding: rem(3) rem(8);
          color: white;
          border-radius: rem(3);
        }
      }
    }

    .my_new_scroll {
      top: rem(55);
      background: #F1F1F1;

      .health_tip {
        padding: rem(11) 0 rem(11) rem(16);
        color: #666666;
        font-size: rem(13);
        letter-spacing: rem(-0.31);

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
          color: #999999;
          &:before {
            left: 0;
          }

          &.mLabelWidth {
            .weui-label {
              width: rem(79) !important;
            }
            .vux-label {
              width: rem(79) !important;
            }
          }

          &.lLabelWidth {
            .weui-label {
              width: rem(125);
            }
          }

          &.vux-cell-box {
            &:before {
              border-top: none;
            }
            padding-top: 0;
            padding-right: 0;

            .my_cb_option {
              margin-right: rem(8);
              &:last-child {
                margin-right: 0;
              }
              border: 1px solid #C2C2C2;
              font-size: rem(13);
              height: rem(25);
              line-height: rem(25);
              padding: 0 rem(10);
              border-radius: rem(1);
              color: #999999;

              &.my_checked_box {
                border-color: #1B91E0;
                background: #1B91E0;
                color: #FFFFFF;
              }
            }
          }

          .vux-cell-align-left {
            color: #323232;
          }

          .weui-input {
            color: #323232;
            font-size: rem(14);
            font-family: 'PingFangSC-Light';

            &::-webkit-input-placeholder {
              color: #C2C2C2;
              font-family: 'PingFangSC-Light';
            }
            &:-moz-placeholder {
              color: #C2C2C2;
              font-family: 'PingFangSC-Light';
            }
            &:-ms-input-placeholder {
              color: #C2C2C2;
              font-family: 'PingFangSC-Light';
            }
          }

          .my_check_box {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .options {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              margin-right: rem(23);
              font-size: rem(14);
              color: #323232;

              &:last-child {
                margin-right: 0;
              }

              .my_check_icon {
                height: rem(19);
                width: rem(19);
                border: 1px solid #C9C9C9;
                border-radius: 100%;
                box-sizing: border-box;
                margin-right: rem(8);

                &.my_checked {
                  background: url("../../assets/images/user_icon/checked.png");
                  background-size: 100% 100%;
                  border: none;
                }
              }
            }
          }

          .my_cell_title {
            width: rem(79);
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .title_icon {
              width: rem(6);
              height: rem(7);
              margin-right: rem(4);
            }
          }

          .weui-select {
            height: auto;
            line-height: rem(14);
            color: #323232;
            font-family: 'PingFangSC-Light';
            padding-left: 0;
          }
        }
      }
    }

  }
</style>
