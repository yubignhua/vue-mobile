<!--<template>-->
  <!--<div id="mian_home" class="home">-->
    <!--<div class="home_content">-->
      <!--<x-header :left-options="{showBack: false}">春雨云健康</x-header>-->
      <!--<swiper :list="demo03_list" auto dots-position="center"></swiper>-->
      <!--<grid :cols="2">-->
        <!--<grid-item link="/cdm/cdm_mobile/home/mainHome/page_one" v-for="i in level_2_list" :key="i.des">-->
          <!--<img :src="i.img" alt="" class="help_img">-->
          <!--<span class="grid-center">-->
            <!--<span class="item_title">{{i.name}}</span>-->
            <!--<div class="item_title_des">{{i.des}}</div>-->
          <!--</span>-->
        <!--</grid-item>-->
      <!--</grid>-->
      <!--<grid :cols="2">-->
        <!--<grid-item link="/home/mainHome/page_one" v-for="i in 6" :key="i">-->
          <!--<img slot="icon" src="../../assets/images/evir.jpg">-->
        <!--</grid-item>-->
      <!--</grid>-->
      <!--<div style="height: 10px;background: #F1F1F1"></div>-->
      <!--<div class="hz_title" @click="giveClick">合作历程 {{seen}}</div>-->
      <!--<div class="scroll_wrap">-->
        <!--<scroller lock-y :scrollbar-x=false>-->
          <!--<div class="box1">-->
            <!--<img class="box1-item" v-for="i in level_4_list" :src="i.img">-->
          <!--</div>-->
        <!--</scroller>-->
      <!--</div>-->
      <!--&lt;!&ndash;<router-link class="m_item" :to="{path: '/', query: { problem_id: pId } }" exact>主页 </router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;<ol class="example">&ndash;&gt;-->
        <!--&lt;!&ndash;<li v-for="item in p_list" :key="item.title"> <router-link :to="{path:item.url}">{{item.title}}</router-link> </li>&ndash;&gt;-->
      <!--&lt;!&ndash;</ol>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="haha">{{s_name}} {{s_colorList}}</div>&ndash;&gt;-->
    <!--</div>-->

    <!--<section class="animation_opactiy shop_back_svg_container" v-show="seen">-->
      <!--<img src="../../assets/images/shop_back.svg">-->
    <!--</section>-->
    <!--<div v-show ="seen">-->
      <!--<Loading/>-->
    <!--</div>-->
    <!--<transition name="router-slid" mode="out-in">-->
      <!--<router-view></router-view>-->
    <!--</transition>-->

    <!--<share link="https://t-hospitals.chunyu.me/cyhospital/weihospital/yanda/shareNextPage/?appId=wxe88d57c342a00701" title="春雨医生" img="http://dn-chunyu.qbox.me/@/media/images/2017/05/04/6b88/053dbbf77049_w300_h300_.jpg" desc="生病了 问春雨医生"/>-->

    <!--<div id="page-share-info" data-img="http://dn-chunyu.qbox.me/@/media/images/2017/05/04/6b88/053dbbf77049_w300_h300_.jpg" data-title="春雨医生" data-desc="生病了 问春雨医生" data-link=""></div>-->

  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--/* eslint-disable indent */-->

  <!--import { mapState,mapActions } from 'vuex'-->
  <!--import { XHeader,Swiper,Grid,GridItem,Tabbar,TabbarItem,Scroller } from 'vux'-->
  <!--import Loading from '../../components/loading.vue'-->
  <!--import share from '../../components/share.vue'-->
  <!--import { MixinRouterState } from '../../assets/mUtils/mixin'-->

  <!--export default {-->
    <!--mixins: [MixinRouterState],-->
    <!--components: {-->
      <!--XHeader, Swiper, Grid, GridItem, Tabbar, TabbarItem, Scroller,Loading,share-->
    <!--},-->
    <!--data () {-->
      <!--return {-->
        <!--seen: true,-->
        <!--demo03_list: [{-->
          <!--url: '',-->
          <!--img: 'https://media2.chunyuyisheng.com/@/media/images/2017/10/13/c562/b9521d852930_w600_h337_.png',-->
          <!--// title: '送你一朵fua'-->
        <!--}, {-->
          <!--url: '',-->
          <!--img: 'https://static.vux.li/demo/2.jpg',-->
          <!--// title: '送你一辆车'-->
        <!--}, {-->
          <!--url: '',-->
          <!--img: 'https://static.vux.li/demo/5.jpg',-->
          <!--// title: '送你一次旅行',-->
        <!--}],-->
        <!--p_list: [-->
          <!--{ title: '/cat', url: '/home/cat' },-->
          <!--{ title: '/mainHome', url: '/home/mainPage' },-->
        <!--],-->
      <!--};-->
    <!--},-->

    <!--methods: {-->
    	<!--tellMeWhy(){-->
    		<!--console.log('sfsdfdfdf')-->
    <!--},-->
      <!--giveClick(){-->
        <!--this.seen = false-->
      <!--},-->
      <!--...mapActions('home',[-->
        <!--'getHomeData',-->
      <!--]),-->
    <!--},-->

    <!--computed: {-->
      <!--/**-->
       <!--* 获取 store 里的状态-->
       <!--*/-->
      <!--...mapState('home',{-->
        <!--s_colorList: state => state.colorList,-->
        <!--s_name: state => state.name,-->
        <!--s_count: state => state.count,-->
        <!--level_2_list: state => state.level_2_list,-->
        <!--level_4_list: state => state.level_4_list,-->
      <!--}),-->
    <!--},-->

  <!--//    updated(){-->
  <!--//      console.log('-&#45;&#45;&#45;&#45;hahahahahah&#45;&#45;&#45;&#45;that.s:',this.seen)-->
  <!--//    },-->


    <!--mounted(){-->
      <!--var that = this;-->
     <!--// console.log('vue::::',Vue)-->
      <!--//console.log('Axios::::',Axios)-->
      <!--//console.log('$::::',$)-->

      <!--this.getHomeData();-->
      <!--Axios.get('/api/account').then(function (res) {-->
        <!--//that.showLoading = false;-->
        <!--//console.log('that:::', that);-->
        <!--console.log('res:::', res.data);-->
        <!--that.seen = false;-->
      <!--//        that.$nextTick(() => {-->
      <!--//          that.seen = false;-->
      <!--//        });-->
      <!--});-->

      <!--// console.log('store:::',this.$store);-->
      <!--// console.log('home_moudle::::',this.$store.state.home_module)-->
    <!--},-->
  <!--};-->
