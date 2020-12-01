<!-- TEMPLATE -->
<template>
    <v-container>
        <Modal
            :opened="isModalOpen"
            title="OK"
            :edit="false"
            :onButtonClick="save"
            :onCloseClick="() => this.isModalOpen = false"
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
        <v-card elevation="4" class="pa-6">
            <v-btn color="primary" dark absolute top right fab @click="openModal">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-row>
                <v-col v-for="w in workbooks" :key="w.id" :cols="6">
                    <Workbook :titleprops="w.name" :idprops="w.id + ''" />
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
    },

    data() {
        return {
            settings: [],
            isModalOpen: false,
            workbookName: "",
            groups: {} as IGroup[],
            itemGroups: [] as string[],
            groupSelected: "",
            shared: true
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

<!--CSS-->
<style scoped>
</style>
