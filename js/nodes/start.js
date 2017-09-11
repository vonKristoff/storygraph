export default class {
    constructor() {}
    conditions() {        
        return {
            start: [],
            hills: [
                "this.thing > 3"
            ],
            lake: [
                "this.thing > 1"
            ],
            boogie: [
                "this.thing < 0"
            ]
        }
    }
    data() { // return new instance of state
        return {
            thing: Math.random()
        }
    }
    methods() {
        return {
            add(num) {
                this.thing += num
            }
        }
    }
}