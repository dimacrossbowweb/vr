import * as THREE from 'three';
import * as threeCSSrenderer from 'three-css3drenderer';
import Vue from 'vue';

console.log('TEST TREE JS OBJ >>>>>');

console.log(threeCSSrenderer);

const THREEx = {

    HtmlMixer: {

        Context: function(rendererWebgl, scene, camera) {
            // update functions
            const updateFcts	= []
            this.update	= function(){
                updateFcts.forEach(function(updateFct){
                    updateFct()
                })
            }
        
            // build cssFactor to workaround bug due to no display 
            let cssFactor	= 1000
            this.cssFactor	= cssFactor
        
            //////////////////////////////////////////////////////////////////////////////////
            //		update renderer
            //////////////////////////////////////////////////////////////////////////////////
        
            const rendererCss	= new threeCSSrenderer.CSS3DRenderer();
            this.rendererCss= rendererCss
        
        
            this.rendererWebgl	= rendererWebgl
        
            //////////////////////////////////////////////////////////////////////////////////
            //		Handle Camera
            //////////////////////////////////////////////////////////////////////////////////

            console.log('CAMERA = ', camera);
        
            const cssCamera	= new THREE.PerspectiveCamera(camera.fov, camera.aspect, camera.near*cssFactor, camera.far*cssFactor);
        
            updateFcts.push(function(){
                cssCamera.quaternion.copy(camera.quaternion)
        
                cssCamera.position
                    .copy(camera.position)
                    .multiplyScalar(cssFactor)
            })
        
            //////////////////////////////////////////////////////////////////////////////////
            //		Comment								//
            //////////////////////////////////////////////////////////////////////////////////
            // create a new scene to hold CSS
            const cssScene = new THREE.Scene();
            this.cssScene= cssScene
            
            //////////////////////////////////////////////////////////////////////////////////
            //		Auto update objects
            //////////////////////////////////////////////////////////////////////////////////
        
            this.autoUpdateObjects	= true
            updateFcts.push(function(){
                if( this.autoUpdateObjects !== true )	return
                cssScene.traverse(function(cssObject){
                    if( cssObject instanceof THREE.Scene === true )	return
                    var mixerPlane	= cssObject.userData.mixerPlane
                    if( mixerPlane === undefined )	return
                    mixerPlane.update()
                })		
            }.bind(this))
        
            //////////////////////////////////////////////////////////////////////////////////
            //		Render cssScene
            //////////////////////////////////////////////////////////////////////////////////
            updateFcts.push(function(delta, now){
                rendererCss.render(cssScene, cssCamera)
            })
        },

        Plane: function(mixerContext, domElement, opts) {
            opts		= opts	|| {}
            opts.elementW	= opts.elementW	!== undefined	? opts.elementW	: 768
            opts.planeW	= opts.planeW !== undefined	? opts.planeW	: 1
            opts.planeH	= opts.planeH !== undefined	? opts.planeH	: 3/4
            opts.object3d	= opts.object3d !== undefined	? opts.object3d	: null
            this.domElement	= domElement

            console.log('opts = ', opts);
        
            // update functions
            const updateFcts	= []
            this.update	= function(){
                updateFcts.forEach(function(updateFct){
                    updateFct()
                })
            }
        
            let planeW	= opts.planeW
            let planeH	= opts.planeH
            if( opts.object3d === null ){
                const planeMaterial   = new THREE.MeshBasicMaterial({
                    opacity	: 0,
                    color	: new THREE.Color('black'),
                    blending: THREE.NoBlending,
                    side	: THREE.DoubleSide,
                })
                const geometry	= new THREE.PlaneGeometry( opts.planeW, opts.planeH )


                console.log('geometry = ', geometry);
                console.log('planeMaterial = ', planeMaterial);

                const object3d	= new THREE.Mesh( geometry, planeMaterial );

                this.object3d	= object3d;
                
                console.log('OBJECT 3D = ', object3d);
            } else {
                const object3d	= opts.object3d;

                this.object3d	= object3d
            }
        
        
            // width of iframe in pixels
            let aspectRatio		= planeH / planeW
            let elementWidth	= opts.elementW;
            let elementHeight	= elementWidth * aspectRatio
        
            this.setDomElement	= function(newDomElement){
                console.log('setDomElement: newDomElement', newDomElement)
                // remove the oldDomElement
                let oldDomElement	= domElement
                if( oldDomElement.parentNode ){
                    oldDomElement.parentNode.removeChild(oldDomElement);
                }
                // update local variables	
                this.domElement		= domElement	= newDomElement
                // update cssObject
                cssObject.element	= domElement
                // reset the size of the domElement
                setDomElementSize()
            }
            function setDomElementSize(){
                domElement.style.width	= elementWidth  + "px";
                domElement.style.height	= elementHeight + "px";
            }
            setDomElementSize()
        
            // create a CSS3DObject to display element
            const cssObject		= new threeCSSrenderer.CSS3DObject( domElement )
            this.cssObject		= cssObject
            cssObject.scale.set(1,1,1)
                .multiplyScalar(mixerContext.cssFactor/(elementWidth/planeW))
        
            // hook cssObhect to mixerPlane
            cssObject.userData.mixerPlane	= this
        
            //////////////////////////////////////////////////////////////////////////////////
            //		hook event so cssObject is attached to cssScene when object3d is added/removed
            //////////////////////////////////////////////////////////////////////////////////
            object3d.addEventListener('added', function(event){
                mixerContext.cssScene.add(cssObject)
            })
            object3d.addEventListener('removed', function(event){
                mixerContext.cssScene.remove(cssObject)
            })
        
            //////////////////////////////////////////////////////////////////////////////////
            //		Comment								//
            //////////////////////////////////////////////////////////////////////////////////
        
            updateFcts.push(function(){
                // get world position
                object3d.updateMatrixWorld();
                const worldMatrix	= object3d.matrixWorld;
        
                // get position/quaternion/scale of object3d
                const position	= new THREE.Vector3()
                const scale	= new THREE.Vector3()
                const quaternion	= new THREE.Quaternion()
                worldMatrix.decompose(position, quaternion, scale)
        
                // handle quaternion
                cssObject.quaternion.copy(quaternion)
        
                // handle position
                cssObject.position
                    .copy(position)
                    .multiplyScalar(mixerContext.cssFactor)
                // handle scale
                let scaleFactor	= elementWidth/(object3d.geometry.parameters.width*scale.x)
                cssObject.scale.set(1,1,1).multiplyScalar(mixerContext.cssFactor/scaleFactor)
            })
        }        

    },

};

Vue.prototype.$THREEx = THREEx;
