1. document.createElementNS():用于在创建标签节点的同时指定它的命名空间，例如在创在svg里的节点时，如果不指定"http://www.w3.org/2000/svg"，那么html就无法识别你创建的标签属于svg，在页面上也就不能显示，因为在xml文档中，有多个模块，不同模块中有相同的命名，如果不指定，就无法识别。
2. base64：图片下载始终要向服务器发请求，这个格式可以实现随着HTML的下载同时将图片下载到本地。可以节约http请求
    1.  使用前提：图片足够小且因为用处的特殊性无法被制作成雪碧图（CssSprites），在整个网站的复用性很高且基本不会被更新。
    2.  使用 Base64 的好处是能够减少一个图片的 HTTP 请求，然而，与之同时付出的代价则是 CSS 文件体积的增大。通俗而言，就是图片不会导致关键渲染路径的阻塞，而转化为 Base64 的图片大大增加了 CSS 文件的体积，CSS 文件的体积直接影响渲染，导致用户会长时间注视空白屏幕。HTML 和 CSS 会阻塞渲染，而图片不会。
    3.  优点：
        1.  base64格式的图片是文本格式，占用内存小，转换后的大小比例大概为1/3，降低了资源服务器的消耗；
        2.  网页中使用base64格式的图片时，不用再请求服务器调用图片资源，减少了服务器访问次数。
        3.  base64编码的字符串，更适合不同平台、不同语言的传输；
        4.  算法是编码, 不是压缩, 编码后只会增加字节数，但是算法简单, 几乎不会影响效率，算法可逆, 解码很方便, 不用于私密信息通信;
        5.  解码方便, 但毕竟编码了, 肉眼还是不能直接看出原始内容;

    4.  缺点：
        1.  base64格式的文本内容较多，存储在数据库中增大了数据库服务器的压力；
        2.  网页加载图片虽然不用访问服务器了，但因为base64格式的内容太多，所以加载网页的速度会降低，可能会影响用户的体验。
        3.  base64无法缓存，要缓存只能缓存包含base64的文件，比如js或者css，这比直接缓存图片要差很多，而且一般HTML改动比较频繁，所以等同于得不到缓存效益。

3. JS hook（钩子机制）：简单来说就是用一张表去匹配，而不是一次次的if else。

    **使用if else**
    ```
    function student(name,score,praise){
        return {
            name:name,
            score:score,
            praise:praise
        }
    }
    function praiseAdd(students){
        var results={};
        for (var i in students){
            var curStudent=students[i];
            var ret=curStudent.score;
            if(curStudent.praise==1){
                ret+=20;
            }else if(curStudent.praise==2){
                ret+=10;
            }else if(curStudent.praise==3){
                ret+=5;
            }
            results[curStudent.name]=ret;
        }
        return results;

    }
    var liming= student("liming",70,1);
    var liyi= student("liyi",90,2);
    var liuwei= student("liuwei",80,3);
    var ertuzi= student("ertuzi",85,3);

    var result=praiseAdd([liming,liyi,liuwei,ertuzi]);
    for(var i in result){
        console.log("name:"+i+",score:"+result[i]);
    }

    ```
    **使用hook**
    ```
    function student(name,score,praise){
        return {
            name:name,
            score:score,
            praise:praise
        }
    }
    var  praiseList={
        1:20,
        2:10,
        3:5
    }
    function praiseAdd(students){
        var results={};
        for (var i in students){
            var curStudent=students[i];
            var ret=curStudent.score;
            if(praiseList[curStudent.praise])
            ret+=praiseList[curStudent.praise];
            results[curStudent.name] = ret;
        }
        return results;

    }
    var liming= student("liming",70,1);
    var liyi= student("liyi",90,2);
    var liuwei= student("liuwei",80,3);
    var ertuzi= student("ertuzi",85,3);

    var result=praiseAdd([liming,liyi,liuwei,ertuzi]);
    for(var i in result){
        console.log("name:"+i+",score:"+result[i]);
    }
    ```

4. Symbol

    * 所有Symbol类型的数据都是唯一的
    * Symbol主要作为对象的私有成员来使用
    * Symbol的参数是一个对象时，会调用对象的toString方法，然后再添加描述
    * 只能使用[]来调用用Symbol声明的属性值，不能使用.

      ```
      const mySymbol = Symbol();
      const a = {};

      a.mySymbol = 'Hello!';
      a[mySymbol] // undefined
      a['mySymbol'] // "Hello!"
      ```

    * Symbol作为属性名时，遍历对象时(for...in和for...of)不会显示Symbol定义的属性
    * Sybbol.for方法：接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。。
      * Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
      * Symbol.for()是在全局中注册，无论你的实行环境是否为全局
    * Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
      * 直接用Symbol()生成的Symbol不会被登记，所以keyFor会返回undefined

5. Object.create实现:**注意：返回的是一个实例，所以要用__proto__而不是prototype**
    ```
    // 主要代码，还有其他限制条件
    let Object.create = function(proto, propertiesObject = undefined) {
      function F(){} // 创建一个空的构造函数 F
      F.prototype = proto; // F 原型指向 proto
      let obj = new F(); // 创建 F 的实例
      return obj
    }
    ```

