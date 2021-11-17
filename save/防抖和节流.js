function debounce(func, wait) {
  let timer = null
  return function () {
    let cxt = this
    let args = arguments
    if(timer) clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(cxt, args)
    }, wait)
  }
}

function throttle(func, wait) {
  let timer = null
  return function () {
    let cxt = this
    let args = arguments
    if(!timer) {
      timer = setTimeout(function () {
        timer = null
        func.apply(cxt, args)
      }, wait)
    }
  }
}