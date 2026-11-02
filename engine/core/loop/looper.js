
class Looper {

    constructor() {

        this.loopId = null

        this.callbacks = new Set()

        this.loopCount = 0
        this.loopInterval = 0

        this.lastTime = 0

    }

    addCallback(callback) {
        this.callbacks.add(callback)
    }

    removeCallback(callback) {
        this.callbacks.delete(callback)
    }

    startLoop() {
        if (this.loopId === null) {
            this.#loop()
        }
    }

    clearLoop() {
        if (this.loopId !== null) {
            cancelAnimationFrame(this.loopId)
            this.loopId = null
        }
    }

    #loop(timestamp = 0) {

        if (this.callbacks.size === 0) {
            this.clearLoop()
            return
        }

        if (this.lastTime === 0) {
            this.lastTime = timestamp
        }

        const deltaTime = (timestamp - this.lastTime) / 1000
        this.lastTime = timestamp

        this.loopCount++

        if (this.loopCount > this.loopInterval) {
            for (const callback of this.callbacks) {
                callback(deltaTime)
            }
            this.loopCount = 0
        }

        this.loopId = requestAnimationFrame(
            (timestamp) => this.#loop(timestamp)
        )

    }

    destroy() {
        this.clearLoop()
    }

}

export default Looper
