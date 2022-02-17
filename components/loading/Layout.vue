<template>
    
    <v-overlay
        v-if="loading"
        class="loading"
        :opacity="0.9"
    >

        <v-progress-circular
            class="loading__progress"
            indeterminate
            size="128"
        ></v-progress-circular>

    </v-overlay>

</template>

<script>
import { mapGetters } from 'vuex';

export default {

    computed: {

        ...mapGetters({

            loading: 'loading',

        })

    }

}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
