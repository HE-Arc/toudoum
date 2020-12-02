<template>
    <v-container class="marginTop">
        <h1>All your tasks</h1>
        <masonry
            :cols="{ default: 2, 720: 1 }"
            :gutter="{ default: '30px', 700: '15px' }"
        >
            <div>
                <h2 class="h5 mt-4 mb-2">Today tasks</h2>
                <TasksList
                    :readOnly="true"
                    :tasks="todayTasks"
                    :workbook_title="workbookName"
                    :workbook_id="this.workbookId"
                />
            </div>
            <div>
                <h2 class="h5 mt-4 mb-2">Week tasks</h2>
                <TasksList
                    :readOnly="true"
                    :tasks="restTasks"
                    :workbook_title="workbookName"
                    :workbook_id="this.workbookId"
                />
            </div>
            <div>
                <h2 class="h5 mt-4 mb-2">Rest of the tasks</h2>
                <TasksList
                    :readOnly="true"
                    :tasks="weekTasks"
                    :workbook_title="workbookName"
                    :workbook_id="this.workbookId"
                />
            </div>
        </masonry>
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
