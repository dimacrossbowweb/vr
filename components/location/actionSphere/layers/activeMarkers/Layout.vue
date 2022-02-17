<template>

    <div class="active-markers">

        <component
            v-for="item in items"
            :key="item.id"
            :uuid="item.id"
            :is="item.type === 'link' ? 'LinkMarker' : 'InfoMarker'" />

    </div>

</template>

<script>
import { mapGetters } from 'vuex';
import LinkMarker from './linkMarker';
import InfoMarker from './infoMarker';

export default {

    inject: ['scene3D'],


    components: {

        LinkMarker,

        InfoMarker,

    },


    computed: {

        ...mapGetters({

            location: 'location',

        }),

        items() {

            return this.location?.activeMarkers ? this.location.activeMarkers : [];

        }

    }

};
</script>
