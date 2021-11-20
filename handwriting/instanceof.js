function myInstanceOf(obj, fn) {
  if ((typeof obj !== 'object' && typeof obj !== 'function') || obj === null) return false
  let left = obj.__proto__
  let right = fn.prototype
  while(left) {
    if(left === right) return true
    else left = left.__proto__
  }
  return false
}
