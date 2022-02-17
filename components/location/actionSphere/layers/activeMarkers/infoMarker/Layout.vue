<template>

    <div>

        <Hotspot
            :uuid="uuid"
            :sprite="sprite" />

    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as THREE from 'three';
import Hotspot from './hotspot';

export default {

    inject: ['scene3D'],


    components: {

        Hotspot,

    },


    props: {

        uuid: {

            type: Number,

            default: -1

        },

    },


    data() {

        return {

            sprite: null,

        };

    },


    computed: {

        ...mapGetters({

            timeline: 'controls/timeline',

            location: 'location',

        }),

    },


    watch: {

        timeline: function() {

            const data = this.getMarkerByTimeline({

                id: this.uuid,

                timeline: this.timeline

            });

            if (data) {

                new this.scene3D.tween.Tween(this.sprite.position)
                                .to({ x: data.x, y: data.y, z: data.z }, 750)
                                // .onUpdate(function(object) {
                                //     self.position.set(object.x, object.y, object.z)
                                // })
						        .start();

                this.sprite.visible = true;

            } else {

                this.sprite.visible = false;

            }

        },

    },


    mounted() {

        this.init();

    },


    beforeDestroy() {

        this.destroyMarker();

    },


    methods: {

        ...mapActions({

            // getMarkerByTimeline: 'getMarkerByTimeline',

        }),


        getMarkerByTimeline(payload) {

            if (payload?.id && payload?.timeline) {

                const marker = this.location.activeMarkers.find(item => item.id === payload.id);

                if (marker) {

                    const data = marker.data.find(item => Math.round(item.timeline) === Math.round(payload.timeline));

                    return data;

                }

            }

            return null;

        },


        init() {

            this.createMarker();

        },


        createMarker() {

            const textureLoader = new THREE.TextureLoader();

            const map = textureLoader.load( '/active-marker.svg' );

            const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: false } );

            this.sprite = new THREE.Sprite( material );

            this.sprite.scale.set( 0.3, 0.3, 0.3 );

            this.sprite.userData = Object.assign(this.sprite.userData, {
                id: this.uuid,
                type: 'active-marker'
            }, {});

            this.scene3D.scene.add(this.sprite);

            this.sprite.visible = false;

        },


        destroyMarker() {

            this.scene3D.scene.remove(this.sprite);

        }

    }

};
</script>
