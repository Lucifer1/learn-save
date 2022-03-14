1. Composition API
   1. setup()
   2. ref()
   3. reactive()
   4. toRef(obj, 'obj.property')
   5. toRefs(obj)
2. [teleport](https://v3.cn.vuejs.org/guide/teleport.html)
3. fragments
   1. vue2中我们只能有1个根，vue3中我们可以有多个根节点，这是由于fragments的功劳，**具体原因没说，以后可以看看**

        ```
        // 原来
        <template>
          <div>
            <header />
            <main />
            <footer>
          </div>
        </template>

        // 现在
        <template>
          <header />
          <main />
          <footer>
        </template>
        ```

4. Emits
5. custom render 自定义渲染器：可以自定义渲染逻辑，
6. 全局api global
7. 摇树优化
8. v-model变化
9. vite 与传统的打包工具的区别
   1.  开发环境vite不进行打包
       1.  传统工具的流程

            ![传统打包流程](../img/webpack/传统打包流程.png)

            先进行构建打包，将**打包后的文件存放到内存当中**(虽然我们没有看见打包后的文件，也就是dist，但是它仍然执行了打包操作，然后放入了内存当中)，然后启动server服务，然后浏览器向server发送请求，从内存取出数据进行响应

       2.  vite打包流程

            ![vite打包流程](../img/webpack/vite打包流程.png)

            开发环境不打包，直接启动server服务，然后浏览器发送请求，然后浏览器请求哪个文件，server就按照es模块化的语法去加载哪个模块就可以了。
               1. 一个问题，为什么可以实现这个，为什么原来不行？**随着各大浏览器对于es6的支持程度越来越好，js标准的模块化的支持度的提高，各大浏览器可以很好地识别es module。**

       3.  为什么传统文件要进行打包
           1.  我们开发过程当中，高阶语法需要转义，es6 7 8 的语法很多浏览器是不支持的
           2.  各种组件之间、以及不同文件之间的联系，需要进行代码合并，js、css也需要合并
           3.  有些类型文件，浏览器无法识别，例如.vue文件

       4.  vite创建项目方法？ **看官网**
       5.  vite不打包，在浏览器中显示的文件类型也是xx.vue的格式，浏览器是怎么识别的？
           1.  vite会对.vue文件进行编译，编译成js文件，浏览器收到的response里边，.vue文件的content-type是application/javascript，**虽然浏器收到的还是.vue文件，但是会当成js来处理，浏览器中认的不是后缀名，认的是文件类型**

                ![vite编译后的vue文件](../img/webpack/vite编译后的vue文件.png)

       6.  vue3 + vue-cli更改成vue3 + vite
           1.  把文件中的@全部都替换掉，vite不能识别@，[但是可以在vite.confit.js里边配置对应的alias](https://juejin.cn/post/7017701897662365709)
           2.  保持环境一致，替换package.json中的内容，将vue-cli相关的东西替换成vite
           3.  [配置对应的环境文件 .env.development和.env.production](https://www.cnblogs.com/yuarvin/p/15719657.html)
               1.  loadEnv()参数
                   1.  mode：模式
                   2.  envDir：环境变量配置文件所在目录
                   3.  prefix：接受的环境变量前缀，默认为 VITE_，这就应证了文档中提到的内容
       7.  在vue2的项目中使用vite，需要使用一个插件vite-plugin-vue2
           1.  在vite当中，用户想使用哪种框架来开发，需要在vite.config.js里边以插件的形式来使用，@vitejs/plugin-vue默认使用vue3，所以需要使用上边的框架
       8.  **具体的webpack配置如何迁移，直接去vite官网上查找**


### 看文档总结

1. [provide/inject](https://v3.cn.vuejs.org/guide/component-provide-inject.html)
   1. provide/inject 绑定并不是响应式的。我们可以通过传递一个 ref property 或 reactive 对象给 provide 来改变这种行为，也可以使用computed属性来实现
2. 组合式API
   1. [3.2的新更新](https://juejin.cn/post/7036389587991658533)
   2. 在 setup 中你应该避免使用 this，因为它不会找到组件实例。
   3. setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。
   4. setup 选项是一个接收 props 和 context 的函数
      1. props 是响应式的，不能使用 ES6 解构，它会消除 prop 的响应性。需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作
      2. context 是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对 context 使用 ES6 解构。

          ```
          setup(props, context) {
            // Attribute (非响应式对象，等同于 $attrs)
            console.log(context.attrs)

            // 插槽 (非响应式对象，等同于 $slots)
            console.log(context.slots)

            // 触发事件 (方法，等同于 $emit)
            console.log(context.emit)

            // 暴露公共 property (函数)
            console.log(context.expose)
          }
          ```

   5. 执行 setup 时，你只能访问以下 property：
      1. props
      2. attrs
      3. slots
      4. emit
   6. 无法访问以下组件选项：
      1. data
      2. computed
      3. methods
      4. refs (模板 ref)
   7. setup 返回的 refs 在模板中访问时是被自动浅解包的，因此不应在模板中使用 .value。但是在setup当中，修改对应的值时，需要修改.value
   8. [setup中的生命周期](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html)
   9. **setup的执行时机在beforeCreate与created之前**
   10. [defineComponent](https://juejin.cn/post/6994617648596123679):defineComponent 本身的功能很简单，但是最主要的功能是为了 ts 下的类型推导
   11. [script setup](https://juejin.cn/post/6983626263327932429)

### 开发问题

1. vue文件里边import vue 和 vuex 时，vetur报错，解决 Vue3 Cannot find module[解决办法](https://juejin.cn/post/6933140574132404237)，在shims-vue.d.ts里添加

    ```
    declare module '*.vue' {
      import { ComponentOptions } from 'vue'
      const componentOptions: ComponentOptions
      export default componentOptions
    }
    ```

2. [使用vue-router里的route和router](https://www.jianshu.com/p/ca0615a8ce08)
3. [ref语法糖](https://iiong.com/vue3-second-submission-of-ref-syntactic-sugar-experience/)
4. vue3 ['no-unused-vars'问题](https://segmentfault.com/q/1010000040813116)