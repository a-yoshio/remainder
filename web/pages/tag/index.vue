<template>
  <v-container>
    <div class="text-h1">Tag List</div>
    <v-card width="50%" top="30px">
      <v-list subheader>
          <v-list-item v-for="(tag, index) in tags" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ tag.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="edit(tag.id)">
                <v-icon lighten-1>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon @click="deleteTag(tag.id)">
                <v-icon lighten-1>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
      </v-list>
      <TagRegist/>
    </v-card>
  </v-container>
</template>
<script>
import { tagsModule } from "@/store";
import { tagModule } from "@/store";
import TagRegist from "@/components/TagRegist"

export default {
  data() {
    return {
      settings: [],
    };
  },
  components: {
    TagRegist
  },
  async asyncData({ params }) {
    await tagsModule.getAll();
  },
  middleware: "authenticated",
  methods: {
    edit(tagId) {
      this.$router.push('/tag/edit/' + tagId)
    },
    deleteTag(tagId) {
      this.$router.push('/tag/delete/' + tagId)
    }
  },
  computed: {
    tags() {
      return tagsModule.tags;
    },
  },
};
</script>
<style scoped lang="scss">
</style>