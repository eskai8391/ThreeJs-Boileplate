import '../main.scss'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

export default class Sketch {
  constructor(options) {
    // Variables
    this.time = 0
    this.container = options.dom
    this.scene = new THREE.Scene()

    // Window sizes
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    // Camera
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.1, 10)
    this.camera.position.z = 1

    // Render
    this.renderer = new THREE.WebGL1Renderer({ antialias: true })
    this.renderer.setSize(this.width, this.height)
    this.container.appendChild(this.renderer.domElement)

    // Orbit Controls
    this.control = new OrbitControls(this.camera, this.renderer.domElement)

    // Methods
    this.resize()
    this.setUpResize()
    this.addObjects()
    this.render()
  }

  // Event listener to resize
  setUpResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  // Method to resize the canvas
  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    this.renderer.setSize(this.width, this.height)

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  // Method to add objects to the canvas
  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry(0.5, 0.5, 50, 50)
    this.material = new THREE.MeshBasicMaterial()

    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      fragmentShader: fragment,
      vertexShader: vertex,
      wireframe: true
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  // Render mehtod to show in the canvas
  render() {
    this.time += 0.01

    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render.bind(this))
  }
}

new Sketch({
  dom: document.querySelector('.container')
})