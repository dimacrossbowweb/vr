<template>
    
    <a
        @click="$emit('click')"
        class="btn"
    >
    
        <slot></slot>
    
    </a>

</template>

<script>

export default {
}

</script>

<style lang="sass" src="./styles.sass" scoped></style>
