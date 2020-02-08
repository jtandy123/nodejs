;(async function() {
  try {
    // await interview(1)
    // await interview(2)
    // await interview(3)
    await Promise.all([interview(1), interview(2)])
  } catch (err) {
    return console.log('cry at ' + err.round + ' round')
  }
  console.log('smile')
})()

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
