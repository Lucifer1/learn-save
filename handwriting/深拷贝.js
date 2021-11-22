function deepClone(obj, map = new WeakMap()) {
  if(typeof obj === 'symbol') return Symbol.for(obj.description)    //处理symbol
  if(obj instanceof Date) {
    return new Date(obj.getTime())
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
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

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  bool: true,
  num: 2,
  str: '2',
  symbol: Symbol(1),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  }
}

let zjm = deepClone(target)

console.log(zjm);