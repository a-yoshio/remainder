<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-card-title>Tag List</v-card-title>
    <v-list subheader flat>
        <v-list-item v-for="(tag, index) in tags" :key="index">
          <template v-slot:default="{ active }">
            <v-list-item-content>
              <v-list-item-title>{{ tag.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon lighten-1>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon lighten-1>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import { tagsModule } from "@/store";
export default {
  data() {
    return {
      settings: [],
    };
  },
  async asyncData({ params }) {
    await tagsModule.getAll();
  },
  middleware: "authenticated",
  computed: {
    tags() {
      return tagsModule.tags;
    },
  },
};
</script>
<style scoped lang="scss">
</style>