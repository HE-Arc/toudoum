<template>
    <div class="about">
        <h1>This is an about page</h1>
        <WorkbookList />
    </div>
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
import WorkbookList from "@/components/WorkbookList.vue";

export default Vue.extend({
    name: "Home",
    components: { WorkbookList },
    data: function () {
        return {
            names: [] as ITask[]
        };
    }
});
</script>
