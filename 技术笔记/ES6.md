### 变量的结构赋值

1. **数组的解构**
    - 解构赋值允许指定默认值

            let [foo = true] = [];
            foo // true

            let [x, y = 'b'] = ['a']; // x='a', y='b'
            let [x, y = 'b'] = ['a', undefined]; 

    - 默认值也可以使函数表达式，不过表达式是惰性的，用到的时候才会求值

            function f() {
              console.log('aaa');
            }

            let [x = f()] = [1];
        相当于：
            let x;
            if ([1][0] === undefined) {
              x = f();
            } else {
              x = [1][0];
            }

    - 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

            let [x = 1, y = x] = [];     // x=1; y=1
            let [x = 1, y = x] = [2];    // x=2; y=2
            let [x = 1, y = x] = [1, 2]; // x=1; y=2
            let [x = y, y = 1] = [];     // ReferenceError: y is not defined
        上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。

    - 可以进行嵌套的解构：

            let [foo, [[bar], baz]] = [1, [[2], 3]];
            foo // 1
            bar // 2
            baz // 3

            let [ , , third] = ["foo", "bar", "baz"];
            third // "baz"

            let [x, , y] = [1, 2, 3];
            x // 1
            y // 3

            let [head, ...tail] = [1, 2, 3, 4];
            head // 1
            tail // [2, 3, 4]

            let [x, y, ...z] = ['a'];
            x // "a"
            y // undefined
            z // []

2. **对象的解构赋值**
    - 对象的解构与数组有一个重要的不同：数组的元素是按**次序排列**的，变量的取值由它的**位置**决定；而对象的属性没有次序，**变量必须与属性同名**，才能取到正确的值。

            let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
            foo // "aaa"
            bar // "bbb"

            let { baz } = { foo: 'aaa', bar: 'bbb' };
            baz // undefined

    - 对象的赋值解构，可以很方便的将现有对象的方法，取出来赋给其他变量

            // 例一
            let { log, sin, cos } = Math;

            // 例二
            const { log } = console;
            log('hello') // hello

    - 如果想自定义属性名的话，如下：

            let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
            baz // "aaa"

            let obj = { first: 'hello', last: 'world' };
            let { first: f, last: l } = obj;
            f // 'hello'
            l // 'world'
        其中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
            let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
            baz // "aaa"
            foo // error: foo is not defined
        所以，上边的 {foo}其实是{foo:foo}的简写

    - 也可以进行嵌套的解构（有点复杂）
    - 也可以指定默认值

3. **数字和布尔值的解构赋值**
    - 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

            let {toString: s} = 123;
            s === Number.prototype.toString // true

            let {toString: s} = true;
            s === Boolean.prototype.toString // true
        数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

4. **用途**
    - 交换变量的值

            let x = 1;
            let y = 2;
            [x, y] = [y, x];

    - 从函数返回多个值

            function example() {
              return [1, 2, 3];
            }
            let [a, b, c] = example();

            // 返回一个对象

            function example() {
              return {
                foo: 1,
                bar: 2
              };
            }
            let { foo, bar } = example();

    - 函数参数的自定义
    - 提取json函数

            let jsonData = {
              id: 42,
              status: "OK",
              data: [867, 5309]
            };

            let { id, status, data: number } = jsonData;

            console.log(id, status, number);
            // 42, "OK", [867, 5309]

    - 函数参数的默认值

            jQuery.ajax = function (url, {
              async = true,
              beforeSend = function () {},
              cache = true,
              complete = function () {},
              crossDomain = false,
              global = true,
              // ... more config
            } = {}) {
              // ... do stuff
            };
        指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

    - 遍历Map：任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

            const map = new Map();
            map.set('first', 'hello');
            map.set('second', 'world');

            for (let [key, value] of map) {
              console.log(key + " is " + value);
            }
            // first is hello
            // second is world
        如果只想获取键名，或者只想获取键值，可以写成下面这样。
            // 获取键名
            for (let [key] of map) {
              // ...
            }

            // 获取键值
            for (let [,value] of map) {
              // ...
            }

    - 输入模块的制定方法，用于模块化

            const { SourceMapConsumer, SourceNode } = require("source-map");

# 字符串的拓展

1. **模板字符串 两个反引号``**
    - 空格和缩进都会被保留在输出之中,如果你不想要这个换行，可以使用trim方法消除它。
    - 模板字符串中嵌入变量，需要将变量名写在${}之中,
        + 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
        + 模板字符串之中还能调用函数。
        + 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
        + 模板字符串甚至还能嵌套。

# 函数的拓展

1. **增加了参数的默认值**，注意：定义了默认值的参数，应该是函数的尾参数，如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

        // 例一
        function f(x = 1, y) {
          return [x, y];
        }

        f() // [1, undefined]
        f(2) // [2, undefined]
        f(, 1) // 报错
        f(undefined, 1) // [1, 1]

        // 例二
        function f(x, y = 5, z) {
          return [x, y, z];
        }

        f() // [undefined, 5, undefined]
        f(1) // [1, 5, undefined]
        f(1, ,2) // 报错
        f(1, undefined, 2) // [1, 5, 2]
    上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。

