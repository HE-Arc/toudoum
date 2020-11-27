<!-- TEMPLATE -->
<template>
    <v-container>
        <v-row>
            <v-col v-for="w in workbooks" :key="w.id" :cols="6">
                <Workbook :titleprops="w.name" :idprops="w.id+''"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import Workbook from "@/components/Workbook.vue";
import { IWorkbook } from "@/models/IWorkbook";
import router from "../router";

export default Vue.extend({
    props: {
        workbooks: {} as () => IWorkbook[]
    },
    components: { Workbook },
    data() {
        return {
            settings: []
        };
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
