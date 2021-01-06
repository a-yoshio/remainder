<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-col cols="d-flex">
            <v-alert v-show="showError" dense outlined type="error">
                {{ errorMessage }}
            </v-alert>
        </v-col>
        <v-card-title>
          <span class="headline">Edit Tag</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Title" v-model="mTitle" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-col cols="8">
                    <v-select
                    v-model="mColor"
                    :items="$tagColors"
                    item-text="id"
                    item-value="hex"
                    label="Please choice color!"
                    return-object
                    dense
                    >
                    <template v-slot:item="{ item }">
                        <span>{{ item.id }}</span>
                        <div class="box-color" v-bind:style="{backgroundColor:item.hex}"/>
                    </template>
                    </v-select>
                </v-col>
                <v-col cols="6" v-bind:style="{backgroundColor:mColor}">
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" to="/tag">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { TagForm } from "@/forms/Tag";
import { tagModule } from "@/store";

export default {
  data: () => ({
    dialog: true,
    showError: false,
    errorMessage: "",
  }),
  async asyncData({ params, error }) {
      try {
        await tagModule.getTag(params.id)
      } catch(e) {
          console.error(e)
          error(e);
      }
  },
  middleware: 'authenticated',
  methods: {
    async submit() {
        this.showError = false;
        this.errorMessage = '';
        if (!tagModule.validate()) {
            this.errorMessage = "title, color are required. Please enter anything.";
            this.showError = true;
        } else {
            try {
                const result = await tagModule.update();
                if (!result) {
                    this.errorMessage = "Server Error";
                    this.showError = true;
                    return
                } else {
                    this.$router.push('/tag')
                    return
                }
            } catch(e) {
                this.errorMessage = "Server Error";
                this.showError = true;
                console.error(e)
                return
            } 
        }
    },
  },
computed: {
    mTitle: {
        // getter 関数
        get: function () {
            return tagModule.title
        },
        // setter 関数
        set: function (newValue) {
            tagModule.setTitle(newValue)
        }
    },
    mColor: {
        get: function () {
            return tagModule.color
        },
        set: function (newValue) {
            tagModule.setColor(newValue.hex)
        },
    }, 
  },
};
</script>
<style scoped lang="scss">
.box-color {
    width: 10px;
    height: 10px;
    margin: 5px;
    border-radius: 10px; 
}

</style>