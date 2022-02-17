<template>

    <v-container
        class="pa-0"
        fluid
        fill-height
    >

        <z-hover
            v-model="hover"
            :locked="$vuetify.breakpoint.smAndDown"
        >

            <v-container
                class="screen d-flex flex-column justify-center align-center pa-0"
                fluid
                fill-height
                :style="{
                    width: '100vw',
                    height: '100vh',
                    transform: 'scale(1.2)'
                }"
            >

            
                <div class="screen__logo-wrapper font-weight-thin mb-4 pa-5">

                    <span
                        class="screen__logo text-h4 text-md-h2"
                        :style="{
                            color: '#ffffffdd',
                            textShadow: `${-2 * Math.round(hover.x)}px ${2 * Math.round(hover.y)}px 5px rgba(0, 0, 0, 0.4)`
                        }"
                    >
                    
                        ТУЛА
                        
                    </span>
                        
                </div>

                <div
                    class="screen__direction" />
                        
                <div class="screen__subheading">
                            
                    <span
                        class="screen__title text-h5 text-md-h4"
                        :style="{
                            color: '#ffffffdd',
                            textShadow: `${-2 * Math.round(hover.x)}px ${2 * Math.round(hover.y)}px 5px rgba(0, 0, 0, 0.7)`
                        }"
                    >
                    
                        Виртуальный тур
                        
                    </span>
                        
                </div>

            </v-container>

        </z-hover>

        <div
            class="d-flex justify-center"
            :style="{
                position: 'fixed',
                bottom: '50px',
                width: '100%',
                pointerEvents: 'none'
            }"
        >

            <div class="screen__start-btn">

                <BubbleButton
                    @click="onPressStart"
                    :style="{
                        pointerEvents: 'auto'
                    }"
                    :size="$vuetify.breakpoint.mdAndUp ? 180 : 100"
                >
                    
                    <span class="text-body-1 text-md-h5">Начать</span>
                        
                </BubbleButton>

            </div>

        </div>

    </v-container>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BubbleButton from '~/components/ui/bubbleButton';
import ZHover from '~/components/ui/zHover';

export default {

    async fetch() {

        await this.getStartLocation();

    },

    components: {

        BubbleButton,

        ZHover,

    },

    data() {

        return {

            hover: {

                x: 0,

                y: 0

            }

        };

    },

    computed: {

        ...mapGetters({
            
            location: 'location',

        })

    },


    methods: {

        ...mapActions({

            getStartLocation: 'getStartLocation',

        }),

        onPressStart() {

            if (this.location?.id) {

                this.$nuxt.$router.replace({ path: `/walk/${this.location.id}`});

            }

        },

    }

}
</script>

<style lang="sass" scoped>

    html

        overflow: hidden!important
    
    .screen
        
        background:

            image: url(/screen.jpg)

            position: center

            size: cover

            repeat: no-repeat

        overflow: hidden


        &__logo-wrapper

            position: relative

            overflow: hidden


        &__logo

            opacity: 0.9

            animation: logo-anim 1s ease-in-out

            -webkit-animation: logo-anim 1s ease-in-out

            animation-delay: 1s

            animation-fill-mode: forwards

            transform: translateY(100px)

            @keyframes logo-anim

                0% 
                    transform: translateY(100px)
                
                100%

                    transform: translateY(0)


        &__direction

            opacity: 0

            width: 50%

            border-top: 1px solid rgba(255, 255, 255, 0.9)

            margin-bottom: 20px

            animation: direction-anim 1s ease-in-out

            -webkit-animation: direction-anim 1s ease-in-out

            animation-delay: .5s

            animation-fill-mode: forwards


            @keyframes direction-anim

                0% 
                    transform: scale(0)
                    opacity: 1
                
                100%

                    transform: scale(1)
                    opacity: 1

        &__subheading

            position: relative

            font:

                family: Arial, Tahoma

                weight: lighter

            text-transform: uppercase

            opacity: 0.9

            letter-spacing: 5px

            overflow: hidden

        &__title

            display: inline-block

            position: relative

            animation: title-anim 1s ease-in-out

            -webkit-animation: title-anim 1s ease-in-out

            animation-delay: 1s

            animation-fill-mode: forwards

            transform: translateY(-100px)

            @keyframes title-anim

                0% 
                    transform: translateY(-100px)
                
                100%

                    transform: translateY(0)

        &__start-btn

            display: inline-block

            animation: start-anim 1s ease-in-out

            -webkit-animation: start-anim 1s ease-in-out

            animation-delay: 2s

            animation-fill-mode: forwards

            transform: translateY(100px) scale(0.7)

            opacity: 0

            @keyframes start-anim

                0% 
                    transform: translateY(100px) scale(0.7)

                    opacity: 0
                
                100%

                    transform: translateY(0) scale(1)

                    opacity: 1

</style>
