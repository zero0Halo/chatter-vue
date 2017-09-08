const Vue = require('vue');
const chatter = require('./components/chatter/chatter.vue');

// Create a new instance of Vue with the custom component
let app = new Vue({
  el: '#app',
  components: {
    chatter
  }
});
