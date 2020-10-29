<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Api from "@/api/ApiRequester";

export default Vue.extend({
  name: 'Home',
  components: {
    
  },
  mounted() {
    Api.get();
  },
  data: function() {
    return{
      names: ["Edouard", "Julien", "Lucas"]
    }
  }
});
</script>