2. **函数的 length 属性**：指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。

        (function (a) {}).length // 1
        (function (a = 5) {}).length // 0
        (function (a, b, c = 5) {}).length // 2

3. **作用域：**
    - 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

            var x = 1;

            function f(x, y = x) {
              console.log(y);
            }

            f(2) // 2

4. **rest 参数**
    - ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

            function add(...values) {
                let sum = 0;

                for (var val of values) {
                   sum += val;
                }

                return sum;
            }

            add(2, 5, 3) // 10

    - **注**：rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
    - **注**：函数的length属性，不包括 rest 参数。

            (function(a) {}).length  // 1
            (function(...a) {}).length  // 0
            (function(a, ...b) {}).length  // 1
5. **name属性**
    - 函数的name属性，返回该函数的函数名

            function foo() {}
            foo.name // "foo"

    - 如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。

            var f = function () {};

            // ES5
            f.name // ""

            // ES6
            f.name // "f"

    - 如果将一个具名函数赋值给一个变量，则ES5和ES6的name属性都返回这个具名函数原本的名字。

            const bar = function baz() {};

            // ES5
            bar.name // "baz"

            // ES6
            bar.name // "baz"

    - Function构造函数返回的函数实例，name属性的值为anonymous。

            (new Function).name // "anonymous"

    - bind返回的函数，name属性值会加上bound前缀。

            function foo() {};
            foo.bind({}).name // "bound foo"

            (function(){}).bind({}).name // "bound "

    - 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。

            const key1 = Symbol('description');
            const key2 = Symbol();
            let obj = {
              [key1]() {},
              [key2]() {},
            };
            obj[key1].name // "[description]"
            obj[key2].name // ""

6. **箭头函数**
    - 注意点：
        + **函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。**
            * 箭头函数因为本身没有this，它会直接绑定到它的词法作用域内的this，也就是定义它时的作用域内的this值。通俗点说就是它会直接绑定到它父级的执行上下文里的this。


        + 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
        + 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
        + 不可以使用yield命令，因此箭头函数不能用作 Generator 函数

# 对象的拓展

1. **属性的简洁表示**
    - 属性名就是变量名, 属性值就是变量值。（如果对象的key和value相同，可以简写）

            function f(x, y) {
              return {x, y};
            }

            // 等同于

            function f(x, y) {
              return {x: x, y: y};
            }

            f(1, 2) // Object {x: 1, y: 2} 

    - 方法简写（变量名:function() 写成 变量名()）

            const o = {
              method() {
                return "Hello!";
              }
            };

            // 等同于

            const o = {
              method: function() {
                return "Hello!";
              }
            };

    - 使用： commonJS的模块导出

            let ms = {};

            function getItem (key) {
              return key in ms ? ms[key] : null;
            }

            function setItem (key, value) {
              ms[key] = value;
            }

            function clear () {
              ms = {};
            }

            module.exports = { getItem, setItem, clear };
            // 等同于
            module.exports = {
              getItem: getItem,
              setItem: setItem,
              clear: clear
            };

2. **属性名表达式**
    - 就是声明对象的属性时，属性的名称可以抽取出来，可以是字符串，也可以是表达式

            let propKey = 'foo';

            let obj = {
              [propKey]: true,
              ['a' + 'bc']: 123
            };

    - super 关键字：指向当前对象的原型对象。

            const proto = {
              foo: 'hello'
            };

            const obj = {
              foo: 'world',
              find() {
                return super.foo;
              }
            };

            Object.setPrototypeOf(obj, proto);
            obj.find() // "hello"
        **注意**：super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
            // 报错
            const obj = {
              foo: super.foo
            }

            // 报错
            const obj = {
              foo: () => super.foo
            }

            // 报错
            const obj = {
              foo: function () {
                return super.foo
              }
            }
        上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。

    - “...”：三个点不光可以用来解构，还是拓展运算符，用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

            let foo = { ...['a', 'b', 'c'] };
            foo
            // {0: "a", 1: "b", 2: "c"}

3. **Object.assign()**
    - Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

            const target = { a: 1 };

            const source1 = { b: 2 };
            const source2 = { c: 3 };

            Object.assign(target, source1, source2);
            target // {a:1, b:2, c:3}
        Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
        注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
            const target = { a: 1, b: 1 };

            const source1 = { b: 2, c: 2 };
            const source2 = { c: 3 };

            Object.assign(target, source1, source2);
            target // {a:1, b:2, c:3}

    - 如果只有一个参数，Object.assign会直接返回该参数。**如果该参数不是对象，则会先转成对象，然后返回。**

            typeof Object.assign(2) // "object"

    - 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。

            Object.assign(undefined) // 报错
            Object.assign(null) // 报错

            let obj = {a: 1};
            Object.assign(obj, undefined) === obj // true
            Object.assign(obj, null) === obj // true

    - 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

            const v1 = 'abc';
            const v2 = true;
            const v3 = 10;

            const obj = Object.assign({}, v1, v2, v3);
            console.log(obj); // { "0": "a", "1": "b", "2": "c" }
        上面代码中，v1、v2、v3分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。
            Object(true) // {[[PrimitiveValue]]: true}
            Object(10)  //  {[[PrimitiveValue]]: 10}
            Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}

