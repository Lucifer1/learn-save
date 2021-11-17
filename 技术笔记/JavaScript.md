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
    2.  跨站：**Cookie与此息息相关，Cookie实际上遵守的是“同站”策略**
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
    3. 最终解决办法IntersectionObserver，参数有两个，一个callback，一般执行2次，在刚开始可见和完全消失时执行，第二个options，配置信息，可以在这里配置何时执行回调函数

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
    2.  for-in： for-in 并不适合用来遍历 Array 中的元素，其更适合遍历对象中的属性，这也是其被创造出来的初衷。for-in 不仅仅遍历 array 自身的属性，其还遍历 array 原型链上的所有可枚举的属性

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
42.  [交换两个元素位置](https://www.jianshu.com/p/8b6ead8beb3a)
43.  Array
     1.   Array.includes(value):返回一个布尔值，value是否在数组中。
     2.   Array.indexOf(value):如果value在数组中，则返回value在数组中的下标；否则返回-1
     3.   Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

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
