<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Welcome OriTools!
        </v-list-item-title>
        <form>
          <v-text-field
            v-model="mail_address"
            :error-messages="mailAddressError"
            :counter="255"
            label="mail_address"
            required
            @input="$v.mail_address.$touch()"
            @blur="$v.mail_address.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            :error-messages="passwordError"
            @click:append="show1 = !show1"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-btn class="mr-4" @click="submit"> submit </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </form>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
import { required, maxLength, email } from "vuelidate/lib/validators";
import { authModule } from "@/store";
export default {
    data() {
        return {
            show1: false,
            mail_address:'',
            password: ''
        }
    },
    validations: {
      mail_address: { required },
      password: { required },
    },
    computed: {
        mailAddressError(){
            const errors = []
            if (!this.$v.mail_address.$dirty) return errors
            !this.$v.mail_address.required && errors.push('Mail Address is required.')
            return errors
        },
        passwordError(){
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required.')
            return errors
        },
    },
    methods: {
      async submit () {
        this.$v.$touch()
        await authModule.login({mailAddress: this.mail_address, password: this.password})
        if (!this.$route.query.pageName || this.$route.query.pageName == 'index'
         || this.$route.query.pageName == 'login') {
            this.$router.push('/remainder')
        } else {
            const nextPage = this.$route.query.pageName.toString().replace('-', '/')
            console.log('>>>>> next: ', nextPage)
            this.$router.push(nextPage)
        }
        
      },
      clear () {
        this.$v.$reset()
        this.mail_address = ''
        this.password = ''
      },
    },
}
</script>