4. **注意点**
    - 浅拷贝：Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。



# Set和Map数据解构

1. **可以用来数组或字符串去重**
        
        // 去除数组的重复成员
        [...new Set(array)]

        [...new Set('ababbc')].join('')
        // "abc"

2. **Set的属性和方法**
    - Set 结构的实例有以下属性。
        + Set.prototype.constructor：构造函数，默认就是Set函数。
        + Set.prototype.size：返回Set实例的成员总数。
    - Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
        + Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
        + Set.prototype.delete(value):删除某个值，返回一个布尔值，表示删除是否成功。
        + Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
        + Set.prototype.clear()：清除所有成员，没有返回值。
    - Array.from方法可以将 Set 结构转为数组，所以另外一种去重方式

            const items = new Set([1, 2, 3, 4, 5]);
            const array = Array.from(items);

    - 遍历方法
        + Set.prototype.keys()：返回键名的遍历器
        + Set.prototype.values()：返回键值的遍历器
        + Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
        + Set.prototype.entries()：返回键值对的遍历器
        + Set.prototype.forEach()：使用回调函数遍历每个成员
        + 需要特别指出的是，Set的**遍历顺序就是插入顺序**。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
        + for...of和forEach也可以拿来遍历set

    - 配合解构可以间接使用map和filter（其实就是解构成数组，然后调用数组的函数）

            let set = new Set([1, 2, 3]);
            set = new Set([...set].map(x => x * 2));
            // 返回Set结构：{2, 4, 6}

            let set = new Set([1, 2, 3, 4, 5]);
            set = new Set([...set].filter(x => (x % 2) == 0));
            // 返回Set结构：{2, 4}

    - 交集、并集、差集：

            let a = new Set([1, 2, 3]);
            let b = new Set([4, 3, 2]);

            // 并集
            let union = new Set([...a, ...b]);
            // Set {1, 2, 3, 4}

            // 交集
            let intersect = new Set([...a].filter(x => b.has(x)));
            // set {2, 3}

            // （a 相对于 b 的）差集
            let difference = new Set([...a].filter(x => !b.has(x)));
            // Set {1}

3. **weakset**
    - WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
    - 作为构造函数WeakSet可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。

            const a = [[1, 2], [3, 4]];
            const ws = new WeakSet(a);
            // WeakSet {[1, 2], [3, 4]}
        注意，是a数组的成员成为WeakSet的成员，而不是a数组本身。这意味着，数组的成员只能是对象。
            const b = [3, 4];
            const ws = new WeakSet(b);
            // Uncaught TypeError: Invalid value used in weak set(…)
        上面代码中，数组b的成员不是对象，加入 WeakSet 就会报错。

    - WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
    - 这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
    - 由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

4. **Map**
    - Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，解决了object的键一定是字符串的问题是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

            const m = new Map();
            const o = {p: 'Hello World'};

            m.set(o, 'content')
            m.get(o) // "content"

            m.has(o) // true
            m.delete(o) // true
            m.has(o) // false

    - 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。这就是说，Array、Set和Map都可以用来生成新的 Map。

            const map = new Map([
              ['name', '张三'],
              ['title', 'Author']
            ]);

            map.size // 2
            map.has('name') // true
            map.get('name') // "张三"
            map.has('title') // true
            map.get('title') // "Author"

            const set = new Set([
              ['foo', 1],
              ['bar', 2]
            ]);
            const m1 = new Map(set);
            m1.get('foo') // 1

            const m2 = new Map([['baz', 3]]);
            const m3 = new Map(m2);
            m3.get('baz') // 3
        Map构造函数接受数组作为参数，实际上执行的是下面的算法。
            const items = [
              ['name', '张三'],
              ['title', 'Author']
            ];

            const map = new Map();

            items.forEach(
              ([key, value]) => map.set(key, value)
            );

    - 对同一个键多次赋值，后面的值将覆盖前面的值。

            const map = new Map();

            map
            .set(1, 'aaa')
            .set(1, 'bbb');

            map.get(1) // "bbb"

    - 读取一个未知的键，则返回undefined。
    - 注意：只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

            const map = new Map();

            map.set(['a'], 555);
            map.get(['a']) // undefined
        上面代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。

    - 通过上边可以知道：Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用**对象**作为键名，就不用担心自己的属性与原作者的属性同名。
        + 如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。

    - 实例的属性和操作方法
        + size属性：返回 Map 结构的成员总数。
        + Map.prototype.set(key, value)：设置键名key对应的键值为value，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。
            * set方法返回的是当前的Map对象，因此可以采用链式写法。

                    let map = new Map()
                      .set(1, 'a')
                      .set(2, 'b')
                      .set(3, 'c');

        + Map.prototype.get(key)：get方法读取key对应的键值，如果找不到key，返回undefined。
        + Map.prototype.has(key)：has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
        + Map.prototype.delete(key)：delete方法删除某个键，返回true。如果删除失败，返回false。
        + Map.prototype.clear()：clear方法清除所有成员，没有返回值。

    - 遍历方法：Map 结构原生提供三个遍历器生成函数和一个遍历方法。
        + Map.prototype.keys()：返回键名的遍历器。
        + Map.prototype.values()：返回键值的遍历器。
        + Map.prototype.entries()：返回所有成员的遍历器。
        + Map.prototype.forEach()：遍历 Map 的所有成员
        + 需要特别注意的是，Map 的遍历顺序就是插入顺序。

    - Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）

            const map = new Map([
              [1, 'one'],
              [2, 'two'],
              [3, 'three'],
            ]);

            [...map.keys()]
            // [1, 2, 3]

            [...map.values()]
            // ['one', 'two', 'three']

            [...map.entries()]
            // [[1,'one'], [2, 'two'], [3, 'three']]

            [...map]
            // [[1,'one'], [2, 'two'], [3, 'three']]
        结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。

    - Map的forEach与数组的forEach类似但是不同：Map的forEach方法还可以接受第二个参数，用来绑定this。

            const reporter = {
              report: function(key, value) {
                console.log("Key: %s, Value: %s", key, value);
              }
            };

            map.forEach(function(value, key, map) {
              this.report(key, value);
            }, reporter);
        上面代码中，forEach方法的回调函数的this，就指向**reporter**。

