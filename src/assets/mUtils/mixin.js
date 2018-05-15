export const MixinSetInterval = {
  data () {
    return {
      intervals: [],
      timeouts: [],
    };
  },

  methods: {
    setInterval(...args) {
      return this.intervals.push(setInterval.apply(null,...args));
    },
    setTimeout(...args) {
      return this.timeouts.push(setTimeout.apply(null,...args));
    },
    clearInterval(index) {
      console.log(index)
      clearInterval(this.intervals[index - 1]);
      this.intervals[index - 1] = -1;
    },
    clearTimeout(index) {
      clearInterval(this.timeouts[index - 1]);
      this.timeouts[index - 1] = -1;
    },
  },
  beforeDestroy() {
    this.intervals.map(this.clearInterval);
    this.timeouts.map(this.clearTimeout);
  },

};

export const MixinRouterState = {

/*
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // next(vm => {
    //   console.log('==RouteEnter vm===',vm);
    //   //vm.showLoading = false;
    // })

  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    //      console.log("to====",to);
    //      console.log("from====",from);
    //      console.log("next====",next);
    //      console.log("this====",this);
    next();
  },

  }*/

}

