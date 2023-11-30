import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import LogoIut from "./objects/LogoIut";
import Board from "./objects/Board";
import Cube from "./objects/Cube";
import Cover from "./objects/Cover";
import Line from "./objects/Line";
import pane from "../utils/Pane";

class SCENE {
  setup(canvas) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = canvas;

    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupStats();
    this.setupGLTFLoader();
    this.setupTextureLoader();

    this.addObjects();
    this.addEvents();
    this.setupControls();
    this.setupPostProcessing();
  }

  setupGLTFLoader() {
    this.gltfLoader = new GLTFLoader();
  }

  setupTextureLoader() {
    this.textureLoader = new THREE.TextureLoader();
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  setupPostProcessing() {
    this.BLOOM_PARAMS = {
      strength: 1,
      radius: 0,
      treshold: 0,
    };
    // replaces the renderer
    this.composer = new EffectComposer(this.renderer);

    //
    this.scenePass = new RenderPass(this.scene, this.camera);

    // add passes to the composer

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width / this.height),
      this.BLOOM_PARAMS.strength,
      this.BLOOM_PARAMS.radius,
      this.BLOOM_PARAMS.treshold
    );

    this.composer.addPass(this.scenePass);
    this.composer.addPass(this.bloomPass);

    this.postProcessFolder = pane.addFolder({
      title: "Post process",
    });

    this.postProcessFolder
      .addBinding(this.BLOOM_PARAMS, "strength", {
        min: 0,
        max: 1,
        step: 0.01,
        label: "Force de l'effet",
      })
      .on("change", (e) => {
        console.log(e.value);
        this.bloomPass.strength = e.value;
      });

    this.postProcessFolder
      .addBinding(this.BLOOM_PARAMS, "radius", {
        min: 0,
        max: 1,
        step: 0.01,
        label: "Aura",
      })
      .on("change", (e) => {
        console.log(e.value);
        this.bloomPass.radius = e.value;
      });
    this.postProcessFolder
      .addBinding(this.BLOOM_PARAMS, "treshold", {
        min: 0,
        max: 1,
        step: 0.01,
        label: "Seuil de l'effet",
      })
      .on("change", (e) => {
        console.log(e.value);
        this.bloomPass.threshold = e.value;
      });
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      28,
      this.width / this.height,
      0.1,
      10000
    );
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
    this.cube = new Cube();
    this.line = new Line();
    this.logoIut = new LogoIut();
    this.board = new Board();
    this.cover = new Cover();

    this.selectedObject = this.cover;
    this.scene.add(this.selectedObject.group);
  }

  changeVisualizer(index) {
    this.scene.remove(this.selectedObject.group);
    switch (index) {
      case 0:
        this.selectedObject = this.cube;
        this.camera.position.z = 12;
        this.bloomPass.strength = 1;
        break;
      case 1:
        this.selectedObject = this.line;
        this.camera.position.z = 1000;
        this.bloomPass.strength = 0.5;
        break;

      case 2:
        this.selectedObject = this.logoIut;
        this.camera.position.z = 10;
        this.bloomPass.strength = 0.5;
        break;

      case 3:
        this.selectedObject = this.board;
        this.camera.position.z = 50;
        break;

      case 4:
        this.selectedObject = this.cover;
        this.camera.position.z = 500;
        this.bloomPass.strength = 0.6;
        break;

      default:
        break;
    }
    this.scene.add(this.selectedObject.group);
  }

  tick = (time, deltaTime, frame) => {
    this.stats.begin();
    this.selectedObject.tick(deltaTime);
    this.composer.render(this.scene, this.camera);

    this.stats.end();
    // console.log("allo");
  };
}

const Scene = new SCENE();
export default Scene;
