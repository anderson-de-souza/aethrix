import KeyboardInputHandler from '@event/keyboardinputhandler.js'
import MouseInputHandler from '@event/mouseinputhandler.js'

class Aethrix {

    constructor({
        keyMapping = {},
        eventMapping = {},
        mouseTarget = window
    } = {}) {

        this.keyMapping = { ...keyMapping }
        this.eventMapping = { ...eventMapping }

        this.mouseTarget = mouseTarget

        this.initKeyboard()
        this.initMouse()
    }

    initKeyboard() {
        this.keyboardInputHandler = new KeyboardInputHandler(
            this.keyMapping
        )

        this.keyboardInputHandler.register()
    }

    initMouse() {
        this.mouseInputHandler = new MouseInputHandler(
            this.eventMapping
        )

        this.mouseInputHandler.register(this.mouseTarget)
    }

    mapKey(key, action) {
        this.keyMapping[key] = action
        return this
    }

    mapKeys(mapping) {
        Object.assign(this.keyMapping, mapping)
        return this
    }

    unmapKey(key) {
        delete this.keyMapping[key]
        return this
    }

    mapEvent(event, action) {
        this.eventMapping[event] = action
        return this
    }

    mapEvents(mapping) {
        Object.assign(this.eventMapping, mapping)
        return this
    }

    unmapEvent(event) {
        delete this.eventMapping[event]
        return this
    }

    clearKeyMapping() {
        for (const key of Object.keys(this.keyMapping)) {
            delete this.keyMapping[key]
        }

        return this
    }

    clearEventMapping() {
        for (const event of Object.keys(this.eventMapping)) {
            delete this.eventMapping[event]
        }

        return this
    }

    destroy() {
        this.keyboardInputHandler?.unregister()
        this.mouseInputHandler?.unregister(this.mouseTarget)
    }
}

export default Aethrix