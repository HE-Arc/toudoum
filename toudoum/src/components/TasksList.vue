<!-- TEMPLATE -->
<template>
    <v-card elevation="4">
        <Modal title="Create a task" :edit="false" :onButtonClick="save" :opened="isModalOpen">
            <v-text-field label="Title" v-model="taskName"></v-text-field>
        </Modal>
        <v-btn color="primary" dark absolute top right fab @click="openModal">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-list flat subheader three-line>
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
                        <v-list-item-subtitle>{{
                            task.description != undefined ? task.description : "-"
                        }}</v-list-item-subtitle>
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
import Modal from "@/components/Modal.vue";
import Api from "@/api/ApiRequester";

export default Vue.extend({
    components: { Modal },
    props: {
        tasks: {} as () => ITask[],
        readOnly: {
            type: Boolean,
            default: false
        },
        workbook_title: String,
        workbook_id: Number
    },
    data() {
        return {
            settings: [],
            isModalOpen: false,
            taskName: ""
        };
    },

    methods: {
        openModal() {
            this.isModalOpen = true;
        },
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
        save: async function () {
            const date = new Date();
            const goodDate = date.toISOString().split("T")[0];
            console.log(this.workbook_id);
            await Api.post("tasks", {
                name: this.taskName,
                end_date: goodDate,
                workbook_id: this.workbook_id
            });
            this.isModalOpen = false;

            //BUG NOW
            // router.go(0);
        }
    }
});
</script>
<!--CSS-->