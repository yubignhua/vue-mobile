<template>
  <div class="cat" >
    <x-header left-opations="{backText:''}" title="cat"></x-header>
    <Scroll ref="scroll" :pulldown="true" @pullingDown="changeName" @pullingUp="onPullingUp" pullUpLoad="true" :pullDownRefresh="pullDownRefresh">
      <br>
      <br>
      my first vue project
      {{name}} {{showAlert}}
      <div class="cat_one" @click="giveName('赵四',$event)">绑定点击事件2342343</div>
      <div @click="giveName()">v-on:click 简写 @click=""</div>
      <div class="md" :class="{ active: isActive }"> 绑定 class</div>
      <div class="md" :class="{ active: isActive }"> v-bind 简写 :class="" </div>
      <button @click="greet">Greet</button>
      click="counter += 1": 引号没可以进行计算<br>
      <button class="cat_one" @click="counter += 1">加1</button>
      <button class="cat_one" @click="remove()">减1  </button>:{{counter}}
      <br>
      <div class="team_list">团队列表:</div>
      <div>
        <div v-for="item in teamList">{{item}}</div>
      </div>

      <group>
        <cell title="title" value="value"></cell>
      </group>
      <x-button mini type="primary" @click.native="greet()" style="margin-top: 20px">alert</x-button>
      <x-button mini type="primary" @click.native="showToast()" style="margin-top: 20px">toast</x-button>
      <x-button mini type="primary" @click.native="giveName()" style="margin-top: 20px">跳转 mainPage</x-button>
      <x-button mini type="warm" @click.native="changeName()">更改名称</x-button>
      {{teamName}}
      <group>
        <x-switch title="Basic Usage" v-model="show1"></x-switch>
      </group>


      <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click"></actionsheet>
      <toast v-model="show1" text="Hello World"></toast>
      <x-button mini type="primary" @click.native="getHomeDate()" style="margin-top: 20px">获取图片</x-button>
      <div v-for="item in imgList">
        <!--<img :src="{{item.bImg}}" alt="">-->
        <img :src="item.img"/>
        <div>{{item.bImg}}</div>
      </div>
      <transition name="router-slid" mode="out-in">
        <router-link :to="{path: '/home' }" exact>router-link:链接到主页 </router-link>
      </transition>

      <transition name="router-slid" mode="out-in">
        <router-view></router-view>
      </transition>
      <ul class="list-content">
        <li @click="clickItem($event,item)" class="list-item" v-for="item in dataList">{{item}}</li>
      </ul>
    </Scroll>

    <!--<scroll ref="scroll"-->
            <!--:data="items"-->
            <!--:scrollbar="scrollbarObj"-->
            <!--:pullDownRefresh="pullDownRefreshObj"-->
            <!--:pullUpLoad="pullUpLoadObj"-->
            <!--:startY="parseInt(startY)"-->
            <!--@pullingDown="onPullingDown"-->
            <!--@pullingUp="onPullingUp"-->
            <!--@click="clickItem"-->
    <!--&gt;-->
    <!--</scroll>-->

  </div>
</template>


