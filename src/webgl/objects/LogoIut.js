import * as THREE from "three";
import AudioController from "../../utils/AudioController";
import Scene from "../Scene";

export default class LogoIut {
  constructor() {
    this.group = null;
    this.material = new THREE.MeshNormalMaterial();

    Scene.gltfLoader.load("/logo-iut.glb", (gltf) => {
      this.group = gltf.scene;

      this.group.traverse((object) => {
        if (object.type === "Mesh") {
          object.material = this.material;
        }
      });

      this.group.rotation.x = Math.PI / 2;
    });
  }
  tick(deltaTime) {}
}
