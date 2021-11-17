class myVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.$el = options.el

    // 对数据进行监听
    observe(this.$data)

    // 添加代理
    proxy(this)

    // 进行编译
    new Compiler(this.$el, this.$data)
  }
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(v) {
        vm.$data[key] = v
      }
    })
  })
}

function observe(obj) {
  if(typeof obj !== 'object' || obj === null) return

  new Observer(obj)
}

class Observer {
  constructor(data) {
    this.$data = data
    this.walk(data)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

function defineReactive(obj, key, val) {
  observe(val)
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(v) {
      if(val !== v) {
        val = v
        dep.notify()
      }
    }
  })
}

class Compiler {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm

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
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  compileElement(node) {
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      const attrName = attr.name
      const attrVal = attr.value
      if(attrName.indexOf('k-') !== -1) {
        const dir = attrName.slice(2)
        this.update(node, attrVal, dir)
      }
    })
  }

  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  update(node, exp, dir) {
    let fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }

  textUpdater(node, val) {
    node.textContent = val
  }

}



class Watcher {
  constructor(vm, exp, updateFn) {
    this.$vm = vm
    this.$exp = exp
    this.$updateFn = updateFn

    Dep.target = this
    let value = this.$vm[this.$exp]
    Dep.target = null
  }

  update() {
    this.$updateFn.call(this.$vm, this.$vm[this.$exp])
  }

}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}