export default {

    addSound({ commit }, payload) {

        commit('ADD_SOUND', payload);

    },

    removeSound({ commit }, payload) {

        commit('REMOVE_SOUND', payload);

    },

    editSound({ commit }, payload) {

        commit('EDIT_SOUND', payload);

    },

    play({ commit }, payload) {

        commit('PLAY', payload);

    },

    stop({ commit }, payload) {

        commit('STOP', payload);

    },

};
