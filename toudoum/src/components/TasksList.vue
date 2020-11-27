<!-- TEMPLATE -->
<template>
    <v-card elevation="4">
        <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark absolute top right fab v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-card elevation="4" class="pa-md-4 mx-lg-auto">
                <v-row> <v-text-field label="Title" v-model="taskName"></v-text-field></v-row>
                <v-row> <v-btn color="primary" v-on:click="save">Save</v-btn> </v-row>
            </v-card>
        </v-dialog>

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
import Api from "@/api/ApiRequester";

export default Vue.extend({
    props: {
        tasks: {} as () => ITask[],
        workbook_title: String,
        workbook_id: Number,
    },
    data() {
        return {
            settings: [],
            dialog: false,
            taskName: "",
        };
    },

    methods: {
        clickOntask: function (id: string) {
            router.push({ name: "TaskDetail", params: { task_id: id } });
        },
        clickOnCheckbox: function (taskId: number) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id == taskId) {
                    Api.patch("tasks/" + this.tasks[i].id, {
                        checked: true
                    });
                    this.tasks[i].checked = !this.tasks[i].checked;
                }
            }
        },
        save: function(){
            const date = new Date();
            const goodDate = date.toISOString().split('T')[0];
            console.log(this.workbook_id);
            Api.post("tasks", {
                name:this.taskName,
                end_date:goodDate,
                workbook_id:this.workbook_id
            });
            this.dialog = false;
            
            //BUG NOW
            // router.go(0);
        },
    }
});
</script>
<!--CSS-->