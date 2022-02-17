<template>

    <div
        ref="location"
        class="location"
    >

        <action-sphere
            ref="actionSphere"
            v-if="texture" />

    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as THREE from 'three';
import ActionSphere from './actionSphere';

export default {

    mounted() {

        this.$nextTick(function () {

            this.init();

            // this.setStatus('play');

            // this.$refs.video.play();

        });

    },


    beforeDestroy() {

        if (this.video) {

            this.video.removeEventListener('timeupdate', this.onTimelineChange);

        }

    },


    components: {

        ActionSphere,

    },


    data() {

        return {

            texture: null,

            video: null,

            loaded: false,

        };

    },


    computed: {

        ...mapGetters({

            timeline: 'controls/timeline',

            location: 'location',

            status: 'controls/status',

            playbackRate: 'controls/playbackRate',

        }),

    },


    watch: {

        timeline: function(val) {

            if (this.status === 'pause') {

                this.video.currentTime = val;

            }

        },

        status: function(val) {

            if (val === 'play') {

                this.video.addEventListener('timeupdate', this.onTimelineChange);

                this.video.play();

            }

            if (val === 'pause') {

                this.video.removeEventListener('timeupdate', this.onTimelineChange);

                this.video.pause();

            }

        },

        playbackRate: function(val) {

            this.video.playbackRate = val;

        },

    },


    provide () {

        const self = this;

        return {

            get texture () {

                return self.texture;

            }

        };

    },


    methods: {

        ...mapActions({

            setTimeline: 'controls/setTimeline',

            setTotalTime: 'controls/setTotalTime',

            setStatus: 'controls/setStatus',

        }),

        init() {

            if (this.location?.type === 'image') {

                this.createImageTexture();

            }

            if (this.location?.type === 'video') {

                this.createVideoTexture();

            }

        },


        createImageTexture() {

            const loader = new THREE.TextureLoader();
            
            this.texture = loader.load(location?.url);

            this.loaded = true;

        },


        createVideoTexture() {

            this.video = document.createElement('video');

            const location = this.$refs.location;

            location.insertBefore(this.video, location.firstChild);

            this.video.src = this.location?.url;

            this.video.autoplay = true;

            this.video.muted = true;

            this.video.width = 800;

            this.video.height = 600;

            this.video.preload = 'auto'

            this.video.noControls = true;

            this.video.playbackRate = this.playbackRate;

            this.video.style.display = 'none';

            // this.video.addEventListener('timeupdate', this.onTimelineChange);

            this.video.addEventListener('loadedmetadata', this.onVideoLoaded);

            this.texture = new THREE.VideoTexture( this.video );

            this.texture.minFilter = THREE.LinearFilter;
            
            this.texture.magFilter = THREE.LinearFilter;

            this.texture.needsUpdate = true;
            
            this.texture.format = THREE.RGBFormat;

            const self = this;

            this.texture.update = () => {

                self.texture.needsUpdate = true;

            }

        },

        onVideoLoaded() {

            this.setTotalTime(this.video.duration);

            this.setStatus('play');

        },

        onTimelineChange() {

            if (this.video) {

                // console.log(this.video.currentTime);

                this.setTimeline(this.video.currentTime);

            }

        },

    }

}

</script>
