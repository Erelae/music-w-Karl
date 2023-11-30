import * as THREE from "three";
import AudioController from "../../utils/AudioController";

export default class Board {
  constructor() {
    this.group = new THREE.Group();
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshNormalMaterial();

    this.whiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    this.purpleMaterial = new THREE.MeshBasicMaterial({
      color: 0x8f00ff,
    });

    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const mesh = new THREE.Mesh(this.geometry, this.whiteMaterial);

        mesh.position.set(y, x, 0);

        this.group.add(mesh);
      }
    }
  }

  tick(deltaTime) {}
}
