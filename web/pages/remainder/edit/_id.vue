<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-card-title>Create Remainder</v-card-title>
    <v-col cols="d-flex">
      <v-alert v-show="showError" dense outlined type="error">
        {{ errorMessage }}
      </v-alert>
    </v-col>
    <form style="padding: 10px">
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="mDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }" @click="date = mDate">
            <v-text-field
              v-model="mDate"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="11" sm="5">
        <v-dialog
          ref="dialog"
          v-model="modal2"
          :return-value.sync="mTime"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="mTime"
              label="time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="mTime"
            :allowed-minutes="allowedStep"
            class="mt-4"
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal2 = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(mTime)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
      <v-col class="d-flex">
        <v-text-field
          v-model="mContents"
          label="Contents"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="tag"
          :items="tags"
          item-text="title"
          item-value="id"
          label="Tags"
          return-object
          dense
        >
        </v-select>
      </v-col>
      <v-switch
        v-model="mComplete"
        inset
        :label="`Complete : ${mComplete}`"
      ></v-switch>
      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn class="mr-4" @click="clear"> clear </v-btn>
      <v-btn to="/remainder" nuxt> cancel </v-btn>
    </form>
  </v-card>
</template>
<script>
import { validateContents } from "@/utils/validation";
import { required } from "vuelidate/lib/validators";
import { remainderModule } from "@/store";
import { parse } from "date-fns";
import { RemainderForm } from "@/forms/Remainder";

export default {
  data() {
    return {
      date: '',
      menu: false,
      modal: false,
      modal2: false,
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length <= 30) || "Max 30 characters",
      ],
      tag: {id: 1, title: "家"},
      tags: [
        { id: 1, title: "家" },
        { id: 2, title: "会社" },
        { id: 3, title: "遊び" },
      ],
      showError: false,
      errorMessage: "",
    };
  },
  validations: {
    mDate: {
      required,
    },
    mTime: {
      required,
    },
    mContents: {
      required,
      minLength: 1,
      maxLength: 30,
    },
    tag: {},
  },
  async asyncData({params}) {
    await remainderModule.get(params.id)
  },
  middleware: 'authenticated',
  computed: {
    contentsErrors() {
      return validateContents(this.$v.mContents);
    },
    mTime: {
      // getter 関数
      get: function () {
        return remainderModule.time
      },
      // setter 関数
      set: function (newValue) {
        remainderModule.setTime(newValue)
      }
    },
    mDate: {
      get: function () {
        return remainderModule.date
      },
      set: function (newValue) {
        remainderModule.setDate(newValue)
      },
    }, 
    mContents: {
      get: function () {
        return remainderModule.contents
      },
      set: function (newValue) {
        remainderModule.setContents(newValue)
      },
    },
    mComplete: {
      get: function () {
        return remainderModule.complete
      },
      set: function (newValue) {
        remainderModule.setComplete(newValue)
      },
    },
  },
  watch: {
    date(val) {
      remainderModule.setDate(this.date)
    }
  },
  methods: {
    allowedHours: (v) => v % 2,
    allowedMinutes: (v) => v >= 5 && v <= 55,
    allowedStep: (m) => m % 5 === 0,
    async submit() {
      this.showError = false;
      this.errorMessage = "";
      // fire
      this.$v.$touch();
      // check invalid
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.errorMessage =
          "date, time, contents are required. Please enter anything.";
        this.showError = true;
      } else {
        // do your submit logic here
        this.submitStatus = "PENDING";
        const result = await remainderModule.update();
        if (!result) {
          this.errorMessage = "Server Error";
          this.showError = true;
        }
        this.$router.push("/remainder");
      }
    },
    clear() {
      this.$v.$reset();
      this.date = new Date().toISOString().substr(0, 10);
      (this.time = "12:00"), (this.contents = "");
      this.tag = {};
    },
  },
};
</script>