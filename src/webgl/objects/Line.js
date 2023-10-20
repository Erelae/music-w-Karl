import * as THREE from "three";
import AudioController from "../../utils/AudioController";

export default class Line {
  constructor() {
    this.colors = [
      0xff0000, // rouge
      0xff7f00, // orange
      0xffff00, // jaune
      0x00ff00, // vert
      0x0000ff, // bleu
      0x4b0082, // indigo
      0x8f00ff, // violet
    ];
    this.group = new THREE.Group();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshNormalMaterial();

    this.material = [];
    this.colors.forEach((color) => {
      const material = new THREE.MeshBasicMaterial({
        color: color,
      });
      this.material.push(material);
    });

    let n = -1;
    // on arrondit à l'entier le plus proche
    const MODULO = Math.round(256 / this.colors.length);
    this.SPACING = 2;

    // this.mesh = new THREE.Mesh(this.geometry, this.material);

    for (let i = 0; i < 256; i++) {
      if (i % MODULO === 0) {
        n++;
        console.log(n);
      }

      const mesh = new THREE.Mesh(this.geometry, this.material[n]);

      mesh.position.x = i * this.SPACING;
      //   console.log(i + i * 0.5);

      this.group.add(mesh);
    }

    this.group.position.set((-256 * this.SPACING) / 2, 0, 0);
  }

  tick() {
    for (let i = 0; i < this.group.children.length; i++) {
      this.group.children[i].scale.y = AudioController.fdata[i];
    }
  }
}
