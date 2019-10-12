const eventloop = {
  queue: [],
  loop() {
    while (this.queue.length) {
      var callback = this.queue.shift()
      callback() // 此callback()是js执行的第一个语句，之前都是C++代码，所以callback()的执行上下文在调用栈底部
    }

    setTimeout(this.loop.bind(this), 50)
  },
  add(callback) {
    this.queue.push(callback)
  }
}

eventloop.loop()

setTimeout(() => {
  eventloop.add(() => {
    console.log('1')
  })
}, 500)

setTimeout(() => {
  eventloop.add(() => {
    console.log('2')
  })
}, 800)