5. **weakmap**
    - WeakMap与Map的区别有两点。
        + WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
        + WeakMap的键名所指向的对象，不计入垃圾回收机制。
    - WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。
        + WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
        + 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的DOM元素上添加数据，就可以使用WeakMap结构。当该DOM元素被清除，其所对应的WeakMap记录就会自动被移除。

# Promise 对象

1. **基本用法**
    - Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

            let promise = new Promise(function(resolve, reject) {
              console.log('Promise');
              resolve();
            });

            promise.then(function() {
              console.log('resolved.');
            });

            console.log('Hi!');

            // Promise
            // Hi!
            // resolved 

    - 调用resolve或reject并不会终结 Promise 的参数函数的执行。

            new Promise((resolve, reject) => {
              resolve(1);
              console.log(2);
            }).then(r => {
              console.log(r);
            });
            // 2
            // 1
        上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即resolved的Promise是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
        一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。
            new Promise((resolve, reject) => {
              return resolve(1);
              // 后面的语句不会执行
              console.log(2);
            })

2. **Promise.prototype.then()**
    - then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

            getJSON("/posts.json").then(function(json) {
              return json.post;
            }).then(function(post) {
              // ...
            });
        上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

3. **Promise.prototype.catch()**
    - Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

            getJSON('/posts.json').then(function(posts) {
              // ...
            }).catch(function(error) {
              // 处理 getJSON 和 前一个回调函数运行时发生的错误
              console.log('发生错误！', error);
            });

    - Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

            getJSON('/post/1.json').then(function(post) {
              return getJSON(post.commentURL);
            }).then(function(comments) {
              // some code
            }).catch(function(error) {
              // 处理前面三个Promise产生的错误
            });

    - 跟传统的try//catch代码块不同的是，如果没有使用catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

4. **Promise.prototype.finally()**
    - finally()方法用于指定不管Promise对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
    - finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
    - finally()本质上是then方法的特例

            promise
            .finally(() => {
              // 语句
            });

            // 等同于
            promise
            .then(
              result => {
                // 语句
                return result;
              },
              error => {
                // 语句
                throw error;
              }
            );

    - 手写finally方法：

            Promise.prototype.finally = function (callback) {
              let P = this.constructor;
              return this.then(
                value  => P.resolve(callback()).then(() => value),
                reason => P.resolve(callback()).then(() => { throw reason })
              );
            };

5. **Promise.all()**
    - Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

            const p = Promise.all([p1, p2, p3]);
        上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3都是Promise实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

        + p的状态由p1、p2、p3决定，分成两种情况。
            * 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
            * 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
            * 注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。

                    const p1 = new Promise((resolve, reject) => {
                      resolve('hello');
                    })
                    .then(result => result)
                    .catch(e => e);

                    const p2 = new Promise((resolve, reject) => {
                      throw new Error('报错了');
                    })
                    .then(result => result)
                    .catch(e => e);

                    Promise.all([p1, p2])
                    .then(result => console.log(result))
                    .catch(e => console.log(e));
                    // ["hello", Error: 报错了]
                上面代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

6. **Promise.race()**
    - Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

            const p = Promise.race([p1, p2, p3]);
        上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
        Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。

