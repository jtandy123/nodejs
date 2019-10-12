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
  var content = await new Promise(resolve => {
    setTimeout(() => {
      resolve(3)
    }, 500)
  })
  console.log(content)
  return 4
})()

setTimeout(() => {
  console.log(result)
}, 800)
