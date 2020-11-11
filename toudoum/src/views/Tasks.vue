<template>
    <v-container class="marginTop">
        <h1>This is an workbook page id:{{workbook_id}}</h1>
        <!-- <TasksList /> -->
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
    name: "Home",
    // components: { TasksList },
    props: {
        workbook_id: String,
    },

    beforeMount() {
        console.log(this)
    },
    // async beforeMount() {
    //     this.w = await Api.get<ITask[]>("tasks?workbook_id=");
    //     console.table(this.w);
    // },
    data: function () {
        return {
            w: {} as ITask[]
        };
    }
});
</script>
<style>
.marginTop {
    margin-top:72px;
}
</style>
