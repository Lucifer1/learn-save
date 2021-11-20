function myPromiseAll(arr) {
  let res = []
  let len = 0
  return new Promise((resolve, reject) => {
    arr.forEach((element, index) => {
      Promise.resolve(element).then(val => {
        res[index] = val
        len += 1
        if(index = arr.length) {
          resolve(res)
        }
      }, err => reject(err))
    });
  })
}

Promise.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(p => {
      Promise.resolve(p).then(val => {
        resolve(val)
      }, err => {
        rejecte(err)
      })
    })
  })
}