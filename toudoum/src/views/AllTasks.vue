<template>
    <v-container class="marginTop">
        <h1>All your tasks</h1>
        <v-row>
            <v-col sm="12" md="12" lg="6">
                <h2 class="h5 mt-4 mb-2">Today tasks</h2>
                <TasksList
                    :tasks="todayTasks"
                    :workbook_title="workbookName"
                    :workbook_id="this.workbookId"
                />
                <h2 class="h5 mt-4 mb-2">Rest of the tasks</h2>
                <TasksList
                    :tasks="weekTasks"
                    :workbook_title="workbookName"
                    :workbook_id="this.workbookId"
                />
            </v-col>
            <v-col sm="12" md="12" lg="6">
                <h2 class="h5 mt-4 mb-2">Week tasks</h2>
                <TasksList
                    :tasks="restTasks"
                    :workbook_title="workbookName"
                    :workbook_id="this.workbookId"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { ITask } from "@/models/ITask";
import TasksList from "@/components/TasksList.vue";
import WorkbookInfo from "@/components/WorkbookInfo.vue";
import { IWorkbook } from "../models/IWorkbook";

export default Vue.extend({
    name: "Tasks",
    components: { TasksList },
    props: {
        workbook_id: String
    },
    async beforeMount() {
        this.allTasks = await Api.get<ITask[]>("tasks");

        // TODO : sort tasks
        this.todayTasks = this.allTasks;
        this.weekTasks = this.allTasks;
        this.restTasks = this.allTasks;
    },
    data: function () {
        return {
            allTasks: {} as ITask[],
            todayTasks: {} as ITask[],
            weekTasks: {} as ITask[],
            restTasks: {} as ITask[],
            workbookName: "",
            workbookId: 0
        };
    }
});
</script>
<style>
.marginTop {
    margin-top: 72px;
}
</style>
