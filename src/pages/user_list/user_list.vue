<template>
  <div class="user_list">

    <search ref="search" class="user_list_search" @on-change="getSearchResults" @on-cancel="searchCancel"
            @on-submit="searchSubmit" v-model="searchKey"></search>

    <tab class="user_list_tab"
         :line-width="tabStyle.lineWidth"
         :default-color="tabStyle.defaultColor"
         :active-color="tabStyle.activeColor"
         :custom-bar-width="tabStyle.getBarWidth()">
      <tab-item v-for="(tab,index) in getTabName" :key="index" @on-item-click="selectTab(tab)"
                :selected="currentUserStatus===tab.value">{{tab.name}}
      </tab-item>
    </tab>

    <Scroll class="my_scroll" ref="scroll" @pullingUp="loadMore" pullUpLoad="true" v-if="!inSearch">
      <user-list-box class="inService" v-if="currentUserStatus===serviceStatus && !inSearch"
                     :userList="serviceUserList" @changeUserTag="changeArrUserTag"></user-list-box>
      <div class="no_result" v-if="currentUserStatus===serviceStatus && !inSearch && serviceUserList.length<=0 && isInited">
        <img src="../../assets/images/noresult.png"/>
        <p>没有找到相应用户</p>
      </div>
      <user-list-box class="isClosed" v-if="currentUserStatus===closedStatus && !inSearch"
                     :userList="closedUserList" @changeUserTag="changeArrUserTag"></user-list-box>
    </Scroll>
    <user-list-box class="inSearch" v-if="inSearch" :userList="searchResults" @changeUserTag="changeArrUserTag"></user-list-box>

  </div>
</template>

