import _ from 'lodash';

export default {

    SET_LOADING(state, payload) {

        state.loading = payload;

    },

    SET_CURRENT_INFO(state, payload) {

        state.currentInfo = _.cloneDeep(payload);

    },

    SET_LOCATION(state, payload) {

        state.location = _.cloneDeep(payload);

    },

    RESET_ALL(state) {

        state.currentInfo = null;
        
        state.location = null;

    },

};