<!--</script>-->

<!--<style lang="scss" rel="stylesheet/scss">-->
  <!--@import '../../assets/style/mixin.scss';-->

  <!--.home{-->
    <!--font-family: 'PingFangSC-Light';-->
    <!--font-size: 14px;-->
    <!--position: absolute;-->
    <!--width: 100%;-->
    <!--top:0;-->
    <!--bottom:0;-->
    <!--.m_item{-->
      <!--margin-top: 60px;-->
      <!--display: block;-->
    <!--}-->
    <!--.weui-grid{-->
      <!--height:rem(76);-->
      <!--.grid-center{-->
        <!--font-size: 0.4rem;-->
        <!--color: #323232;-->
        <!--position: relative;-->
        <!--top: -0.08rem;-->
        <!--left:5px;-->
      <!--}-->
      <!--.item_title {-->
        <!--color: #323232;-->
        <!--position: relative;-->
        <!--top: -0.08rem;-->
        <!--font-size:rem(15);-->
      <!--}-->
      <!--.item_title_des {-->
        <!--margin-left: rem(28);-->
        <!--color: #999999;-->
        <!--font-size: 0.32rem;-->
        <!--font-size:rem(12);-->

      <!--}-->

      <!--.help_img{-->
        <!--width:rem(23);-->
        <!--height:rem(23);-->
        <!--position: relative;-->
        <!--top: 6px;-->
      <!--}-->


    <!--}-->
    <!--.hz_title {-->
      <!--color: #323232;-->
      <!--font-size: 16px;-->
      <!--margin-bottom: 0;-->
      <!--margin-left: 15px;-->
      <!--margin-top: 5px;-->
    <!--}-->
    <!--.scroll_wrap {-->
      <!--padding: 15px;-->
      <!--padding-top:5px;-->
      <!--.box1 {-->
        <!--height: 100px;-->
        <!--position: relative;-->
        <!--width: 590px;-->
      <!--}-->
      <!--.box1-item {-->
        <!--width: 84px;-->
        <!--height: 84px;-->
        <!--background-color: #ccc;-->
        <!--display:inline-block;-->
        <!--margin-left: 10px;-->
        <!--float: left;-->
        <!--text-align: center;-->
        <!--line-height: 100px;-->
      <!--}-->
      <!--.box1-item:first-child {-->
        <!--margin-left: 0;-->
      <!--}-->
    <!--}-->
    <!--.router-slid-enter-active, .router-slid-leave-active {-->
      <!--transition: all .4s;-->
    <!--}-->
    <!--.router-slid-enter, .router-slid-leave-active {-->
      <!--transform: translate3d(2rem, 0, 0);-->
      <!--opacity: 0;-->
    <!--}-->


  <!--}-->

<!--</style>-->
