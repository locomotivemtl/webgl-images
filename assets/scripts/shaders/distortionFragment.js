export default `

    uniform sampler2D texture;
    varying vec2 vUv;

    void main() {

      gl_FragColor = texture2D(texture, vUv);
      // gl_FragColor = vec4(1.0, 0, 0, 1.); // Works; Displays Flat Color

    }
`
