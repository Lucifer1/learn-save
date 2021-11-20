function myPromise(fn) {
  this.cbs = []

  let resolve = (val) => {
    setTimeout(() => {
      this.data = val
      this.cbs.forEach(cb => cb(val)})
    })
  }

  fn(resolve)
}

myPromise.prototype.then = function(onResolved) {
  return new myPromise(resolve => {
    this.cbs.push(() => {
      let res = onResolved(this.data)
      if(res instanceof myPromise) {
        res.then(resolve)
      } else {
        resolve(res)
      }
    })
  })
}