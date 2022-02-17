<template>
    
    <div class="sound-box">

        <audio
            v-for="item in soundBuffer"
            :key="item.id"
            :src="item.src"
            :loop="item.loop"
        >
        </audio>      

    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {

    computed: {

        ...mapGetters({

            soundBuffer: 'soundFx/soundBuffer',

        }),

    },

}
</script>