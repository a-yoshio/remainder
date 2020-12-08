<template>
  <v-row>
    <v-list subheader two-line>
      <v-list-item v-for="(remainder, index) in remainders" :key="index">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="remainder.datetime"></v-list-item-title>

          <v-list-item-subtitle v-text="remainder.contents"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-row>
</template>

<script lang="ts">
import { Remainder } from "@/entitys/remainder";
import { getModule } from "vuex-module-decorators";
import { remainderModule } from "@/store";

export default {
  data() {
    return {};
  },
  async asyncData() { // このページにアクセスが来たときに、実行される。
    return await remainderModule.getAll(1);// storeモジュールのmutation関数を実行
  },
  computed: {
    remainders() {
      return remainderModule.remainders;// storeモジュールのstateを取得。
    },
  },
};
</script>

<style lang="scss" scoped>
</style>