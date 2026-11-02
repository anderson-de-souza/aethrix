
class EventRegisterer {

    constructor(...eventTypeList) {
        this.eventTypeSet = new Set(eventTypeList)
        this.registeredsMap = new Map()
    }

    addEventType(eventType) {
        this.eventTypeSet.add(eventType)
    }

    removeEventType(eventType) {
        this.eventTypeSet.delete(eventType)
    }

    register(target, callback) {
        this.unregister(target)

        this.eventTypeSet.forEach(eventType => {
            target.addEventListener(eventType, callback)
        })

        this.registeredsMap.set(target, callback)
    }

    unregister(target) {

        const callback = this.registeredsMap.get(target)

        if (callback) {
            this.eventTypeSet.forEach(eventType => {
                target.removeEventListener(eventType, callback)
            })

            this.registeredsMap.delete(target)
        }
        
    }

    update(target) {
        const callback = this.registeredsMap.get(target)

        if (callback) {
            this.register(target, callback)
        }
    }

    registerMany(targets, callback) {
        for (const target of targets) {
            this.register(target, callback)
        }
    }

    isRegistered(target) {
        return this.registeredsMap.has(target)
    }

    clear() {
        for (const target of this.registeredsMap.keys()) {
            this.unregister(target)
        }
    }

}

export default EventRegisterer
