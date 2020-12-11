<template>
    <v-app>
        <Drawer :avatarTimestamp="this.$typedStore.state.avatarTimestamp"/>
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
import "@/assets/styles/main.scss";

export default Vue.extend({
    name: "App",
    components: { Header, Drawer }
});
</script>
