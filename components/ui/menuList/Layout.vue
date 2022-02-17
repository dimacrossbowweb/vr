<template>

    <v-list
        class="menu-list"
        dense
    >

        <v-list-item-group
          v-model="selectedItem"
          class="menu-list__group"
          color="primary"
        >

            <v-list-item
                v-for="(item, i) in items"
                :key="i"
            >

                {{ item.text }}

            </v-list-item>

        </v-list-item-group>

    </v-list>

</template>

<script>
export default {

    props: {

        items: {

            type: Array,

            default: [

                {

                    id: 1,

                    text: 'Просто текст'

                },

                {

                    id: 2,

                    text: 'Просто текст'

                },

                {

                    id: 3,

                    text: 'Просто текст'

                },

            ]

        }

    }

}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
