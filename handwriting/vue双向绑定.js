class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // 响应式处理
    observe(this.$data)

    // 属性代理
    proxy(this)

    // 编译器
    new Compiler('#app', this.$data)
  }


}

function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }
  new Observer(obj)
}

class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

function defineReactive(obj, key, val) {
  observe(val)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log('get', val)
      Dep.target && dep.addDep(Dep.target)

      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', val, newVal);
        val = newVal

        dep.notify()
      }
    }
  })
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get() {
        return vm.$data[key]
      },
      set(newVal) {
        vm.$data[key] = newVal
      }
    })
  })
}

class Compiler {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    this.compile(this.$el)
  }

  compile(el) {
    el.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        this.compileElement(node)
      } else if (this.isInter(node)) {
        this.compileText(node)
      }

      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  compileElement(node) {
    const attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      const attrName = attr.name
      const exp = attr.value
      if (attrName.indexOf('k-') !== -1) {
        const dir = attrName.slice(2)
        console.log(dir);
        this[dir] && this[dir](node, exp)
      }
    })
  }

  text(node, exp) {
    this.update(node, exp, 'text')
  }

  update(node, exp, dir) {
    // 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])
    // 更新
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }

  textUpdater(node, val) {
    node.textContent = val
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    Dep.target = this
    let temp = vm[key]
    Dep.target = null
  }

  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
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