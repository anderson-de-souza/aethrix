import View from '@rendering/view.js'

class ViewRenderer {

    constructor(context) {
        this.context = context
        this.viewSet = new Set()
        this.clearFrame = true
    }
    
    addView(view) {
        this.viewSet.add(view)
    }
    
    removeView(view) {
        this.viewSet.delete(view)
    }
    
    run() {

        if (this.clearFrame) {
            this.clearContext()
        }

        for (let view of this.viewSet) {
            view.draw()
        }

    }

    clearContext() {
        
        let width = this.context.canvas.width
        let height = this.context.canvas.height
        
        this.context.clearRect(0, 0, width, height)
        
    }
    
}

export default ViewRenderer
