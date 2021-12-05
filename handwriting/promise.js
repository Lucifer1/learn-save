function myPromise(fn) {
  this.cbs = []

  let resolve = (val) => {
    setTimeout(() => {
      this.data = val
      this.cbs.forEach(cb => cb(val))
    })
  }

  fn(resolve)
}

myPromise.prototype.then = function(onResolved) {
  return new myPromise(resolve => {
    this.cbs.push(() => {
      let res = onResolved(this.data)
      if (res instanceof myPromise) {
        res.then(resolve)
      } else {
        resolve(res)
      }
    })
  })
}

new myPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
})
  .then((res) => {
    console.log(res);
    return new myPromise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 500);
    });
  })
  .then(console.log);
