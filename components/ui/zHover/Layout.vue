<template>
    
    <div
        ref="zHover"
        class="z-hover"
    >

        <div 
            ref="zHoverWrapper"
            class="z-hover__wrapper"
        >

            <slot></slot>

        </div>

        <div
            ref="zHoverActive"
            class="z-hover__active"
            :class="{
                'z-hover__active_locked': locked
            }"
            @click="$emit('click')"
        ></div>

    </div>


</template>

<script>

export default {


    props: {

        locked: {

            type: Boolean,

            default: false

        }

    },


    mounted() {


        this.$refs.zHoverActive.addEventListener('mousemove', this.onMouseMove);

        this.$refs.zHoverActive.addEventListener('mouseleave', this.onMouseLeave);

    },


    beforeDestroy() {

        this.$refs.zHoverActive.removeEventListener('mousemove', this.onMouseMove);

        this.$refs.zHoverActive.removeEventListener('mouseleave', this.onMouseLeave);

    },



    methods: {

        onMouseMove( e ) {

            const event = e || window.event;

            // if ( event.target != this.$refs.zHoverActive ) {

            //     return;

            // }
            
            const x = event.target.offsetX == undefined ? event.layerX : event.target.offsetX;

            const y = event.target.offsetY == undefined ? event.layerY : event.target.offsetY;


            const w = this.$refs.zHoverActive.offsetWidth;

            const h = this.$refs.zHoverActive.offsetHeight;
        
            this.$refs.zHoverWrapper.style.transition = 'none';

            this.$refs.zHoverWrapper.style.transform = `perspective(9000px) rotateX(${-10 * (y - h / 2) / (h / 2)}deg) rotateY(${10 * (x - w / 2) / (w / 2)}deg)`

            this.$emit('input', {

                y: -10 * (y - h / 2) / (h / 2),

                x: 10 * (x - w / 2) / (w / 2)

            })

        },

        onMouseLeave() {

            this.$refs.zHoverWrapper.style.transition = 'transform 1s';

            this.$refs.zHoverWrapper.style.transform = `none`;

        },

    }

}

</script>

<style lang="sass" src="./styles.sass" scoped></style>
