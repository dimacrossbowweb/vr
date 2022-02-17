import _ from 'lodash';

export default {

    ADD_SOUND(state, payload) {

        if (payload?.name) {

            if (state.soundBuffer.find(item => item.name === payload.name)) {

                return;

            }

            const data = Object.assign(
                {

                    name: '',

                    src: '',

                    status: 'stop',

                    loop: false,

                }, payload,{});

            state.soundBuffer.push(_.cloneDeep(data));

        }

    },

    REMOVE_SOUND(state, payload) {

        if (payload?.name) {

            const soundIndex = state.soundBuffer.findIndex(item => item.name === payload.name);

            if (soundIndex >= 0) {

                state.soundBuffer.splice(soundIndex, 1);

            }

        }

    },

    EDIT_SOUND(state, payload) {

        if (payload?.name) {

            const soundBuffer = _.cloneDeep(state.soundBuffer);

            const soundIndex = soundBuffer.findIndex(item => item.name === payload.name);

            soundBuffer[soundIndex] = Object.assign(soundBuffer[soundIndex], payload, {});

            state.soundBuffer = _.cloneDeep(soundBuffer);

        }

    },

    PLAY(state, payload) {

        const soundIndex = state.soundBuffer.findIndex(item => item.name === payload);

        if (soundIndex >= 0) {

            const soundBuffer = _.cloneDeep(state.soundBuffer);

            soundBuffer[soundIndex].status = 'play';

            state.soundBuffer = _.cloneDeep(soundBuffer);

        }

    }

};
