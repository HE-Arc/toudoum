<!-- TEMPLATE -->
<template>
    <v-img v-if="imgUrl && imgUrl != 'user.jpg'" :src="getAvatar()" />
    <v-avatar v-else color="primary darken-3" size="40">
        <span class="white--text headline text-center">{{ getInitials() }}</span>
    </v-avatar>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";

export default Vue.extend({
    props: {
        imgUrl: String,
        fullname: String
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
        },
        getAvatar: function() {
            return `${Api.getUrl()}storage/avatars/${this.imgUrl}`;
        }
    }
});
</script>
