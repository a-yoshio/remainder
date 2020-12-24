<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Do you want to remove the Remainder?
        </v-card-title>
        <v-card-text>If you agree, "{{ contents }}" remainder will be removed.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            to="/remainder"
            nuxt
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteRemainder"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { remainderModule } from "@/store";

  export default {
    data () {
      return {
        dialog: true,
      }
    },
    async asyncData({params}) {
        return await remainderModule.get(params.id)
    },
    middleware: 'authenticated',
    computed: {
        contents() {
            return remainderModule.contents
        }
    },
    methods: {
        async deleteRemainder() {
            await remainderModule.delete().then(() => 
              this.$router.push('/remainder')
            ).catch((err)=> {
              console.error(err)
            })
        }
    }
  }
</script>