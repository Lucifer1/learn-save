function debounce(fn, time) {
  let timer
  return function() {
    if(timer) clearTimeout(timer)
    setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

function throttle(fn, time) {
  let timer
  return function() {
    if(timer) return
    setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, time)
  }
}