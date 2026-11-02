import Vector from '@math/vector.js'

const MOUSE_BUTTON_MAP = new Map([
    ['left', 0],
    ['middle', 1],
    ['right', 2]
])

class Input {

    constructor() {
        this.keyPressedSet = new Set()
        this.mouseButtonPressedSet = new Set()

        this.mousePointerPositionX = 0
        this.mousePointerPositionY = 0

        this.mouseWheelDeltaX = 0
        this.mouseWheelDeltaY = 0
    }

    addKeyPressed(key) {
        this.keyPressedSet.add(key)
    }

    removeKeyPressed(key) {
        this.keyPressedSet.delete(key)
    }

    isKeyPressed(key) {
        return this.keyPressedSet.has(key)
    }

    setMousePointerPosition(x, y) {
        this.mousePointerPositionX = x
        this.mousePointerPositionY = y
    }

    getMousePointerPosition() {
        return new Vector(
            this.mousePointerPositionX,
            this.mousePointerPositionY
        )
    }

    getMousePointerPositionX() {
        return this.mousePointerPositionX
    }

    getMousePointerPositionY() {
        return this.mousePointerPositionY
    }

    addMouseButtonPressed(buttonCode) {
        if (buttonCode < 0 || buttonCode > 3) {
            throw new Error('button code not supported')
        }

        this.mouseButtonPressedSet.add(buttonCode)
    }

    removeMouseButtonPressed(buttonCode) {
        this.mouseButtonPressedSet.delete(buttonCode)
    }

    isMouseButtonPressed(buttonName) {
        const buttonCode = MOUSE_BUTTON_MAP.get(buttonName)
        return this.mouseButtonPressedSet.has(buttonCode)
    }

    setMouseWheelDeltaX(value) {
        this.mouseWheelDeltaX = value
    }

    getMouseWheelDeltaX() {
        return this.mouseWheelDeltaX
    }

    setMouseWheelDeltaY(value) {
        this.mouseWheelDeltaY = value
    }

    getMouseWheelDeltaY() {
        return this.mouseWheelDeltaY
    }
}

export default (new Input())