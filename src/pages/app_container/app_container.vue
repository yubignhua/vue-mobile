<template>
    <div class="app_container">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
      </transition>
      <transition name="router-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
</template>

<script>


  export default {
    //components: {Toast, XHeader,},
    //mixins: [MixinSetInterval, MixinRouterState],
    //props: ['goBack'],
    data(){
      return {}
    },
		//methods: {},
		//computed: {},
		//created () {},
		//mounted(){},
		//updated () {},

	};
</script>
<style lang="scss" rel="stylesheet/scss">
    .app_container{
      position: absolute;
      width:100%;
      top:0;
      bottom:0;
    }
    .router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .2s;
    }
    .router-fade-enter, .router-fade-leave-active {
      opacity: 0;
    }

</style>


<!--




  <transition name="move">
        <keep-alive>
          <router-view class="view" v-if="$route.meta.keepAlive" />
        </keep-alive>
      </transition>

      <transition name="move">
        <router-view class="view" v-if="!$route.meta.keepAlive"></router-view>
      </transition>

    .view{
      transition: all 0.3s;
      transform: translate3d(0, 0, 0);
      &.move-enter-active, &.move-leave-active{
        transform: translate3d(100%, 0, 0);

      }


-->