6. instanceof实现

    ```
    function instanceof(L, R) {
      const baseType = ['string', 'number','boolean','undefined','symbol']
      if(baseType.includes(typeof(L))) { return false }

      var RP = R.prototype
      L = L.__proto__

      while(true) {
        if(L === null){    //找到最顶层
            return false;
        }
        if(L === RP){       //严格相等
            return true;
        }
        L = L.__proto__;  //没找到继续向上一层原型链查找
      }
    }
    ```

7. new实现;

   1. 创建一个空对象

      ```
      Object.create(null)
      var a = {}
      都可以
      ```
   2. 更改对象的原型
   3. 更改this指向并调用参数

    ```
    function _new(fn,...args){   // ...args为ES6展开符,也可以使用arguments
        //先用Object创建一个空的对象,
        const obj = Object.create(fn.prototype)  //fn.prototype代表 用当前对象的原型去创建
        //现在obj就代表Dog了,但是参数和this指向没有修改
        const rel = fn.apply(obj,args)
        //正常规定,如何fn返回的是null或undefined(也就是不返回内容),我们返回的是obj,否则返回rel
        return rel instanceof Object ? rel : obj
    }
    ```

8. 作用域

  * 词法作用域：函数在定义的时候决定了函数的作用域,JavaScript 采用词法作用域(静态作用域).静态作用域关心函数在何处被定义.
  * 动态作用域：函数在调用的时候决定函数的作用域,目前只有部分语言支持.动态作用域关心函数在何处被调用.JS中只有this涉及到动态作用域

9. 一个小问题

    ```
    function foo() {
        console.log(a);
        a = 1;
    }

    foo(); // ???   //报错，说a没有声明，因为没用用var声明，如果声明了就是undefined了


    function bar() {
        a = 1;
        console.log(a);
    }
    bar(); // ???   // 1
    ```

10. 闭包

  * 确定函数的输出其实很简单，只需要判断它执行时的环境中变量的值，基本只有在涉及到定时器时才会思考这个问题

    ```
    //这三个公共函数是共享同一个环境的闭包。多亏 JavaScript 的词法作用域，它们都可以访问 privateCounter 变量和 changeBy 函数。
    var makeCounter = function () {
            var privateCounter = 0;
            function changeBy(val){
                privateCounter += val;
            };
            return {
                increment: function(){
                    changeBy(1);
                },
                decrement: function(){
                    changeBy(-1);
                },
                value: function(){
                    return privateCounter;
                }
            }
        };
        var Counter1 = makeCounter();   //如果没有被垃圾回收的话，函数没执行一次就会对应一套context
        var Counter2 = makeCounter();
        Counter1.increment();
        console.log(Counter1.value());//1 每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境。然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。
        console.log(Counter2.value());//0 以这种方式使用闭包，提供了许多与面向对象编程相关的好处 —— 特别是数据隐藏和封装。
    ```
    ```
    //如果没有被垃圾回收的话，函数没执行一次就会对应一套context
    var makeCounter = function (i) {
        var privateCounter = i;
        console.log(privateCounter);
        function changeBy(val){
            privateCounter += val;
            console.log(val);
        };
        return changeBy
    };

    makeCounter(1)(5)
    makeCounter(2)(10)

    // 输出
    1
    5
    2
    10
    ```
    ```
    经典面试题
    for (var i = 0; i < 5; i++) {
        setTimeout(function() {
            console.log(new Date, i);
        }, 1000);
    }

    console.log(new Date, i);

    // 输出
    Fri Jul 24 2020 19:33:42 GMT+0800 (中国标准时间) 5
    Fri Jul 24 2020 19:33:43 GMT+0800 (中国标准时间) 5
    Fri Jul 24 2020 19:33:43 GMT+0800 (中国标准时间) 5
    Fri Jul 24 2020 19:33:43 GMT+0800 (中国标准时间) 5
    Fri Jul 24 2020 19:33:43 GMT+0800 (中国标准时间) 5
    Fri Jul 24 2020 19:33:43 GMT+0800 (中国标准时间) 5

    // 修正为5，0，1，2，3，4
    for (var i = 0; i < 5; i++) {
        (function(j) {  // j = i
            setTimeout(function() {
                console.log(new Date, j);
            }, 1000);
        })(i);
    }

    console.log(new Date, i);
    ```
    其实很简单，第一个在运行for循环时，定时器的定时结束后，即1秒后，将setTimeout加入到宏任务队列当中，此时它的上下文环境(context)中i已经为5，所以先输出42 5之后，连续输出5个 43 5。
    而第二个函数时，它被立即执行了，也就是在它执行的时候，它的context中就是对应的数字，所以才是5，0，1，2，3，4

11. 禁右键

    ```
    document.oncontextmenu = () => { return false }
    ```

