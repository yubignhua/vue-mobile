<template>
  <div class="online_ask">
    <x-header :left-options="{showBack: false}" title="在线问诊"></x-header>
    <grid :cols="4">
      <grid-item v-for="i in deptList" :key="i.id">
        <img :src="i.icon" alt="" class="ask_img">
        <div style="color: #666666;font-size: 14px">{{i.name}}</div>
      </grid-item>
    </grid>
  </div>
</template>
<script>
  import {XHeader,Grid,GridItem,} from 'vux';
  import { mapState,mapActions } from 'vuex'

  export default{
    components:{XHeader,Grid,GridItem,},
    name:'online_ask',
    data(){
      return{

      }
    },
    methods:{
      ...mapActions('onlineAsk',['getOnlineAsk']),
    },
    computed:{
      ...mapState('onlineAsk',{
        deptList:(state)=> state.deptList
      })
    },
    created(){
      let that = this;
      this.getOnlineAsk();
      setTimeout(function () {
        //console.log("this",that);
        console.log("this",that.$store.state)
      },2000)
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';
  .online_ask{
    .weui-grid{
      text-align: center;
      height:rem(94);
    }
    .weui-grid:after{
      border-bottom:none;
    }
    .weui-grid:before{
      border-right:none

    }
    .ask_img{
      width:rem(50);
      height:rem(50);
    }
  }

</style>
