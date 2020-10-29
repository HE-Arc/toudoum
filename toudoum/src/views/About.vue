<template>
    <div class="about">
        <h1>This is an about page</h1>
        <div v-for="t in names" :key="t.id">
            {{ t.name }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { ITask } from "@/models/ITask";
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";
import { IUser } from "@/models/IUser";

export default Vue.extend({
    name: "Home",
    components: {},
    async mounted() {
        const u: IUser = {
            id: 1,
            email: "aa@aa.com",
            name: "lca",
            firstname: "fraaa",
            password: "ok",
            token: "hjlkfd"
        };

        try {
            await Api.login({
                email: "lucas.fridez@he-arc.ch",
                password: "123123"
            });
            await Api.post("tasks", { name: "hello", workbood_id: "" });
        } catch (e) {
            if (e instanceof ToudoumError422) {
                console.log(e.data); // Errors with sent data
            } else if (e instanceof ToudoumError) {
                console.log(e.message); // Error (401, 404 or 500,...)
            }
        }
    },
    data: function () {
        return {
            names: [] as ITask[]
        };
    }
});
</script>
