const EventEmitter = require('events').EventEmitter

class ELearning extends EventEmitter {
  constructor() {
    super()

    setInterval(() => {
      this.emit('newlesson', { price: Math.random() * 100 })
    }, 3000)
  }
}

const eLearing = new ELearning()

module.exports = eLearing
