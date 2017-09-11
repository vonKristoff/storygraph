import Machine from './machine-proto'
import graph from './graph'

const story = new Machine({graph})

setTimeout(() => {
    story.state().actions.add(3)
    setTimeout(() => {
        story.controls.next('hills')
    }, 500)
}, 1000)

story.sync("VIEW", data => {
    console.log("view change", data)
})
story.sync("STATE", data => {
    console.log("state update", data)
})
story.sync("OPEN", data => {
    console.log('state satisfied - your available view is', data)
})
story.sync("CLOSED", data => {
    console.log('state not ready yet - ', data, 'is not available')
})
story.sync("COMPLETE", data => {
    console.log('You have completed the journey')
})