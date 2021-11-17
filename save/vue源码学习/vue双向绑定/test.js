class test {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.$el = options.el

    observe(this.$data)

    proxy(this)

    new Compiler(this.$el, this.$data)

  }
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(val) {
        vm.$data[key] = val
      }
    })
  })
}

function observe(data) {
  if(typeof data !== 'object' || data === null) return
  new Observer(data)
}

class Observer {
  constructor(data) {
    this.$data = data
    this.walk(this.$data)
  }

  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

function defineReactive(obj, key, val) {
  observe(val)
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      Dep.target && dep.add(Dep.target)
      return val
    },
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

  add(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach(watcher => {
      watcher.update()
    })
  }
}

class Compiler {
  constructor(el, data) {
    this.$el = document.querySelector(el)
    this.$data = data

    this.compile(this.$el)
  }

  compile(el) {
    el.childNodes.forEach(node => {
      if(node.nodeType === 1) {
        this.compileElement(node)
      }else if(this.isInter(node)) {
        this.compileText(node)
      }

      if(node.childNodes) {
        this.compile(node)
      }
    })
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*\}\}/.test(node.textContent)
  }

  compileElement(node) {
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      let name = attr.name
      let val = attr.value
      if(name.indexOf('k-') !== -1) {
        let dir = name.slice(2)
        this.update(node, val, dir)
      }
    })
  }

  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  update(node, exp, dir) {
    let fn = this[dir + "Updater"]
    fn && fn(node, this.$data[exp])

    new Watcher(this.$data, exp, (val) => {
      fn && fn(node, val)
    })
  }

  textUpdater(node, val) {
    node.textContent = val
  }

}


