export default `
    uniform sampler2D displacementTexture;
    uniform float factor;
    uniform vec2 displacement;
    varying vec2 displacementUv;

    #include <common>
    #include <uv_pars_vertex>

    void main() {
        #include <uv_vertex>

        displacementUv = uv + displacement;

        vec3 newPosition = vec3(position.x, position.y , position.z + (texture2D(displacementTexture, displacementUv).r * factor));

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);

        // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );;
    }
`
