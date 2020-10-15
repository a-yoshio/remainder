<template>
    <div class="Remainders">
        <div class="Header">
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary">
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
                @click="this.delete">
                <v-icon dark>
                    mdi-delete
                </v-icon>
            </v-btn>
        </div>
        <v-list light class="remainder-list">
            <remainder v-for="remainder in remainders" :key="remainder.id" :ref="remainder"/>
        </v-list>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Remainder from './Remainder.vue'

export default Vue.extend({
    components: {
        Remainder
    },
    created() {
        this.$store.dispatch('remainder/get_all', 1);
    },
    computed: {
        remainders() {
            return this.$store.state.remainder.list
        }
    },
    methods: {
        delete() {
            alert('削除してよろしいですか？');
        },
    },
})
</script>
<style lang="scss">
$header-height: 50px;
.Remainders {
    background-color: #e6e6fa;
    display: inline-block;
    position: relative;
    height: 80vh;
    width: 50vw;
    filter: drop-shadow(0px 0px 20px rgba(230,230, 230,0.5));
    border-radius: 5px;
  .Header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    text-align: right;
    height: $header-height;
    padding: 5px;
    z-index: 2;
  }
  .remainder-list {
    position: relative;
    top: $header-height;
    background-color: #e6e6fa;
    .remainder {
        border-bottom: solid 1px #d3d3e6;
        justify-content: space-between;
    }
  }
}
</style>
