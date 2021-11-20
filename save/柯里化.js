function currying(fn, ...res1) {
  return function(...res2) {
    fn.apply(this, res1.concat(res2))
  }
}

function curryHelper(fn, len) {
  let length = len || fn.length
  return function(...res) {
    return res.length >= length ? fn.apply(this, res) : curryHelper(currying.apply(this, [fn].concat(res)), length - res.length)
  }
}

function sayHello(a, b, c) {
  console.log(a + b + c)
}

// let test = currying(sayHello, '小明')
// test('19', '西瓜');

let add = curryHelper(sayHello)

// test1('小猪', 20, '西瓜')
// test1('小猪')(20, '西瓜')
// test1('小猪', 20)('西瓜')
// test1('小猪')(20)('西瓜')

add(1)(2)(3)

fn = 'sayHello'
res = 1

length = 3
1 >= 3
curryHelper(currying.apply(this, [fn].concat(res)), 3 - 1)




