<!-- TEMPLATE -->
<template>
    <v-card elevation="4" class="pa-md-6 mx-lg-auto">
        <v-row>
            <v-col cols="1">
                <v-btn v-on:click="save" elevation="2" color="primary">Save</v-btn></v-col
            >
            <v-col> <v-btn v-on:click="dismiss" elevation="2" color="error">Dismiss</v-btn></v-col>
        </v-row>
        <v-row>
            <v-col cols="2"
                ><v-checkbox :input-value="isTaskChecked" :label="`DO`"></v-checkbox
            ></v-col>
            <v-col cols="6"><v-text-field label="Title" :value="task.name"></v-text-field></v-col>
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
import Api from "@/api/ApiRequester";
import { ITask } from "@/models/ITask";
import router from "../router";

export default Vue.extend({
    props: {
        task: {} as () => ITask
    },

    data() {
        return {
            settings: [],
            priority: ["High", "Medium", "Low"]
        };
    },

    computed: {
        isTaskChecked: function () {
            return this.task.pivot && this.task.pivot.checked;
        }
    },

    methods: {
        getPriority: function (priority: number) {
            return this.priority[priority];
        },

        save: function () {
            //TODO REQUEST PUSH OR PATCH WITH MODIFICATION
            console.log("TODO REQUEST PUSH OR PATCH WITH MODIFICATION");
        },
        dismiss: function () {
            router.go(-1);
        }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
