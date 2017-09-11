// public methods
export default function () {
    let $this = this
    return {
        next(target) {
            $this.updateView({type:"FORWARD", data: target})
        },
        back() {
            $this.updateView({type:"BACK"})            
        },
        current() {
            return $this.current()
        }
    }
}