<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Do you want to remove the '{{ title }}' Tag?
        </v-card-title>
        <v-card-text>If you agree, the tag will be removed.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            to="/tag"
            nuxt
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteTag"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { tagModule } from "@/store";

  export default {
    data () {
      return {
        dialog: true,
      }
    },
    async asyncData({params}) {
        return await tagModule.getTag(params.id)
    },
    middleware: 'authenticated',
    computed: {
        title() {
          return tagModule.title
        },
    },
    methods: {
        async deleteTag() {
            await tagModule.delete().then(() => 
              this.$router.push('/tag')
            ).catch((err)=> {
              console.error(err)
            })
        }
    }
  }
</script>