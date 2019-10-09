const eLearing = require('./lib')

eLearing.addListener('newlesson', res => {
  if (res.price < 80) {
    console.log('buy!', res)
  }
  // console.log('yeah!', res)
})
