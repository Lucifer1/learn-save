function asyncToGenerator(generatorFunc) {
  return function() {
    let gen = generatorFunc.apply(this, arguments)
    return new Promise((resolve, reject) => {
      function step(fn, arg) {
        let res
        try {
          res = gen[fn](arg)
        } catch(err) {
          return reject(err)
        }
        let {data, done} = res
        if(done) return resolve(data)
        else {
          return Promise.resolve(data).then(val => step('next', val), err => step('throw', err))
        }
      }
      step('next')
    })
  }
}

// 本质上就是实现一个自动执行的generator函数