<script>
  import Vue from 'vue';
  import { mapState,mapMutations,mapActions } from 'vuex'
  import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';
  import Scroll from '../../components/scroll';
  import {XHeader,Toast,Actionsheet,XButton,Group, Cell,XSwitch,TransferDom} from 'vux'
  //将 vux toastPlugin 对象注入 vue组件 可以调用 toastPlugin相关方法 => this.$vux.show()
 // Vue.use(ToastPlugin);
 // Vue.use(AlertPlugin);


  export default{
    mixins: [MixinSetInterval, MixinRouterState],
    directives: {
      TransferDom
    },
    // 将引用的组件应用到本组模板内
    components: {
      XButton,
      Cell,
      Group,
      XSwitch,
      Actionsheet,
      Toast,
      XHeader,
      Scroll
    },
    // 定义组件名称
    name: 'cat',
    /**
     *定义初始状态
     */
    data () {
      return {
        name: 'yubh',
        school: 'dhlg',
        greeting: 'hello world',
        isActive: true,
        counter: 0,
        cityname: 'cat',
        show: false,
        show1: false,
        menus1: {
          menu1: 'Share to friends',
          menu2: 'Share to timeline',
        },
        dataList:['hello world',2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7],
        pullDownRefresh: {
          threshold: 60,
          stop: 50
        }
      };
    },
    // 方法属性

    methods: {
      ...mapMutations('cat',['ADD_DATALIST', 'CHANGENAMW']),
      ...mapActions('cat',['getHomeDate']),
      giveName (name) {
        this.name = name;
        this.$router.push({path: '/home/cat/mainPage'});
        console.log('event------', event.target);
      },
      onPullingUp(){
//      	setTimeout(()=>{
//          this.dataList = this.dataList.concat(['a','b','c','d','e']);
//          this.$refs.scroll.forceUpdate();
//        },1000)
      },
      changeName(){
      	setTimeout(()=>{
      		this.dataList = ['a','b','c','d','e',...this.dataList];
        this.$refs.scroll.forceUpdate()
      },1000);
        //this.CHANGENAMW('昆明儿童医院');
      },
      greet () {
        this.$vux.alert.show({
          title: 'Vux is Cool',
          content: 'Do you agree?',
          onShow () {
            console.log('Plugin: I\'m showing');
          },
          onHide () {
            console.log('Plugin: I\'m hiding');
          },
        });
      },
      showToast () {
        this.ADD_DATALIST({ value: 'hhahah' });
        this.$vux.toast.show({
          text: 'Loading',
        });
      },
      remove () {
        this.counter--;
      },
      onHide () {
        console.log('on hide');
      },
      onShow () {
        console.log('on show');
      },
      click (key) {
        console.log(key);
      },
    },

    // 计算属性
    computed: {
      showAlert(){
        return 123
      },
      ...mapState('cat',{
        teamName:(state)=>state.hosp,
        teamList:(state)=>state.teamList,
        imgList :(state)=>state.dataList,


      }),
    },

    /**
     * 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
     * componentDidMount
     */
    mounted(){
      //let that = this;
//      this.setTimeout(function () {
//        console.log('vue组件对象::', that);
//        console.log('this.$vux=============',that.$vux);
//      },1000)

    },

    // 设置组件接收的属性
    props: ['signinUp', 'headTitle', 'goBack'],
    /**
     * 在实例初始化之后，
     * 数据观测 (data observer) 和 event/watcher 事件配置之前被调用
     */
    beforeCreate () {
      // console.log('---------beforeCreate:')
    },
    /**
     * 数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
     * 然而，挂载阶段还没开始，$el 属性目前不可见
     */
    created () {
      // console.log('---------created')
    },
    /**
     * 在挂载开始之前被调用：相关的 render 函数首次被调用。
     * componentWillMount
     */
    beforeMount () { //
      // console.log('---------beforeMont')
    },

    /**
     * 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM'
     * componentWillUpdate
     */
    beforeUpdate () {
      // console.log('---------beforeUpdate')
    },
    /**
     * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作
     * componentDidUpdate
     */
    updated () {
      // console.log('---------update:')
    },
    beforeDestroy () {},

  };
</script>
<style lang="scss" rel="stylesheet/scss">
  //引入 css 样式
  @import '../../assets/style/mixin.scss';
  .cat{
    z-index: 80;
    background: #ffffff;
    position: absolute;
    top:0;
    bottom:0;
    width: 100%;
    .cat_one{
      color: red;
    }
    .team_list{
        display: inline-block;
        //引入 sass @mixin 定义
        @include wh(rem(100), rem(40));
       border:solid 1px #3190e8;
    }

    .list-wrapper{
      top:40px;
    }



  }
</style>
