# Storygraph - Flow Control

A tree node based state system whereupon access to nested routes becomes available upon the expressions being satisfied.

### The Graph

Aka the story map, with two props, `i & o`

Default node is named `start` this can be changed at creation.

* `nodename` _lowercase_
	* `i` : instance : external script : _capitalised nodename_
	* `o` : graph arrows : {}
	
if `nodename.o` is omitted then the machine considers this as a **completion** point

Circular routes are possible by restating an existing nodename, but leaving out the requirement for the instance (`nodename.i`)

**Example**

	start: {
        i: Start, 						// instance class
        o: {
            hills: {
                i: Start,
                o: {
                    mars: {},			// complete
                    lake: {
                        o: {
                            start: {}	// circular
                        }
                    }
                }
            }
        }
    }

### Adding Instances (external scripts)

These external classes are consumed into the storygraph machine node instances

Define the class with the following **mergables**:  

* `data`: The state store for the view
* `methods`: Actions to mutate the state
* `conditions`: Set target story with an expression that will map its access based on the state

```
data() {
	return { 
		count: 0
	}
}
methods() {
	return {
		add(val) {
			this.count += val
		}
	}
}
conditions() {
	return {
		hills: "this.count > 3"
	}
}

```


### pre build roadmap

	
	history = [] 		// previous states 
	graph = {}			// json to build machine from
	store = {} 			// master state of all current actions
	
	nodes = {}			// flat table of nodes for machine reference
	machine = {}		// inherit nodes
	manager = {			// manage current status
		nodename		// current nodename
		current			// current history integer
		count			// total number of steps
		previous		// previous nodename
		
	
	methods.prototype
	
	.next				// manage history && update store
	.back				// via manager
	
	events.prototype
	
	.build				// build machines form json graph 
	.attach				// merge external methods to relevant nodes
	.update				// observable stream to relay store
	.expose				// expose json store for debugging / html view
	

	node = { 			// nodes created from state graph
		name,			// id
		state,			// available state for this node -- new instance of
		paths,			// goto available nodes - will be object
		actions			// methods to mutate _this state


	Notes

	Create nodes .. some kind of higher-order function
	Read and generate from class
	ES6 imports for applying methods externally from library
	Rule? single direction only (from current to arrows)

	This represents a group? 
	Is there a requirement for managing multiple groups?


	machine = {
		start {
			<paths> {
				left {
					<paths> {
						trees {
							<paths> {
								pond	// join - this must be..
						lake 
				right {
					<paths> {
						hill
						path {
							<paths> {
								pond	// join - ..the same code
								
								
	history = [one, two, ""three"", four, five]
	
	Currently at history[2] because we have stepped backwards
	
	1. state = one + two + three
	2. we can go <forward> IF no changes are made
	3. if we make a change: history = [one, two, three]
	
	Making changes when back in history will: 
	slice the current array at current index