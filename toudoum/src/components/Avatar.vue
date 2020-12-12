<!-- TEMPLATE -->
<template>
    <v-img v-if="imgUrl && imgUrl != 'user.jpg'" :src="imgUrl" />
    <v-avatar v-else color="primary" size="40">
        <span class="white--text headline text-center">{{ getInitials() }}</span>
    </v-avatar>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        imgUrl: String,
        fullname: String
    },
    beforeMount() {
        console.log(this.imgUrl);
    },
    methods: {
        getInitials: function () {
            if (this.fullname){
                return this.fullname
                    .match(/\b(\w)/g)
                    ?.join("")
                    .toUpperCase();
            }else{
                return "??";
            }
        }
    }
});
</script>
