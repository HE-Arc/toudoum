<template>
    <v-app>
        <Drawer />
        <v-main>
            <Header />
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import Drawer from "@/components/Drawer.vue";

export default Vue.extend({
    name: "App",
    components: { Header, Drawer },

    beforeMount() {
        console.log("OK");
    }
});
</script>
