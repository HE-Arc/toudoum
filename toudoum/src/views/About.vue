<template>
    <v-container fill-height fluid>
        <v-row align="start" justify="start">
            <v-col align="center">
                <h1>This is an about page</h1>
                <CreateGroup /> </v-col></v-row
    ></v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { ITask } from "@/models/ITask";
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";
import { IUser } from "@/models/IUser";
import TasksList from "@/components/TasksList.vue";
import Task from "@/components/Task.vue";
import CreateGroup from "@/components/CreateGroup.vue";

export default Vue.extend({
    name: "Home",
    components: { CreateGroup },
    data: function () {
        return {
            names: [] as ITask[]
        };
    }
});
</script>
