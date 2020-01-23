import { module } from 'modujs';
import vertexShader from '../shaders/distortionVertex';
import fragmentShader from '../shaders/distortionFragment';

const CLASS = {
    LOADING: 'is-loading'
}

export default class extends module {
    constructor(m) {
        super(m);

        this.el.classList.add(CLASS.LOADING);

        this.textureSrc = this.getData('texture');
        this.displacementSrc = this.getData('displacement');
        this.gap = this.getData('gap');

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.$canvas = this.$('canvas');

        this.events = {
            // mousemove: 'mousemove',
            // mouseenter: 'mouseenter',
            // mouseleave: 'mouseleave'
        }

        // El and webgl plane BCR
        this.BCR = this.el.getBoundingClientRect();
        this.planeBCR = {
            width: 1,
            height: 1,
            x: 0,
            y: 0
        }

        // Useful booleans
        this.inView = true;
        this.isLoaded = false;
        this.isRenderable = false;

        // Positions
        this.displacementPosition = new THREE.Vector2(-0.5,-0.5);
        this.mouse = new THREE.Vector2(-0.5,-0.5);

        this.values = {
            factor: 0,
            factorAim: this.getData('factor'),
            scale: 1
        }

    }

    init() {

        // Init webgl renderer
        this.renderer = new THREE.WebGLRenderer( { canvas: this.$canvas[0], antialias: true, alpha: true } );
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1));
        this.renderer.setSize(this.BCR.width,this.BCR.height);

        this.initScene();
        this.initCamera();
        this.initLights();
        this.initShape();

        // automatic
        this.isRenderable = true;
        this.tl = new TimelineMax({repeat: -1});
        this.values.factor = this.values.factorAim;
        this.tl.to(this.displacementPosition,2,{
            x:1.5,
            y:1.5,
        });
        this.tl.to(this.displacementPosition,2,{
            x:-0.5,
            y:-0.5,
        });

        this.scrollBind = this.scroll.bind(this);
        document.addEventListener('scroll', this.scrollBind);

        this.resizeBind = this.resize.bind(this);
        window.addEventListener('resize', this.resizeBind);

    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initCamera() {
        this.fov = 75;
        this.camera = new THREE.PerspectiveCamera(this.fov, this.BCR.width / this.BCR.height, 0.1, 3000 );
        this.camera.position.set(0,0,10);
    }

    initLights() {
        this.ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add(this.ambientLight);
    }

    initShape() {

        this.planeGeometry = new THREE.PlaneBufferGeometry(1,1,10,10);

        const uvTransform = new THREE.Matrix3();
        uvTransform.setUvTransform(0,0,1,1,0,0,0);

        const loader = new THREE.TextureLoader();

        let displacementTexture = loader.load(this.displacementSrc, (displacementTexture) => {
            let texture = loader.load(this.textureSrc,(texture) => {
                displacementTexture.minFilter = THREE.LinearFilter;
                texture.minFilter = THREE.LinearFilter;

                this.planeMaterial = new THREE.ShaderMaterial({
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    uniforms: {
                        "displacementTexture" : {
                            value: displacementTexture
                        },
                        "displacement":{
                            value: this.displacementPosition
                        },
                        "texture" : {
                            type: "t",
                            value: texture
                        },
                        "uvTransform": {
                            value: uvTransform
                        },
                        "factor" : {
                            value: 1.0
                        }
                    },
                    defines: {
                        USE_MAP: true
                    }
                });

                this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
                this.BCR = this.el.getBoundingClientRect();
                this.updateSize();

                this.scene.add(this.plane);
                this.isLoaded = true;
                this.el.classList.remove(CLASS.LOADING);

                this.render();
            });
        });

    }

    calculateUnitSize(distance){
        const vFov = this.fov * Math.PI / 180;
        const height = (2 * Math.tan(vFov / 2) * distance);
        const width = height * this.camera.aspect;

        return {
            width,
            height
        }
    }

    updateSize() {
        this.camUnit = this.calculateUnitSize(this.camera.position.z);

        // Set size @update
        this.planeBCR.width = this.camUnit.width - (this.camUnit.width * (this.gap / 100));
        this.planeBCR.height = this.planeBCR.width / this.camera.aspect;

        this.plane.geometry = new THREE.PlaneBufferGeometry(this.planeBCR.width, this.planeBCR.height, 100, 100 );
    }

    mouseenter(e) {
        this.isRenderable = true;
        this.mouse = this.displacementPosition = this.formatPosition({
            x: (e.clientX - this.BCR.left) / this.BCR.width,
            y: (e.clientY - this.BCR.top) / this.BCR.height
        });

        TweenMax.to(this.values,0.6,{
            factor: this.values.factorAim
        });
    }

    mouseleave(e) {
        TweenMax.to(this.values,0.6,{
            factor: 0,
            onComplete: () => {
                this.isRenderable = false;
            }
        });
    }

    mousemove(e) {
        this.mouse.x = (e.clientX - this.BCR.left) / this.BCR.width;
        this.mouse.y = (e.clientY - this.BCR.top) / this.BCR.height;
    }

    formatPosition(position) {
        return {
            x: -(position.x) + 0.5,
            y: position.y - 0.5
        }
    }

    render() {
        this.raf = requestAnimationFrame(()=>this.render());

        if(this.isLoaded && this.isRenderable) {
            this.planeMaterial.uniforms["displacement"].value = this.formatPosition(this.displacementPosition);
            this.planeMaterial.uniforms["factor"].value = this.values.factor;
        }

        this.renderer.render(this.scene,this.camera);
    }

    resize() {
        const newBCR = this.el.getBoundingClientRect()
        if(this.BCR && this.BCR.top == newBCR.top && this.BCR.height == newBCR.height) return
        this.BCR = newBCR

        this.camera.aspect = this.BCR.width / this.BCR.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.BCR.width, this.BCR.height);

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.updateSize();
    }

    scroll() {
        const newBCR = this.el.getBoundingClientRect()
        if(this.BCR && this.BCR.top == newBCR.top && this.BCR.height == newBCR.height) return
        this.BCR = newBCR;

    }

    destroy() {
        super.destroy();
        cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.resizeBind);
        document.removeEventListener('scroll', this.scrollBind);
    }
}
