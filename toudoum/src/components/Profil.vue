<!-- TEMPLATE -->
<template>
    <div>
        <h3>Profil</h3>
        <v-form v-model="form">
            <v-rows>
                <v-col 
                    cols="12"
                    md="4"
                >
                </v-col>
                <v-text-field
                    v-model="infos.firstname"
                    label="Prénom"
                >
                </v-text-field>
                <v-text-field
                    v-model="infos.name"
                    label="Nom"
                >
                </v-text-field>
                <v-text-field
                    v-model="infos.email"
                    label="Adresse e-mail"
                >
                </v-text-field>
                <v-text-field
                    v-model="infos.password"
                    label="Mot de passe"
                    type="password"
                >
                </v-text-field>
            </v-rows>
        </v-form>
    </div>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import Info from "@/components/Info.vue";
export default Vue.extend({
    created() {
            //this.getUserInfos();
        },
    data() {
        return {
            infos:{
                name: "ed",
                firstname : "goff",
                email: "edgoff@gmail.com",
                password : "lol123"
            }
        };
    },

    methods: {
        // getUserInfos() {
            
        // }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
