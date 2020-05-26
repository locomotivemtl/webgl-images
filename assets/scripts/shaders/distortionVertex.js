export default `
    precision highp float;
    precision highp int;
    attribute vec2 uv;
    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;

    uniform sampler2D displacementTexture;
    uniform float factor;
    uniform float scale;
    uniform vec2 displacement;
    varying vec2 displacementUv;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
        
        // vNormal = normalize(normalMatrix * normal);
        
        displacementUv = uv + displacement;
        vUv = uv;

        vec3 newPosition = vec3(position.x, position.y , position.z + (texture2D(displacementTexture, displacementUv).r * factor * 0.1));

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);
    }
`
