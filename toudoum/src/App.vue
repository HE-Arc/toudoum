<template>
    <v-app>
        <Drawer />
        <v-main>
            <Header />
            <router-view></router-view>
            <v-switch
        v-model="$vuetify.theme.dark"
        hint="This toggles the global state of the Vuetify theme"
        inset
        label="Vuetify Theme Dark"
        persistent-hint
      ></v-switch>
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
    components: { Header, Drawer },
    beforeMount() {
        console.log("OK");
    }
});
</script>
