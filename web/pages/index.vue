<template>
  <v-row justify="center" align="center">
    <remainders/>
  </v-row>
</template>

<script>
import Remainders from '~/components/remainder/Remainders.vue'
import Axios from 'axios'

Axios.defaults.baseURL = process.env.REMAINDER_API_URL

export default {
  components: {
    Remainders
  }
}
</script>
