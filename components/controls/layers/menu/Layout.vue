<template>
    
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >

        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            :style="{pointerEvents: 'auto'}"
          >
            Open Dialog
          </v-btn>
        </template>

        <v-card>

            <div class="wrapper">

                <Board
                    title="Настройки"
                    :width="500"
                >

                    <MenuList />

                </Board>

            </div>

        </v-card>

    </v-dialog> 

</template>

<script>
import Board from '~/components/ui/board';
import MenuList from '~/components/ui/menuList';

export default {


    components: {

        Board,

        MenuList,

    },


    data() {

        return {

            dialog: false,

        };

    },


}
</script>

<style lang="sass" src="./styles.sass" scoped></style>
