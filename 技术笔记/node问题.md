1. path.resolve和path.join
   1. 目前我感觉得唯一的区别就是，在处理/，也就是根目录的时候，path.join会直接在当前目录下拼接，而resolve是从根目录重新cd
   2. 例子

    ```
    var path = require('path');
    var test = path.join(__dirname, '/src/js')
    var test2 = path.resolve(__dirname, '/asset/img')
    console.log(__dirname);
    console.log(test);
    console.log(test2);
    ```
    ```
    /Users/lightman/WebstormProjects/test/src/js
    /Users/lightman/WebstormProjects/test/src/js/src/js
    /asset/img
    ```

2. ./ ../ /
   1. ./:当前目录
   2. ../:父级目录
   3. /:根目录
3. fs.readdirSync:返回一个包含指定目录下所有文件名称的数组对象
4. HTTP和HTTPs agent，用来处理网络层面的东西，帮助我们复用TCP连接，小用户时不明显，用户增加时很有用
5. Process
   1. process.on(uncaughtException", (err) => {})
   2. process.on(unhandledRejection", (err) => {})
   3. 如果没有这两个会经常出现不可预期的东西
   4. 服务端开发更加看重稳定性和可维护性
6. Cluster（集群）
   1. Node本质上是一个单进程的东西
   2. Cluster用于解决这个问题，自行百度
   3. Workers
7. 解决高并发需要关注
   1. 内存：
      1. 内存泄漏，打压停掉之后，内存占有没有降下来，考虑内存泄漏
      2. 多个进程抢一个资源，资源被占用，没有得到释放，所以内存没降。
   2. CPU：
      1. 打压停掉之后cpu不掉，考虑哪里是否有庞大的计算。
   3. IO：
   4. 网络带宽
8. qps
9. 写后台一定要注意稳定性和可维护性
10. [ndb调试](https://zhuanlan.zhihu.com/p/41315709)
11. [child_process.spawn](https://www.runoob.com/nodejs/nodejs-process.html) 使用指定的命令行参数创建新进程，child_process.spawn(command\[, args\]\[, options\])
12. [node爬虫](https://www.jianshu.com/p/0de5a6e53482)
13. 获取当前目录的根路径，process.cwd()