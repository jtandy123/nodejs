var promise = interview(1)
var promise2 = promise
  .then(() => {
    return interview(2)
  })
  .then(() => {
    return interview(3)
  })
  .then(() => {
    console.log('smile')
  })
  .catch(err => {
    console.log('cry at ' + err.round + ' round')
  })

// setTimeout(() => {
//   console.log(promise)
//   console.log(promise2)
// }, 800)

// setTimeout(() => {
//   console.log(promise)
//   console.log(promise2)
// }, 1000)

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve('success')
      } else {
        var error = new Error('fail')
        error.round = round
        reject(error)
      }
    }, 500)
  })
}

Promise.all([interview('ali'), interview('baidu')])
  .then(() => {
    console.log('smile')
  })
  .catch(err => {
    console.log('cry for ' + err.round)
  })
