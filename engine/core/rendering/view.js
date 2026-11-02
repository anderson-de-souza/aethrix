import Polygon from '@geometry/polygon.js'

class View {
    
    style = {
        visible: true,
        color: 'white',
        filled: true,
        lineWidth: 1
    }

    context
    shape

    constructor(context, shape = new Polygon(50, 4)) {
        this.context = context
        this.shape = shape
    }

    draw() {

        if (this.style.visible) {

            if (this.style.filled) {

                this.context.fillStyle = this.style.color
                this.context.fill(this.shape.drawingPath)

            } else {

                this.context.strokeStyle = this.style.color
                this.context.lineWidth = this.style.lineWidth
                this.context.stroke(this.shape.drawingPath)
                
            }
        }

    }

}

export default View