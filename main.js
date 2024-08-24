import * as THREE from 'three';

import { Scene, WebGLRenderer, PerspectiveCamera } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";




const w = window.innerWidth;
const h = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(75, w / h, 0.1, 100);
const renderer = new WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 10;
controls.maxDistance = 60;
camera.position.set(30 * Math.cos(Math.PI / 6), 30 * Math.sin(Math.PI / 6), 40);

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

import {
    Group,
    Color,
    Points,
    Vector3,
    TextureLoader,
    PointsMaterial,
    BufferGeometry,
    AdditiveBlending,
    Float32BufferAttribute,
  } from "three";
  
  export class Starfield {
    group;
    loader;
    animate;
  
    constructor({ numStars = 1000 } = {}) {
      this.numStars = numStars;
  
      this.group = new Group();
      this.loader = new TextureLoader();
  
      this.createStarfield();
  
      this.animate = this.createAnimateFunction();
      this.animate();
    }
  
    createStarfield() {
      let col;
      const verts = [];
      const colors = [];
      const positions = [];
  
      for (let i = 0; i < this.numStars; i += 1) {
        let p = this.getRandomSpherePoint();
        const { pos, hue } = p;
        positions.push(p);
        col = new Color().setHSL(hue, 0.2, Math.random());
        verts.push(pos.x, pos.y, pos.z);
        colors.push(col.r, col.g, col.b);
      }
  
      const geo = new BufferGeometry();
      geo.setAttribute("position", new Float32BufferAttribute(verts, 3));
      geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
      const mat = new PointsMaterial({
        size: 0.2,
        alphaTest: 0.5,
        transparent: true,
        vertexColors: true,
        blending: AdditiveBlending,
        map: this.loader.load("/solar-system-threejs/assets/circle.png"),
      });
      const points = new Points(geo, mat);
      this.group.add(points);
    }
  
    getRandomSpherePoint() {
      const radius = Math.random() * 25 + 25;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      let x = radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi) * Math.sin(theta);
      let z = radius * Math.cos(phi);
  
      return {
        pos: new Vector3(x, y, z),
        hue: 0.6,
        minDist: radius,
      };
    }
  
    createAnimateFunction() {
      return () => {
        requestAnimationFrame(this.animate);
        this.group.rotation.y += 0.00005;
      };
    }
  
    getStarfield() {
      return this.group;
    }
  }

  const starfield = new Starfield().getStarfield();
  scene.add(starfield);


const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();