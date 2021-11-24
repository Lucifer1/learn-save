function debounce(fn, time) {
  let timer
  return function() {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

function throttle(fn, time) {
  let timer
  return function() {
    if(timer) return
    stimer = etTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, time)
  }
}