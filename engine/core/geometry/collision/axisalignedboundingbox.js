
class AABB {

    static isCollidingByDimensions(a, b) {

        const deltaX = a.centerX - b.centerX
        const deltaY = a.centerY - b.centerY

        const thresholdX = a.halfWidth + b.halfWidth
        const thresholdY = a.halfHeight + b.halfHeight

        return Math.abs(deltaX) < thresholdX &&
               Math.abs(deltaY) < thresholdY

    }

    static getOverlapByDimensions(a, b) {

        const overlap = { x: 0, y: 0 }

        const deltaX = a.centerX - b.centerX
        const deltaY = a.centerY - b.centerY

        const thresholdX = a.halfWidth + b.halfWidth
        const thresholdY = a.halfHeight + b.halfHeight

        if (Math.abs(deltaX) < thresholdX &&
            Math.abs(deltaY) < thresholdY) {

            overlap.x = thresholdX - Math.abs(deltaX)
            overlap.y = thresholdY - Math.abs(deltaY)

        }

        return overlap

    }

    static isCollidingByBoundingBox(a, b) {

        const boxA = a.getBoundingBox()
        const boxB = b.getBoundingBox()

        return (
            boxA.x < boxB.x + boxB.width &&
            boxA.x + boxA.width > boxB.x &&
            boxA.y < boxB.y + boxB.height &&
            boxA.y + boxA.height > boxB.y
        )

    }

    static getOverlapByBoundingBox(a, b) {

        const boxA = a.getBoundingBox()
        const boxB = b.getBoundingBox()

        const overlapX = Math.min(
            boxA.x + boxA.width,
            boxB.x + boxB.width
        ) - Math.max(boxA.x, boxB.x)

        const overlapY = Math.min(
            boxA.y + boxA.height,
            boxB.y + boxB.height
        ) - Math.max(boxA.y, boxB.y)

        return {
            x: Math.max(0, overlapX),
            y: Math.max(0, overlapY)
        }

    }

}

export default AABB
