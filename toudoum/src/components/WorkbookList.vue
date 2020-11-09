<!-- TEMPLATE -->
<template>
    <v-container>
        <v-row>
            <v-col v-for="w in workbooks" :key="w.id" :cols="6">
                <Workbook :titleprops="w.name" />
                
            </v-col>
        </v-row>
    </v-container>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import Workbook from "@/components/Workbook.vue";
import { IWorkbook } from "@/models/IWorkbook";

export default Vue.extend({
    props: {
        workbooks: {} as () => IWorkbook[]
    },
    components: { Workbook },
    data() {
        return {
            settings: []
            // workbooks:[
            //     {id:1,name:"P3blabl"},
            //     {id:2,name:"P3"},
            //     {id:3,name:"P3"},
            //     {id:4,name:"P3"},
            //     {id:5,name:"P3"},
            //     {id:6,name:"P3 blablablablablablablabla"},
            //     {id:7,name:"P3"},
            //     {id:8,name:"P3"},
            //     {id:9,name:"P3"},
            //     {id:10,name:"P3"},
            //     {id:11,name:"P3"},
            // ]
        };
    },

    methods: {}
});
</script>

<!--CSS-->
<style scoped>
</style>
