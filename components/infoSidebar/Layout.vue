<template>

    <transition name="info-side-bar">

        <v-layout
            v-if="currentInfo"
            class="info-sidebar"
            :class="{
                'info-sidebar_left': direction === 'left',
                'info-sidebar_right': direction === 'right'
            }"
            :style="{
                left: direction === 'left' ? '100px' : 'auto',
                right: direction === 'right' ? '100px' : 'auto'
            }"
        >
        
            <Board
                @onconfirm="setCurrentInfo(null)"
                class="info-sidebar__board"
                title="Важная информация"
                confirm-text="Закрыть"
                :max-width="500"
                max-height="80%"
            >

            </Board>

        </v-layout>

    </transition>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '~/components/ui/board';

export default {


    components: {

        Board,

    },


    props: {

        direction: {

            type: String,

            default: 'left',

            validation: function(val) {

                return ['left', 'right'].indexOf(val) !== -1;

            }

        },

    },


    data() {

        return {

            display: false,

        };

    },


    computed: {

        ...mapGetters({

            currentInfo: 'currentInfo',

        })

    },


    watch: {

        currentInfo: function(val) {

            if (val) {

                this.display = true;

            } else {

                this.display = false;

            }

        },

    },


    methods: {

        ...mapActions({

            setCurrentInfo: 'setCurrentInfo',

        }),

        hide() {

            this.display = false;

            this.setCurrentInfo(null);

        },

    }

}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
