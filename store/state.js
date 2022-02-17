import locations from './locations';

export default () => ({

    loading: true,

    control: {

        timeline: 0,

        status: null,

    },

    currentInfo: null,

    location: null,

    locationList: JSON.parse(locations.location)

});
