<template>

    <div />

</template>

<script>
import * as THREE from 'three';
import { mapGetters, mapActions } from 'vuex';

export default {

    inject: ['scene3D'],


    created() {

        this.init();

    },


    data() {

        return {

            raycaster: null,

            mouse: null,

            selectedObject: null

        };

    },


    methods: {

        ...mapActions({

            setCurrentInfo: 'setCurrentInfo',

            getMarkerById: 'getMarkerById'

        }),

        async onPointerMove( event ) {

			if ( this.selectedObject ) {

				this.selectedObject = null;
			}

			this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			this.raycaster.setFromCamera( this.pointer, this.scene3D.camera );

			const intersects = this.raycaster.intersectObjects( this.scene3D.scene.children );

			if ( intersects.length > 0 ) {

				const res = intersects.filter( function ( res ) {

					return res && res.object;

				} )[ 0 ];

				if ( res && res.object ) {

					this.selectedObject = res.object;
					// this.selectedObject.material.color.set( '#f00' );

                    if (this.selectedObject?.visible && this.selectedObject?.userData.type === 'active-marker') {

                        const marker = await this.getMarkerById({

                            id: this.selectedObject?.userData.id

                        })

                        if (marker?.type === 'link' && marker?.to) {

                            this.$nuxt.$router.replace({ path: `/walk/${marker.to}`});

                        }

                        if (marker?.type === 'info') {

                            this.setCurrentInfo({

                                image: marker.image,

                                text: marker.text

                            });

                        }


                    }

				}

			}

        },


        init() {

            this.raycaster = new THREE.Raycaster();
            
            this.pointer = new THREE.Vector2();

            document.addEventListener( 'mousedown', this.onPointerMove );

        },

    }


}
</script>
