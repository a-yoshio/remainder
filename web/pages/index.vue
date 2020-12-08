<template>
  <v-row justify="center" align="center">
    <nuxt-link class="btn btn-outline btn-large btn-info" to="/top">
      Enter
      <span class="ml-2">→</span>
    </nuxt-link>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


export default class IndexPage extends Vue {}
</script>