var Vue = require('vue');
var chatter = require('./components/chatter/chatter.vue');




new Vue({
  el: '#app',
  components: {
    chatter
  },
  data: {
    message: 'Hi'
  }
});
