# JS菜鸟教程笔记

1. **在 HTML 中, 全局变量是 window 对象: 所有数据变量都属于 window 对象。**
2. **constructor 属性返回所有 JavaScript 变量的构造函数。**

        "John".constructor                 // 返回函数 String()  { [native code] }
        (3.14).constructor                 // 返回函数 Number()  { [native code] }
        false.constructor                  // 返回函数 Boolean() { [native code] }
        [1,2,3,4].constructor              // 返回函数 Array()   { [native code] }
        {name:'John', age:34}.constructor  // 返回函数 Object()  { [native code] }
        new Date().constructor             // 返回函数 Date()    { [native code] }
        function () {}.constructor         // 返回函数 Function(){ [native code] }

3. **正则表达式**
    * 在 JavaScript 中，正则表达式通常用于两个字符串方法 : search() 和 replace()。
        - search() 方法 用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，并返回子串的起始位置。
        - replace()方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

4. **apply 和 call 允许切换函数执行的上下文环境（context），即 this 绑定的对象，可以将 this 引用到任何对象**

        var person1 = {
            fullName: function() {
                return this.firstName + " " + this.lastName;
            }
        }
        var person2 = {
          firstName:"John",
          lastName: "Doe",
        }
        person1.fullName.call(person2);  // 返回 "John Doe"

5. **let 与 var：在 JavaScript 中, 全局作用域是针对 JavaScript 环境。在 HTML 中, 全局作用域是针对 window 对象。**
    * 使用 let 关键字声明的全局作用域变量不属于 window 对象
            
            let carName = "Volvo";
            // 不能使用 window.carName 访问变量

    * 使用 var 关键字声明的全局作用域变量属于 window 对象

            var carName = "Volvo";
            // 可以使用 window.carName 访问变量

6. **href="#"与href="javascript:void(0)"的区别：**
    * “#” 包含了一个位置信息，默认的锚是#top 也就是网页的上端。
    * 而javascript:void(0), 仅仅表示一个死链接。
    在页面很长的时候会使用 # 来定位页面的具体位置，格式为：# + id。如果你要定义一个死链接请使用 javascript:void(0) 。

            <a href="javascript:void(0);">点我没有反应的!</a>
            <a href="#pos">点我定位到指定位置!</a>
            <br>
            ...
            <br>
            <p id="pos">尾部定位点</p>

7.  **不推荐使用 TAB 键来缩进，因为不同编辑器 TAB 键的解析不一样。**
8.  **箭头函数**：有的箭头函数都没有自己的this。不适合顶一个对象的方法。当我们使用箭头函数的时候，箭头函数会默认帮我们绑定外层 this 的值，所以在箭头函数中 this 的值和外层的 this 是 **一样的**。箭头函数是不能提升的，所以需要在使用之前定义。
9. **arguments对象**：
    JavaScript 函数有个内置的对象 arguments 对象。
    argument 对象包含了函数调用的参数数组。
10. **传参问题**：
    * **通过值传递参数**：在函数中调用的参数是函数的隐式参数。JavaScript 隐式参数通过值来传递：函数仅仅只是获取值。如果函数修改参数的值，不会修改显式参数的初始值（在函数外定义）。隐式参数的改变在函数外是不可见的
    * **通过对象传递参数**：在JavaScript中，可以引用对象的值。因此我们在函数内部修改对象的属性就会修改其初始的值。修改对象属性可作用于函数外部（全局变量）。修改对象属性在函数外是可见的。
