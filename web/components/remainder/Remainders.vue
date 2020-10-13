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
            <v-list-item class="remainder">
                <v-radio/>
                <div class="remainder-contents">
                    花子と会う
                </div>
                <div class="remainder-date">
                    2020/12/01 18:00
                </div>
            </v-list-item>
            <v-list-item class="remainder">
                <v-radio/>
                <div class="remainder-contents">
                    山田とご飯
                </div>
                <div class="remainder-date">
                    2020/12/03 19:00
                </div>
            </v-list-item>
            <v-list-item class="remainder">
                <v-radio/>
                <div class="remainder-contents">
                    はなとあつ森
                </div>
                <div class="remainder-item">
                    2020/12/04 20:00
                </div>
            </v-list-item>
            <v-list-item class="remainder">
                <v-radio/>
                <div class="remainder-contents">
                    あおいと会議
                </div>
                <div class="remainder-date">
                    2020/12/05 11:00
                </div>
            </v-list-item>
            <v-list-item class="remainder">
                <v-radio/>
                <div class="remainder-contents">
                    上北と女子会
                </div>
                <div class="remainder-date">
                    2020/12/09 20:00
                </div>
            </v-list-item>            
        </v-list>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
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
