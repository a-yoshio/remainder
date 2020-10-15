<template>
    <v-list-item class="remainder">
        <v-radio/>
        <div class="remainder-contents">
            {{ $refs.remainder.contents }}
        </div>
        <div class="remainder-date">
            {{ $refs.remainder.date }}
        </div>
    </v-list-item>
</template>
