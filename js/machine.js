import Emitter from 'event-emitter-es6'
import Node from './machine--node'
import methods from './machine--methods'
// import manager from './machine--manager' // superflous?!
export default class {
    constructor({emitter, graph = null, start = "start"}) {
        this.step = 0
        this.history = []   // past states to build store from
        this.nodes = {}     // caputured instances
        this.graph = graph
        this.bus = new Emitter()
        this.controls = methods.call(this)

        this.build(start)
    }
    build(entry) {
        if(this.graph == null) return console.log("You gotta pass a state graph") 
        // generate node from graph
        cascader.call(this.nodes, this.graph, this)   
        if(entry != null) this.init(entry)        
    }
    init(entry) {
        this.history.push(this.nodes[entry].init())
        this.bus.emit('update-view', this.response())
    }
    state() {
        return this.history[this.step]
    }
    current() {
        return this.step
    }
    // change state path
    updateView(action) {
        switch(action.type) {
            case "FORWARD":
                this.history.push(this.nodes[action.data].init()) // add instance
                this.step = this.history.length - 1 // set position
            break
            case "BACK":
                this.step = (this.current() < 1) ? 0 : this.current() - 1
                this.history.pop()
            break
            default:
                // default
                return this.response(true)
            break
        }
        this.bus.emit('update-view', this.response())
    }
    updateStore(state) {
        // auto update by node via action
        this.state().store = Object.assign({}, this.state().store, state)
        this.bus.emit('update-store', this.response(true))
    }
    response(emitRoute = false) { // trigger store change route update
        return {
            view: this.state().name, 
            state: this.state().store,
            options: this.state().results(emitRoute)
        }        
    }
    sync(type, update) {
        if(type == "VIEW") this.bus.on('update-view', update)
        if(type == "STATE") this.bus.on('update-store', update)
        if(type == "OPEN") this.bus.on('state-satisfied', update)
        if(type == "CLOSED") this.bus.on('state-dissatisfied', update)
        if(type == "COMPLETE") this.bus.on('complete', update)
    }
}

/**
 * Recurrsive function to run through all nested paths
 * @param  {object} step  nested step in current tree of graph
 * @param  {object} _this core state library context
 * @return {null}         is a setter
 */
function cascader(step, _this) {
    for(const key in step) {
        if(!this.hasOwnProperty(key)) { // the step has already been generated - do not overwrite
            // handle io            
            this[key] = (step[key].hasOwnProperty('i')) ? new Node(_this, key, step[key].i) : new Node(_this, key)
            if(step[key].hasOwnProperty('o')) {
                this[key].setRoutes(step[key].o)
                cascader.call(this, step[key].o, _this)
            }
        }
    }
}


