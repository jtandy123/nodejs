/*
console.log(
  (async function() {
    // return 4
    throw new Error(4)
  })()
)
console.log(
  (function() {
    return new Promise((resolve, reject) => {
      // resolve(4)
      reject(new Error(4))
    })
  })()
)
*/

var result = (async function() {
  try {
    var content = await new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve(3)
        reject(new Error('8'))
      }, 500)
    })
  } catch (e) {
    console.log('error', e.message)
  }
  console.log(content) // undefined
  return 4
})()

setTimeout(() => {
  console.log(result)
}, 800)