7. **Promise.allSettled()**
    - Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。该方法由 ES2020 引入。

            const promises = [
              fetch('/api-1'),
              fetch('/api-2'),
              fetch('/api-3'),
            ];

            await Promise.allSettled(promises);
            removeLoadingIndicator();

    - 上面代码对服务器发出三个请求，等到三个请求都结束，不管请求成功还是失败，加载的滚动图标就会消失。该方法返回的新的 Promise 实例，一旦结束，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入Promise.allSettled()的 Promise 实例。

            const resolved = Promise.resolve(42);
            const rejected = Promise.reject(-1);

            const allSettledPromise = Promise.allSettled([resolved, rejected]);

            allSettledPromise.then(function (results) {
              console.log(results);
            });
            // [
            //    { status: 'fulfilled', value: 42 },
            //    { status: 'rejected', reason: -1 }
            // ]

    - 上面代码中，Promise.allSettled()的返回值allSettledPromise，状态只可能变成fulfilled。它的监听函数接收到的参数是数组results。该数组的每个成员都是一个对象，对应传入Promise.allSettled()的两个 Promise 实例。每个对象都有status属性，该属性的值只可能是字符串fulfilled或字符串rejected。fulfilled时，对象有value属性，rejected时有reason属性，对应两种状态的返回值。
    - 有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，Promise.allSettled()方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。Promise.all()方法无法做到这一点。

7. **Promise.any()**
    - Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例**有一个**变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。该方法目前是一个第三阶段的提案 。

8. **Promise.resolve()**
    - 该方法将现有对象转换为promise对象
    - 如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
    - 如果参数是一个thenable对象。thenable对象指的是具有then方法的对象，Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。
    - 不带有任何参数。Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve()方法。
        + 需要注意的是，立即resolve()的Promise对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

                setTimeout(function () {
                  console.log('three');
                }, 0);

                Promise.resolve().then(function () {
                  console.log('two');
                });

                console.log('one');

                // one
                // two
                // three
            **上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。**

9. **Promise.reject()**
    - Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
    - 注意：Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。代码中，Promise.reject方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。

            const thenable = {
              then(resolve, reject) {
                reject('出错了');
              }
            };

            Promise.reject(thenable)
            .catch(e => {
              console.log(e === thenable)
            })
            // true

# Iterator 和 for...of 循环

1. **Iterator（遍历器）的概念**
    - 任何数据结构只要部署 Iterator 接口，就可以完成遍历操作
    - Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是ES6创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
    - Iterator 的遍历过程是这样的。
        + 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个**指针对象**。
        + 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
        + 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
        + 不断调用指针对象的next方法，直到它指向数据结构的结束位置。
        + 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

2. **默认 Iterator 接口**
    - 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
    - 原生具备 Iterator 接口的数据结构如下。
        + Array
        + Map
        + Set
        + String
        + TypedArray
        + 函数的 arguments 对象
        + NodeList 对象
    - 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的Iterator接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。
    - 对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。
    - 一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

            class RangeIterator {
              constructor(start, stop) {
                this.value = start;
                this.stop = stop;
              }

              [Symbol.iterator]() { return this; }

              next() {
                var value = this.value;
                if (value < this.stop) {
                  this.value++;
                  return {done: false, value: value};
                }
                return {done: true, value: undefined};
              }
            }

            function range(start, stop) {
              return new RangeIterator(start, stop);
            }

            for (var value of range(0, 3)) {
              console.log(value); // 0, 1, 2
            }

# async 函数

1. **返回 Promise 对象**
    - async函数返回一个Promise对象。async函数内部return语句返回的值，会成为then方法回调函数的参数。

            async function f() {
              return 'hello world';
            }

            f().then(v => console.log(v))
            // "hello world"

    - async函数内部抛出错误，会导致返回的Promise对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

            async function f() {
              throw new Error('出错了');
            }

            f().then(
              v => console.log(v),
              e => console.log(e)
            )
            // Error: 出错了

2. **await 命令**
    - await命令后面是一个thenable对象（即定义了then方法的对象），那么await会将其等同于Promise对象。
    - 当任何一个await语句后面的Promise对象变为reject状态，那么整个async函数都会中断执行。

            async function f() {
              await Promise.reject('出错了');
              await Promise.resolve('hello world'); // 不会执行
            }

        + 解决办法办法：
            * 把第一个reject包在try...catch里边，
            * 在Promis后再加一个catch()

                    async function f() {
                      try {
                        await Promise.reject('出错了');
                      } catch(e) {
                      }
                      return await Promise.resolve('hello world');
                    }

                    f()
                    .then(v => console.log(v))
                    // hello world

                    async function f() {
                      await Promise.reject('出错了')
                        .catch(e => console.log(e));
                      return await Promise.resolve('hello world');
                    }

                    f()
                    .then(v => console.log(v))
                    // 出错了
                    // hello world

3. **错误处理**
    - 使用try...catch结构，实现多次重复尝试。

            const superagent = require('superagent');
            const NUM_RETRIES = 3;

            async function test() {
              let i;
              for (i = 0; i < NUM_RETRIES; ++i) {
                try {
                  await superagent.get('http://google.com/this-throws-an-error');
                  break;
                } catch(err) {}
              }
              console.log(i); // 3
            }

            test();

