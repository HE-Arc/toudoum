<!-- TEMPLATE -->
<template>
        <v-card elevation="4" class="pa-md-6 mx-lg-auto">
            <v-row>
                <v-col cols="2"
                    ><v-checkbox v-model="task.checked" :label="`DO`"></v-checkbox
                ></v-col>
                <v-col cols="6"
                    ><v-text-field label="Title" :value="task.name"></v-text-field
                ></v-col>
            </v-row>
            <v-row>
                <v-col cols="2">
                    <v-combobox
                        :items="priority"
                        label="Priority"
                        :value="getPriority(task.priority)"
                    ></v-combobox
                ></v-col>
            </v-row>
            <v-row no-gutters>
                <v-date-picker v-model="task.end_date"></v-date-picker>
            </v-row>

            <v-row>
                <v-col cols="8">
                    <v-textarea
                        name="input-7-1"
                        label="Description"
                        :value="task.description"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import { ITask } from "@/models/ITask";

export default Vue.extend({
    // props: {
    //     tasks: Object as () => Array<ITask>
    // },
    data() {
        return {
            settings: [],
            //TODO:Replace by GET REQUEST ON TASK ID
            task: {
                id: 1,
                name: "Ma meilleur tâche",
                checked: true,
                description: "Blablabalbal",
                end_date: "2020-10-15",
                priority: 1
            } as ITask,
            priority: ["High", "Medium", "Low"]
        };
    },

    methods: {
        getPriority: function (priority: number) {
            switch (priority) {
                case 0:
                    return "Low";
                case 1:
                    return "Medium";
                case 2:
                    return "High";
                default:
                    return "Err";
            }
        }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
