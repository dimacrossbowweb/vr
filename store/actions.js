export default {

    setLoading({ commit }, payload) {

        commit('SET_LOADING', payload);

    },

    setCurrentInfo({ commit }, payload) {

        commit('SET_CURRENT_INFO', payload);

    },

    setLocation({ commit }, payload) {

        commit('SET_LOCATION', payload);

    },

    getStartLocation({ commit, state }) {

        const location = state.locationList.find(item => item.started);

        if (location) {

            commit('SET_LOCATION', location);

        }

    },

    getLocationById({ commit, state }, payload) {

        const location = state.locationList.find(item => item.id === payload.id);

        if (location) {

            commit('SET_LOCATION', location);

            return true;

        }

        return false;

    },

    resetAll({ commit }) {

        commit('RESET_ALL');

    },

    getMarkerByTimeline({ commit, state }, payload) {

        if (payload?.id && payload?.timeline) {

            const marker = state.location.activeMarkers.find(item => item.id === payload.id);

            if (marker) {

                const data = marker.data.find(item => item.timeline === payload.timeline);

                return data;

            }

        }

        return null;

    },

    getMarkerById({ commit, state }, payload) {

        if (payload?.id) {

            const marker = state.location.activeMarkers.find(item => item.id === payload.id);

            if (marker) {

                return marker;

            }

        }

        return null;

    },

};
