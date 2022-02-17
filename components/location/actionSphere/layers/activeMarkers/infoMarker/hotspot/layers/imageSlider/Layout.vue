<template>
    
    <div
        class="image-slider"
        :style="{
            width: typeof width === 'number' ? `${width}px` : width,
        }"
    >

        <div
            ref="imageSliderContainer"
            class="image-slider__container"
        >

            <div
                ref="imageSliderGalery"
                class="image-slider__galery"
                :style="{
                    marginLeft: `${posX}px`
                }"
            >

                <div
                    v-for="(item, i) in items"
                    :key="i"
                    class="image-slider__slide"
                    :style="{
                        backgroundImage: 'url(/screen.jpg)',
                        minWidth: typeof height === 'number' ? `${height}px` : height,
                        height: typeof height === 'number' ? `${height}px` : height,
                    }" />

            </div>

        </div>

            <div
                @mouseenter="onSlideLeft"
                @mouseleave="onStopSlide"
                class="image-slider__active-zone image-slider__active-zone_left"
                :class="{
                    'image-slider__icon_hidden': !showLeft
                }"
            >

                <v-icon
                    class="image-slider__icon"
                    color="#ffffff"
                    :size="100"
                >

                    mdi-chevron-left

                </v-icon>

            </div>

            <div
                @mouseenter="onSlideRight"
                @mouseleave="onStopSlide"
                class="image-slider__active-zone image-slider__active-zone_right"
            >

                <v-icon
                    class="image-slider__icon"
                    :class="{
                        'image-slider__icon_hidden': !showRight
                    }"
                    color="#ffffff"
                    :size="100"
                >

                    mdi-chevron-right

                </v-icon>

            </div>

    </div>

</template>

<script>
export default {


    props: {

        items: {

            type: Array,

            default: function() {
                
                return [1, 2, 3, 4, 5, 6, 7];

            }

        },

        width: {

            type: [Number, String],

            default: 'auto'

        },

        height: {

            type: [Number, String],

            default: 'auto'

        }

    },


    data() {

        return {

            posX: 0,

            animCtx: null,

            showLeft: true,

            showRight: true,

        };

    },


    watch: {

        posX: function(val) {

            const containerWidth = this.$refs.imageSliderContainer.offsetWidth;

            const galeryWidth = this.$refs.imageSliderGalery.offsetWidth;

            this.showRight = val > containerWidth - galeryWidth;

            this.showLeft = val < 0;

            console.log(val);

        }

    },


    methods: {

        onSlideLeft() {

            clearInterval(this.animCtx);

            this.animCtx = setInterval(() => {

                if ((this.posX + 10) >= 0) {

                    this.posX = 0;

                    clearInterval(this.animCtx);

                    return;

                }

                this.posX += 10;

            }, 10);

        },

        onSlideRight() {

            const containerWidth = this.$refs.imageSliderContainer.offsetWidth;

            const galeryWidth = this.$refs.imageSliderGalery.offsetWidth;

            clearInterval(this.animCtx);

            this.animCtx = setInterval(() => {

                if ((this.posX - 10) <= (containerWidth - galeryWidth)) {

                    this.posX = containerWidth - galeryWidth;

                    clearInterval(this.animCtx);

                    return;

                }

                this.posX -= 10;

            }, 10);

        },

        onStopSlide() {

            clearInterval(this.animCtx);

        },

    }

}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
