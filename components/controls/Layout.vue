<template>
    
    <div class="controls">

        <!-- <div class="controls__up-panel">

            <div class="controls__wrapper">

                <Menu />

                <v-btn
                    icon
                    plain
                >

                    <v-icon large>

                        mdi-menu

                    </v-icon>

                </v-btn>
                
            </div>

        </div> -->

        <div class="controls__panel">

            <transition name="bottom-panel-animation">

                <div
                    v-if="showBottomPanel"
                    class="controls__wrapper"
                >

                    <TimeCircle
                        @input="onTimeChange"
                        @onseek="onTimeSeekStart"
                        @ondrop="onTimeSeekStop"
                        class="controls__timecircle"
                        :current-value="timeline"
                        :max="totalTime" />

                    <BubbleButton
                        @click="onPressPlayBtn"      
                        class="controls__btn"
                        :class="{
                            'controls__btn_play': status === 'pause',
                            'controls__btn_pause': status === 'play'
                        }"
                        :size="100" />

                    <div class="controls__empty" />

                </div>

            </transition>

        </div>

    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Menu from './layers/menu';
import BubbleButton from '~/components/ui/bubbleButton';
import TimeCircle from '~/components/ui/timeCircle';

export default {


    mounted() {

        document.body.addEventListener('keydown', this.onKeydown);

        document.body.addEventListener('keyup', this.onKeyup);

    },


    beforeDestroy() {


        document.body.removeEventListener('keydown', this.onKeydown);

        document.body.removeEventListener('keyup', this.onKeyup);


    },


    components: {

        Menu,

        BubbleButton,

        TimeCircle,

    },


    data() {

        return {

            showBottomPanel: true,

        };

    },


    computed: {

        ...mapGetters({

            timeline: 'controls/timeline',

            totalTime: 'controls/totalTime',

            status: 'controls/status',

            playbackRate: 'controls/playbackRate',

        })

    },


    methods: {

        ...mapActions({

            setStatus: 'controls/setStatus',

            setTimeline: 'controls/setTimeline',

            setPlaybackRate: 'controls/setPlaybackRate',

        }),
        

        onPressPlayBtn() {

            const status = this.status === 'play' ? 'pause' : 'play';

            this.setStatus(status);

        },

        onTimeChange(value) {

            this.setTimeline(value);

        },

        onTimeSeekStart() {

            this.setStatus('pause');

        },

        onTimeSeekStop() {

            this.setStatus('play');

        },

        async onKeydown(e) {

            switch (e.keyCode) {

                case 32:

                    if (this.status === 'play') {

                        this.setStatus('pause');

                    }

                    else if (this.status === 'pause') {

                        this.setStatus('play');

                    }

                break;

                case 38:

                    if (this.playbackRate !== 5) {

                        this.setPlaybackRate(5);

                    }

                break;

            }

        },


        onKeyup(e) {

            switch (e.keyCode) {

                case 38:

                    if (this.playbackRate !== 1) {

                        this.setPlaybackRate(1);

                    }

                break;

            }

        }

    }

}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
