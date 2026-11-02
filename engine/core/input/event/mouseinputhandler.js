
import EventRegisterer from '@event/eventregisterer.js'
import Input from '@input/input.js'

class MouseInputHandler {

    constructor(
        eventMapping,
        events = [
            'click', 'dblclick', 'mousedown',
            'mouseup', 'mousemove', 'mouseover',
            'mouseout', 'mouseenter', 'mouseleave',
            'wheel'
        ]
    ) {
        this.eventMapping = eventMapping
        this.eventRegister = new EventRegisterer(...events)
    }

    register(target) {
        this.eventRegister.register(
            target,
            (event) => this.onEvent(event)
        )
    }

    unregister(target) {
        this.eventRegister.unregister(target)
    }

    onEvent(event) {

        Input.setMousePointerPosition(event.clientX, event.clientY)

        if (event.type === 'mousedown') {
            Input.addMouseButtonPressed(event.button)

        } else if (event.type === 'mouseup') {
            Input.removeMouseButtonPressed(event.button)

        } else if (event.type === 'wheel' || event.type === 'mousewheel') {

            let deltaX = 0
            let deltaY = 0

            if (event.type === 'wheel') {
                deltaX = event.deltaX
                deltaY = event.deltaY
            } else if (event.type === 'mousewheel') {
                deltaX = 0
                deltaY = -event.wheelDelta
            }

            Input.setMouseWheelDeltaX(deltaX)
            Input.setMouseWheelDeltaY(deltaY)

        }

        this.eventMapping[event.type]?.(event)

    }

}

export default MouseInputHandler
