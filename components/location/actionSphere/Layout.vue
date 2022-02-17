<template>
    
    <div class="action-sphere">

        <canvas
            class="action-sphere__scene"
            :class="{
                'action-sphere__scene_freeze': freeze,
            }"
            ref="threeCanvas"
            id="three-canvas" />

        <!-- <template v-if="scene">

            <events />

        </template> -->

        <template v-if="scene">

            <active-markers />

        </template>
            
        <!-- <template v-if="scene">

            <info-board />

        </template> -->

    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Events from './layers/events';
import ActiveMarkers from './layers/activeMarkers';
import InfoBoard from './layers/infoBoard';

export default {


    inject: ['texture'],


    components: {

        Events,

        ActiveMarkers,

        InfoBoard,

    },


    mounted() {

        this.$nextTick(function () {

            this.init();

            this.animate();

        });

    },


    data() {

        return {

            loaded: false,

            scene: null,

            renderer: null,

            camera: null,

            cameraControls: null,

            material: null,

            mesh: null,

            tween: TWEEN,

        };

    },


    provide () {

        const self = this;

        return {

            get scene3D () {

                return self;

            }

        };

    },


    computed: {

        ...mapGetters({

            location: 'location',

            timeline: 'controls/timeline',

            currentInfo: 'currentInfo',

            freeze: 'controls/freeze',

        }),

        activeMarkersList() {

            return this.location?.activeMarkers ? this.location.activeMarkers : [];

        },

    },


    methods: {

        ...mapActions({

            setTimeline: 'controls/setTimeline',

        }),

        init() {

            // создаём сцену
            this.scene = new THREE.Scene();


            // создаем камеру
            this.camera = new THREE.PerspectiveCamera(
                30,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );

            const canvas = document.getElementById('three-canvas');


            // создаем рендер
            this.renderer = new THREE.WebGLRenderer(
                { 

                    canvas: canvas,

                    antialias: true,

                } 
            );
      
            this.renderer.autoClear = false;

            this.renderer.setSize(window.innerWidth, window.innerHeight);

            this.$refs.threeCanvas.replaceWith(this.renderer.domElement);


            // создаем контроллы
            this.controls = new OrbitControls( this.camera, this.renderer.domElement );

            this.controls.enableDamping = true;

            this.controls.enableZoom = false;

            this.controls.autoRotate = true;


            // создаём сферу сцены
            const geometry = new THREE.SphereGeometry( 5, 40, 40);

            // создаём материал для сферы
            this.material = new THREE.MeshBasicMaterial( {map: this.texture , side: THREE.BackSide, toneMapped: false} );
        
            // создаём объект сферы
            this.mesh = new THREE.Mesh( geometry, this.material );

            this.mesh.position.set(0, 0, 0);

            // добавляем на сцену
            this.scene.add( this.mesh );

            // задаем позицию для камеры
            this.camera.position.z = 5;

            this.camera.position.x = 0;

            this.camera.position.y = 0;

        },


        animate() {

            this.renderer.setAnimationLoop( () => {

                    this.material.map = this.texture;
                    this.material.needsUpdate = true;
                    this.mesh.material.map.needsUpdate = true;
                    // this.renderer.clear();   
                    this.renderer.render(this.scene, this.camera);
                    this.tween.update();
                    // this.renderer.clearDepth();   
                    // this.renderer.render(this.sceneControls, this.cameraControls);

            });

            // this.controls.update();
            // this.controls2.update();
        
        },

    }

}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
