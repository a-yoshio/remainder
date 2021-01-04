<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="#272727"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-col cols="d-flex">
            <v-alert v-show="showError" dense outlined type="error">
                {{ errorMessage }}
            </v-alert>
        </v-col>
        <v-card-title>
          <span class="headline">Create New Tag</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Title" v-model="title" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-col cols="8">
                    <v-select
                    v-model="color"
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
                <v-col cols="6" v-bind:style="{backgroundColor:color.hex}">
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { TagForm } from "@/forms/Tag";
import { tagsModule } from "@/store";

export default {
  data: () => ({
    dialog: false,
    color: {},
    title: '',
    onColorPicker: false,
    showError: false,
    errorMessage: "",
  }),
  created() {
    this.color = this.$tagColors[0]
  },
  validations: {
      title: {
        required
      },
      color: {
        required
      }
  },
  methods: {
    switchColorPicker() {
      this.onColorPicker = !this.onColorPicker;
    },
    clear() {
        this.title=''
        this.color = this.$tagColors[0]
    },
    async submit() {
        this.showError = false;
        this.errorMessage = '';
        // fire
        this.$v.$touch();
        // check invalid
        if (this.$v.$invalid) {
            this.errorMessage = "title, color are required. Please enter anything.";
            this.showError = true;
        } else {
            // do your submit logic here
            const newTag = new TagForm(
                this.title,
                this.color.hex
            );
            const result = await tagsModule.regist(newTag);
            if (!result) {
                this.errorMessage = "Server Error";
                this.showError = true;
                return
            } else {
                this.clear()
                tagsModule.getAll()
                this.dialog = false
                return
            }
        }
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