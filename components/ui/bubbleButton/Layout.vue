<template>
    
    <v-hover v-slot="{ hover }">

        <a
            @click="$emit('click')"
            class="bubble-button"
            :class=" hover ? `bubble-button_hovered` : `` "
            icon
            :style="{
                width: (typeof size === 'number') ? `${size}px` : size,
                height: (typeof size === 'number') ? `${size}px` : size,
                borderRadius: (typeof size === 'number') ? `${size}px` : size
            }"
        >

            <slot></slot>

        </a>

    </v-hover>

</template>

<script>

export default {

    props: {

        size: {

            type: [ String, Number ],

            default: 200

        },

    },

}

</script>

<style lang="sass" src="./styles.sass" scoped></style>
