<template>
    
    <v-container
        class="pa-0"
        fluid
        fill-height
    >

        <client-only>

            <MapboxGl
                :accessToken="accessToken"
                :mapStyle="mapStyle"

                :center="mapInitialState.center"
                :bearing="mapInitialState.bearing"
                :pitch="mapInitialState.pitch"
                :zoom="mapInitialState.zoom"

                :interactive="mapInitialState.interactive"
                :antialias="mapInitialState.antialias"

                @load="onMapLoaded"

            >

            </MapboxGl>
            
        </client-only>

    </v-container>

</template>

<script>
import {
	Map as MapboxGl,
	MarkerUi as MapMarker,
	PopupUi as MapPopup,
} from 'vue-mapbox-gl-client';

export default {


    components: {

        MapboxGl,

    },

    
    data() {

        return {

            accessToken: 'pk.eyJ1IjoiZGltYXZvbGdhIiwiYSI6ImNrcmc3Zmo1NjAwbWgzMW81bzg4eXB4eHoifQ.IIJTJyzJE9XT_omgSoKB-Q', 

            mapStyle: 'mapbox://styles/dimavolga/ckrg7fo8u0nz717o50t17u4pu',

            mapInitialState: {

                center: { lng: 37.617348, lat: 54.193122 }, // center
                bearing: 0,
                pitch: 0,
                zoom: 10,
                antialias: true, 

            },

            loading: true,
            sidebar: false,
            markers: true,

            coordinates: [ 37.60096525546851, 55.74773899536402 ],

        };

    },


    methods: {

        onMapLoaded ( event ) {

            this.map = event.map;

            this.map.once( 'idle', () => {
                this.$emit( 'loaded' );
                this.loading = false;
            } )

            // this.map.on( 'zoomend', e => {

            //     if ( this.map.getZoom() >= 16 ) {

            //         this.markers = false

            //     } else {

            //         this.markers = true

            //     }
            // } )
        }, // onMapLoaded

    }

}
</script>