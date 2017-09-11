import Start from './nodes/start'
// Capitalisation for instances
// lowercase for nodenames
export default {
    start: {
        i: Start,
        o: {
            hills: {
                i: Start,
                o: {
                    mars: {},
                    lake: {
                        i: Start,
                        o: {
                            start: {}
                        }
                    }
                }
            }
        }
    }
}