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
                            :input-value="task.checked"
                            @change="clickOnCheckbox(task.id)"
                        ></v-checkbox>
                    </v-list-item-action>

                    <!--TITLE AND PRIORITY-->
                    <v-list-item-content v-on:click="clickOntask">
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

export default Vue.extend({
    // props: {
    //     tasks: Object as () => Array<ITask>
    // },
    data() {
        return {
            settings: [],
            tasks: [
                {
                    id: 1,
                    name: "Finir developpement mobile",
                    priority: 0,
                    end_date: "2020-11-30",
                    description: "test"
                },
                {
                    id: 2,
                    name: "CP Crypto",
                    priority: 2,
                    end_date: "2020-11-30",
                    checked: true,
                    description: "blablabla"
                }
            ] as Array<ITask>,
            workbook_title: "INF3dlm-B"
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
        },

        clickOntask: function () {
            console.log("TODO:Link to the Task detail views");
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