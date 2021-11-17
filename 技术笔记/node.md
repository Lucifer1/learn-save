# Node笔记

### Node核心模块  

**1. 常用核心模块**

* fs 文件操作模块
* http 网络服务模块
* os 操作系统信息模块
* path 路径处理模块
* url url处理模块

**2. 端口号问题：**

* 因为我们只有一张网卡，网卡会有一个对应的ip地址，但是我们需要发送很多服务，所以就需要使用端口号
* 任何一个需要网络通信的都需要端口号(包括微信、QQ等，只不过我们平常不注意也看不到，但是可以查到)
* 我们在创建http请求的时候，也要server.listen一个端口号才可以使用，http默认是80端口，https默认是443端口

**3. 注意事项：** 

* 需要加载文件的时候就需要使用核心模块fs了，对对应的文件进行加载需要注意的地方就是不同的文件类型对应不同的content-type，写的时候要替换字符串数据要指定解码格式，否则会按照浏览器默认的解码格式进行解码不同的图片也对应不同的格式，到时候可以查，否则不能解析

### 客户端渲染与服务端渲染

**1. 客户端渲染：**

* 服务器发送的页面里边是包含模板和ajax请求的，客户端在进行解析的时候碰见ajax请求，就会再次向服务器发送请求，所以客户端渲染的话可能会涉及到多次请求速度较慢

**2. 服务器端渲染：**

* 服务器在传页面之前，就对所有的模板信息进行了替换，浏览器拿到的就是替换之后的结果，所以后边可能就不会涉及到ajax请求，所以它只涉及到一次请求，可能速度较快

**3. 对比：**

* 客户端渲染
    - 好处：用户可以提前看到部分网页信息，用户体验更好
    - 坏处：通过ajax请求的数据不能被爬虫爬取到，不利于SEO的优化，并且可能会涉及到多次的http请求
* 服务端渲染
    - 好处：浏览器是直接拿到最终结果的，所有的信息都可以被爬虫爬取，有利于SEO
    - 坏处：如果模板信息过多，用户可能会看见一个长时间的空白网页，并且每次都需要完整的刷新页面，不能实现部分刷新

* 实例： 
    - 很多电商网站可以发现，对于商品的渲染，都是使用客户端渲染的，这样更有利于百度或者Google的搜索，如果使用ajax的话，是搜不到电商网站的信息的。因为使用了服务端渲染所以我们在观看商品，并且点击第一页第二页等，网站会完全的刷新，进行请求。而当我们观察评论信息等，因为不涉及到SEO优化，所有都是使用ajax的，可以部分刷新，用户体验更好。

### 模块化

**1. 什么是模块化**

* 文件作用域
* 通信规则
    - 加载
    - 导出

**2. CommonJS 模块规范**

* 模块作用域
* 使用 require 方法来加载模块
* 使用 exports 来导出模块中的对象

**3. require、export 和 export default/import、module.exports和exports**

* export与export default / import : 只有es6 支持的导出引入
* require: node 和 es6 都支持的引入

        语法： var 自己定义的变量名 = require('模块')

    - require的作用：
        + 执行被加载的模块
        + 得到被加载模块中的exports导出的对象

    - require加载规则：
        + 优先从缓存加载：
            * 如果一个js文件已经被加载过了，那么不会重复执行里边的代码，但是会给你返回该文件导出的对象

                    // main.js
                    require('./a')
                    require('./b')

                    // a.js
                    console.log('a')
                    require('./b')

                    // b.js
                    console.log('b')
                改代码只会输出1次b，因为a中加载了b，node会对b进行缓存，当main中再次requireb时，会直接从缓存中读取，不会重复执行

        + 标识符分析

                require('模块标识')

            * 路径形式的标识符：
                - require('./foo.js')
                - require('../foo.js')
                - 都是路径形式，结尾的.js可以省略
            * 核心模块
                - require('fs')
            * 第三方模块
                - require('第三方模块名')
                - require('art-template')
                - 查找第三方模块的入口文件的方式
                    + 找到node_modules中对应的模块名中的package.json文件
                    + 里边有一个main属性，里边就是整个模块的入口文件.


* module.exports / exports: 只有 node 支持的导出
    - Node默认是模块作用域，所有变量只在当前文件模块有效
    - exports：**用于导出多个成员**，导出的是一个对象，也就是一个{}，所以在导出的时候形式如下：

            exports.a = myParams
        给exports添加一个a变量，为我前边定义的变量

    - module.exports：**用于导出单个成员**，如果需要直接导出某个成员，而非挂在到exports中再使用时，使用这个方法

            module.exports = myParams
        这时候导入这个模块的地方，就直接拿到了我的myParams，而不是一个对象

        + 也可以使用module.exports = {a:, b:}来导出多个成员

* 原理解析：
    - exports是module.exports的一个引用：

            console.log(exports === module.exports)  // true

            exports.foo = 'bar'
            // 等价于
            module.exports.foo = 'bar'

    - 解释：其实相当对，node对于每个文件在开头有会定义一个module

            module = {
                exports： {}
            }
        然后在文件的结尾

            return module.exports
        按照这种模式，我们添加变量的时候就是

            module.exports.foo = 'bar'
        太复杂和太麻烦了，所以node创建了一个所以exports

            var exports = module.exports
        所以我们就可以直接使用

            exports.foo = 'bar'
        因为它是一个索引，所以你直接给exports赋值一个对象或变量时时，改变的就不是module.exports了，所以最后return中的内容不变，所以不能直接赋值一个对象，只能添加属性

            exports = {}  // 这种方式不行
            exports = 'bar'  // 这种方式不行
        所以它不能导出某一特定的变量，只能导出包含某变量的对象

### 客户端渲染与服务端渲染

**1. 客户端渲染：**




