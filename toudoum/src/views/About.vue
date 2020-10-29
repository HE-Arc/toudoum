<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Api from "@/api/ApiRequester";
import { ITask } from "@/models/ITask";
import { AxiosResponse } from "axios";
import { IToudoumResponse } from "@/api/IToudoumResponse";

export default Vue.extend({
  name: "Home",
  components: {},
  async mounted() {
      Api.login({
        email: "lucas.fridez@he-arc.ch",
        password: "123123",
      });
      try {
      const tabTask = await Api.get<Array<ITask>>("tasks");
      // r is available
      tabTask.forEach((t: ITask) => {
          console.log(t.name);
          
      })
      
    } catch (e) {
      console.error(e);
    }
  },
  data: function () {
    return {
      names: ["Edouard", "Julien", "Lucas"],
    };
  },
});
</script>