4. **使用注意点**
    - 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
    - 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

            let foo = await getFoo();
            let bar = await getBar();
        上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。
            // 写法一
            let [foo, bar] = await Promise.all([getFoo(), getBar()]);

            // 写法二
            let fooPromise = getFoo();
            let barPromise = getBar();
            let foo = await fooPromise;
            let bar = await barPromise;

    - await命令只能用在async函数之中，如果用在普通函数，就会报错。
    - async 函数可以保留运行堆栈。

5. **async 函数的实现原理**

6. **与其他异步处理方法的比较**

# Class的基本语法

1. **类的由来**
    - 传统构造函数与类的关系

            function Point(x, y) {
              this.x = x;
              this.y = y;
            }

            Point.prototype.toString = function () {
              return '(' + this.x + ', ' + this.y + ')';
            };

            var p = new Point(1, 2); 

            class Point {
              constructor(x, y) {
                this.x = x;
                this.y = y;
              }

              toString() {
                return '(' + this.x + ', ' + this.y + ')';
              }
            }

    - ES6 的类，完全可以看作构造函数的另一种写法。

            class Point {
              // ...
            }

            typeof Point // "function"
            Point === Point.prototype.constructor // true

    - 构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。

            class Point {
              constructor() {
                // ...
              }

              toString() {
                // ...
              }

              toValue() {
                // ...
              }
            }

            // 等同于

            Point.prototype = {
              constructor() {},
              toString() {},
              toValue() {},
            };

    - Object.assign方法可以很方便地一次向类添加多个方法。

            class Point {
              constructor(){
                // ...
              }
            }

            Object.assign(Point.prototype, {
              toString(){},
              toValue(){}
            });

    - 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

2. **取值函数（getter）和存值函数（setter）**
    - 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

            class MyClass {
              constructor() {
                // ...
              }
              get prop() {
                return 'getter';
              }
              set prop(value) {
                console.log('setter: '+value);
              }
            }

            let inst = new MyClass();

            inst.prop = 123;
            // setter: 123

            inst.prop
            // 'getter'

3. **注意点**
    - 严格模式
        + 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
    - 不存在提升
        + 类不存在变量提升（hoist），这一点与 ES5 完全不同。

                new Foo(); // ReferenceError
                class Foo {}
            上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，**必须保证子类在父类之后定义。**

        + 下面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。

                {
                  let Foo = class {};
                  class Bar extends Foo {
                  }
                }

    - name 属性
        + name属性总是返回紧跟在class关键字后面的类名

                class Point {}
                Point.name // "Point"

    - Generator 方法
        + 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。

    - this 的指向
        + 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

                class Logger {
                  printName(name = 'there') {
                    this.print(`Hello ${name}`);
                  }

                  print(text) {
                    console.log(text);
                  }
                }

                const logger = new Logger();
                const { printName } = logger;
                printName(); // TypeError: Cannot read property 'print' of undefined
            上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果**将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以this实际指向的是undefined，在非严格模式时，undefined会自己指向window）**，从而导致找不到print方法而报错。

        + 解决方法
            * 一个比较简单的解决方法是，在构造方法中绑定this

                    class Logger {
                      constructor() {
                        this.printName = this.printName.bind(this);
                      }

                      // ...
                    }

            * 另一种解决方法是使用箭头函数。

                    class Obj {
                      constructor() {
                        this.getThis = () => this;
                      }
                    }

                    const myObj = new Obj();
                    myObj.getThis() === myObj // true
                箭头函数内部的this总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。

            * 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。

4. **静态方法**
    - 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

            class Foo {
              static classMethod() {
                return 'hello';
              }
            }

            Foo.classMethod() // 'hello'

            var foo = new Foo();
            foo.classMethod()
            // TypeError: foo.classMethod is not a function
        注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
        
            class Foo {
              static bar() {
                this.baz();
              }
              static baz() {
                console.log('hello');
              }
              baz() {
                console.log('world');
              }
            }

            Foo.bar() // hello
        从这个例子还可以看出，静态方法可以与非静态方法重名。

    - 父类的静态方法，可以被子类继承。

            class Foo {
              static classMethod() {
                return 'hello';
              }
            }

            class Bar extends Foo {
            }

            Bar.classMethod() // 'hello'

    - 静态方法也是可以从super对象上调用的。

            class Foo {
              static classMethod() {
                return 'hello';
              }
            }

            class Bar extends Foo {
              static classMethod() {
                return super.classMethod() + ', too';
              }
            }

            Bar.classMethod() // "hello, too"

5. **实例属性的新写法**
    - 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。

            class IncreasingCounter {
              constructor() {
                this._count = 0;
              }
              get value() {
                console.log('Getting the current value!');
                return this._count;
              }
              increment() {
                this._count++;
              }
            }

            class IncreasingCounter {
              _count = 0;
              get value() {
                console.log('Getting the current value!');
                return this._count;
              }
              increment() {
                this._count++;
              }
            }
        上面代码中，实例属性_count与取值函数value()和increment()方法，处于同一个层级。这时，不需要在实例属性前面加上this。

    - 静态属性：静态属性指的是Class本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

            class Foo {
            }

            Foo.prop = 1;
            Foo.prop // 1
        有一种新的提案，使用static关键字
            class MyClass {
              static myStaticProp = 42;

              constructor() {
                console.log(MyClass.myStaticProp); // 42
              }
            }

