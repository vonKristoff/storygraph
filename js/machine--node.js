

export default class {
    constructor(machine, name, instance = false) {
        this.ctx = machine
        this.instance = (instance) ? new instance() : false
        this.out = null
        this.name = name
        this.store = {}
        this.actions = {}
        this.conditions = {}
        if(this.instance) this.merge()
    }
    init() { // new instance
        this.store = this.instance.data()
        return this
    }
    previous(oldState) {
        this.store = Object.assign({}, oldState)
    }
    // generate fresh state & methods from external graph instances
    merge() {        
        this.store = this.instance.data() 
        let actions = this.instance.methods()
        for(const action in actions) {
            this.actions[action] = dispatcher.call(this, actions[action])
        }
        let conditions = this.instance.conditions()
        for(const path in conditions) {
            this.conditions[path] = evaluate.call(this, conditions[path], path)            
        }
    }
    // set possible routes out from this node
    setRoutes(nodes) {
        this.out = {}
        for(const key in nodes) {
            this.out[key] = key
        }
    }
    // create fresh instance
    reset() {
        this.merge()
    }
    results(emitRoutes) {
        let result = {}
        for(const path in this.out) {
            let conditions = this.conditions[path]
            if(conditions != undefined) {
                result[path] = satisfy(conditions)
            } else result[path] = false
        }
        return (emitRoutes) ? this.reactTo(result) : result
    }
    reactTo(results) {
        for(const key in results) {
            if(results[key]) this.ctx.bus.emit('state-satisfied', key)
            if(!results[key]) this.ctx.bus.emit('state-dissatisfied', key) // TODO test if working
        }
        return results
    }
}
function satisfy(conditions) {
    let length = conditions.length,
        results = []
    conditions.forEach(test => {
        results.push(test())
    })
    return results.every(val => val === true)
}

// passing state
function dispatcher(fn) {
    let state = this.store,
        ctx = this.ctx
    return function(num) {
        fn.call(state, num)
        console.log('updating store...')
        ctx.updateStore(state)
    }
}
// build conditions
function evaluate(conditionArray, nodename) {
    let state = this.store
    if(conditionArray.length < 1) conditionArray.push("true") // default to allow truthy if condition is set as empty array
    return conditionArray.map(condition => {
        let expression = condition.replace('this','state')
        return function() {
            return eval(expression)
        }
    })
}