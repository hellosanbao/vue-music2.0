import Vue from 'vue'
//格式化数字，超过10000显示 xxx万
Vue.filter('formatNum', function (val) {
  if(val>1000){
    val=(val/10000).toFixed(2)+'万';
  }
  return val
});
