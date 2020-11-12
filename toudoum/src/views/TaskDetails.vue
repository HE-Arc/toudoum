<template>
    <v-container class="marginTop">
        <h1>Tasks</h1>
        <Task :task="task"/>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { ITask } from "@/models/ITask";
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";
import Task from "@/components/Task.vue";

export default Vue.extend({
    name: "TaskDetail",
    components: { Task },
    props: {
        task_id: String,
    },
    async beforeMount() {
        Api.get<ITask[]>("tasks?id="+this.task_id).then((t: ITask[]) => {
            this.task = t[0];
        });
    },
    data: function () {
        return {
            task: {} as ITask
        };
    }
});
</script>
<style>
.marginTop {
    margin-top:72px;
}
</style>