11. **JavaScript DOM：**
    1. **查找 HTML 元素：**
        * 通过 id 找到 HTML 元素：getElementById
        * 通过标签名找到 HTML 元素：getElementsByTagName
        * 通过类名找到 HTML 元素：getElementsByClassName
    2. **改变 HTML：**
        1. **改变 HTML 输出流**：
            * document.write()：可用于直接向 HTML 输出流写内容。
            * **绝对不要在文档(DOM)加载完成之后使用 document.write()。这会覆盖该文档。**
        2. **改变 HTML 内容**：
            * document.getElementById(id).innerHTML = 新的HTML
        3. **改变 HTML 属性**：
            * document.getElementById(id).attribute = 新属性值
    3. **改变CSS：**
        1. **改变 HTML 样式**
            * document.getElementById(id).style.property = 新样式
    4. **DOM 事件：**
        1. 事件类型：
            * 当用户点击鼠标时
            * 当网页已加载时
            * 当图像已加载时
            * 当鼠标移动到元素上时
            * 当输入字段被改变时
            * 当提交 HTML 表单时
            * 当用户触发按键时
            * [所有事件](https://www.runoob.com/jsref/dom-obj-event.html)
    5. **EventListener：**  
        addEventListener() 方法用于向指定元素添加事件句柄。  
        addEventListener() 方法添加的事件句柄不会覆盖已存在的事件句柄。  
        你可以向一个元素添加多个事件句柄。  
        你可以向同个元素添加多个同类型的事件句柄，如：两个 "click" 事件。  
        你可以向任何 DOM 对象添加事件监听，不仅仅是 HTML 元素。如： window 对象。  
        addEventListener() 方法可以更简单的控制事件（冒泡与捕获）。  
        当你使用 addEventListener() 方法时, JavaScript 从HTML标记中分离开来，可读性更强，在没有控制HTML标记时也可以添加事件监听。  
        你可以使用 removeEventListener() 方法来移除事件的监听

        * addEventListener()语法：

                element.addEventListener(event, function, useCapture);

            * 第一个参数是事件的类型 (如 "click" 或 "mousedown").
            * 第二个参数是事件触发后调用的函数。
            * 第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。
                - 默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。
                - 冒泡：在冒泡中，内部元素的事件会先被触发，然后再触发外部元素，即： <p> 元素的点击事件先触发，然后会触发 <div> 元素的点击事件。
                - 捕获：在捕获中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div> 元素的点击事件先触发 ，然后再触发 <p> 元素的点击事件。
        * removeEventListener()语法：

                element.removeEventListener("mousemove", myFunction);

        * 跨浏览器解决方案：
            -  IE 8 及更早 IE 版本，Opera 7.0及其更早版本不支持addEventListener() 和removeEventListener()方法。但是，对于这类浏览器版本可以使用detachEvent()方法来移除事件句柄:
                
                    element.attachEvent(event, function);
                    element.detachEvent(event, function);

            - 解决代码： 

                    var x = document.getElementById("myBtn");
                    if (x.addEventListener) {                    // 所有主流浏览器，除了 IE 8 及更早版本
                        x.addEventListener("click", myFunction);
                    } else if (x.attachEvent) {                  // IE 8 及更早版本
                        x.attachEvent("onclick", myFunction);
                    }

    6. **DOM 元素 (节点)：**
        * 要创建新的HTML元素(节点)需要先创建一个元素，然后在已存在的元素中添加它。
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


    7. **DOM 集合(Collection)：**
        * HTMLCollection 对象类似包含 HTML 元素的一个数组。

                var x = document.getElementsByTagName("p");
                集合中的元素可以通过索引(以 0 为起始位置)来访问。
                访问第二个 <p> 元素可以是以下代码:
                y = x[1];

        * **注意：**
            * HTMLCollection 不是一个数组！HTMLCollection 看起来可能是一个数组，但其实不是。你可以像数组一样，使用索引来获取元素。HTMLCollection无法使用数组的方法： valueOf(), pop(), push(), 或 join() 。

    8. **DOM 节点列表：**
        * 概念：NodeList 对象是一个从文档中获取的节点列表 (集合) 。NodeList 对象类似 HTMLCollection对象。一些旧版本浏览器中的方法（如：getElementsByClassName()）返回的是 NodeList 对象，而不是 HTMLCollection 对象。所有浏览器的 childNodes 属性返回的是 NodeList 对象。大部分浏览器的 querySelectorAll() 返回NodeList 对象

    9. **HTMLCollection 与 NodeList 的区别**
            
            pcoll=document.querySelectorAll("p")
            plist=document.getElementsByTagName("p")
        以上 pcoll 返回的就是固定的值。  
        而获取 plist 后, 若 html 页面有变化且刚好添加或移除了 p 标签, 此时plist也会跟着变。

12. Number 对象
    * 默认情况下，JavaScript 数字为十进制显示。但是你可以使用 toString() 方法 输出16进制、8进制、2进制。
            var myNumber=128;
            myNumber.toString(16);   // 返回 80
            myNumber.toString(8);    // 返回 200
            myNumber.toString(2);    // 返回 10000000

    * 无穷大：Infinity(负无穷，-Infinity)
    * 非数字：NaN(**注意：无穷大是一个数字**)
13. String 对象
    *  indexOf()：定位字符串中某一个指定的字符首次出现的位置，如果没找到对应的字符函数返回-1。
    *  lastIndexOf() 方法在字符串末尾开始查找字符串出现的位置
    *  
            var str="Hello world, welcome to the universe.";
            var n=str.indexOf("welcome");

    * match()：函数用来查找字符串中特定的字符，并且如果找到的话，则返回这个字符。

            var str="Hello world!";
            document.write(str.match("world") + "<br>");

    * replace()：在字符串中用某些字符替换另一些字符。
    
            str="Please visit Microsoft!"
            var n=str.replace("Microsoft","Runoob");

    * toUpperCase() / toLowerCase():字符串大小写转换使用函数
14. 数组对象：
    * 合并两个数组 - concat()

            var hege = ["Cecilie", "Lone"];
            var stale = ["Emil", "Tobias", "Linus"];
            var children = hege.concat(stale);

    * 合并三个数组 - concat()

            var parents = ["Jani", "Tove"];
            var brothers = ["Stale", "Kai Jim", "Borge"];
            var children = ["Cecilie", "Lone"];
            var family = parents.concat(brothers, children);

    * 用数组的元素组成字符串 - join()：var x = string.jion()
    * 删除数组的最后一个元素 - pop()
    * 数组的末尾添加新的元素 - push()
    * 将一个数组中的元素的顺序反转排序 - reverse()
    * 删除数组的第一个元素 - shift()
    * 从一个数组中选择元素 - slice()
    * 数组排序（按字母顺序升序）- sort()
    * 在数组的第2位置添加一个元素 - splice()

            arrayObject.splice(index,howmany,item1,.....,itemX)

        * index 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
        * howmany 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
        * item1, ..., itemX   可选。向数组添加的新项目。

    * 转换数组到字符串 -toString()
    * 在数组的开头添加新元素 - unshift()

15. 浏览器BOM
    1. Window 尺寸：
        * 有三种方法能够确定浏览器窗口的尺寸。
        
            对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：
            window.innerHeight - 浏览器窗口的内部高度(包括滚动条)
            window.innerWidth - 浏览器窗口的内部宽度(包括滚动条)

            对于 Internet Explorer 8、7、6、5：
            document.documentElement.clientHeight
            document.documentElement.clientWidth
            或者
            document.body.clientHeight
            document.body.clientWidth
        * 其他方法：
            - window.open() - 打开新窗口
            - window.close() - 关闭当前窗口
            - window.moveTo() - 移动当前窗口
            - window.resizeTo() - 调整当前窗口的尺寸
    2. Window Screen

            screen.availWidth - 可用的屏幕宽度
            screen.availHeight - 可用的屏幕高度

    3. Window Location
        * location.hostname 返回 web 主机的域名
        * location.pathname 返回当前页面的路径和文件名
        * location.port 返回 web 主机的端口 （80 或 443）
        * location.protocol 返回所使用的 web 协议（http: 或 https:）
        * location.href 属性返回当前页面的 URL。
        * location.pathname 属性返回 URL 的路径名。
        * location.assign(url) 方法加载新的文档。加载 URL 指定的新的 HTML 文档。 就相当于一个链接，跳转到指定的url，当前页面会转为新页面内容，可以点击后退返回上一个页面。
        * location.replace(url) ： 通过加载 URL 指定的文档来替换当前文档 ，这个方法是替换当前窗口页面，前后两个页面共用一个窗口，所以是没有后退返回上一页的

    4. Window History
        * history.back() - 与在浏览器点击后退按钮相同
        * history.forward() - 与在浏览器中点击向前按钮相同

    5. Window Navigator

            txt = "<p>浏览器代号: " + navigator.appCodeName + "</p>";
            txt+= "<p>浏览器名称: " + navigator.appName + "</p>";
            txt+= "<p>浏览器版本: " + navigator.appVersion + "</p>";
            txt+= "<p>启用Cookies: " + navigator.cookieEnabled + "</p>";
            txt+= "<p>硬件平台: " + navigator.platform + "</p>";
            txt+= "<p>用户代理: " + navigator.userAgent + "</p>";
            txt+= "<p>用户代理语言: " + navigator.systemLanguage + "</p>";
            document.getElementById("example").innerHTML=txt;

        **注意：**来自navigator对象的信息具有误导性，不应该被用于检测浏览器版本，这是因为：navigator 数据可被浏览器使用者更改一些浏览器对测试站点会识别错误浏览器无法报告晚于浏览器发布的新操作系统

    6. 弹窗
        * alert()
        * comfirm():确认框。当你点击 "确认", 确认框返回 true， 如果点击 "取消", 确认框返回 false。

                var r=confirm("按下按钮");
                if (r==true)
                {
                    x="你按下了\"确定\"按钮!";
                }
                else
                {
                    x="你按下了\"取消\"按钮!";
                }

        * prompt():提示框。如果用户点击确认，那么返回值为输入的值。如果用户点击取消，那么返回值为 null。

                var person=prompt("请输入你的名字","Harry Potter");
                if (person!=null && person!="")
                {
                    x="你好 " + person + "! 今天感觉如何?";
                    document.getElementById("demo").innerHTML=x;
                }

    7. 计时事件
        * setInterval(func, time) - 间隔指定的毫秒数不停地执行指定的代码。
        * clearInterval() 方法用于停止 setInterval() 方法执行的函数代码。
        * setTimeout() - 在指定的毫秒数后执行指定代码
        * clearTimeout() 方法用于停止执行setTimeout()方法的函数代码。

    8. Cookie
        * 创建cookie：可以使用 document.cookie 属性来创建 、读取、及删除 cookie。

                JavaScript 中，创建 cookie 如下所示：

                document.cookie="username=John Doe";
                您还可以为 cookie 添加一个过期时间（以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除：

                document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";
                您可以使用 path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面。

                document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";

        * 读取cookie：

                var x = document.cookie;

            注意：document.cookie 将以字符串的方式返回所有的 cookie，类型格式： cookie1=value; cookie2=value; cookie3=value;

        * 使用 JavaScript 修改 Cookie：

                在 JavaScript 中，修改 cookie 类似于创建 cookie，如下所示：

                document.cookie="username=John Smith; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
                旧的 cookie 将被覆盖。

        * 使用 JavaScript 删除 Cookie

                删除 cookie 非常简单。您只需要设置 expires 参数为以前的时间即可，如下所示，设置为 Thu, 01 Jan 1970 00:00:00 GMT:

                document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                注意，当您删除时不必指定 cookie 的值。

        * Cookie字符串：document.cookie属性看起来像一个普通的文本字符串，其实它不是。即使您在 document.cookie 中写入一个完整的cookie字符串,当您重新读取该cookie 信息时，cookie 信息是以名/值对的形式展示的。  
        如果您设置了新的 cookie，旧的 cookie 不会被覆盖。 新 cookie 将添加到 document.cookie中，所以如果您重新读取document.cookie，您将获得如下所示的数据：cookie1=value; cookie2=value;
