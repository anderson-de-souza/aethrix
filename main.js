
import Vector from '@math/vector.js'
import Polygon from '@geometry/polygon.js'
import View from '@rendering/view.js'
import ViewRenderer from '@rendering/viewrenderer.js'
import radians from '@math/radians'
import Aethrix from '@engine/aethrix'
import Input from '@input/input.js'
import AABB from '@collision/aabb'
import SAT from '@collision/sat'
import Looper from '@loop/looper'

const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const context = canvas.getContext('2d')

const vr = new ViewRenderer(context)

/* ENGINE */

const aethrix = new Aethrix({ mouseTarget: canvas })

aethrix.mapKey('ArrowLeft', () => {
    console.log('go left')
}).mapKey('ArrowUp', () => {
    console.log('go top')
}).mapKey('ArrowRight', () => {
    console.log('go right')
}).mapKey('ArrowDown', () => {
    console.log('go bottom')
})

aethrix.mapEvent('click', () => {
    alert(`${Input.getMousePointerPositionX()}, ${Input.getMousePointerPositionY()}: ${Input.isKeyPressed('ArrowLeft')}`)
})

/* POLYGON TEST */

const p0 = new Polygon(50, 3)

p0.width = 100
p0.height = 100
p0.rotationAngle = radians(45)

p0.setCenter(new Vector(
    canvas.width / 2,
    canvas.height / 2
))

p0.updateGeometry()

vr.addView(new View(context, p0))

console.log(p0.vertices)

/* AABB & SAT TEST */

function testCollision(a, b) {

    console.group('AABB')

    console.log(
        'Dimensions:',
        AABB.isCollidingByDimensions(a, b)
    )

    console.log(
        'Dimensions Overlap:',
        AABB.getOverlapByDimensions(a, b)
    )

    console.log(
        'Bounding Box:',
        AABB.isCollidingByBoundingBox(a, b)
    )

    console.log(
        'Bounding Box Overlap:',
        AABB.getOverlapByBoundingBox(a, b)
    )

    console.groupEnd()

    console.group('SAT')

    console.log('Colliding:', SAT.isColliding(a, b))
    console.log('MTV:', SAT.getMTV(a, b))

    console.log(
        'Inside Vertices A → B:',
        SAT.getInsideVertices(a, b)
    )

    console.log(
        'Inside Vertices B → A:',
        SAT.getInsideVertices(b, a)
    )

    console.groupEnd()

}

/* TEST 1 - COLLISION */

const p1 = new Polygon(50, 3)
const p2 = new Polygon(50, 4)

p1.rotationAngle = radians(45)

p1.setCenter(new Vector(
    canvas.width / 2,
    canvas.height * 0.3
))

p2.setCenter(new Vector(
    canvas.width / 2 + 25,
    canvas.height * 0.3
))

p1.updateGeometry()
p2.updateGeometry()

console.group('TEST 1 - COLLISION')

testCollision(p1, p2)

console.assert(
    SAT.isColliding(p1, p2),
    'Expected collision!'
)

console.groupEnd()

/* TEST 2 - NO COLLISION */

const p3 = new Polygon(50, 3)
const p4 = new Polygon(50, 4)

p3.rotationAngle = radians(45)

p3.setCenter(new Vector(
    canvas.width / 2 - 130,
    canvas.height * 0.7
))

p4.setCenter(new Vector(
    canvas.width / 2 + 130,
    canvas.height * 0.7
))

p3.updateGeometry()
p4.updateGeometry()

console.group('TEST 2 - NO COLLISION')

testCollision(p3, p4)

console.assert(
    !SAT.isColliding(p3, p4),
    'Expected no collision!'
)

console.groupEnd()

/* RENDERING */

vr.addView(new View(context, p1))
vr.addView(new View(context, p2))

vr.addView(new View(context, p3))
vr.addView(new View(context, p4))

vr.run()

/* DEBUG CANVAS */

const debugCanvas = document.createElement('canvas')
const debugContext = debugCanvas.getContext('2d')

debugCanvas.width = canvas.width
debugCanvas.height = canvas.height

debugCanvas.style.position = 'fixed'
debugCanvas.style.pointerEvents = 'none'
debugCanvas.style.zIndex = '10'

document.body.appendChild(debugCanvas)

function drawDebug() {

    const rect = canvas.getBoundingClientRect()

    debugCanvas.style.left = `${rect.left}px`
    debugCanvas.style.top = `${rect.top}px`
    debugCanvas.style.width = `${rect.width}px`
    debugCanvas.style.height = `${rect.height}px`

    debugContext.clearRect(
        0, 0,
        debugCanvas.width,
        debugCanvas.height
    )

    // Red vertex marker

    const vertex = p0.vertices[0]

    debugContext.beginPath()
    debugContext.arc(
        vertex.x,
        vertex.y,
        5,
        0,
        2 * Math.PI
    )
    debugContext.fillStyle = 'red'
    debugContext.fill()

    // Collision status

    const aabb = AABB.isCollidingByBoundingBox(p1, p2)
    const sat = SAT.isColliding(p1, p2)

    debugContext.font = '16px Arial'

    debugContext.fillStyle = aabb ? 'green' : 'red'
    debugContext.fillText(
        `AABB: ${aabb}`,
        20, 30
    )

    debugContext.fillStyle = sat ? 'green' : 'red'
    debugContext.fillText(
        `SAT: ${sat}`,
        20, 55
    )

}

/* ANIMATION */

const looper = new Looper()

let elapsedTime = 0

looper.addCallback(deltaTime => {

    elapsedTime += deltaTime

    // Rotate p0

    p0.rotationAngle += radians(45) * deltaTime
    p0.updateWorldGeometry()

    // Move p2 horizontally

    p2.centerX = p1.centerX + 25 +
        Math.sin(elapsedTime * 1.5) * 125

    p2.updateWorldGeometry()

    // Collision detection

    const aabb = AABB.isCollidingByBoundingBox(p1, p2)
    const sat = SAT.isColliding(p1, p2)

    // Clear frame

    context.clearRect(
        0, 0,
        canvas.width,
        canvas.height
    )

    // Render views

    vr.run()

    // Draw vertex marker

    const vertex = p0.vertices[0]

    context.beginPath()
    context.arc(vertex.x, vertex.y, 5, 0, 2 * Math.PI)
    context.fillStyle = 'red'
    context.fill()

    // Draw collision information

    context.font = '16px Arial'

    context.fillStyle = aabb ? 'green' : 'red'
    context.fillText(`AABB: ${aabb}`, 20, 30)

    context.fillStyle = sat ? 'green' : 'red'
    context.fillText(`SAT: ${sat}`, 20, 55)

})

looper.startLoop()
