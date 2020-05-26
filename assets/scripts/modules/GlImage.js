import { module } from 'modujs';
import vertexShader from '../shaders/distortionVertex';
import fragmentShader from '../shaders/distortionFragment';
import {Renderer, Camera, Transform, Texture, Vec2, Plane, Program, Mesh } from 'ogl';

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

        this.events = {
            mousemove: {
                wrap:  'mousemove'
            },
            mouseenter: {
                wrap:  'mouseenter'
            },
            mouseleave: {
                wrap:  'mouseleave'
            }
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
        this.displacementPosition = new Vec2(-0.5,-0.5);
        this.mouse = new Vec2(-0.5,-0.5);

        this.settings = {
            factor: 0,
            factorAim: this.getData('factor'),
            scale: 0
        }

    }

    init() {
        
        this.$wrap = this.$('wrap')[0];

        // Init ogl renderer
        this.renderer = new Renderer({dpr: 2, antialias: true, alpha: true});
        this.renderer.setSize(this.BCR.width, this.BCR.height);

        this.gl = this.renderer.gl;
        this.$wrap.appendChild(this.gl.canvas);

        this.initScene();
        this.initCamera();
        this.initShape();

        this.scrollBind = this.scroll.bind(this);
        document.addEventListener('scroll', this.scrollBind);

        this.resizeBind = this.resize.bind(this);
        window.addEventListener('resize', this.resizeBind);
    }

    initScene() {
        this.scene = new Transform();
    }

    initCamera() {
        this.fov = 75;
        this.camera = new Camera(this.glElement, {fov: this.fov});
        this.camera.position.set(0,0,1);
    }

    initShape() {
        
        this.geometry = new Plane(this.gl,{width: 1, height: 1, widthSegments: 10, heightSegments: 10});

        const texture = new Texture(this.gl, {minFilter: this.gl.LINEAR});

        const displacementTexture = new Texture(this.gl, {minFilter: this.gl.LINEAR});
        const displacementImg = new Image();
        displacementImg.src = this.displacementSrc;

        displacementImg.onload = () => {
            displacementTexture.image = displacementImg;

            const img = new Image();
            img.src = this.textureSrc;
            img.onload = () => {
                texture.image = img;

                this.program = new Program(this.gl, {
                    vertex: vertexShader,
                    fragment: fragmentShader,
                    uniforms: {
                        displacementTexture : { value: displacementTexture },
                        displacement:{ value: this.displacementPosition },
                        texture : { value: texture },
                        factor: { value: this.settings.factor }
                    }
                });
        
                this.mesh = new Mesh(this.gl, {geometry: this.geometry, program: this.program});
        
                this.updateSize();
                this.isLoaded = true;
                this.el.classList.remove(CLASS.LOADING);
                this.render();
                
            };
        };
        

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

        this.geometry = new Plane(this.gl,{width: this.planeBCR.width, height: this.planeBCR.height, widthSegments: 100, heightSegments: 100});
        this.mesh.geometry = this.geometry;

        this.gl.canvas.style.width = `${this.BCR.width}px`;
        this.gl.canvas.style.height = `${this.BCR.height}px`;
    }

    mouseenter(e) {
        this.isRenderable = true;

        this.formatPosition({
            x: (e.clientX - this.BCR.left) / this.BCR.width,
            y: (e.clientY - this.BCR.top) / this.BCR.height,
            obj: this.mouse
        });

        this.formatPosition({
            x: (e.clientX - this.BCR.left) / this.BCR.width,
            y: (e.clientY - this.BCR.top) / this.BCR.height,
            obj: this.displacementPosition
        });

        gsap.to(this.settings,0.6,{
            factor: this.settings.factorAim
        });

    }

    mouseleave(e) {
        gsap.to(this.settings,0.6,{
            factor: 0,
            onComplete: () => {
                this.isRenderable = false;
            }
        });

    }

    mousemove(e) {
        this.formatPosition({
            x: (e.clientX - this.BCR.left) / this.BCR.width,
            y: (e.clientY - this.BCR.top) / this.BCR.height,
            obj: this.mouse
        });

        this.formatPosition({
            x: (e.clientX - this.BCR.left) / this.BCR.width,
            y: (e.clientY - this.BCR.top) / this.BCR.height,
            obj: this.displacementPosition
        });

    }

    formatPosition(param) {
        param.obj.x = -(param.x) + 0.5;
        param.obj.y = param.y - 0.5
    }

    render(t) {
        this.raf = requestAnimationFrame((t)=>this.render(t));

        if(this.isLoaded && this.isRenderable) {

            this.program.uniforms.displacement.value = this.displacementPosition;
            this.program.uniforms.factor.value = this.settings.factor;
        }
        
        this.renderer.render({scene: this.mesh, camera: this.camera});
    }

    resize() {
        const newBCR = this.el.getBoundingClientRect()
        if(this.BCR && this.BCR.top == newBCR.top && this.BCR.height == newBCR.height) return
        this.BCR = newBCR

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.renderer.setSize(this.BCR.width, this.BCR.height);
        this.camera.perspective({aspect: this.gl.canvas.width / this.gl.canvas.height});
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
