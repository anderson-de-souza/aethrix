class Vector {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    subtract(other) {
        return new Vector(this.x - other.x, this.y - other.y)
    }

    scale(scaleX, scaleY = scaleX) {
        return new Vector(this.x * scaleX, this.y * scaleY)
    }
    
    unscale(scaleX, scaleY = scaleX) {
        
        if (scaleX === 0 || scaleY === 0) {
            throw new Error(`unscale args can't be 0`)
        }
        
        return new Vector(this.x / scaleX, this.y / scaleY)
        
    }

    rotate(radians) {
        
        const cos = Math.cos(radians)
        const sin = Math.sin(radians)
        
        return new Vector(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        )

    }

    dot(other) {
        return this.x * other.x + this.y * other.y
    }

    cross(other) {
        return this.x * other.y - this.y * other.x
    }
    
    reverse() {
        return new Vector(-this.x, -this.y)
    }

    perpendicular() {
        return new Vector(-this.y, this.x)
    }

    normalize() {

        const magnitude = this.magnitude()

        if (magnitude === 0) {
            return new Vector(0, 0)
        }

        return new Vector(this.x / magnitude, this.y / magnitude)

    }

    clone() {
        return new Vector(this.x, this.y)
    }
    
    toString(precision = 2) {
        return `(${ this.x.toFixed(precision) }, ${ this.y.toFixed(precision) })`
    }
    
    equals(other) {
        return this.x === other.x && this.y === other.y
    }
    
    magnitude() {
        return Math.hypot(this.x, this.y)
    }
    
    angle() {
        return Math.atan2(this.y, this.x)
    }    

}

export default Vector