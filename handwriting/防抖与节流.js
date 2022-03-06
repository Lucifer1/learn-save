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
  let timer1
  return function() {
    if(timer) return
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, time)
  }
}

function add (a, b) {
  return a + b
}



