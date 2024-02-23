<script>
import Dashboard from '../components/Dashboard.vue'
import * as Three from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { AMFLoader } from 'three/examples/jsm/loaders/AMFLoader.js';
import { GCodeLoader } from 'three/examples/jsm/loaders/GCodeLoader.js';
import { KMZLoader } from 'three/examples/jsm/loaders/KMZLoader.js';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls'

export default {
  data() {
    return {
      object: []
    };
  },
  mounted() {
    this.init();
    this.loadObj();
    this.animate();
  },
  methods: {
    init () {
      
      this.scene = new Three.Scene()
      this.scene.background = new Three.Color(0x191919);
      this.scene.add(new Three.AmbientLight(0x999999))
      // 光源設置
      // 環境光      
      this.ambient = new Three.AmbientLight(0xffffff, 0.3);
      this.scene.add(this.ambient);
      // 平行光
      this.light = new Three.DirectionalLight(0xffffff, 2.5)
      this.light.position.set(50, 200, 100)
      this.light.position.multiplyScalar(0.3)
      this.scene.add(this.light)
      // 初始化相机
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      // this.camera.position.set(0, 0, 30)
      this.camera.position.set(-4.5, 0, -1.3)
      // 渲染
      this.renderer = new Three.WebGLRenderer({ antialias: true })
      this.renderer.setClearColor(0x3e7bff)
      this.renderer.setPixelRatio(window.devicePixelRatio) // 为了兼容高清屏幕
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      const container = document.getElementById('model-container')
      container.appendChild(this.renderer.domElement)

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.set(0, 0, 0)
      // this.controls.enableRotate = false;  // 禁用旋转
      // this.controls.enableZoom = false;    // 禁用缩放
      // this.controls.enablePan = false;     // 禁用平移

      this.clock = new Three.Clock()
     
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.render()
    },
    render () {
      const time = this.clock.getDelta();
      if (this.mixer) {
          this.mixer.update(time);
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera)
    },
    // 外部模型加载函数
    loadObj () {
      // for (let i = 0; i < 14; i++) {
        new GLTFLoader().load(`/public/models/240118_2rd.gltf`, mesh => {

          console.log(mesh)

          mesh.scene.scale.set(0.5, 0.5, 0.5);
          // // 相对X轴旋转弧度(为了让模型加载为合适的姿势)
          // mesh.scene.rotation.x = -0.5 * Math.PI;
          // mesh.scene.position.z = 0.8;

          const obj = mesh.scene

      
          obj.traverse( function ( child ) {
              if ( child.isMesh ) {
                  console.log('hi')
                  child.castShadow = true;
                  child.receiveShadow = true;



                  
              }
            });

          //AnimationMixer是场景中特定对象的动画播放器。当场景中的多个对象独立动画时，可以为每个对象使用一个AnimationMixer
          this.mixer = obj.mixer = new Three.AnimationMixer(obj);

          //mixer.clipAction 返回一个可以控制动画的AnimationAction对象  参数需要一个AnimationClip 对象
          //AnimationAction.setDuration 设置一个循环所需要的时间，当前设置了一秒
          //告诉AnimationAction启动该动作
          // const action = this.mixer.clipAction(mesh.animations[0]);
          // action.play();

          const clips = mesh.animations;
          clips.forEach( ( clip ) => {
            this.mixer.clipAction( clip ).play();
          } );
         
          this.scene.add(obj)
          
        })
      // }
    },
    initDragControls () {
      let transformControls = new TransformControls(this.camera, this.renderer.domElement)
      this.scene.add(transformControls)
      var dragControls = new DragControls(this.object, this.camera, this.renderer.domElement)
      dragControls.addEventListener('hoveron', event => {
        transformControls.attach(event.object)
      })
      dragControls.addEventListener('dragstart', event => {
        this.controls.enabled = false
      })
      dragControls.addEventListener('dragend', event => {
        this.controls.enabled = true
      })
    }


  }
};
</script>

<style>
#model-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>


<template>
  <main>
    <div id="model-container"></div>
  </main>
</template>