6. **私有方法和私有属性**
    - 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。
    - 现有的解决方案：
        + 一种做法是在命名上加以区别。

                class Widget {

                  // 公有方法
                  foo (baz) {
                    this._bar(baz);
                  }

                  // 私有方法
                  _bar(baz) {
                    return this.snaf = baz;
                  }

                  // ...
                }
            上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

        + 另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

                class Widget {
                  foo (baz) {
                    bar.call(this, baz);
                  }

                  // ...
                }

                function bar(baz) {
                  return this.snaf = baz;
                }
            上面代码中，foo是公开方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

        + 还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

                const bar = Symbol('bar');
                const snaf = Symbol('snaf');

                export default class myClass{

                  // 公有方法
                  foo(baz) {
                    this[bar](baz);
                  }

                  // 私有方法
                  [bar](baz) {
                    return this[snaf] = baz;
                  }

                  // ...
                };
            上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。

# Class的继承

1. **简介**
    - Class可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

            class Point {
            }

            class ColorPoint extends Point {
            } 

            class ColorPoint extends Point {
              constructor(x, y, color) {
                super(x, y); // 调用父类的constructor(x, y)
                this.color = color;
              }

              toString() {
                return this.color + ' ' + super.toString(); // 调用父类的toString()
              }
            }
        上面代码中，constructor方法和toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。

    - 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象

            class Point { /* ... */ }

            class ColorPoint extends Point {
              constructor() {
              }
            }

            let cp = new ColorPoint(); // ReferenceError
        上面代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，导致新建实例时报错。

    - ES5与ES6继承的区别：ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
    - 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。

            class ColorPoint extends Point {
            }

            // 等同于
            class ColorPoint extends Point {
              constructor(...args) {
                super(...args);
              }
            }

    - 另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。

            class Point {
              constructor(x, y) {
                this.x = x;
                this.y = y;
              }
            }

            class ColorPoint extends Point {
              constructor(x, y, color) {
                this.color = color; // ReferenceError
                super(x, y);
                this.color = color; // 正确
              }
            }
        上面代码中，子类的constructor方法没有调用super之前，就使用this关键字，结果报错，而放在super方法之后就是正确的。

    - 最后，父类的静态方法，也会被子类继承。

2. **Object.getPrototypeOf()**
    - Object.getPrototypeOf方法可以用来从子类上获取父类。可以使用这个方法判断，一个类是否继承了另一个类。

            Object.getPrototypeOf(ColorPoint) === Point
            // true

3. **super 关键字**
    - super这个关键字，既可以当作函数使用，也可以当作对象使用。
    - 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数

            class A {}

            class B extends A {
              constructor() {
                super();
              }
            }
        + 上面代码中，子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。
        + 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。
        + 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
            class A {}

            class B extends A {
              m() {
                super(); // 报错
              }
            }

    - 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()。这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

            class A {
              constructor() {
                this.p = 2;
              }
            }

            class B extends A {
              get m() {
                return super.p;
              }
            }

            let b = new B();
            b.m // undefined
        上面代码中，p是父类A实例的属性，super.p就引用不到它。如果属性定义在父类的原型对象上，super就可以取到。
            class A {}
            A.prototype.x = 2;

            class B extends A {
              constructor() {
                super();
                console.log(super.x) // 2
              }
            }

            let b = new B();

    - ES6规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。

            class A {
              constructor() {
                this.x = 1;
              }
              print() {
                console.log(this.x);
              }
            }

            class B extends A {
              constructor() {
                super();
                this.x = 2;
              }
              m() {
                super.print();
              }
            }

            let b = new B();
            b.m() // 2
        上面代码中，super.print()虽然调用的是A.prototype.print()，但是A.prototype.print()内部的this指向子类B的实例，导致输出的是2，而不是1。也就是说，实际上执行的是super.print.call(this)。

    - 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。

            class A {
              constructor() {
                this.x = 1;
              }
            }

            class B extends A {
              constructor() {
                super();
                this.x = 2;
                super.x = 3;
                console.log(super.x); // undefined
                console.log(this.x); // 3
              }
            }

            let b = new B();
        上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

    - 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。

            class Parent {
              static myMethod(msg) {
                console.log('static', msg);
              }

              myMethod(msg) {
                console.log('instance', msg);
              }
            }

            class Child extends Parent {
              static myMethod(msg) {
                super.myMethod(msg);
              }

              myMethod(msg) {
                super.myMethod(msg);
              }
            }

            Child.myMethod(1); // static 1

            var child = new Child();
            child.myMethod(2); // instance 2

    - 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。

            class A {
              constructor() {
                this.x = 1;
              }
              static print() {
                console.log(this.x);
              }
            }

            class B extends A {
              constructor() {
                super();
                this.x = 2;
              }
              static m() {
                super.print();
              }
            }

            B.x = 3;
            B.m() // 3

    - 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。

            var obj = {
              toString() {
                return "MyObject: " + super.toString();
              }
            };

            obj.toString(); // MyObject: [object Object]

