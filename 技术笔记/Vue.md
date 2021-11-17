[TOC]

# Vue

### **注意**

1. DOM里边使用定义的别名，需要在前边加上“~”
2. this.$router 拿到的是vue-router这个对象，this.$route 拿到的是当前哪个路由处于活跃状态。$router是一个vue-router的实例，$route当前路由的信息
3. created是界面刚刚创建，还没有挂载组件，mounted是挂载完组件之后，所以在进行获取组件操作时记得在mounted里边进行
4. 组件不能直接监听点击@click，如果需要监听的话写为 @click.native
5. 当你拿到一个组件对象时，可以直接访问组件内部的data，methods等，例如abc组件里边有一个test数据，可以通过使用 组件对象.test来获取test
6. 原生js监听img加载完成：img.load = function(){}，加载完了执行function。vue：@load='方法'监听图片加载完成
7. 所有组件都有一个$el属性，用于获取组件中的元素
8. 当使用keep-alive时，activated和deavtivated两个周期钩子才有用
9. v-for="item in 10"，遍历数字时，它是1-10，而不是0-9，以后如果用到的话，建议先自己试一试
10. 只有定位的元素（即position属性值不是static的元素）的z-index才会起作用。
11. vue props 中的参数为array/object时，不能直接使用{}，而需要使用函数形式：

    * 错误写法

        demo:{
          type:Array,
          default:[]
        }

        eslint语法报错：
        Invalid default value for prop “demo”: Props with type Object/Array must use a factory function to return the default value.

    * 正确的写法应该是：

        demo: {
            type: Array,
            default: function () {
                return []
            }
        }

        或是用箭头函数：

        demo: {
          type: Array,
          default: () => []

    * 对象的箭头函数写法：

        demoObj: {
          type: Object,
          default: () => ({})
        }

12. vue filter 过滤器可以对数据进行过滤函数中的操作：{data | filter}，用filter对data进行处理 
13. 关于时间的处理，几乎所有的服务器返回的都是unix的时间元年到现在的时间戳（单位为秒），像JS、Java、Pyhton里都有封装好的format函数（单位为毫秒）来对时间戳进行处理，来生成我们想要的时间，有机会验证一下）
14. 两个组件之间存在重复代码的话，想要复用代码，可以使用混入（mixins）来实现（我觉得也可以使用vuex）

        import {debounce} from "./utils";

        export const itemListenerMixin = {
          data() {
            return {
              itemImgListener: null,
              refresh: null,
            }
          },
          mounted() {
            // 进行防抖 图片加载完成的事件监听
            this.refresh = debounce(this.$refs.scroll.refresh(), 50)

            this.itemImgListener = () => {
              this.refresh()
            }

            // 监听图片加载完毕
            this.$bus.$on('itemImgLoad', this.itemImgListener)
          }
        }

    在使用的地方导入即可

15. 在使用vue-router和vuex时，穿件router文件夹和store文件夹，在main.js中导入时，他会自动识别这两个文件夹下的index.js，如果文件夹里的文件命名为index.js，那么导入时，你可以使用
        
        import store from './store'

    它会自动导入index文件里的东西，如果不是index.js，例如store.js，你需要完全导入，不能省略

        import store from './store/store.js'

16. 使用vuex自带的mapGetters方法可以将vuex中的getters方法与组件中的computed的方法合并，也有mapActions

        import { mapGetters } from 'vuex'

        computed: {
            ...mapGetters(['要导入的函数名'])
              or  
            ...mapGetters({
                自定义命名:'要导入的函数名' 
            })
        }

17. v-for中绑定key的作用是给item添加一个唯一的标识，更高效的渲染组件
18. 由于 JavaScript 的限制，Vue 不能检测以下数组的变动：
（1）当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
（2）当你修改数组的长度时，例如：vm.items.length = newLength
（3）通过delete删除对象属性也不是响应式的，要使用Vue.delete(对象，属性名)

### **ES6语法**

* ES6除了''和""以外，还可以使用``（TAB上边的那个点）来定义字符串，他的好处是可以直接回车换行

### 1. 计算属性

* 计算属性(computed)本质上是一个属性，它有getter和setter，但是我们在使用时只是实现了getter，而没有实现setter
* 计算属性在使用多次时，只会调用1次（因为他是有缓存的，效率比methods要高）
* v-show与v-if的区别：v-show是修改diplay属性，而v-if是dom是否渲染，是否存在

### 2. JavaScript高阶函数

* ##### 回调函数：
    - 被用于高级函数里边，作为参数传给高级函数的函数就称为回调函数。
    - 还有一种说法是，用来规范js函数的调用顺序。

* ##### obj.filter(callbackfn)

    * 参数为回调函数，对obj执行callbackfn进行过滤

* ##### obj.map()

    * 对obj进行操作

* ##### obj.reduce()

    * 对obj进行汇总

### 3. v-model

* label要想互斥（只能2选1），要给label里边的input的name属性赋相同的值
* 在vue里边，如果给label里边的input的value属性绑定相同的data也可以互斥
* **v-model本质为，v-bind:value + v-on:input="data = $event.target.value"**
* v-model绑定checkbox，绑定单个值，data为boolean类型。绑定多个值时，只需要给data设置为[]\(list类型)即可
* ##### 修饰符
    - lazy：v-model是实时绑定的，当使用v-model.lazy时，可以实现用户敲回车或者点击空白（失去焦点）的时候再进行刷新绑定
    - number：v-model进行值绑定时，默认为string类型，这时候使用v-model.number
    - trim：v-model去掉多余的空格

### 4. 组件化

* ##### 什么是组件化？
    - 将大的问题拆成一个又一个小的问题去解决
* ##### Vue的组件化思想 
    - 可以让我们用一个又一个独立可复用的小组件来完成我们的应用
    - 任何应用都可以抽象成一个组件树（Vue官方有图）
* ##### 全局组件与局部组件
    - Vue.extend()来编写组件的构造器，但是现在用的很少了，一般直接使用语法糖
    
            const myComponent = Vue.extend({
                template: 
                `
                    <div>lalalalal</div>
                `
            })
            Vue.component('cp1', myComponent)  #这里注册

    - 通过Vue.component('标签名',组件)来注册的组件为全局组件
    - 在Vue示例当中，也就是new Vue({components:})里边注册的组件为局部组件
    - 组件注册的语法糖
        + 就是省略Vue.extend()

                Vue.component('cp1', {
                    template: 
                    `
                        <div>lalalalal</div>
                    `
                })

    - v-bind不能识别驼峰，要将驼峰进行转换，mustache是可以识别驼峰的
* #### #组件之间传值
    + 父传子：在子组件的props中定义数据（也可以称之为变量），然后在使用的时候绑定即可

            例如：你在子组件中定义了name
            props: {
                name: String  //这里的String是限制传过来的数据类型，可以不写
            }
            或者
            props: {
                name: {
                    type: String,
                    default: 这是默认值
                }
            }
            然后在使用的地方加上name属性即可，例如cpn组件
            <cpn name='我是一个字符串'></cpn>
            <cpn :name='父组件中的属性'></cpn>     //使用v-bind来绑定父组件中的属性

    + 子传父：例如子组件为<cpn>。 使用自定义事件，this.$emit('传递的名称', 传递的参数)，然后在组件进行监听<cpn @传递的名称='父组件的函数'>  

            this.$emit('btnClick', item)
            <cpn @btnClick='cpnClick(item)'>    
            #(item)可以省略，系统默认把子组件传递的参数传给父组件
            #其实这里也是不能用驼峰的，但是脚手架里貌似可以用

    例如，点击button时向父组件传递数据
            
            <template>
                <div>
                    <button @click="btnClick"></button>
                </div>
            </template>
            methods: {
                btnClick() {
                    this.$emit('随便起的名称', 这是数据)
                }
            }

            <cpn @随便起的名称="父组件的函数(这里是数据)"></cpn>

### 5. 父子组件间的访问方式

    有时候父组件需要直接访问子组件，而不是使用props通信的方式，子组件需要直接访问父组件或者根组件

* ##### 父组件访问子组件
    - $children 在父组件的methods里边任意的函数里边this.$children即可获取子组件，返回的是一个数组（在开发时一般不使用这个方法，只有我们需要拿所有子组件时才可能会用，一般使用$refs）
    - $refs 这个需要在子组件加一个ref属性，然后再在methods里边调用，默认时为空[]
            
            <cpn ref='aaa'></cpn>
            this.$refs.aaa

* ##### 子组件访问父组件
    - $parent 用的更少，因为不好复用，不建议使用，在子组件里this.$parent,
    - $root 访问根组件

### 6. 插槽

* ##### slot基本使用
    - <slot></slot> 如果在插槽中放东西，就是设置默认值，例如:
            
            <slot><button></button></slot>

      如果在使用组件时，没有使用插槽，就会显示默认值，使用了，就显示你想要的值

* ##### 具名插槽slot
    - <slot name=''></slot>，在使用时要给使用的地方加slot属性，例如 <span slot='这里是我们插槽的名字'></span>

* ##### 作用域插槽slot
    - 父组件替换插槽里边的标签，但是内容是由子组件来提供， 例如cpn组件里边有一个languages的list

            <cpn>
                <template slot='具名插槽' slot-scope='myData'>  #这里的slot是可选选项，也就是说，作用域插槽可以用到具名插槽里边，myData也相当于是一个变量名称，可以随意定
                    <span>{{myData.languages}}</span>   #在这里使用这种形来调用子组件中的数据
                </template>
            </cpn>

            <template id='cpn'>
                <slot :data='languages'></slot>         #这里的data可以为任意名称，这里相当于声明一个变量
            </template>

            cpn: {
                template: "#cpn"
                data: {
                    return {
                        languages : ['java','java','java']
                    }
                }
            }

### 7. 模块化开发

* ##### ES5模块化
    - ES5没有模块化，所以使用匿名函数的解决方案

* ##### 常见的模块化规范
    - CommonJS、AMD、CMD、ES6的Modules
    - CommenJS(Webpack和Node.js用的多)：
        + 导出：

                module.exports = {
                    flat: true,
                    test(a, b){
                        return a + b
                    }
                }

        + 导入：

                let obj = require('xxx.js') 
                let {flat, tent} = require('xxx.js') 也可以直接获取

* ##### ES6的模块化
    - 模块化就是在script标签里边的type属性定义为module，然后在该js文件里边export导出，在使用的地方import导入即可，例如: import {name} from 'xxx.js'

        <script type="module"></script>

    - export default： 某些情况下，某个模块包含某个功能，我们并不希望给这个功能命名，而且让导入者自己命名，这时候我们就可以使用export default，**一个js文件中只能有一个export default不允许存在多个，并且它后边只能跟一个值或对象**，这里再使用import时可以不用使用{}了，直接为： import 我自己的命名 from 'xxx.js'
    - 当我们需要导入的东西太多时，例如:

            import {name,age,aaa,bbb,ccc,ddd} from 'aaa.js'

        我们可以使用

            import * as myName from 'aaa/js'
            myName.name

### 8. Webpack

* ##### 基本使用
    - 项目中要使用node依赖包时，要使用npm init命令安装依赖，这时候系统会生成package.json
    - webpack进行打包时，要有一个入口文件，例如main.js，在这个里边对你使用的各个文件，各个模块进行使用或者导入，然是在使用webpack对入口文件进行打包，webpack会自动处理与入口文件有关的各个模块各个依赖，然后进行打包，打包完成之后，webpack会生成一个js，在你想使用的页面中，使用打包后的js即可

            require('./css/normal.css')
            require('./css/special.less')
            const {param1, param2} = require(./js/abc.js)  param1和param2为接收的变量


    - webpack.config.js是webpack的配置文件，在里边对其进行配置，包括entry，output，loader等

            const path = require('path')
            module.exports = {
                entry: '.src/main.js',
                output: {
                    // path: 这里必须是绝对地址，path是node的一个库，__dirname是获取本文件的绝对路径，path.resolve是拼接路径
                    path: path.resolve(__dirname, 'dist')
                    filename: 'bundle.js'
                }   
            }

    - package.json里的scripts里边定义的指令，优先使用本地库，如果没有本地库才去找全局库，在所有cmd中，都优先使用全局库，所以当我们想使用本地库时，在package.json里边定义指令即可
    - npm install webpack --save-dev (--save-dev 是开始时依赖的意思，打包之后不用)
* ##### 核心为loader，可以在官方文档里边查找使用方法，用来处理各个文件，进行打包
    - webpack 使用多个loader时，它是从右向左读取的
    - url-loader 在使用时，options里边有一个limit选项，这里边限制了图片的大小，如果小于这个限制，url-loader会把图片编译成base64格式进行使用，大于这个限制还需要下载一个file-loader
    - ES6 To ES5     **babel-loader 脚手架里会有详细配置**
    - vue
        + npm install vue-loader vue-template-compiler --save-dev 安装 
        + 再到 webpack.config.js里边进行配置
* ##### plugin 在js文件里添加版权信息，webpack.BannerPlugin
            
            const webpack = require('webpack')
            module.exports = {
                plugins: [
                    new webpack.BannerPlugin('最终版权归xxx所有')
                ]
            }

* ##### HtmlWebpackPlugin 插件
    - 在dist文件（我们发布的文件）里边自动生成一个index.html文件（可以使用指定模板）
    - 将打包的标签自动添加到body中的script标签当中
    - 安装

            npm install html-webpack-plugin --save-dev

    - 使用

            const HtmlWebpackPlugin = require('html-webpack-plugin')
            module.exports = {
                plugins: [
                    new webpack.BannerPlugin('最终版权归xxx所有')
                    new HtmlWebpackPlugin()  //也可以有参数
                    new HtmlWebpackPlugin({
                        template: 'index.html'  //根据index.html来生成，他会在当前的配置文件webpack.config.js所在的目录下找index.html，然后作为模板来生成
                    })
                ]
            }   

    - js压缩的plugin
        + uglifyjs-webpack-plugin
* ##### webpack-dev-server搭建本地服务器
    - 这个本地服务器基于node.js，内部使用express框架
    - 安装： npm install webpack-dev-server --save-dev
    - 配置：

            module.exports = {
                devServer: {
                    contentBase: './dist',      //要服务于那个文件夹
                    inline: true                //是否实时刷新
                    port: 1234                  //还可以配置端口，默认为8080
                }
            }
    - 使用： 在package.json的scripts里边加上

            "scripts": {
                "serve": "webpack-dev-server --open"    //--open的作用是在跑完webpack-dev-server后，自动打开网页
            }
* ##### 给文件夹起别名
    - 在webpack.base.config.js里边的resolve属性的alias属性里边起别名

            resolve: {
                alias: {
                    '@': resolve('src')         //相当于给src起了别名为@，当我们使用/src/name时可以使用@/name
                }
            }

        在组件的script里边可以直接使用 import aaa from '@/name'
        **注意：**当我们的路径在dom里边使用，比如img里边，因为是src，所以不能直接使用，要使用~

            <img src="~@/name">



### 9. Vue CLI

* ##### 安装
    - 现在一般情况是使用的都是3.x的版本，通过 npm install @vue/cli -g来安装
    - 如果即想用2的模板进行创建，也想用3的，就需要拉取2的模板，使用 npn install @vue/cli-init -g来进行安装
* ##### Vue CLI2初始化项目
    - 指令：
            
            vue init webpack myProject

    - 配置项：
        + Project name: package.json中的项目的名称，直接敲回车的话，默认为初始化的名字
        + Project description: 项目描述，保存在package.json中
        + Author
        + Vue build: 使用哪个版本的vue
            * Runtime-only版本不能使用template，可能会导致项目不能运行，
                - 优点：它更小，运行效率更高，性能更高
            * Runtime + Compiler 适合大多数使用者
            * **区别**： 
                - main.js里边有区别，compiler使用了template，runtime-only使用了render箭头函数，自动生成时为h函数(本质为createElement函数，参数有三个('标签名'，{标签的属性}, [标签的内容]))


                        createElement('div', {class: 'box'}, ['hello', createElement(...)])   //内容里边可以继续嵌套
                        createElement(cpn)      //也可以直接放入一个组件效果一样，但是因为省略的ast步骤，效率更高

                - compiler里边的vue的运行过程：template -> ast(abstract syntax tree抽象语法树) -> render函数 -> virtual DOM -> real DOM(UI)
                - runtime-only的运行过程为： render函数 -> virtual DOM -> real DOM(UI)
                - 对比的话，only的性能更高，vue内部的代码量更少（因为它不需要写template -> ast(abstract syntax tree抽象语法树) -> render函数的处理的代码），runtime-only的.vue文件里边的template不需要使用template ->ast，而是由vue-template-compiler这个库自己帮我们解析成了render函数

        + vue-router: 
        + ESLint: 是否使用ESLint对代码进行规范（ESLint当代码不规范时，编译直接报错）
        + unit test: 单元测试
        + e2e test with Nightwatch: end to end 使用Nightwatch进行端到端测试
    - **package-lock.json**：记录node_modules里安装的真实版本，在package.json（这里只会规定一个大概的版本）里边有时候要求的安装版本与node_modules里安装的会不同，这里进行记录
    - static文件：在build后，会原封不动的复制到dist文件当中
    
* ##### Vue CLI3初始化项目
    - 指令：

            vue create myProject

    - 配置项(按空格是选择或者取消)：
        + please pick a preset
            * default(babel, ESlint)
            * Manually
        + 自己看吧。。。
    - public文件夹：在build后，原封不动的复制到dist当中
    - Vue CLI3的配置文件的修改方式：
        + Vue UI：图形化界面进行修改
        + node_modules/@vue/cli-service/webpack.config.js，进去你会发现一个require('./lib/Service')你会发现各种各样的配置
        + vue.config.js：在你当前这个项目的目录下创建这个文件，名字是固定的，在build时会进行合并

* ##### 箭头函数
    - 如果箭头函数中只有一行代码，那么它会自动把这行代码返回
    - 箭头函数中this与正常的function定义不同

### 10. Vue-router

* ##### SPA页面（单页面富应用， simple page web application，前端路由阶段）
    - 核心为:改变url整体页面不刷新

* ##### 如何实现改变url，页面不刷新 
    - 更改url的hash，例如：

            www.baidu.com
            console:  location.hash = 'aaa'
            result: www.baidu.com/aaa，但是页面不会刷新

    - H5里边的history模式:
        + history.pushState({}, '', 'aaa')  
          history.back()
          history.forward()
          这两个可以配套，可以返回
          history.go()  注：history.go(-1) == history.back(),history.go(1) == history.forward()
        + history.replaceState({}, '', 'bbb')  这个不能返回

* ##### router-link
    - to属性： 定义要指向的url

            <router-link to='/home'></router-link>

    - tag: router-link最终默认渲染成a标签，我们可以手动改为别的

            <router-link tag='div' or tag='button'></router-link>

    - router-link当使用h5的history时，默认使用pushState(可以使用网页中的后撤键)，我们可以手动设置成replaceState(禁止用户使用后撤键)

            <router-link to='/home' tag='li' replace></router-link>

    - active-class:两个roter处于活跃状态时，添加的class(很少用)

            <router-link to='/home' tag='li' replace active-class='myClass'></router-link>

    - 在组件当中使用时，是使用$router属性进行修改

            this.$router.push('/home')

    - 动态路由的使用：例如，要在home页面后边动态的拼接url，就需要在映射里边进行修改

            routes: [
                {
                    path: '/home/:userId'       //这个userId可以为任意名字
                    component： Home
                }
            ]

        然后在调用的时候用v-bind进行绑定就行

            <router-link :to="'/home' + 我们data里边的数据名称"></router-link>

        我们如何获取home后边的数据，并使用到我们的vue当中：使用this.$route

            可以在methods或者computed里边
            this.$route.params.userId         //这里为什么是userId，是因为上边我们写的名字为userId，加入是abc，这里就是abc

        this.$router和this.$route的区别：
            + this.$router:是我们在router.js里边我们const rou = new Router({})的常量
            + this.$route是当前我们在使用哪个路由，也就是哪个路由处于活跃状态

* ##### 路由的懒加载
    - vueCLI3，经过npm run build打包之后的js文件分为三个：
        + app.哈希码.js：业务逻辑代码，也就是我们自己写的代码
        + manifest.哈希码.js：底层的支撑，比如说对ES6，CommonJS的支撑等
        + vendor.哈希码.js：项目里边引用的第三方的东西，例如vue和vue-router等
    - 为什么使用懒加载
        + 项目在打包时，js文件可能会非常大，同时加载可能会影响加载速度，所以需要懒加载（用到时再加载）
        + 如果把不同的路由对应的组件分割成不同的代码块，当路由被访问时再加载对应的组件，效率就更好了（也就是用到时再加载）
        + 懒加载做的事情就是将路由对应的组件包装成一个又一个的小的js文件，用到时再加载
    - 代码实现：

            原来是：
            import Home from './components/home'
            routes: [
                {
                    path: '/home'
                    component： Home
                }
            ]

            懒加载：
            routes: [
                {
                    path: '/home'
                    component： () => import('./components/home')
                }
            ]
            或者(这样写的话更简洁，方便统一管理)：
            const Home = () => import('./components/home')
            routes: [
                {
                    path: '/home'
                    component： Home
                }
            ]

* ##### 路由的嵌套：
    - 假如我们想在/home后边添加子路由/news，需要这样配置(子路由里边也可以设置默认值，设置redirect)：

            routes: [
                {
                    path: '/home'
                    component： () => import('./components/home')
                    children: [
                        {
                            path: 'news'        //注意，这里不需要加/
                            component: import('./components/news')
                        },
                    ]
                }
            ]

        然后需要到Home组件当中再添加一个router-view，并且router-link也要注意写全，而不是只写news

            <router-link to='/home/news'></router-link>
            <router-view></router-view>

* ##### 路由的参数传递
    - 第一种方式就是上边的动态路由
    - query方式
        + 要更改router-link中的to属性，用v-bind绑定，然后绑定一个{}对象，里边有path和query属性

                <router-link :to="{path: '/user', query:{name:'lalala', age: 18}}"></router-link>

            然后在user.vue里边使用$route.query.age等来取出来进行使用
    - 在组件的methods中使用，也是使用this.$router.push()，然后在push里边输入上边的对象即可

        methods: {
            这是我的方法名() {
                return this.$router.push({
                    path: '/user', 
                    query: {
                        name:'lalala', 
                        age: 18 
                    }
                })
            }
        }

* ##### 导航守卫（去看看vue-router的官网）
* ##### keep-alive及其他问题
    - vue组件除了created和beforeMouted等属性，还有activated和deactivated属性，不过这两个属性只有在组件被keep-alive包起来时才能使用
    - 它有两个非常重要的属性：
        + include：字符串或正则表达式，只有匹配的组件会被缓存
        + exclude：字符串或正则表达式，任何匹配的组件都不会被缓存

### 11. $符号的解释，例如$router

* **所有的vue组件都继承自vue类的原型**
    - 例如，当你给vue类的原型，添加一个属性时，那么所有的组件都可以使用这个属性

            Vue.prototype.test = function(){
                console.log('这是测试')
            } 

        那么你在任意的组件里边都可以使用this.test()进行调用，一般来说都使用$test来防止冲突

### 12. Promise

* ##### Promise的基本使用：
    - 什么情况下会用到promise？
        + 一般情况下，是有异步操作时，使用promise对异步操作进行封装
    - 注意：
        + Promise接收的参数是一个函数
        + resolve和reject都是函数
        + then和catch接收的也都是函数
    - 链式调用使用方式：

            new Promise((resolve, reject) => {
                setTimeout((data) => {      //这里用setTimeout来模拟异步操作
                    resolve(data)           //用resolve函数来把data传给then函数，你应以为lalala,那么then里边data保存的就是lalala
                    reject('error data')    //数据获取失败，使用reject
                }, 1000)
            }).then(data => {               //当数据获取成功时，使用resolve函数，然后执行then函数
                console.log(data)
                return new Promise((resolve, reject) => {
                    //来这里进行嵌套调用
                })
            }).catch(data => {
                console.log(data)       //这里打印的就是error data这个字符串
            }) 

* ##### Promise的链式调用
    - 简化过程：

            new Promise((resolve, reject) => {
                setTimeout((data) => {      
                    resolve(data)           
                    reject('error data')   
                }, 1000)
            }).then(data => {               
                console.log(data)       //拿到data后，想对data进行操作，比如拼接'111'
                return new Promise((resolve, reject) => {       //这里的reject没用到，所以可以省略，写成resolve => {}
                    resolve(data + '111')
                })
            }).then(res => {
                console.log(res)
            })

    - 上边的过程进行简化(Promise提供了resolve方法，当然也有reject方法，可以在catch里边使用)
    
            new Promise((resolve, reject) => {
                setTimeout((data) => {      
                    resolve(data)           
                    reject('error data')   
                }, 1000)
            }).then(data => {               
                console.log(data)       
                return Promise.resolve(data + '111')
            }).then(res => {
                console.log(res)
            })

    - 再次简化(Promise自动对返回的数据使用Promise.resolve进行封装，reject不行)
    
            new Promise((resolve, reject) => {
                setTimeout((data) => {      
                    resolve(data)           
                    reject('error data')   
                }, 1000)
            }).then(data => {               
                console.log(data)       
                return data + '111'
            }).then(res => {
                console.log(res)
            })

### 13. axios

* ##### 方法简介
    - axios(config)

            axios({
                url:
                params:
                method:
                timeout:
                ...
            })

    - axios.get()
    - axios.post()
    - axios.delete()
    - axios.head()
    - axios.put()
    - axios.patch()

* ##### 并发请求
    - 做一个功能，需要两个请求都到达后，才向下进行
    - axios.all(list)：
        + 参数：需要传入一个数组，需要几个同时到达，就在数组里边写几个数据请求
        + 返回：一个数组

                axios.all([axios(), axios()]).then(res => {
                    res[0].操作
                    res[1].操作
                })

            还有一个方法axios.spread可以将结果展开

                axios.all([axios(), axios()])
                .then(axios.spread((res1, res2) => {
                    res1.操作
                    res2.操作
                }))

* ##### 关于配置config的相关信息
    - axios.default.baseURL巴拉巴拉的
    - baseURL
    - timeout
    - method
    - transformRequest
    - transformResponse
    - headers
    - params

* ##### 创建实例
    - 为了防止总是使用全局的axios产生混乱，或者处理不同请求的不同配置，需要为请求创建实例
    - axios.create(config)

            const instance1 = axios.create({
                                    baseURL:
                                    timeout:
                                })
            instance1({
                url: ""
            }).then(res => {}).catch(err => {}) //catch捕捉异常

* ##### 拦截器
    - 用于我们发送请求后，或者得到响应后，进行对应的处理
    - 请求拦截:例如有一个instance1实例，那么拦截器代码为：
        + instance1.interceptors.request.use(config => {}, err => {}) 拦截请求
        + use()代表你要使用这个拦截器，他有两个参数，两个参数都为函数
            * config:请求成功时使用的函数
            * err: 请求失败时的函数
        + 使用：
        
                instance1.interceptors.request.use(config => {
                    console.log(config)
                    return config   // **当你使用拦截器时，一定要返回，否则就被拦截掉了，无法请求到数据**
                }, err => {})

        + 请求拦截的作用：
        
            * 比如我们在请求中，想添加那个圆圈动画，可以在config中添加，
            * 或者对config进行规范，这就是拦截器的作用
            * **比如我们请求数据时，需要携带token，比如需要用户先登录，就可以先拦截下来，然后跳转到用户登录界面，进行登录，再继续请求数据**

    - 响应拦截：
        + instance1.interceptors.response 拦截响应
        + 使用：

                instance1.interceptors.response().use(res => {
                    一系列处理。。。。
                    return res //记得返回，否则请求的地方就拿不到结果
                    或者：
                    return res.data //只返回data，这样可以去掉服务器给我们的其他的乱七八糟的东西
                }, err => {})



### 14. Vuex

* ##### Vuex简介
    - 什么是Vuex？
        + Vuex是专为Vus.js开发的一个状态管理模式
        + 所谓状态管理模式就是，有很多个组件需要共享多个变量，那么把这多个变量放到一个对象里边，然后把这个对象放到vue的顶层的示例里边，给所有组件共享（我们也可以自己写，但是Vuex是响应式的，自己实现比较麻烦）。
        + **Vuex里边储存的一定是需要在多个页面共享的状态**
    - 什么样的状态需要在多个组件之间共享，而不是使用父子组件传讯的方式？（token）
        + 大型项目里边的状态，比如说：用户的登陆状态、地理位置信息、购物车状态等，这些状态就需要统一的地方保存和管理，并且还是响应式的
        + token：在后台请求数据时，需要携带token（令牌）

* ##### Vuex的使用
    - 创建过程(真正创建的不是new Vuex而是 new Vuex.Store)：

            import Vue from 'vue'
            import Vuex from 'vuex'

            Vue.use(Vuex)

            const store = new Vuex.Store({
                state:{},       //存储数据状态
                mutations:{},   //定义方法，
                actions:{},     //用来处理异步操作
                getters:{},     //类似于组件里边的计算属性
                modules:{}      //划分模块，针对不同的模块再进行管理
            })

            export default store

        然后再main.js里边导入并注册

    - state的修改过程：
        + Vue components -(dispathc)-> Actions -(commit)-> Mutations -(mutate)-> State -(Render)-> Vue components 或者  
          Vue components --> Mutations --> State --> Vue components
        + Actions:它的作用是用来处理异步操作，异步网络请求，因为为了追踪State是在哪里被修改了，官方给Mutations开发了一个Chrome插件Devtools，而这个插件只能监听同步操作，无法监听异步，所以才需要Actions

    - 核心模块详解：
        + state：保存状态，推荐使用单一状态树，即只创建一个store
            * 单一状态树：就是建议在store.js里边只有一个new store
        + getters：类似于组件里边的计算属性computed，它也有默认的state参数，还可以有另外一个参数就是getters，也就是这个getters本身，用来获取getters里边的方法，例如sum(state, getters)，**也就是说，不管你前两个参数叫什么名字，第一个参数代表的一定是state，第二个一定是getters**，所以说如果想给getters传参，要使用其他方法：

                getters: {
                    sum(state) {
                        return function(这是我想传入的参数){
                            //在这里使用参数即可
                        }
                    }
                }

            因为返回的是个函数，所以在调用的时候以函数的形式使用，并传入参数即可

                this.$store.getters.sum(我是参数)

        + mutations：这里边的方法会有一个默认参数为state，也就是上边这个state，比如说定义sum(),它相当于sun(state)
            * 使用mutations里边定义的函数的方法：

                    store.commit('mutations里边定义的方法名')
                    components里边为this.$store.commit('sum')

            * 传参方式：

                    首先：
                    sum (state, num){           //在这里定义并使用
                        sum += num
                    }
                    store.commit('sum', count)  //先这里进行传参
                如果想传递多个参数，那么
                    store.commit('sum', [参数1，参数2，参数3])

            * 另外一种提交方式：

                    store.commit({
                        type: 'sum',
                        count: count
                    })
                    
                使用这种方式的时候就要注意，传过去的参数，不是一个数值，而是一个对象，在函数里边使用时，要用count.count才可以，所以这个时候定义个形参叫payload更为合适

            * mutations里边的函数定义：

                    mutations: {
                        我的函数(state, 传过来的参数){
                            // 操作
                        }
                    }
                这个的参数有个专业名词交payload，当然可以起任何名字

            * 类型常量（去看一眼视频吧，理解了下边挺简单的，或者看官网)：就是单独创建了一个文件，在里边定义函数名并导出，然后后按照第二种方法的声明方式，在mutations里边和使用的地方进行统一，例如

                    export const MYPARAM = 'myparam'
                    import {MYPARAM} from 'xx.js'
                    原来函数定义为：
                    myparam(){

                    }
                    因为可以定义为
                    ['myparam'](){

                    }
                    所以现在可以为：
                    [MYPARAN](){

                    }

                这样的话，在使用的时候，方法名得到了统一，哪怕我在export const MYPARAM = 'myparam'写错了，对我的代码也没有影响，这是官方推荐形式

                - 方法的定义不光可以使用：

                        方法名(){

                        }

                    也可以使用

                        ['方法名'](){

                        }

        + action：因为Devtool不能监听异步操作，所以所有异步操作都要在action里边进行,默认参数为context对象，在普通的vuex里边可以理解为我们定于的store对象（const store = new Vuex.Store({})中的store），在module里边就有其他含义了，表示对应的module的上下文

                函数声明和mutations一样，只不过默认参数不一样：
                sum(context, param){        //这里的param是用来接收参数，没有传参可以不写，这里的context可以看成我们声明的store，也就是$store
                    setTimeout(() => {
                        //这里调用mutations里边的函数！注意这里不能跳过mutations直接操作state
                        context.state.myData = 'lalalal'    //直接修改了所以是错误的
                        context.commit('mutations里边的方法')    //正确写法
                    }, 1000)
                }

            在使用时，应该是

                this.$store.dispatch('sum', '这第二个参数，是我要传递的参数，可以不写')

            * 如何判断里边的异步函数已经完成，可以从action里边传回一个Promise(可以看看视频，我觉得天秀)：

                    sum(context, myParam){
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                context.commit('mutations里边的方法')
                                console.log(myParam)

                                resolve('这是我想传回去的参数')       
                            }, 1000)    //神奇的地方来了，不在这里写then，而是在调用的地方
                        })
                    }

                    this.$store.dispatch('sum', '这是参数').then(res => {
                        console.log('里边的异步已经执行完了')
                        console.log(res)    //这是resolve给的数据
                    })

                **解释**：因为then函数是接在new Promise后边的，而sum函数return的就是一个new Promise，所以我们的this.$store.dispatch('sum', '这是参数')这句代码执行完之后，相当于被替换成了new Promise()，所以它后边可以接then（天秀！！！）

        + modules：当你想要进行模块划分时，在这里边进行，举例：

                const moduleC = {
                    state:{},
                    mutations:{},
                    actions:{},
                    getters:{},
                    modules:{}
                }

                modules: {
                    a: {
                        state:{},
                        mutations:{},
                        actions:{},
                        getters:{},
                        modules:{}
                    },
                    b: {
                        state:{},
                        mutations:{},
                        actions:{},
                        getters:{},
                        modules:{}
                    },
                    c: moduleC
                }

            这样来进行你想要的划分，使用方法：
            * state：modules里边的state在使用时，Vue是将它封装成一个对象，放在根state里边的，所以使用是： $store.state.a.name
            * mutations：modules里边的mutations的命名不能与根store里边的mutations命名重复，因为它的使用是：$store.commit('modules里边的mutations的方法名')，直接调用，如果重复了会有冲突
            * getters：modules里边的getters，可以直接调用自己本模块的getters，也可以直接调用根模块的getters，它还拥有了第三个参数rootState
            * actions：与根模块相比，他的context多了两个属性：rootGetters和rootState
            * 对象的解构：

                    const obj = {
                        name: '123',
                        age: 19,
                        height:1.88
                    }

                    解构的使用办法为：
                    const {name, height, age} = obj     //它是按名字取值的，不是按顺序

        + 目录结构：
            * 将mutations和actions等，抽成单个的文件，然后再store.js里边导入
        
        + getters:
            * 基本使用：

                    我的函数名(state) {

                    }
                默认携带一个state参数，来获取vuex中的state
            * 第二个参数

                    我的函数名(state, getters) {

                    }
                第二个参数为getters，获取当前getters里的其他函数，如果你第二个函数名不为getters
                    我的函数名(state, aaa) {

                    }
                aaa代表的还是getters

        + 响应式要求：
            * 提前在store中初始化好所有属性
            * 当给store中添加新的属性时，使用下面的方式
                - Vue.set(要修改的对象，索引值或key值，修改后的值)
                - 用新对象给旧对象重新赋值





