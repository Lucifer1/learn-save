class myVue {
  constructor(option) {
    this.$option = option
    this.$data = option.data
    this.$el = option.el

    observe(this.$data)

    new Compile(this.$data, this.$el)
  }
}

function observe(data) {
  if(typeof data !== 'object' || data === null) return
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, val) {
  observe(val)
  let dep = new Dep()
  Object.defineProperty(data, key, {
    get() {
      Dep.target && dep.addDep(Dep.target)
      return val
    }
    set(newVal) {
      if(val !== newVal) {
        val = newVal
        dep.notify()
      }
    }
  })
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}

class Compile {

}

class Watcher {
  constructor(data, exp, updateFunc) {
    this.$vm = data
    this.$exp = exp
    this.$updateFunc = updateFunc

    Dep.target = this
    let res = data[exp]
    Dep.target = null
  }

  update() {
    this.$updateFunc.
  }
}