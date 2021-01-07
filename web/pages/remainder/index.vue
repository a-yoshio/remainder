<template>
  <v-row>
    <div class="text-h1" v-text="title"/>
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
          <v-card :id='"remainder" + remainder.id'>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-subtitle class="overline mb-4">
                  {{ remainder.disp_datetime }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="headline mb-1">
                  {{ remainder.contents }}
                </v-list-item-subtitle>
                <v-list-item-content>{{
                  remainder.tag.title
                }}</v-list-item-content>
                <v-list-item-content>
                  <v-checkbox
                    v-model="ex4"
                    label="Complete!"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    @click="complete(remainder)"
                    hide-details
                  ></v-checkbox>
                </v-list-item-content>
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
      title: 'Remainder',
      remainder_menu: [
        {title: 'edit', url: '/remainder/edit'},
        {title: 'delete', url: '/remainder/delete'},
      ],
      complete_id: -1,
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
    },
    async complete(remainder) {
      document.getElementById('remainder'+remainder.id).className = 'feadout'
      try {
        // TODO: completeしたらstoreにremainderを渡す
        // reminderModule.complete(remainder)
      } catch(e) {
        console.error(e)
        error(e)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.feadout {
  transition-property: opacity;
  transition-duration: 1s;
  opacity: 0;
}
</style>