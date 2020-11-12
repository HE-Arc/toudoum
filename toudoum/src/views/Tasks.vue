<template>
    <v-container class="marginTop">
        <h1>Tasks</h1>
        <TasksList :tasks="t" :workbook_title="workbookName"/>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { ITask } from "@/models/ITask";
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";
import TasksList from "@/components/TasksList.vue";
import { IWorkbook } from "../models/IWorkbook";

export default Vue.extend({
    name: "Tasks",
    components: { TasksList },
    props: {
        workbook_id: String,
        workbook_title: String,
    },
    async beforeMount() {
        this.t = await Api.get<ITask[]>("tasks?workbook_id="+this.workbook_id);
        Api.get<IWorkbook[]>("workbooks?id="+this.workbook_id).then((w: IWorkbook[]) => {
            this.workbookName = w[0].name;
        });
        
    },
    data: function () {
        return {
            t: {} as ITask[],
            workbookName: "",
        };
    }
});
</script>
<style>
.marginTop {
    margin-top:72px;
}
</style>
