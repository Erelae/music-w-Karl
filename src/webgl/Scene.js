import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import Stats from "three/examples/jsm/libs/stats.module.js";
// import Cube from "./objects/Cube";
import Line from "./objects/Line";

class SCENE {
  setup(canvas) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = canvas;

    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupStats();
    this.addObjects();
    this.addEvents();
    this.setupControls();
    this.setupPostProcessing();
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  setupPostProcessing() {
    // replaces the renderer
    this.composer = new EffectComposer(this.renderer);

    //
    this.scenePass = new RenderPass(this.scene, this.camera);

    // add passes to the composer

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width / this.height),
      1,
      0,
      0
    );

    this.composer.addPass(this.scenePass);
    this.composer.addPass(this.bloomPass);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      28,
      this.width / this.height,
      0.1,
      10000
    );
    this.camera.position.z = 1000;
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: false,
      // alpha: true
    });

    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  addEvents() {
    // gsap.ticker.add((time, deltaTime, frame) =>
    //   this.tick(time, deltaTime, frame)
    // );

    gsap.ticker.add(this.tick);
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    // console.log("resize executed");
  }

  addObjects() {
    // this.cube = new Cube();
    this.line = new Line();

    this.scene.add(this.line.group);

    // this.cube2 = new Cube(); un autre cube

    // this.scene.add(this.cube.mesh);
  }

  tick = () => {
    this.stats.begin();
    // this.cube.tick();
    this.line.tick();
    this.composer.render(this.scene, this.camera);

    this.stats.end();
    // console.log("allo");
  };
}

const Scene = new SCENE();
export default Scene;
