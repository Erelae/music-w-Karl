uniform sampler2D uMap;

varying vec2 vUv;

void main(){

  vec4 texture = texture2D(uMap, vUv);

  gl_FragColor = texture;
  // vec4(vUv.x, vUv.y, 1.0, 1.0);
}