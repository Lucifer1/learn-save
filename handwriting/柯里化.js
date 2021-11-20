function currying(fn, ...arg1) {
  return function(...arg2) {
    fn.call(this, ...arg1, ...arg2)
  }
}

function currHelper(fn, length) {
  let len = length || fn.length
  return function() {
    return arguments.length >= len ? fn.call(this, ...arguments) : currHelper(currying.call(this, fn, ...arguments), len - arguments.length)
  }
}

function sayHello(a, b, c) {
  console.log(a + b + c)
}

let add = currHelper(sayHello)
add(1)(2)(3)
add(1, 2)(3)
add(1, 2, 3)