12. && 和 ||
    1.  JS中的&&和||，当出现在条件判断语句中时，例如if，会遵守C语系规则。
    2.  JS中的&&和||，当初现在赋值语句中时，例如变量赋值、return结果等，会遵循以下规则：
        * 表达式a && 表达式b :  计算表达式a（也可以是函数）的运算结果，如果为 True, 执行表达式b（或函数），并返回b的结果；如果为 False，返回a的结果；
        * 表达式a || 表达式b :   计算表达式a（也可以是函数）的运算结果，如果为 Fasle, 执行表达式b（或函数），并返回b的结果；如果为 True，返回a的结果

13. 对象的属性名，用不用引号都可以

    ```
    var a = {
        name: 'zhangsan',
        age: 18
    }

    var b = {
        "name": "lisi",
        "age": 3
    }

    console.log(a.name);  //zhangsan
    console.log(b.name);  //lisi
    ```
    都可以拿到对应的值，还有，a.name和a["name"]都是一样的。

    **注意：**当属性名中有特殊字符，例如-时，必须使用引号，否则会报错。

14. moment对象 to date： moment.valueOf()
15. 获取元素到页面顶部的距离
    1.  buttonElement.getBoundingClientRect().top  left  right bottom
16. js快速转换类型
    1.  number类型后边 + '' 会转换为字符串
    2.  string类型的数字例如，'9' 在前边加一个+号会转换为number类型
        1.  a = '9'  +a = 9
17.  虚环境的添加：
    1.  在页面对应的template里边添加一个js

            ```
            <% if (process.env.VUE_APP_CONFIG === 'test' || process.env.VUE_APP_CONFIG === 'dev') {
            %>
            <script src="https://xyks.yuanfudao.biz/h5/venv-tools/venv-tools-0.0.3.js"></script>
            <% } %>
            ```
        需要注意的是，if的判断条件，不同项目里边关于test和dev的定义可能是不一样的，这次碰到的是，vue-cli3的项目里边是上边这种，vue-cli2里边是process.env.NODE_ENV === 'production'，process.env.NODE_ENV === 'development'

18. js 进入页面后在顶部
    1.  document.body.scrollTop = 0
    2.  document.documentElement.scrollTop = 0
19. prototype、__proto__、constructor的关系

    ![prototype](../img/prototype.jpg)

    * f1.__proto__ === Foo.prototype
    * Foo.prototype.constructor = Foo
    * Foo.prototype.__proto__ === Object.prototype

20. js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息
    1.  000：对象
    2.  010：浮点数
    3.  100：字符串
    4.  110：布尔
    5.  1：整数
    6.  null：所有机器码均为0
    7.  undefined：用 −2^30 整数来表示
21. JS变量的复制
    1.  基础类型：保存在栈内存中，用8字节保存

        ```
        var num1 = 5
        var num2 = num1
        ```

        栈内存中变化

        |   变量名   |      |
        | ---------- | ---- |
        | num2 |   5(Number 类型)  |
        | num1 |   5(Number 类型)  |

    2. 引用类型：保存在堆内存当中，栈内存中保存了指向堆的指针

        ```
        var obj1 = new Object()
        var obj2 = obj1
        ```

        栈内存中变化

        |   变量名   |      |
        | ---------- | ---- |
        | obj2 |   Object 类型 -> 指向堆中的obj1  |
        | obj1 |   Object 类型 -> 指向堆中的obj1  |

23. 当数组作为函数调用而不是构造函数调用时，它会创建并初始化一个新的数组对象。因此当Array(...)和new Array(...)接收同样的参数时，它们是相同的。
24. 一个事情

    ```
    console.log(typeof String('3'));
    console.log(typeof new String('3'));
    console.log(typeof Number(3));
    console.log(typeof new Number(3));
    console.log(typeof Boolean(true));
    console.log(typeof new Boolean(true));

    string
    object
    number
    object
    boolean
    object
    ```

    简单理解一下，new的作用就是创建一个对象，对于说new之后的typeof都是object，而直接使用的话，可以理解为类型转换，就是基础数据类型

25. this
    1.  this的值是可以用call方法修改的，而且只有在调用的时候我们才能确定this的值。
    2.  箭头函数的this和它在定义时外层的this是一样的，如果外层的this变了，箭头函数的this也会变，但是不能直接更改箭头函数this的指向
26. 跨域与跨站：**跨域决定的是能不能请求资源，跨站决定的是请求能不能带上cookie**
    1.  同源策略作为浏览器的安全基石，其「同源」判断是比较严格的，相对而言，Cookie中的「同站」判断就比较宽松：只要两个 URL 的 eTLD+1 相同即可，不需要考虑协议和端口。其中，eTLD 表示有效顶级域名，注册于 Mozilla 维护的公共后缀列表（Public Suffix List）中，例如，.com、.co.uk、.github.io 等。eTLD+1 则表示，有效顶级域名+二级域名，例如 taobao.com 等。
    2.  [跨站](https://juejin.cn/post/6926731819903631368)：**Cookie与此息息相关，Cookie实际上遵守的是“同站”策略**
27. 在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。
28. __proto__ ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)。

    ```
    obj.__proto__ === Object.getPrototypeOf(obj)
    ```