4. **类的 prototype 属性和__proto__属性**
    - 子类的__proto__属性，表示构造函数的继承，总是指向父类。
    - 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

            class A {
            }

            class B extends A {
            }

            B.__proto__ === A // true
            B.prototype.__proto__ === A.prototype // true
        这样的结果是因为，类的继承是按照下面的模式实现的。
            class A {
            }

            class B {
            }

            // B 的实例继承 A 的实例
            Object.setPrototypeOf(B.prototype, A.prototype);

            // B 继承 A 的静态属性
            Object.setPrototypeOf(B, A);

            const b = new B();
        解释：
            Object.setPrototypeOf = function (obj, proto) {
              obj.__proto__ = proto;
              return obj;
            }

    - extends关键字后面可以跟多种类型的值。
        + 上面代码的A，只要是一个有prototype属性的函数，就能被B继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。

                class A extends Object {
                }

                A.__proto__ === Object // true
                A.prototype.__proto__ === Object.prototype // true

# Generator

  
1. Generator返回的是一个遍历器对象，只有在调用next时才是遍历下一个内部状态，实际上就是提供了一种可以暂停执行的函数，yield就是暂停的标志。
2. next方法的逻辑如下：
    * next()返回的是一个对象，里边包含两个属性，value和done

            {value: '', done: ''}

    * 遇到yield就暂停后边的操作，并将yield后边的值作为返回的value值
    * 下次执行next，就往下执行，知道遇见下一个yield
    * 如果没有yield，就运行到return，并将return作为value的值，然后done赋值为true
    * 如果没有return，则返回value值为undefined，done为true
3. yield后边的值是懒惰执行的，只有当next()运行到它时，才会计算后边跟着的表达式、
            
        function* gen() {
          yield  123 + 456;
        }
    yield后面的表达式123+456，不会立即求值，只会在next方法将指针移到这一句时，才会求值

4. yield表达式如果用在另一个表达式之中，必须放在圆括号里面。

        function* demo() {
          console.log('Hello' + yield); // SyntaxError
          console.log('Hello' + yield 123); // SyntaxError

          console.log('Hello' + (yield)); // OK
          console.log('Hello' + (yield 123)); // OK
        }

5. 将一个对象的Symbol.iterator属性赋值一个generator的话，改对象就拥有了Iterator接口，就可以被遍历

        var myIterable = {};
        myIterable[Symbol.iterator] = function* () {
          yield 1;
          yield 2;
          yield 3;
        };

        [...myIterable] // [1, 2, 3]

6. yield表达式，自己本身是没有返回值的，所以let a = yield 123,这时a的值为undefined，next方法可以传入一个参数，这个参数就可以当做是上一个yield的返回值。

        function* foo(x) {
          var y = 2 * (yield (x + 1));
          var z = yield (y / 3);
          return (x + y + z);
        }

        var a = foo(5);
        a.next() // Object{value:6, done:false}
        a.next() // Object{value:NaN, done:false}
        a.next() // Object{value:NaN, done:true}

        var b = foo(5);
        b.next() // { value:6, done:false }
        b.next(12) // { value:8, done:false }
        b.next(13) // { value:42, done:true }
    **注意：**因为next()的参数是上一个yield的返回值，所以第一次使用next()时，传参是无效的

7. for...of循环可以自动循环遍历generator且不用使用next函数
8. yield* ：如果在Generator函数内部，调用另一个Generator函数。需要在前者的函数体内部，自己手动完成遍历。

        function* foo() {
          yield 'a';
          yield 'b';
        }

        function* bar() {
          yield 'x';
          // 手动遍历 foo()
          for (let i of foo()) {
            console.log(i);
          }
          yield 'y';
        }

        for (let v of bar()){
          console.log(v);
        }
        // x
        // a
        // b
        // y

    yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。

        function* bar() {
          yield 'x';
          yield* foo();
          yield 'y';
        }

        // 等同于
        function* bar() {
          yield 'x';
          yield 'a';
          yield 'b';
          yield 'y';
        }

        // 等同于
        function* bar() {
          yield 'x';
          for (let v of foo()) {
            yield v;
          }
          yield 'y';
        }

        for (let v of bar()){
          console.log(v);
        }
        // "x"
        // "a"
        // "b"
        // "y"

# Symbol
1. Symbol类型     
    * 产生一个独一无二的值，防止属性命名冲突
    * 不能使用new方法
    * 直接使用 let a = Symbol()来创建，里边可以输入一个字符串作为description
    * symbol是能使用点运算符

            let a = {}
            let mySymbol = Symbol()

            a.mySymbol = 'Hello!';
            a[mySymbol] // undefined
            a['mySymbol'] // "Hello!"

