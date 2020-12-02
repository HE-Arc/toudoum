<!-- TEMPLATE -->
<template>
    <v-navigation-drawer
        app
        v-if="$typedStore.getters.isLoggedIn"
        :touchless="true"
        :mobile-breakpoint="0"
        :mini-variant="!$typedStore.getters.isDrawerExpanded"
        
    > 
        <v-layout align-center justify-space-between column fill-height>
            <div>
                <v-list class="py-0">
                    <v-list-item class="px-2" two-line>
                        <v-list-item-avatar>
                            <v-img
                                src="https://avatars1.githubusercontent.com/u/19173830?s=460&u=08af2e129410fb95c81af06cfdbd2306288aa8cd&v=4"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="title">
                                {{ $typedStore.getters.userFullname }}
                            </v-list-item-title>
                            <v-list-item-subtitle>{{
                                $typedStore.getters.userEmail
                            }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list nav dense>
                    <v-list-item link v-for="link in links" :key="link.name" :to="link.to">
                        <v-list-item-icon>
                            <v-icon>mdi-{{ link.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ link.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
            <v-switch
                justify-end
                v-if="$typedStore.getters.isDrawerExpanded"
                v-model="$vuetify.theme.dark"
                inset
                label="Dark Theme"
                persistent-hint
            ></v-switch>
        </v-layout>
    </v-navigation-drawer>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import { IListMenu } from "@/models/IListMenu";

export default Vue.extend({
    name: "Drawer",
    props: {
        open: Boolean
    },
    methods: {
        toggleDrawer: function () {
            this.$typedStore.commit("DRAWER_TOGGLE");
        },
        isMobile() {
            return this.$vuetify.breakpoint.smAndDown;
        }
    },
    data() {
        return {
            links: [
                {
                    name: "My account",
                    icon: "account-circle",
                    to: "/Account"
                },
                {
                    name: "My tasks",
                    icon: "checkbox-marked-outline",
                    to: "/Tasks"
                },
                {
                    name: "My workbooks",
                    icon: "book-outline",
                    to: "/"
                },
                {
                    name: "Logout",
                    icon: "logout",
                    to: "/Logout"
                }
            ] as Array<IListMenu>
        };
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
