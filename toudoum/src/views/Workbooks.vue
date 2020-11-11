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
import { ToudoumError } from "@/api/ToudoumError";
import { ToudoumError422 } from "@/api/ToudoumError422";
import WorkbookList from "@/components/WorkbookList.vue";

export default Vue.extend({
    name: "Home",
    components: { WorkbookList },
    async beforeMount() {
        this.w = await Api.get<IWorkbook[]>("workbooks?by_token=true");
        console.table(this.w);
    },
    data: function () {
        return {
            w: {} as IWorkbook[]
        };
    }
});
</script>

<style>
.marginTop {
    margin-top:72px;
}
</style>
