<template>
    
        <v-hover v-slot="{ hover }">

            <div
                ref="hotspot"
                @click="onSelect(true)"
                @mouseenter="onMouseEnter"
                @mouseleave="onMouseLeave"
                class="hotspot"
                :class="{
                    'hotspot_selected': selected,
                    'hotspot_hidden': !display,
                    'hotspot_hovered': hover
                }"
            >

                <div
                    class="hotspot__lighting"
                    :style="{
                        transform: `rotate(${lightingAngle}deg)`
                    }" />

                <transition name="hostpot-select-animation">

                <div
                    v-if="selected"
                    class="hotspot__wrapper"
                >

                    <div
                        @click="speak"
                        @mouseenter="lightingAngle = 180"
                        class="hotspot__sector"
                    >
                    
                        <v-icon
                            class="hotspot__btn-icon"
                            medium
                            color="#666"
                        >
                        
                            mdi-play
                        
                        </v-icon>
                    
                    </div>

                    <div
                        @click.stop="onSelect(false)"
                        @mouseenter="lightingAngle = 270"
                        class="hotspot__sector"
                        :class="{
                            'hotspot__sector_selected': selected 
                        }"
                    >
                    
                        <v-icon
                            class="hotspot__btn-icon"
                            medium
                            color="#666"
                        >
                        
                            mdi-image
                        
                        </v-icon>

                    </div>

                    <div
                        @click="onSetCurrentInfo(1)"
                        @mouseenter="lightingAngle = 90"
                        class="hotspot__sector hotspot__sector_text"
                        :class="{
                            'hotspot__sector_text_selected': !!currentInfo 
                        }"
                    >
                    
                        <v-icon
                            class="hotspot__btn-icon"
                            medium
                            color="#666"
                        >
                        
                            mdi-text-box-outline
                        
                        </v-icon>

                        

                    </div>

                    <div
                        @click="selected = false"
                        @mouseenter="lightingAngle = 0"
                        class="hotspot__sector hotspot__sector_close"
                    >
                    
                        <v-icon
                            class="hotspot__btn-icon"
                            medium
                            color="#666"
                        >
                        
                            mdi-close
                        
                        </v-icon>
                    
                    </div>

                </div>

                </transition>

                <div class="hotspot__tablet">

                    <div class="hotspot__tablet-container">

                        <img
                            class="hotspot__icon"
                            height="48"
                            src="/church.svg" />

                        <div class="hotspot__tablet-divider" />

                        Церковь

                    </div>

                </div>


                <div class="hotspot__footnote">

                    Церковь Сергия Радонежского

                </div>

                <ImageSlider
                   :width="800"
                   :height="300" />

            </div>

        </v-hover>



        <!-- <Board
            @onconfirm="onSetCurrentInfo"
            class="hotspot__board"
            title="Информация"
            confirm-text="Подробнее"
            :width="400" /> -->


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as THREE from 'three';
import ImageSlider from './layers/imageSlider';
// import Board from '~/components/ui/board';

export default {

    inject: ['scene3D'],


    components: {

        ImageSlider,

        // Board,

    },


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

            play: false,

            vector: null,

            x: 0,

            y: 0,

            selected: false,

            display: false,

            marker: null,

            lightingAngle: 0,



        };

    },


    computed: {

        ...mapGetters({

            currentInfo: 'currentInfo'

        }),

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

            setCurrentInfo: 'setCurrentInfo',

            setStatus: 'controls/setStatus',

            setFreeze: 'controls/setFreeze',

        }),


        speak(text) {
            const message = new SpeechSynthesisUtterance();

            message.lang = "ru-RU";

            message.text = `
            
                    Храм преподобного Сергия Радонежского расположен на Николоямской улице. Эта улица получила своё название по расположенному на ней храму «Николы на Ямах». Ямами в то время называли почтовые станции с местом отдыха ямщиков, постоялыми дворами и конюшнями. В 1595 году Борис Годунов устроил такие почтовые станции на всех московских заставах. Из Рогожской ямской слободы дорога уходила на Владимир и Нижний Новгород, а первой почтовой станцией было село Рогожи (известно с 1389 года, современный Ногинск).

                    В XVII веке район Рогожской слободы активно застраивается, также здесь резко возрастает и плотность населения. Кроме ямской слободы здесь очень компактно были расположены различные ремесленные слободы, у многих из них имелся свой храм. Именно по этой причине буквально напротив храма преподобного Сергия стоит храм святителя Алексия, основанный в начале XVII века.

                    В 1740-х годах, по соседней площади — Рогожская застава, прошла таможенная граница Москвы. В конце XVIII века, после сильнейшей эпидемии чумы в Москве, у Рогожской заставы, за территорией города была организована старообрядческая община. Рогожская старообрядческая община совместно с Преображенской являлись крупнейшими старообрядческими общинами у восточных границ Москвы.

            `;

            window.speechSynthesis.speak(message);
        },


        init() {

            this.vector = new THREE.Vector3(this.sprite.position.x, this.sprite.position.y, this.sprite.position.z);

            const canvas = this.scene3D.renderer.domElement;

            this.vector.project(this.scene3D.camera);

            this.x = this.vector.x * canvas.width / 2 + canvas.width / 2;

            this.y = -this.vector.y * canvas.height / 2 + canvas.height / 2;

            const hotspot = this.$refs.hotspot;

            hotspot.style.top = `${this.y - 150}px`;
            
            hotspot.style.left = `${this.x - 150}px`;

        },

        onSelect(val) {

            this.selected = val;

            const status = this.selected ? 'pause' : 'play';

            this.setStatus(status);
        
            this.setFreeze(this.selected);

            if (!this.selected) {

                this.onSetCurrentInfo(null);

            } 

            // } else {

            //     this.scene3D.camera.lookAt(this.sprite.position.x, this.sprite.position.y, this.sprite.position.z);
            //     // this.scene3D.controls.target.set(0, 0, 0)
            //     // this.scene3D.controls.update();

            //     this.scene3D.controls.target = new THREE.Vector3(this.sprite.position.x / 4.5, this.sprite.position.y / 4.5, this.sprite.position.z / 4.5)
            //     this.scene3D.controls.update();

            //     new this.scene3D.tween.Tween(this.scene3D.camera.rotation)
            //                     .to({ x: 20 * Math.PI / 180, y: 20 * Math.PI / 180, z: 0 }, 750)
            //                     // .onUpdate(function(object) {
            //                     //     self.position.set(object.x, object.y, object.z)
            //                     // })
			// 			        .start();

            // }

        },

        onMouseEnter() {

            if (!this.selected) {

                this.setStatus('pause');

            }

        },

        onMouseLeave() {

            if (!this.selected) {

                this.setStatus('play');

            }

        },

        onSetCurrentInfo(val) {

            if (val === 1) {

                this.setCurrentInfo({

                    image: this.marker.image,

                    text: this.marker.text

                });

            }  else {

                this.setCurrentInfo(null);            

            }

        },

    }


}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
