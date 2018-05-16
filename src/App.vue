<template>
  <div id="app" style="height: 100%;" class="app">
    <router-view v-wechat-title="$route.meta.title"/>
    <div v-transfer-dom>
      <loading v-model="isLoading" loading=false text="加载中..."></loading>
      <!--<toast @on-hide="" v-model="toast" type="text" :time="3500" is-show-mask :text="toastDes" :position="position"></toast>-->
    </div>
  </div>
</template>


<script>
  //const VConsole = require('./assets/mUtils/vconsole/vconsole.min');
  import { Loading,TransferDom,Toast } from 'vux'
  import { mapState } from 'vuex'
  //new VConsole();
  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    data(){
    	return{
    		isToast:this.toast
      }
    },
    components: {
      Loading,
      Toast
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading,
        toast:state => state.vux.toast,
        position:state => state.vux.position,
        toastDes:state => state.vux.toastDes,
      }),
    },
    methods:{
      hideEvent(){
      	this.$store.commit('showPosition',{
      		flag:false,
          text:'',
          position:'default'
        });
      }
    },
    mounted(){
//      console.log(this.toast)
//      console.log(this.position)
//      console.log(this.toastDes)
//      console.log('isToast',this.isToast)

    }
  };
</script>
<style lang="less" rel="stylesheet/less">
  //import './assets/style/mixin.scss'

  //引入 vux 样式
  @import '~vux/src/styles/reset.less';
</style>

<style lang="scss">
  @import './assets/style/normalize.css';
  @import './assets/style/mixin.scss';

  a {
    text-decoration: none;
  }
  .vux-modal-open{
    height: 100%;
  }

  .app{
    font-family: 'PingFangSC-Light';
    font-size: rem(14);
    color: #323232;
    background: #fff;
  }
</style>

