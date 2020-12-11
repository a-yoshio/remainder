<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="500"
  >
    <v-card-title>Create Remainder</v-card-title>
    <v-col
        cols="d-flex"
      >
        <v-alert
          v-show="submitError"
          dense
          outlined
          type="error"
        >
          date, time, contents are required. Please enter anything.
        </v-alert>
    </v-col>
    <form style="padding: 10px">
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="11"
        sm="5"
      >
        <v-dialog
          ref="dialog"
          v-model="modal2"
          :return-value.sync="time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="time"
            :allowed-minutes="allowedStep"
            class="mt-4"
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="modal2 = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialog.save(time)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
      <v-col
        class="d-flex"
      >
      <v-text-field
        v-model="contents"
        label="Contents"
        :rules="rules"
        hide-details="auto"
      ></v-text-field>
      </v-col>
      <v-col
        class="d-flex"
      >
      <v-select
        v-model="tag"
        :items="tags"
        label="Tag"
        dense
      ></v-select>
      </v-col>
      <v-btn
        class="mr-4"
        @click="submit"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </v-card>
</template>
<script>
import { validateContents } from '@/utils/validation'
import { required } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        time: '12:00',
        // timeStep: '12:00',
        modal: false,
        modal2: false,
        contents: '',
        rules: [
          value => !!value || 'Required.',
          value => (value && value.length <= 30) || 'Max 30 characters',
        ],
        tag: null,
        tags: [
          'プライベート',
          '会社',
          '重要事項'
        ],
        submitError: false,
      }
    },
    validations: {
      date: {
        required
      },
      time: {
        required
      },
      contents: {
        required,
        minLength: 1,
        maxLength: 30
      },
      tag: {
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    computed: {
      contentsErrors () {
        return validateContents(this.$v.contents)
      },
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      allowedHours: v => v % 2,
      allowedMinutes: v => v >= 5 && v <= 55,
      allowedStep: m => m % 5 === 0,
      submit () {
        console.log('submit!')
        this.submitError = false
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
          this.submitError = true
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
        }
        console.log(this.submitStatus)
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    },
  }
</script>