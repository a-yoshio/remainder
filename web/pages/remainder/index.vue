<template>
  <v-row>
    <v-btn
      block
      depressed
      elevation="2"
      raised
      rounded
      color="accent"
      to="/remainder/regist"
      nuxt
    >
      + Create New Remainder
    </v-btn>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="(remainder, index) in remainders" :cols="6" :key="index">
          <v-card>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-subtitle class="overline mb-4">
                  {{ remainder.disp_datetime }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="headline mb-1">
                  {{ remainder.contents }}
                </v-list-item-subtitle>
                <v-list-item-content>{{
                  remainder.tag_id
                }}</v-list-item-content>
                <v-list-item-content>{{
                  remainder.complete
                }}</v-list-item-content>
              </v-list-item-content>
              <v-card-actions>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on">
                      <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(menu, index) in remainder_menu"
                      :key="index"
                    >
                      <v-list-item-title @click="next(menu.url, remainder.id)">{{ menu.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-actions>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import { remaindersModule } from "@/store";
import movepage from "@/middleware/movepage"

export default {
  components: {},
  data() {
    return {
      remainder_menu: [
        {title: 'edit', url: '/remainder/edit'},
        {title: 'delete', url: '/remainder/delete'},
      ],
    };
  },
  async asyncData() {
      // このページにアクセスが来たときに、実行される。
      return await remaindersModule.getAll() // storeモジュールのmutation関数を実行
  },
  middleware: 'authenticated',
  computed: {
    remainders() {
      return remaindersModule.remainders
    },
  },
  methods: {
    next(path, remainderId) {
      this.$router.push(path+'/'+remainderId)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>