<!-- TEMPLATE -->
<template>
    <v-img v-if="imgUrl" :src="imgUrl" />
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
            return this.fullname
                .match(/\b(\w)/g)
                ?.join("")
                .toUpperCase();
        }
    }
});
</script>
