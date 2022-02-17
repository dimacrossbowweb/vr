export default {

    setTimeline({ commit }, payload) {

        commit('SET_TIMELINE', payload);

    },

    setTotalTime({ commit }, payload) {

        commit('SET_TOTAL_TIME', payload);

    },

    setPlaybackRate({ commit }, payload) {

        commit('SET_PLAYBACK_RATE', payload);

    },

    setStatus({ commit }, payload) {

        commit('SET_STATUS', payload);

    },

    setFreeze({ commit }, payload) {

        commit('SET_FREEZE', payload);

    },

};
