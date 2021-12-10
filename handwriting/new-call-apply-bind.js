function myNew(fn, ...arg) {
  let obj = {}
  obj.__proto__ = fn.prototype
  let res = fn.call(obj, ...arg)
  return typeof res === Object ? res : obj
}

Function.prototype.myCall = function(context, ...arg) {
  context = context || window
  context.fn = this
  let res = context.fn(...arg)
  delete context.fn
  return res
}

Function.prototype.myApply = function(context, arg) {
  context = context || window
  context.fn = this
  let res = context.fn(...arg)
  delete context.fn
  return res
}

Function.prototype.myBind = function(context, ...arg1) {
  context = context || window
  let fn = this
  let bindFunc = function(...arg2) {
    let bindThis = this instanceof bindFunc ? this : context
    return fn.call(bingThis, ...arg1, ...arg2)
  }

  bindFunc.prototype = fn.prototype
  return bindFunc
}