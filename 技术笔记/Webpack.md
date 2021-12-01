1. [npm install原理](https://www.jianshu.com/p/8beac6cb7309)-整体流程：
   1. 检查 .npmrc 文件：优先级为：项目级的 .npmrc 文件 > 用户级的 .npmrc 文件> 全局级的 .npmrc 文件 > npm 内置的 .npmrc 文件
   2. 检查项目中有无 lock 文件。
   3. 无 lock 文件：
      1. 从 npm 远程仓库获取包信息
      2. 根据 package.json 构建依赖树，构建过程：
         1. 构建依赖树时，不管其是直接依赖还是子依赖的依赖，优先将其放置在 node_modules 根目录。
         2. 当遇到相同模块时，判断已放置在依赖树的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的 node_modules 下放置该模块。
         3. 注意这一步只是确定逻辑上的依赖树，并非真正的安装，后面会根据这个依赖结构去下载或拿到缓存中的依赖包
      3. 在缓存中依次查找依赖树中的每个包
         1. 不存在缓存：
            1. 从 npm 远程仓库下载包
            2. 校验包的完整性
            3. 校验不通过：重新下载
            4. 校验通过：将下载的包复制到 npm 缓存目录
            5. 将下载的包按照依赖结构解压到 node_modules
         2. 存在缓存：
            1. 将缓存按照依赖结构解压到 node_modules
            2. 将包解压到 node_modules
      4. 生成 lock 文件
   4. 有 lock 文件：
      1. 检查 package.json 中的依赖版本是否和 package-lock.json 中的依赖有冲突。
      2. 如果没有冲突，直接跳过获取包信息、构建依赖树过程，开始在缓存中查找包信息，后续过程相同

2. 符号
   1. '~'（波浪符号）:他会更新到当前minor version（也就是中间的那位数字）中最新的版本。放到我们的例子中就是："exif-js": "~2.3.0"，这个库会去匹配更新到2.3.x的最新版本，如果出了一个新的版本为2.4.0，则不会自动升级。
   2. '^'（插入符号）: 这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前major version（也就是第一位数字）中最新的版本。放到我们的例子中就是："vue": "^2.2.2", 这个库会去匹配2.x.x中最新的版本，但是他不会自动更新到3.0.0。
3. resolve: 配置模块如何解析
   1. alias: 创建 import 或 require 的别名
      1. 可以在给定对象的键后的末尾添加 $,以表示精准匹配

            ```
            resolve: {
               alias: {
                  xyz$: path.resolve(__dirname, 'path/to/file.js'),
               },
            },

            import Test1 from 'xyz'; // 精确匹配，所以 path/to/file.js 被解析和导入
            import Test2 from 'xyz/file.js'; // 非精确匹配，触发普通解析
            ```
   2. extensions: 在引用时，没有写后缀名称的话，按extensions数据中的顺序进行解析，如果有多个文件名字相同，后缀不同，则只按第一个解析，跳过后边的
      1. 设置了extensions属性时，会覆盖webpack的默认数组
      2. 默认数组为extensions:['.js', '.json']

4. devServer
   1. hot: true 热更新，只会更新更改的组件或者模块，不会整体刷新页面
   2. open: true 是否自动打开浏览器
   3. proxy:
      1. target: 将接受请求的服务器由本地服务器代理到target服务器，举例来说就是，我们是从本地起了一个服务器是localhost:8080，我们从浏览器输入url请求资源，接收这个请求的服务器是localhost:8080，如果我们使用了target为www.baidu.com,那么接收这个请求的服务器就是www.baidu.com，
      2. changeOrigin:true，这个字段是用来更改请求头中的host，请求头中的host是用来标记我们要请求的地址的，一个服务器中可能存在多个网站，例如一个服务器中有谷歌，百度，必应等，但是url解析出来都是同一个ip，这时候就需要host来标记出我们访问的是哪一个host。**用来配置是否跨域？存疑，查清除**
      3. ws：websockets是否需要代理，需要为true
      4. pathRewrite:重新配置路径，可以按照自己需求配置

         ```
         pathRewrite: {
            '^/api': '/'
            //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
            //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
         }
         ```

5. Webpack chunk bundle
     1.   webpack的打包是从一个入口文件开始，也可以说是入口模块，入口模块引用这其他模块，模块再引用模块。Webpack通过引用关系逐个打包模块，这些module就形成了一个Chunk。如果我们有多个入口文件，可能会产出多条打包路径，一条路径就会形成一个Chunk。出了入口entry会产生Chunk，还有两种途径，下面会有介绍。
     2.   Bundle就是我们最终输出的一个或多个打包文件。确实，大多数情况下，一个Chunk会生产一个Bundle。但有时候也不完全是一对一的关系，比如我们把 devtool配置成'source-map'
     3.   Chunk是过程中的代码块，Bundle是结果的代码块。
     4.   Chunk是一些模块的封装单元。Chunk在构建完成就呈现为bundle。
     5.   产生chunk的途径
          1.   entry入口
          2.   异步加载模块
          3.   代码分割（code spliting）
6. Webpakck loader plugin
     1.   loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。
7. vue-loader 用于解析.vue文件。vue-template-compiler 用于编译模板。cache-loader 用于缓存loader编译的结果。thread-loader 使用 worker 池来运行loader，每个 worker 都是一个 node.js 进程
8. [source map](https://juejin.cn/post/6963076475020902436)、[第二篇](https://juejin.cn/post/6844903971648372743)、[七种模式](https://juejin.cn/post/6844903450644316174)
9. [chainWebpack与configureWebpack](https://www.jianshu.com/p/27d82d98a041)、[第二篇](https://segmentfault.com/a/1190000019920162)
     1.   chainWebpack通过链式编程的形式，来修改默认的webpack配置
     2.   configureWebpack通过操作对象的形式，来修改默认的webpack配置
10. configureWebpack对象返回的值会被webpack-merge合并到最终的webpack配置中，如果你需要基于环境有条件的配置行为，或者想要直接修改配置，可以使用这个。该方法的第一个参数就是已经解析好的配置，你可以直接修改配置，或者返回一个将会被合并的对象。像这样：
11. webpack-merge提供了一个merge连接数组和合并对象创建新对象的函数。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回值包装在函数中。**Promises are not supported**

      ```
      const { merge } = require('webpack-merge');

      // Default API
      const output = merge(object1, object2, object3, ...);

      // You can pass an array of objects directly.
      // This works with all available functions.
      const output = merge([object1, object2, object3]);

      // Keys matching to the right take precedence:
      const output = merge(
      { fruit: "apple", color: "red" },
      { fruit: "strawberries" }
      );
      console.log(output);
      // { color: "red", fruit: "strawberries"}
      ```
   1. [使用](https://www.jianshu.com/p/13229b672d66)：如果数据类型不一样，后面的直接完全覆盖前面的，如果两者都是基础数据类型，后面的也会覆盖前面的（这里省略）。如果两者都是数组的话，二者合并

      ```
      let a = {
      name:{}
      }
      let b = {
      name:''
      }

      // result
      {
      name:''
      }

      let a = {
      age:[1,2]
      }
      let b = {
      age:[3,4,5]
      }

      //result
      {
      age:[1,2,3,4,5]
      }

      完整 code
      const { merge } = require('webpack-merge');
      let a = {
      name:{},
      age:[1,2],
      detail:{
         location:'Chengdu'
      }
      }
      let b = {
      name:'',
      age:[3,4,5],
      detail:{
         district:'ShuangLiu'
      }
      }
      console.log(merge(a,b));

      //result
      {
         name: '',
         age: [1,2,3,4,5],
         detail: { location: 'chengdu', district: 'shuangliu' }
      }
      ```
   2. 对比 Object.assign，这个函数就是后者覆盖前者，是个浅拷贝

12. [.tap()  tapable](https://www.jianshu.com/p/273e1c9904d2)
    1.  tap 方法用于注册事件，支持传入两个参数，第一个参数为事件名称，在 Webpack 中一般用于存储事件对应的插件名称（名字随意，只是起到注释作用）， 第二个参数为事件处理函数，函数参数为执行 call 方法触发事件时所传入的参数的形参。
13. [webpack优化](https://juejin.cn/post/6844904071736852487)