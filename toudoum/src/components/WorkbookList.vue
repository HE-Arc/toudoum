<!-- TEMPLATE -->
<template>
    <v-container>
        <v-card elevation="4" class="pa-6">
            <v-dialog v-model="dialog" max-width="400px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark absolute top right fab v-bind="attrs" v-on="on">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <v-card elevation="4" class="pa-md-4 mx-lg-auto">
                    <v-row>
                        <v-text-field label="Title" v-model="workbookName"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-checkbox v-model="shared" label="Shared workbook"></v-checkbox>
                        <v-combobox
                            v-if="shared"
                            v-model="groupSelected"
                            :items="itemGroups"
                            label="Groups"
                            outlined
                            dense
                        ></v-combobox>
                    </v-row>
                    <v-row> <v-btn color="primary" v-on:click="save">Save</v-btn> </v-row>
                </v-card>
            </v-dialog>
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
import Api from "@/api/ApiRequester";
import { IWorkbook } from "@/models/IWorkbook";
import router from "../router";
import { IGroup } from "@/models/IGroup";

export default Vue.extend({
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

    components: { Workbook },
    data() {
        return {
            settings: [],
            dialog: false,
            workbookName: "",
            groups: {} as IGroup[],
            itemGroups: [] as string[],
            groupSelected: "",
            shared: true
        };
    },
    methods: {
        save: function () {
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

            this.dialog = false;
            // router.go(0);
        }
    }
});
</script>

<!--CSS-->
<style scoped>
</style>