* ##### Vuex的数据响应式
    - 什么样的数据是响应式
        + **必须是提前在store中初始化好的属性**，也就是说我们后边通过一些方法添加的属性，不是响应式的，例如:
            
                store.state.info['address'] = 'lalala'      //address是我们新添加的属性

        + 我们可以使用Vue的方法来使我们添加的数据变为响应式
            * Vue.set(要更改的数据, 下标或属性, value)     //当要改的数据为数组时，第二个参数为下标
            * Vue.delete(要更改的数据, 下标或属性)

### 15. better-scroll

* ##### better-scroll简单实用
    - 创建：
            # 普通js里边创建
            const bscroll = new BScroll(标签, {参数})
            标签你可以使使用document获取，例如
            document.querySelector('类名') 

            # vue创建
            npm install better-scroll --save
            import aaa from 'better-scroll'
            new aaa(标签, {参数})

    - 参数： 
        + probeType:默认为0
            * 0,1:代表不监听滚动
            * 2：监听手指滚动的过程，但是不监听惯性滚动，也就是说手指离开之后，惯性滚动的距离，是不监听的
            * 3：监听所有滚动，包括惯性滚动 
            * 使用方式：

                    const bscroll = new BScroll(标签, {
                        probeType: 2
                    })
                    bscroll.on("scroll", (position) => {
                        //通过on来监听滚动事件，后边传入一个func，position是自带的参数，用来传递实时位置。
                    })

        + click:默认为false，默认会阻止浏览器的原生click事件。当click为false时，button是可以点击的，div或span不行，当click为true时，都可以点击不被阻止
        + pullUpLoad:默认为false，用来实现上拉加载更多

                    const bscroll = new BScroll(标签, {
                        probeType: 2
                        pullUpLoad: true
                    })
                    bscroll.on("pullingUp", () => {
                        //通过on来监听滚动事件，后边传入一个func，没有自带参数。
                        //但是默认情况下只能调用一次，需要在调用完之后再结尾加上一句
                        //bscroll.finishPullUp()

                        //一般的使用顺序：
                        1. 发送网络请求，请求数据
                        2. 完成后进行展示
                        3. bscroll.finishPullUp()，结束上拉加载更多，方便再次加载
                    })

### 16. 函数防抖动

* ### 





