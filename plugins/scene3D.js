import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Scene3D {

    scene = null;

    cameras = [];

    renderer = null;

    controls = [];

    constructor() {

        this.scene = new THREE.Scene();

    }

    createCamera(data) {

        const camera = new THREE.PerspectiveCamera(data);

        const payload = {
        
            id: (new Date()).getTime(),

            camera
        };

        this.cameras.push(payload);

    }

    removeCameraById(data) {

    }

    createRenderer(data) {

        this.renderer = new THREE.WebGLRenderer( data );

    }


};
