<template>
    <v-container class="marginTop">
        <h1>Tasks</h1>
        <TasksList :tasks="t"/>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { ITask } from "@/models/ITask";
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";
import TasksList from "@/components/TasksList.vue";

export default Vue.extend({
    name: "Tasks",
    components: { TasksList },
    props: {
        workbook_id: String,
    },
    async beforeMount() {
        this.t = await Api.get<ITask[]>("tasks?workbook_id="+this.workbook_id);
        console.table(this.t);
    },
    data: function () {
        return {
            t: {} as ITask[]
        };
    }
});
</script>
<style>
.marginTop {
    margin-top:72px;
}
</style>
