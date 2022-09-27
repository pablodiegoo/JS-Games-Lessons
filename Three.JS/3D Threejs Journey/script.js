import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from '../../../three/examples/jsm/controls/OrbitControls.js'

// Cursor
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = event.clientY / sizes.height - 0.5
  // console.log(cursor.x+" : "+cursor.y)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement){
    if (canvas.requestFullscreen){
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    document.exitFullscreen()
  }
})

// Scene
const scene = new THREE.Scene()

// Light
const light = new THREE.AmbientLight(0x606060)
const dLight = new THREE.DirectionalLight(0xffffff, 0.5)
light.add(dLight);
scene.add(light)

// Object
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
)
cube1.position.set(-4, 0, 0)

const cube2 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
)
cube2.position.set(0, 0, 0)

const cube3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.set(4, 0, 0)

group.add(cube3)
group.add(cube2)
group.add(cube1)


// Axes helper
const axesHelter = new THREE.AxesHelper(2)
scene.add(axesHelter)

const aspRatio = sizes.width / sizes.height
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const camera = new THREE.OrthographicCamera(-4*aspRatio,4*aspRatio,4,-4,0.1,100)
camera.position.set(0, 0, 8)
camera.lookAt(group.position)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

// gsap.to(group.position, {duration: 1,delay: 1,x:2})
// gsap.to(group.position, {duration: 1,delay: 2,x:0})

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2)*5
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2)*5
  // camera.position.y = (cursor.y * Math.PI * 2)
  camera.lookAt(group.position)
  // group.rotation.x = elapsedTime
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()