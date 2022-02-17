<template>
    
    <v-layout>

        <location v-if="location" />

        <controls />

        <info-sidebar />

    </v-layout>

</template>

<script>
import Location from '~/components/location';
import Controls from '~/components/controls';
import InfoSidebar from '~/components/infoSidebar';

import { mapGetters, mapActions } from 'vuex';

export default {


    async fetch() {

        this.resetAll();

        this.setLoading(true);

        const res = await this.getLocationById({

            id: Number(this.$route.params.location_id)

        });

        this.setLoading(false);

        if (!res) {

            this.$nuxt.$router.replace({ path: '/'});

        }

    },

    
    components: {

        Location,

        Controls,

        InfoSidebar,

    },


    computed: {

        ...mapGetters({

            loading: 'loading',

            location: 'location',

        }),

    },


    methods: {

        ...mapActions({

            getLocationById: 'getLocationById',

            setLoading: 'setLoading',

            resetAll: 'resetAll',

        }),

    }

}
</script>
