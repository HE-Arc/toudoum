<!-- TEMPLATE -->
<template>
    <v-container>
        <Modal
            :opened="isModalOpen"
            title="Workbook creation"
            :edit="false"
            :onButtonClick="save"
            :onCloseClick="() => (this.isModalOpen = false)"
            max-width="400px"
        >
            <v-text-field label="Title" v-model="workbookName"></v-text-field>

            <v-checkbox v-model="shared" label="Shared workbook"></v-checkbox>
            <v-combobox
                v-if="shared"
                v-model="groupSelected"
                :items="itemGroups"
                label="Groups"
                outlined
                dense
            ></v-combobox>
        </Modal>
        <v-card elevation="4" class="pa-3">
            <v-btn color="primary" dark absolute top right fab @click="openModal">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-row class="mt-4">
                <v-col v-for="w in workbooks" :key="w.id" sm="12" md="6" lg="4" xl="3">
                    <Workbook
                        :title="w.name"
                        :id="w.id + ''"
                        :authorName="authorNames[w.user_id]"
                        :nbTasks="nbTasks[w.id] || 0"
                    />
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<!-- SCRIPT -->
<script lang="ts">
import Vue from "vue";
import Workbook from "@/components/Workbook.vue";
import Modal from "@/components/Modal.vue";
import Api from "@/api/ApiRequester";
import { IWorkbook } from "@/models/IWorkbook";
import router from "../router";
import { IGroup } from "@/models/IGroup";
import { IUser } from "../models/IUser";

export default Vue.extend({
    components: { Workbook, Modal },
    props: {
        workbooks: {} as () => IWorkbook[]
    },
    async created() {
        this.groups = await Api.get<IGroup[]>("groups?by_token=true");
        this.groups.forEach((g: IGroup) => {
            this.itemGroups.push(g.name);
        });
        this.groupSelected = this.groups[0].name;

        Api.get<IUser[]>("users").then((authors: IUser[]) => {
            authors.forEach((u: IUser) => {
                this.authorNames[u.id] = `${u.name} ${u.firstname}`;
            });
        });
        this.nbTasks = await Api.get("tasks?count_workbook_id=true");
    },

    data() {
        return {
            settings: [],
            isModalOpen: false,
            workbookName: "",
            itemGroups: [] as string[],
            groups: [] as IGroup[],
            groupSelected: "",
            shared: true,
            nbTasks: {} as any,
            authorNames: {} as any
        };
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        save: async function () {
            let tmpGroupId = null;
            if (this.shared) {
                this.groups.forEach((g: IGroup) => {
                    if (g.name == this.groupSelected) {
                        tmpGroupId = g.id;
                    }
                });
            }
            Api.post("workbooks", {
                name: this.workbookName,
                group_id: tmpGroupId
            });
            this.isModalOpen = false;
        }
    }
});
</script>