29. 继承的时候，为什么要subClass.prototype = new parentClass()
    1.  因为这样在给subClass的prototype添加属性的时候就不会影响到父类的prototype，因为子类的prototype是父类的一个实例，添加属性时相当于给实例添加属性，如果更改的是subClass.prototype.__proto__就会影响到父类了
    2.  obj.__proto__ === Object.prototype,说明两个指向同一个对象，a变b就变，b变a就变，但是给obj添加属性，更改是的obj本身，而不是__proto__,所以不会影响原型
30. 控制元素的滚动位置
    1.  整体控制

        ```
        控制上下滚动
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        控制左右滚动
        document.body.scrollLeft = 0
        document.documentElement.scrollLeft = 0
        ```
    2.  单个元素控制：拿到对应元素使用这两个属性
31. 无限记录
    1.  obj.offsetTop 指 obj 距离上方或上层控件的位置，整型，单位像素。
    2.  obj.offsetLeft 指 obj 距离左方或上层控件的位置，整型，单位像素。
    3.  obj.offsetWidth 指 obj 控件自身的宽度，整型，单位像素。
    4.  obj.offsetHeight 指 obj 控件自身的高度，整型，单位像素。
32. [window.addEventListener document.addEventListener](https://blog.csdn.net/huohua0612/article/details/89576263)
    1.  html（body）被document包裹，document被window包裹
33. document.body.scrollTop || document.documentElement.scrollTop
    1.  标准浏览器是只认识documentElement.scrollTop的
34. dom.getBoundingClientRect(): 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
    1.  使用注意

        ```
        var test = dom.getBoundingClientRect()  // 错误
        console.log(test);
        window.addEventListener('scroll', () => {
            var test = dom.getBoundingClientRect()   // 正确
            console.log(test.top);
        })
        ```
        要放在监听的里边，否则数值是一直不变的
    2. 兼容性
       1. ie5以上都能支持，但是又一点点地方需要修正一下，
       2. IE67的left、top会少2px,并且没有width、height属性。
    3. 返回值：像素值，如果是rem的话需要进行转换
35. 在购买页有一块逻辑，中间部分的购买按钮在屏幕中消失时，此时显示底部的购买bottombar，实现方式
    1. 最开始使用了getBoundingClientRect()，但是考虑性能问题，所以把他+节流函数当成了兜底方案
    2. 使用offsetTop、offsetHeight和scrollTop兜底也可
      1. offsetTop：元素到offsetParent顶部的距离
      2. offsetParent：距离元素最近的一个**具有定位**的祖宗元素（relative，absolute，fixed）
    3. 最终解决办法[IntersectionObserver](https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)，参数有两个，一个callback，一般执行2次，在刚开始可见和完全消失时执行，第二个options，配置信息，可以在这里配置何时执行回调函数

        ```
        if ('IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
        this.observer = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio > 0) {
                this.showPurchaseBar = false
            } else {
                this.showPurchaseBar = true
            }
        })
        }

        this.observer.observe(document.getElementById('test'))
        ```

       1. 每个entry都是IntersectionObserverEntry对象
       2. 通过判断对象的intersectionRatio交叉率来判断显示，完全可见为1，完全不可见为0，
    4. 简单使用

        ```
        // 开始观察
        io.observe(document.getElementById('example'));

        // 停止观察
        io.unobserve(element);

        // 关闭观察器
        io.disconnect();
        ```

36. console.log(Boolean(-1)); === true
37. map函数，默认的三个参数, item,index,arr，如果只给map一个函数名，不给任何参数时，map会默认将这三个参数传给使用的函数，

        ```
        function trible(num1, num2, num3, num4) {
            console.log(num1, num2, num3, num4);
            return num1*num2
        }

        var arr = [1,2]
        console.log(arr.map(trible));

        输出为：
        1 0 [ 1, 2 ] undefined
        2 1 [ 1, 2 ] undefined
        [ 0, 2 ]
        ```

38. [JS中的四种循环](https://juejin.cn/post/6844903513336610823)
    1.  for
    2.  for-in： for-in 并不适合用来遍历 Array 中的元素，其更适合遍历对象中的属性，这也是其被创造出来的初衷。**for-in 不仅仅遍历 array 自身的属性，其还遍历 array 原型链上的所有可枚举的属性**

            ```
            Array.prototype.fatherName = "Father";
            const arr = [1, 2, 3];
            arr.name = "Hello world";
            let index;
            for(index in arr) {
                console.log("arr[" + index + "] = " + arr[index]);
            }

            arr[0] = 1
            arr[1] = 2
            arr[2] = 3
            arr[name] = Hello world
            arr[fatherName] = Father
            ```
        **注意：**for-in 只会遍历存在的实体，下面的例子中， for-in 遍历了3次（遍历属性分别为”0″、 “100″、 “10000″的元素，普通 for 循环则会遍历 10001 次）。所以，只要处理得当， for-in 在遍历 Array 中元素也能发挥巨大作用。
            ```
            let key;
            const arr = [];
            arr[0] = "a";
            arr[100] = "b";
            arr[10000] = "c";
            for(key in arr) {
                if(arr.hasOwnProperty(key)  &&
                    /^0$|^[1-9]\d*$/.test(key) &&
                    key <= 4294967294
                    ) {
                    console.log(arr[key]);
                }
            }
            ```


    3. forEach：不能 break 和 return；
    4. for-of:**不能遍历普通对象，定义了iterator可以,当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。**
       1. 这是最简洁、最直接的遍历数组元素的语法。
       2. 这个方法避开了 for-in 循环的所有缺陷。
       3. 与 forEach 不同的是，它可以正确响应 break、continue 和 return 语句。
       4. 其不仅可以遍历数组，还可以遍历类数组对象和其他可迭代对象。
       5. **for of不能循环普通的对象，需要通过和Object.keys()搭配使用。**
39. 常用的数组方法
    1.  改变原数组
        1.  push
        2.  pop
        3.  shift
        4.  unshift
        5.  reverse
        6.  sort
    2.  不改变
        1.  concat，合并多个数组生成一个新的数组
        2.  map
        3.  forEach
        4.  slice
        5.  filter
    3.  其他
        1.  join('-')，生成字符串
        2.  reduce
40. 柯里化是函数式编程的基础内容，函数式编程，函数时一等公民，函数与其他数据类型一样，处于平等地位，可以赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值，函数式编程强调将计算过程分解成可复用的函数
41. DOM
     1.   [getElementById与querySelectorAll](https://juejin.cn/post/7012892247075061768)
     2.   [nodelist与collection](https://juejin.cn/post/6915033047893508109)
     3.   总结：
          1.   nodelist与collection都分为动态和静态的，只不过collection只包含元素，nodelist包含所有节点类型，包括text啥的
          2.   不同的方法获取到的可能是nodelist也可能是collection
     4.   要创建新的HTML元素(节点)需要先创建一个元素，然后在已存在的元素中添加它。

        * createElement()
        * appendChild() 方法代码：

                var para = document.createElement("p");
                var node = document.createTextNode("这是一个新的段落。");
                para.appendChild(node);
        * insertBefore() 方法代码：

                var para = document.createElement("p");
                var node = document.createTextNode("这是一个新的段落。");
                para.appendChild(node);

                var element = document.getElementById("div1");
                var child = document.getElementById("p1");
                element.insertBefore(para, child);

        * removeChild() 方法代码：要移除一个元素，你需要知道该元素的父元素。

                var parent = document.getElementById("div1");
                var child = document.getElementById("p1");
                parent.removeChild(child);

        * replaceChild() 方法代码：

                var para = document.createElement("p");
                var node = document.createTextNode("这是一个新的段落。");
                para.appendChild(node);

                var parent = document.getElementById("div1");
                var child = document.getElementById("p1");
                parent.replaceChild(para, child);
42.  [交换两个元素位置](https://www.jianshu.com/p/8b6ead8beb3a)
43.  Array
     1.   Array.includes(value):返回一个布尔值，value是否在数组中。
     2.   Array.isArray():判断是否为数组
     3.   Array.fill():填充数组
     4.   Array.indexOf(value):如果value在数组中，则返回value在数组中的下标；否则返回-1
     5.   Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

            ```
            console.log(Array.from('foo'));
            // expected output: Array ["f", "o", "o"]

            console.log(Array.from([1, 2, 3], x => x + x));
            // expected output: Array [2, 4, 6]
            ```

44. babel 与 babel-polyfill
     1.   **Babel是一个JS编译器，它解决语法层面的问题。用于将ES6+的高级语法转为ES5。**
     2.   Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能。如果要解决API层面的问题，需要使用垫片。比如常见的有babel-polyfill、babel-runtime 和 babel-plugin-transform-runtime。**直白一点**，他就是把当前浏览器不支持的方法通过用支持的方法重写来获得支持。
     3.   一个兼容的是语法，一个兼容的是方法
45.  [手写bind](https://zhuanlan.zhihu.com/p/163254710)
46.  模拟表单提交，给post设置header
     1.   set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
47.  闭包
48.  this的指向
   1. 普通函数的this：[答案](https://segmentfault.com/a/1190000011194676)
   2. 如果上边答案里边的箭头函数没看懂，看这篇[答案](https://blog.csdn.net/weixin_42519137/article/details/88053339)
49. 手写new、call、apply、深拷贝、instancecof
   3. new原理(new 底层做了什么):

        ```
        function myNew(fn, ...arg) {
          let newObj = {}
          newObj.__proto__ = fn.prototype
          let res = fn.apply(newObj, arg)
          return res instanceof Object ? res : newObj
        }
        ```

      1. 创建一个空对象
      2. 将函数的原型prototype赋值给对象的原型__proto__（**这里有一个知识点，对象或者变量只有__proto__而没有prototype，而函数同时拥有__proto__和prototype**）

          ```
          function Cat() {
            this.name = 'cat'
          }
          Cat.prototype.eat = () => {
            console.log('eat')
          }

          let cat = new Cat()
          cat.eat()
          console.log(cat.__proto__);   // Cat { eat: [Function (anonymous)] }
          console.log(cat.prototype);   // undefined
          console.log(Cat.prototype);   // Cat { eat: [Function (anonymous)] }
          console.log(Cat.__proto__);   // [Function (anonymous)]
          ```

      3. 执行构造函数，并且改变this的指向
      4. 确保返回的是对象（**最后一句话的意思是，判断res是否是对象，如果是的话返回res，不是的话返回一个空对象**）

    1. apply原理：apply的作用就是改变函数的this对象，fn.apply(newObj, arg)这句话的意识就是将fn这个函数里边的this的值变为newObj。

        ```
        Function.prototype.myApply = function (context, arr) {
          context = context || window
          context.fn = this
          let result = context.fn(...arr)
          delete context.fn
          return result
        }
        ```

       1. 确定拿到对象context，如果对象context为空，则将window赋值给context
       2. 创建context对象的fn属性，并将this赋值给fn（**这句话的意思可以参考过上边那个，fn.apply(newObj, arg)，fn.apply，那么apply函数里边的this就是这个fn，所以这句话其实就是拿到执行apply函数的那个函数**）
       3. 用参数arr来执行函数context.fn，得到结果，赋值给result
       4. 删除context的fn属性。
       5. 返回结果

    2. call原理：call的作用和apply一样，只不过apply第二个参数是一个数组，用来接收所有参数，call是允许有第二个第三个第四个。。。参数的，他两底层的区别就是拿到剩余参数的方法不一样，其他的一样

        ```
        Function.prototype.myCall = function (context) {
          context = context || window
          context.fn = this
          let args = [...arguments].slice(1)
          let result = context.fn(...args)
          delete context.fn
          return result
        }
        ```

       1. 区别在于第4行，args的获取，（**每个函数都默认有一个auguments变量，他包含了该函数的所有参数**），这句话的意思就是解构arguments形成一个数组，并且将这个数组除第一个参数（第一个参数是上边的context，所以不要它）以外的其他参数赋值给args。

    3. 浅拷贝与深拷贝
    4.
       1. 浅拷贝的时候如果数据是基本数据类型，那么就如同直接赋值，会拷贝其本身，如果除了基本数据类型之外还有一层对象，那么浅拷贝就只能拷贝其引用，对象的改变会反应到拷贝对象上；但是深拷贝就会拷贝多层，即使是嵌套了对象，也会都拷贝出来。
       2. 实现深拷贝最简单的代码

          ```
          let obj = {.........}  // 假设这个对象有很多层嵌套
          let obj2 = JSON.parse(JSON.stringfy(obj))
          ```
          ```
          var obj1 = { body: { a: 10 } };
          var obj2 = JSON.parse(JSON.stringify(obj1));
          obj2.body.a = 20;
          console.log(obj1);
          // { body: { a: 10 } } <-- 沒被改到，如果是浅拷贝，这个也会变为20
          console.log(obj2);
          // { body: { a: 20 } }
          console.log(obj1 === obj2);
          // false
          console.log(obj1.body === obj2.body);
          // false
          ```

          **解释:** 将obj对象转换成string对象

    1. instanceof

          ```
          function myInstanceOf(L, R) {
            if(L === null) {
              return false
            }
            let baseType = ['String', 'Number', 'Boolean', 'undefined', 'symbol']
            if(baseType.includes(typeof L)) return false

            let RPro = R.prototype
            L = L.__proto__
            while(true) {
              if(L === null)  return false
              if(L === RPro)  return true
              L = L.__proto__
            }
          }
          ```

50. 宏任务与微任务，**这个必须弄懂** [网址](https://mp.weixin.qq.com/s/9Xk-HBQFaIEpyH8FqxBi6g)
51. 跨域问题，[网址](https://blog.csdn.net/lareinalove/article/details/84107476)
   4. 同源策略：简单来讲同源策略就是浏览器为了保证用户信息的安全，防止恶意的网站窃取数据，禁止不同域之间的JS进行交互。对于浏览器而言只要域名、协议、端口其中一个不同就会引发同源策略，从而限制他们之间如下的交互行为：
      1. Cookie、LocalStorage和IndexDB无法读取；
      2. DOM无法获得；
      3. AJAX请求不能发送。
   5. 跨域的严格一点的定义是：只要协议，域名，端口有任何一个的不同，就被当作是跨域。
   6. 为什么浏览器要限制跨域访问?原因就是安全问题：如果一个网页可以随意地访问另外一个网站的资源，那么就有可能在客户完全不知情的情况下出现安全问题。比如下面的操作就有安全问题：
      1. 用户访问www.mybank.com，登陆并进行网银操作，这时cookie啥的都生成并存放在浏览器；
      2. 用户突然想起件事，并迷迷糊糊的访问了一个邪恶的网站www.xiee.com；
      3. 这时该网站就可以在它的页面中，拿到银行的cookie，比如用户名，登陆token等，然后发起对www.mybank.com的操作；
      4. 如果这时浏览器不予限制，并且银行也没有做响应的安全处理的话，那么用户的信息有可能就这么泄露了。
   7. **如何解决跨域**
      1. 跨域资源共享（CORS），简单介绍，详细的看[这个](https://www.ruanyifeng.com/blog/2016/04/cors.html)：
         1. CORS（Cross-Origin Resource Sharing）跨域资源共享，定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。CORS背后的基本思想就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败。服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。

            ```
            Access-Control-Allow-Origin:*   // 设置允许访问的Origin，*代表所有Origin都允许访问，Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）
            Access-Control-Allow-Methods:GET,POST   // 设置允许跨域的方法，这里设置了get和post，除了设置的方法，其他方法都受到同源策略的限制。
            Access-Control-Allow-Headers:x-requested-with,content-type  // 设置请求头
            Access-Control-Allow-Credentials: true    // 是否允许携带cookie
            ```

            **解释:** 这些字段都是由后台来进行设置的，和前端无关，但是前端要知道这个事情，就是让后台在相应头里边加上上边的字段来实现跨域，唯一一个和前端有关系的字段就是第四个cookie那个，前边这边需要在ajax请求里边加上withCredetials = true这句话。

      2. jsonp，网址上写了
      3. cors与jsonp对比：CORS与JSONP相比，无疑更为先进、方便和可靠。
         1. JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求；
         2. 使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得说句，比起JSONP有更好的错误处理；
         3. JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS；
         4. **总结来说jsonp可以更好的兼容老版本，但是可以使用的方法有限，而cors支持所有类型，但是只有现代的能用。**

      4. 掌握这两个就行了，一般只问第一个，把一个掌握好

52. 双等号与三等号的区别：
   8. == 用于比较、判断两者相等，比较时可自动换数据类型
   9. === 用于（严格）比较、判断两者（严格）相等，不会进行自动转换，要求进行比较的操作数必须类型一致，不一致时返回flase。
   10. 简单来说，一个会自动换类型再比较，一个不换直接比较

53. typeof instanceOf Object.prototype.toString类型判断
   11. typeof运算符返回一个用来表示表达式的数据类型的字符串。typeof一般返回以下几个字符串："number"， "string"，"boolean"，"object"，"function"，"undefined"。对于Array，Null等特殊对象使用typeof一律返回object，这正是typeof的局限性。
   12. instanceof用来检测某个对象是不是另一个对象的实例。它会更具原型链向上检测

        ```
        class Animal {}
        class Cat extend Animal {}
        let cat = new Cat()
        console.log(cat instanceof Animal)  // true
        console.log(cat instanceof Object)  // true，因为所有类都是Object的子类
        ```

    1. Object.prototype.toString.call()，这个方法可以判断**所有**对象的类型，包括null和undefined

        ```
        let a = ''
        let b = 0
        let c = true
        let d = []
        let e = {}
        let f = function() {}
        let g = undefined
        let h = null

        console.log(Object.prototype.toString.call(a))  // [object String]
        console.log(Object.prototype.toString.call(b))  // [object Number]
        console.log(Object.prototype.toString.call(c))  // [object Boolean]
        console.log(Object.prototype.toString.call(d))  // [object Array]
        console.log(Object.prototype.toString.call(e))  // [object Object]
        console.log(Object.prototype.toString.call(f))  // [object Function]
        console.log(Object.prototype.toString.call(g))  // [object Undefined]
        console.log(Object.prototype.toString.call(h))  // [object Null]
        ```

54. 事件委托[网址](https://www.cnblogs.com/wp-js/p/7609539.html)
55. 图片懒加载[网址](https://blog.csdn.net/w1418899532/article/details/90515969)
56. 静态nodelist 与 动态nodelist [地址](https://www.cnblogs.com/floaty/p/5812089.html)

   * 动态的nodelist，程序员对于dom的操作会动态的反应在nodelist当中，比如获取ul中的所以li，返回一个动态的nodelist，当我们想ul中添加一个li，那么此时nodelist的长度也会动态的+1，但是静态的就不会
   * 但是动态的nodelist的性能比静态的要好，所以说要考虑情况去进行使用
      - 原因：因为动态的nodelist在创建是并不需要预先获取所有的信息，而静态的在最开始就需要获取到所有信息并封装好，所以动态的快一点

57. nodelist与array的区别、nodelist与collection的区别[地址](https://www.jianshu.com/p/f6ff5ebe45fd)
58. getElementByTagName()与querySelectorAll()的区别，[地址](https://blog.csdn.net/weixin_34111819/article/details/89063268?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)
    * getElementByTagName()和getElementByClassName()返回的是一个动态的nodelist
    * querySelectorAll()返回的是一个静态的nodelist

59. js异步编程的几种方式[地址](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)
60. null和undefined的区别
    1.  null表示"没有对象"，即该处不应该有值
    2.  undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义
    3.  [详细可以看看这个](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)
61. 获取网页中的各种数据，**基本记不住，加油**
    * window.innerheight 返回窗口的文档显示区的高度。 **背**
    * window.innerwidth 返回窗口的文档显示区的宽度。  **背**
    * outerWidth 和 outerHeight 属性获取加上工具条与滚动条窗口的宽度与高度。  **尽量**
    * 事件对象event中  **尽量**
        - clientX、clientY：点击位置距离当前body可视区域的x，y坐标
        - pageX、pageY：对于整个页面来说，包括了被卷去的body部分的长度
        - screenX、screenY：点击位置距离当前电脑屏幕的x，y坐标
        - offsetX、offsetY：相对于带有定位的父盒子的x，y坐标
            + offsetX，offsetY这是实验中的功能,不推荐使用文本应该说的是offsetLeft，offsetTop
        - x、y：和screenX、screenY一样
    * document.body.clientHeight：是body的height  **背**
    * document.body.clientWidth：是body的width  **背**
    * offsetTop：元素到offsetParent顶部的距离，例如div.offsetTop  **尽量**
    * offsetParent：距离元素最近的一个具有定位的祖宗元素（relative，absolute，fixed），若祖宗都不符合条件，offsetParent为body。  **尽量**
    * document.body.scrollTop：网页被卷去的高
    * document.body.scrollLeft：网页被卷去的左
    * window.screen.height：屏幕辨别率的高  **背**
    * window.screen.width：屏幕辨别率的宽  **背**

62. dom操作：各种dom操作，基本的几个，高级程序设计里边应该让你看了，记住最基础的就能，难的就不要了，**如果选择元素是一定要回的，什么getElementById、getElementBy.....有好多by，这几个查一查记下来，就是按id选择元素，按类型选择元素，还有querySelector()和querySelestorAll()这两个方法也要知道**
    * getAttribute：获取某一个属性的值；
    * setAttribute：建立一个属性，并同时给属性捆绑一个值；
    * createAttribute：仅建立一个属性；
    * removeAttribute：删除一个属性；


63. children与childNodes的区别[网址](https://blog.csdn.net/xx_xiaoxinxiansen/article/details/76100131)：
    1.  children：返回父元素所有的直系子节点的集合，注意，children只返回HTML元素节点，不包括文本节点和属性节点。
    2.  childNodes：返回父元素所有的直系子节点的集合，注意，与children不同的是，childNodes会返回HTML元素节点，属性节点，文本节点。
64. 柯里化(**可以看完所有面经再看，很少考**)
65. Object.defineProperty 注意事项，这个与vue的双向绑定实现相关，可以后边再看[网址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
    * 这个方法可以精准的修改对象的属性
    * 关于对象属性的描述，有两种描述符
        - 数据描述符
        - 存取描述符
        - **关于属性的描述只能使用二者之一，不能同时使用，使用就会报错**
    * 两种描述符都是对象，包括以下键值
        - 公共属性：
            + configurable：只有该值为true时，该属性的描述符才允许改变，属性才允许被删除，默认为false
            + enumerable：该值为true，属性才会出现在对象的可枚举属性当中，默认为false
        - 数据描述符键值：
            + value：可为任意有效的js值，默认为undefined
            + writable：只有改值为true时，上边的value才允许更改，默认为false
        - 存取描述符
            + get和set，默认为undefined
    * 如果一个描述符不具备上边任意一个键值，则默认为数据描述符

66. [documentFragment](https://www.cnblogs.com/echolun/p/10098752.html)
    1.  DocumentFragment 节点不属于文档树，继承的 parentNode 属性总是 null。 当请求把一个 DocumentFragment 节点插入文档树时，插入的不是 DocumentFragment 自身，而是它的所有子孙节点。这使得 DocumentFragment 成了有用的占位符，暂时存放那些一次插入文档的节点。它还有利于实现文档的剪切、复制和粘贴操作，尤其是与 Range 接口一起使用时更是如此。 可以用 Document.createDocumentFragment() 方法创建新的空 DocumentFragment 节点。DocumentFragment 节点不属于文档树，继承的 parentNode 属性总是 null。 **DocumentFragment 节点不属于DOM树，因此它的变化不会引起DOM树的变化；**
    2.  DOM树的操作会引起回流，那我们可以将DocumentFragment作为一个暂时的DOM节点存储器，当我们在DocumentFragment 修改完成时，我们就可以将存储DOM节点的DocumentFragment一次性加入DOM树，从而减少回流次数，达到性能优化的目的。
67. typeof返回的是小写的字符串类型的类型名，如'object', 'number'等，**typeof的返回值：**

        ```
        console.log(typeof a);    //'undefined'
        console.log(typeof(true));  //'boolean'
        console.log(typeof '123');  //'string'
        console.log(typeof 123);   //'number'
        console.log(typeof NaN);   //'number'
        console.log(typeof null);  //'object'    
        var obj = new String();
        console.log(typeof(obj));    //'object'
        var  fn = function(){};
        console.log(typeof(fn));  //'function'
        console.log(typeof(class c{}));  //'function'
        ```

68. Symbol.for():有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
    1.  Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。
69. [JSON.parse(JSON.stringify(obj))实现深拷贝的弊端](https://blog.csdn.net/u013565133/article/details/102819929)
    1.  如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式，而不是时间对象
    2.  如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象
    3.  如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失
    4.  如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null