<script>
  import {Search, Tab, TabItem} from 'vux'
  import userListBox from '../user_list_box/user_list_box'
  import {getRem} from '../../assets/mUtils/common'
  import Scroll from '../../components/scroll'

  export default {
    name: "user_list",
    components: {
      Search,
      Tab,
      TabItem,
      userListBox,
      Scroll
    },
    data() {
      return {
        tabList: [
          {name: "服务中用户", value: "2"},
          {name: "服务结束用户", value: "3"}
        ],
        tabStyle: {
          lineWidth: 2,
          defaultColor: "#666666",
          activeColor: "#1B91E0",
          getBarWidth: function () {
            return getRem(59);
          }
        },

        buyStatus: "0",  //待购买状态
        assignmentStatus: "1",  //待分配状态
        serviceStatus: "2",  //服务中状态
        closedStatus: "3",  //已关闭状态

        pressureType: "1",  //血压类型
        sugarType: "2",  //血糖类型

        currentUserStatus: "",  //当前用户状态

        serviceUsers: 0,  //服务中用户总人数
        serviceUserList: [],  //服务中用户列表
        servicePages: 1,  //服务中用户当前请求页

        closedUsers: 0,  //服务结束用户
        closedUserList: [],  //服务结束用户列表
        closedPages: 1,  //服务中用户当前请求页

        inSearch: false,  //是否搜索中
        searchResults: [],  //搜索数据
        searchPage: 1,
        searchKey: "",

        userRole: "",
        userName: "",

        isInited: false, //初始化完成

        scroll_normal: "my_scroll",
      }
    },
    computed: {
      getTabName: function () {
        var self = this;
        var myTab = [];
        self.tabList.forEach(function (item) {
          if (item.value === self.serviceStatus) {
            myTab.push({id: item.id, name: item.name + "(" + self.serviceUsers + ")", value: self.serviceStatus});
          }
          else {
            myTab.push({id: item.id, name: item.name + "(" + self.closedUsers + ")", value: self.closedStatus});
          }
        });
        return myTab;
      }
    },
    created() {
      this.userRole = this.$store.state.$userInfo.roles[0];
      this.userName = this.$store.state.$userInfo.name;

      this.currentUserStatus = this.serviceStatus;

      this.servicePages = 1;
      this.serviceUserList = [];
      this.getServiceUserList(true);

      this.closedPages = 1;
      this.closedUserList = [];
      this.getClosedUserList(true);
    },
    methods: {
      selectTab(tab) {
        var self = this;
        self.inSearch = false;
        self.currentUserStatus = tab.value;
      },
      getServiceUserList(isInit) {
        var self = this;
        self.request.get('/cdm/service/search', {
          params: {
            page: self.servicePages,
            service_status: self.serviceStatus,
            service_type: self.pressureType
          }
        }).then(function (res) {
          if (res.data.error_code === 0) {
            self.serviceUserList = [...self.serviceUserList, ...res.data.service_list];
            self.serviceUsers = res.data.total_count;
            if (isInit) {
              self.isInited = true;
            }
            self.$refs.scroll.forceUpdate();
          }
          else {
            self.$vux.toast.show({
              type: "cancel",
              text: res.data.error_msg,
              position: "middle"
            })
          }
        })
      },
      getClosedUserList(isInit) {
        var self = this;
        self.request.get('/cdm/service/search', {
          params: {
            page: self.closedPages,
            service_status: self.closedStatus,
            service_type: self.pressureType
          }
        }).then(function (res) {
          if (res.data.error_code === 0) {
            self.closedUserList = [...self.closedUserList, ...res.data.service_list];
            self.closedUsers = res.data.total_count;
            if (isInit) {
              self.isInited = true;
            }
            self.$refs.scroll.forceUpdate();
          }
          else {
            self.$vux.toast.show({
              type: "cancel",
              text: res.data.error_msg,
              position: "middle"
            })
          }
        })
      },
      getSearchResults(key) {
        var tempResults = [];
        var tempSearchResult = [];
        if (this.currentUserStatus === this.serviceStatus) {
          tempResults = this.serviceUserList;
        }
        else {
          tempResults = this.closedUserList;
        }

        for (var i = 0; i < tempResults.length; i++) {
          if (tempResults[i].user_name.search(key) !== -1) {
            tempSearchResult.push(tempResults[i]);
          }
        }

        this.searchResults = tempSearchResult;
        this.inSearch = true
      },
      searchCancel() {
        this.inSearch = false;
        this.searchResults = [];
      },
      searchSubmit() {
        this.searchResults = [];
        this.searchPage = 1;
        this.getSearchSubmit();
      },
      getSearchSubmit() {
        this.$refs.search.setBlur();
        var self = this;
        self.request.get("/cdm/service/search", {
          params: {
            service_status: self.currentUserStatus,
            service_type: self.pressureType,
            page: self.searchPage,
            query: self.searchKey
          }
        }).then(res => {
          if (res.data.error_code === 0) {
            if (self.searchPage === 1) {
              self.searchResults = res.data.service_list;
            }
            else {
              self.searchResults = [...self.searchResults, ...res.data.service_list];
            }
          }
          else {
            self.$vux.toast.show({
              type: "success",
              text: "数据获取失败!" + res.data.error_msg,
              position: "middle"
            })
          }
        })
      },
      changeArrUserTag(userId, newTag) {
        var self = this;
        if (self.currentUserStatus === self.serviceStatus) {
          for (let i = 0; i < self.serviceUserList.length; i++) {
            if (self.serviceUserList[i].user_id === userId) {
              self.serviceUserList[i].user_custom_tags = newTag;
              break;
            }
          }
        }
        else if (self.currentUserStatus === self.closedStatus) {
          for (let i = 0; i < self.closedUserList.length; i++) {
            if (self.closedUserList[i].user_id === userId) {
              self.closedUserList[i].user_custom_tags = newTag;
              break;
            }
          }
        }
        for (let i = 0; i < self.searchResults.length; i++) {
          if (self.searchResults[i].user_id === userId) {
            self.searchResults[i].user_custom_tags = newTag;
            break;
          }
        }
      },
      loadMore() {
        if (this.inSearch) {
          this.searchPage++;
          this.getSearchSubmit();
        }
        else {
          if (this.currentUserStatus === this.serviceStatus) {
            this.servicePages++;
            this.getServiceUserList();
          }
          else {
            this.closedPages++;
            this.getClosedUserList();
          }
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/style/mixin";

  .user_list {
    background: #F1F1F1;

    .my_scroll {
      top: rem(91);

      .no_result {
        width: 100%;
        height: rem(130);
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: rem(-100);
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        color: #999999;
        font-size: rem(14);
        text-align: center;
        img {
          width: rem(52);
          height: rem(52);
        }
        p {
          margin-top: rem(18);
        }
      }

    }

    .vux-search-box {
      .weui-search-bar {
        background-color: transparent;
        padding: 0 rem(10);
        height: rem(45);
        display: flex;
        justify-content: center;
        align-items: center;
        &:before {
          border-top: none;
        }
        &:after {
          border-bottom: none;
        }

        .weui-search-bar__cancel-btn {
          color: #1C91E0;
        }
      }
    }

    .vux-tab-container {
      height: rem(45);
    }
  }
</style>
