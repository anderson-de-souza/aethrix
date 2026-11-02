
import Vector from '@math/vector.js'

class SAT {

    static isColliding(a, b) {

        const axes = [...a.axes, ...b.axes]

        for (const axis of axes) {

            const [aMin, aMax] = SAT.project(axis, a.vertices)
            const [bMin, bMax] = SAT.project(axis, b.vertices)

            if (aMax < bMin || bMax < aMin) {
                return false
            }

        }

        return true

    }

    static getMTV(a, b) {

        const axes = [...a.axes, ...b.axes]

        let smallestAxis = null
        let smallestOverlap = Infinity

        for (const axis of axes) {

            const [aMin, aMax] = SAT.project(axis, a.vertices)
            const [bMin, bMax] = SAT.project(axis, b.vertices)

            if (aMax < bMin || bMax < aMin) {
                return null
            }

            const overlapLeft = aMax - bMin
            const overlapRight = bMax - aMin

            const overlap = Math.min(overlapLeft, overlapRight)

            if (overlap < smallestOverlap) {
                smallestOverlap = overlap
                smallestAxis = axis
            }

        }

        return new Vector(
            smallestAxis.x * smallestOverlap,
            smallestAxis.y * smallestOverlap
        )

    }

    static getInsideVertices(a, b) {

        const insideVertices = []

        for (const vertex of a.vertices) {

            let isInside = true

            for (const axis of b.axes) {

                const [min, max] = SAT.project(axis, b.vertices)

                const projection = vertex.dot(axis)

                if (projection < min || projection > max) {
                    isInside = false
                    break
                }

            }

            if (isInside) {
                insideVertices.push(vertex)
            }

        }

        return insideVertices

    }

    static project(axis, vertices) {

        let min = Infinity
        let max = -Infinity

        for (const vertex of vertices) {

            const projection = vertex.dot(axis)

            min = Math.min(min, projection)
            max = Math.max(max, projection)

        }

        return [min, max]

    }

}

export default SAT
