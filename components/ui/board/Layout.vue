<template>

    <div
        class="board"
        :style="{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
            maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        }"
    >

        <div class="board__title">

            {{ title }}

        </div>

        <div
            ref="boardBody"
            class="board__body"
        >

            <perfect-scrollbar
                class="board__scrollbar"
                :style="{
                    height: '200px'
                    // height: typeof scrollContainerHeight === 'number' ? `${scrollContainerHeight}px` : scrollContainerHeight, 
                }"
            >
                <slot>Информация</slot>

            </perfect-scrollbar>

        </div>

        <div class="board__actions">

            <Btn
                @click="$emit('onconfirm')"
                class="board__btn"
            >
            
                {{ confirmText }}
                
            </Btn>

            <Btn
                v-if="type === 'prompt'"
                @click="$emit('oncancel')"
                class="board__btn"
            >
            
                {{ cancelText }}
                
            </Btn>

        </div>

    </div>

</template>

<script>
import Btn from '~/components/ui/btn';
// import PerfectScrollbar from 'vue2-perfect-scrollbar';

export default {

    components: {

        Btn,

        // PerfectScrollbar,

    },


    mounted() {

        const boardBody = this.$refs.boardBody;

        if (boardBody?.offsetHeight) {

            this.scrollContainerHeight = boardBody?.offsetHeight;

        }

    },


    props: {

        title: {

            type: String,

            default: 'Церковь Сергия Радонежского'

        },

        width: {

            type: [Number, String],

            default: 'auto'

        },

        height: {

            type: [Number, String],

            default: 'auto'

        },

        maxWidth: {

            type: [Number, String],

            default: 'auto'

        },

        maxHeight: {

            type: [Number, String],

            default: 'auto'

        },

        type: {

            type: String,

            default: 'alert'

        },

        confirmText: {

            type: String,

            default: 'Применить'

        },

        cancelText: {

            type: String,

            default: 'Отмена'

        }

    },


    data() {

        return {

            scrollContainerHeight: 'auto',

        };

    },


}

</script>

<style lang="sass" src="./styles.sass" scoped></style>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>
