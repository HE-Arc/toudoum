
<template>
    <div class="account">
        <img alt="Vue logo" src="../assets/logo.png" />
        <p>Account page !</p>
        <Profil/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Profil from "@/components/Profil.vue";

export default Vue.extend({
    name: "Account",
    components: {Profil},
});
</script>
