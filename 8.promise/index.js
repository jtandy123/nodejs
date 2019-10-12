var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(3)
    reject(new Error(3))
  }, 300)
})
promise
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

console.log(promise)

setTimeout(() => {
  console.log(promise)
}, 800)
