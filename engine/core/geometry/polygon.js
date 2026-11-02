
import Vector from '@math/vector.js'
import Shape from '@geometry/shape.js'

class Polygon extends Shape {

    constructor(radius = 0, edgeCount = 3) {
        super()

        this.type = 'polygon'

        this.radius = radius
        this.edgeCount = edgeCount

        this.updateGeometry()
    }

    updateLocalVertices() {

        const angleStep = (2 * Math.PI) / this.edgeCount

        this.localVertices = new Array(this.edgeCount)

        for (let i = 0; i < this.edgeCount; i++) {

            const angle = i * angleStep

            this.localVertices[i] = new Vector(
                this.halfWidth * Math.cos(angle),
                this.halfHeight * Math.sin(angle)
            )

        }

    }

    updateWorldGeometry() {

        const center = this.getCenter()
        const count = this.localVertices.length

        // World vertices

        this.vertices = new Array(count)

        for (let i = 0; i < count; i++) {

            const vertex = this.localVertices[i]

            this.vertices[i] = new Vector(vertex.x, vertex.y).rotate(this.rotationAngle).add(center)

        }

        // Edges

        this.edges = new Array(count)

        for (let i = 0; i < count; i++) {

            const vertex = this.vertices[i]
            const nextVertex = this.vertices[(i + 1) % count]

            this.edges[i] = new Vector(
                nextVertex.x - vertex.x,
                nextVertex.y - vertex.y
            )

        }

        // Axes

        this.axes = new Array(count)

        for (let i = 0; i < count; i++) {
            this.axes[i] = this.edges[i]
                .perpendicular()
                .normalize()
        }

        // Drawing path

        const path = new Path2D()

        for (let i = 0; i < count; i++) {

            const vertex = this.vertices[i]

            if (i === 0) {
                path.moveTo(vertex.x, vertex.y)
            } else {
                path.lineTo(vertex.x, vertex.y)
            }

        }

        path.closePath()

        this.drawingPath = path

        // Bounding box

        this.boundingBox = null

    }

    updateGeometry() {

        this.updateLocalVertices()
        this.updateWorldGeometry()

        return this
    }

}

export default Polygon
