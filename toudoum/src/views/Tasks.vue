<template>
    <v-container class="marginTop">
        <h1>Tasks in Workbook &laquo; {{ workbookName }} &raquo;</h1>
        <v-row>
            <v-col sm="12" md="12" lg="6">
                <TasksList
                    :tasks="t"
                    :workbook_title="workbookName"
                    :workbook_id="this.workbookId"
                    @reload="getAllTasks"
                />
            </v-col>
            <v-col sm="12" md="12" lg="6">
                <WorkbookInfo
                    :workbookId="workbookId"
                    v-if="workbook_group_id > -1 && workbook_user_id > -1"
                    :groupId="workbook_group_id"
                    :userId="workbook_user_id"
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
    components: { TasksList, WorkbookInfo },
    props: {
        workbook_id: String
    },

    async created() {
        await this.getAllTasks();
        Api.get<IWorkbook[]>("workbooks?id=" + this.workbook_id).then((w: IWorkbook[]) => {
            this.workbookName = w[0].name;
            this.workbookId = w[0].id;
            this.workbook_group_id = w[0].group_id;
            this.workbook_user_id = w[0].user_id;
        });
    },

    data: function () {
        return {
            t: {} as ITask[],
            workbookName: "",
            workbookId: 0,
            workbook_group_id: -1,
            workbook_user_id: -1,
        };
    },
    methods: {
        async getAllTasks() {
            this.t = await Api.get<ITask[]>("tasks?workbook_id=" + this.workbook_id);
        }
    }
});
</script>

