<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'Home',
  components: {
    Card,
  },
  data: function() {
    return{
      names: ["Edouard", "Julien", "Lucas"]
    }
  }
});
</script>
