<template>
    
    <div
        ref="hotspot"
        class="hotspot"
        :class="{
            'hotspot_selected': selected,
            'hotspot_hidden': !display
        }"
    >
        <a
            @click="onLink"
            class="hotspot__marker" />

    </div>

</template>

<script>
import { mapActions } from 'vuex';
import * as THREE from 'three';

export default {

    inject: ['scene3D'],


    props: {

        uuid: {

            type: Number,

            default: -1

        },

        sprite: {

            type: Object,

            default: function() {

                return null;

            }

        }

    },


    data() {

        return {

            vector: null,

            x: 0,

            y: 0,

            selected: false,

            display: false,

            marker: null,

        };

    },


    async created() {

        this.marker = await this.getMarkerById({

            id: this.uuid

        });

    },


    mounted() {

        this.$nextTick(() => {

            this.init();

        });

    },

    watch: {

        sprite: {
            
            handler: function(val) {

                this.init();

                this.display = val?.visible;

            },

            deep: true

        } 

    },


    methods: {

        ...mapActions({

            getMarkerById: 'getMarkerById',

        }),

        init() {

            this.vector = new THREE.Vector3(this.sprite.position.x, this.sprite.position.y, this.sprite.position.z);

            const canvas = this.scene3D.renderer.domElement;

            this.vector.project(this.scene3D.camera);

            // this.vector.x = Math.round((this.vector.x / 2) * (canvas.width / window.devicePixelRatio));

            // this.vector.y = Math.round((this.vector.y / 2) * (canvas.height / window.devicePixelRatio));

            this.x = this.vector.x * canvas.width / 2 + canvas.width / 2;

            this.y = -this.vector.y * canvas.height / 2 + canvas.height / 2;

            const hotspot = this.$refs.hotspot;

            hotspot.style.top = `${this.y}px`;
            
            hotspot.style.left = `${this.x}px`;

        },


        onLink() {

            this.$nuxt.$router.replace({ path: `/walk/${this.marker.to}`});

        },

    }


}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
