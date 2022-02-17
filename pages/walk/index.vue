<template>
    
    <v-layout>

        <nuxt-child />

        <loading />

    </v-layout>

</template>

<script>
import Loading from '~/components/loading';

export default {

    components: {

        Loading,

    },

}
</script>