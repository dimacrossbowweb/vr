export default {

    SET_TIMELINE(state, payload) {

        state.timeline = payload;

    },

    SET_TOTAL_TIME(state, payload) {

        state.totalTime = payload;

    },

    SET_PLAYBACK_RATE(state, payload) {

        state.playbackRate = payload;

    },

    SET_STATUS(state, payload) {

        state.status = payload;

    },

    SET_FREEZE(state, payload) {

        state.freeze = payload;

    },

};
