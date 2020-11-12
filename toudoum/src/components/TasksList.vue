<!-- TEMPLATE -->
<template>
    <v-card elevation="4">
        <v-divider></v-divider>

        <v-list flat subheader three-line>
            <v-subheader>{{ workbook_title }}</v-subheader>

            <v-list-item-group>
                <v-list-item v-for="task in tasks" v-bind:key="task.id">
                    <!--CHECKBOX-->
                    <v-list-item-action>
                        <v-checkbox
                            :input-value="task.pivot.checked"
                            @change="clickOnCheckbox(task.id)"
                        ></v-checkbox>
                    </v-list-item-action>

                    <!--TITLE AND PRIORITY-->
                    <v-list-item-content v-on:click="clickOntask(task.id + '')">
                        <v-list-item-title>{{ task.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <!--DO DATE-->
                    <v-list-item-content v-on:click="clickOntask" class="text-right">
                        <v-list-item-title>{{ task.end_date }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>


<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import { ITask } from "@/models/ITask";
import router from "../router";

export default Vue.extend({
    props: {
        tasks: {} as () => ITask[],
        workbook_title: String
    },
    data() {
        return {
            settings: []
        };
    },

    methods: {
        clickOntask: function (id: string) {
            router.push({ name: "TaskDetail", params: { task_id: id } });
        },
        clickOnCheckbox: function (taskId: number) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id == taskId) {
                    console.log(
                        "TODO:PATCH REQUEST ON TASK " +
                            this.tasks[i].name +
                            "TO CHANGE IF CHECKED OR UNCHECKEDS"
                    );
                    this.tasks[i].checked = !this.tasks[i].checked;
                }
            }
        }
    }
});
</script>

<!--CSS-->