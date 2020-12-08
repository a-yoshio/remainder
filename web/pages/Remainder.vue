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
import { Context } from "@nuxt/types";
import { Remainder } from "@/entitys/remainder";
import { getModule } from "vuex-module-decorators";
import { remainderModule } from "@/store";

export default {
  data() {
    return {};
  },
  asyncData() {
    remainderModule.fetchAll();
  },
  computed: {
    remainders() {
      return remainderModule.remainders;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>