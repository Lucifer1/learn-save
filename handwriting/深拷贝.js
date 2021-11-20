function deepClone(obj, map = new WeakMap()) {
  if(typeof obj !== 'object' || obj === null) return obj
  let res = Array.isArray(obj) ? [] : {}
  if(map.get(obj)) {
    return map.get(obj)
  }
  map.set(obj, res)
  for(let i in obj) {
    res[i] = deepClone(obj[i], map)
  }
  return res
}