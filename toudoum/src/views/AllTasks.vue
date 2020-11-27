<template>
    <v-container class="marginTop">
        <h1>All your tasks</h1>
        <v-row>
            <v-col sm="12" md="12" lg="6">
                <TasksList
                    :tasks="t"
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
        this.t = await Api.get<ITask[]>("tasks");
    },
    data: function () {
        return {
            t: {} as ITask[],
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
