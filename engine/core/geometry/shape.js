
import Vector from '@math/vector.js'

class Shape {

    constructor() {

        this.x = 0
        this.y = 0

        this.width = 0
        this.height = 0

        this.rotationAngle = 45 * (Math.PI / 180)

        this.boundingBox = null

        this.type = 'shape'

        this.localVertices = []
        this.vertices = []

        this.edges = []
        this.edgeCount = 0
        
        this.axes = []

        this.drawingPath = null

    }

    get centerX() {
        return this.x + this.halfWidth
    }

    set centerX(value) {
        this.x = value - this.halfWidth
    }

    get centerY() {
        return this.y + this.halfHeight
    }

    set centerY(value) {
        this.y = value - this.halfHeight
    }

    getPosition() {
        return new Vector(this.x, this.y)
    }

    setPosition(vector) {
        this.x = vector.x
        this.y = vector.y
    }

    getCenter() {
        return new Vector(this.centerX, this.centerY)
    }

    setCenter(vector) {
        this.centerX = vector.x
        this.centerY = vector.y
    }

    get radius() {
        return (this.width + this.height) / 4
    }

    set radius(value) {
        this.width = value * 2
        this.height = value * 2
    }

    get diameter() {
        return this.radius * 2
    }

    get halfWidth() {
        return this.width / 2
    }

    get halfHeight() {
        return this.height / 2
    }

    getBounds() {

        let minX = Infinity
        let minY = Infinity
        let maxX = -Infinity
        let maxY = -Infinity

        for (const vertex of this.vertices) {

            if (vertex.x < minX) {
                minX = vertex.x
            }

            if (vertex.y < minY) {
                minY = vertex.y
            }

            if (vertex.x > maxX) {
                maxX = vertex.x
            }

            if (vertex.y > maxY) {
                maxY = vertex.y
            }

        }

        return {
            min: new Vector(minX, minY),
            max: new Vector(maxX, maxY)
        }

    }

    getBoundingBox() {

        const bounds = this.getBounds()

        this.boundingBox = {
            x: bounds.min.x,
            y: bounds.min.y,
            width: bounds.max.x - bounds.min.x,
            height: bounds.max.y - bounds.min.y
        }

        return this.boundingBox

    }

}

export default Shape
