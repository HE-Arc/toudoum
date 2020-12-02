<template>
    <v-container class="marginTop">
        <h1>Workbooks</h1>
        <WorkbookList :workbooks="w" />
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { IWorkbook } from "@/models/IWorkbook";
import WorkbookList from "@/components/WorkbookList.vue";

export default Vue.extend({
    name: "Home",
    components: { WorkbookList },
    async beforeMount() {
        this.w = await Api.get<IWorkbook[]>("workbooks?by_token=true");
    },
    data: function () {
        return {
            w: {} as IWorkbook[]
        };
    }
});
</script>
