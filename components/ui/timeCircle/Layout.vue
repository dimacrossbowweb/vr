<template>
    
    <div
        ref="timeCircle"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mouseleave="onMouseUp"
        class="time-circle"
        :style="{
            width: typeof radius === 'number' ? `${radius * 2}px` : `calc(${radius} * 2)`,
            height: typeof radius === 'number' ? `${radius * 2}px` : `calc(${radius} * 2)`,
        }"
    >

        <svg 
            class="v-indicator__value"
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            :viewBox="`0 0 ${radius * 2} ${radius * 2}`" 
            :width="radius * 2" 
            :height="radius * 2"
        >

            <circle
                :cx="radius" 
                :cy="radius"
                :r="radius - 8"
                :stroke="color"
                stroke-width="8"
                :stroke-dasharray="`${indicatorLength}, ${roundLength - indicatorLength}`"
                :stroke-dashoffset="6"
                :drop-shadow="`0 0 8px ${color}`"
                :transform="`rotate(-90 ${radius} ${radius})`"
                fill="none" />   

        </svg>

    </div>

</template>

<script>
export default {

    
    created() {

        this.angle = this.currentValue / this.max * 360;

    },


    props: {

        radius: {

            type: [Number, String],

            default: 100

        },

        currentValue: {

            type: Number,

            default: 0

        },

        max: {

            type: Number,

            default: 100,

            validator: function(val) {

                return val > 0;

            }

        },

        color: {

            type: String,

            default: '#ffffff66'

        }

    },


    data() {

        return {

            x: 0,

            y: 0,

            angle: 0,

        };

    },


    computed: {

        roundLength() {

            return Math.round( Math.PI * this.radius * 2 );

        },

        indicatorLength() {

            return this.angle / 360 * this.roundLength;

        },

    },


    watch: {

        currentValue: function(val) {

            this.angle = val / this.max * 360;

        }

    },


    methods: {

        onMouseDown() {

            const timeCircle = this.$refs.timeCircle;

            timeCircle.addEventListener('mousemove', this.onMouseMove);

            this.$emit('onseek');

        },

        onMouseUp() {

            const timeCircle = this.$refs.timeCircle;

            timeCircle.removeEventListener('mousemove', this.onMouseMove);

            this.$emit('ondrop');

        },

        onMouseMove(e) {

            const event = e || window.event;

            const timeCircle = this.$refs.timeCircle.getBoundingClientRect();
            
            this.x = event.clientX - timeCircle.left;

            this.y = event.clientY - timeCircle.top;

            this.angle = 360 - Math.round(Math.atan2(this.x - this.radius, this.y - this.radius) * 180 / Math.PI + 180);

            this.$emit('input', this.angle / 360 * this.max);

        }

    }

}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
