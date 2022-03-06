1. Composition API
   1. setup()
   2. ref()
   3. reactive()
   4. toRef(obj, 'obj.property')
   5. toRefs(obj)
2. teleport
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