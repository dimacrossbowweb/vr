<template>
    
    <div :style="{

        position: 'fixed',

        zIndex: '10000',

        left: '0',

        top: '0'

    }">

        <Board
            :title="currentInfo"
            id="board" />

    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as THREE from 'three';
import Board from '~/components/ui/board';

export default {

    inject: ['scene3D'],


    components: {

        Board,

    },

    created() {

        console.log('THREEX');
        console.log(this.$THREEx);

    },


    mounted() {

        // this.init();

    },


    data() {

        return {

            mixerContext: null,

            mixerPlane: null,

        };

    },


    computed: {

        ...mapGetters({

            currentInfo: 'currentInfo'

        })

    },

    methods: {

        init() {

            const board = document.getElementById('board');

            console.log('this.scene3D.camera = ', this.scene3D.camera);

            this.mixerContext = new this.$THREEx.HtmlMixer.Context(this.scene3D.renderer, this.scene3D.scene, this.scene3D.camera);
            

            // this.mixerContext.update(delta, now);

            this.mixerPlane	= new this.$THREEx.HtmlMixer.Plane(this.mixerContext, board);

            console.log('this.mixerPlane = ', this.mixerPlane);

            this.scene3D.scene.add(this.mixerPlane.object3d);

        }

    }

}
</script>
