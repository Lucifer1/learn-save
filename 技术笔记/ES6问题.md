1. 解构赋值
   1. 数组结构
      1. 具有 Iterator 接口，都可以采用数组形式的解构赋值。

            ```
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
            ```
      2. 允许有默认值，当解构的数值严格等于undefined时，采用默认值

            ```
            let [x = 1] = [undefined];
            x // 1

            let [x = 1] = [null];
            x // null
            ```

   2. 对象解构:对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，**变量必须与属性同名**，才能取到正确的值。
   3. 函数参数结构：[[1, 2], [3, 4]].map(([a, b]) => a + b); // [ 3, 7 ]
2. import {} from 'a.js' 与 import test from 'a.js'的区别
    1.  import {} from 'a.js',它是导入非export default的东西的，也就是它用于导入export ...的东西的

        ```
        export function test() {}   //导出这个，在import时名字必须一致，也就是只能使用test，不能使用其他的
        ```

    2. import test from 'a.js' ，用于导入export default的东西的，它不包括export的东西，只包括export default的东西，导出的是一个对象，使用 **命名.变量名**的方式使用，可以随便命名

        ```
        export dafault {
            a: []
        }

        import test from '...'

        test.a来使用
        ```

3. promise.then的简便用法

    ```
    request.get('/web-navigation/userHistoryOfClass', {
        params: {
            userId
        }
        }).then(res => res.data)
    ```
    原理：箭头函数v => v 等价于 function(v) {return v}

4. await命令后面是一个 Promise 对象，返回该对象的结果
5. import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

        ```
        import('./myModule.js')
        .then(({export1, export2}) => {
        // ...·
        });
        ```

6. Set：可以理解为没有重复的数组，可以接受有iterator接口的数据结构作为参数
   1. 两个属性，
      1. constructor：就是Set本身
      2. size：成员的数量
   2. 4个操作方法
      1. add(val)
      2. delete(val)
      3. has(val)
      4. clear()：清空
   3. 4个遍历方法
      1. keys()
      2. values()
      3. entries()
      4. forEach()
      5. 因为Set没有键名，只有键值，所有1 2 相同
      6. Set的遍历顺序就是插入顺序
      7. 默认遍历器生成函数就是它的values方法。Set.prototype[Symbol.iterator] === Set.prototype.values // true
7. WeakSet 的成员只能是**对象**，而不能是其他类型的值。
   1. WeakSet 可以接受一个数组或类似数组的对象作为参数。该数组的**所有成员**，都会自动成为 WeakSet 实例**对象的成员**。

        ```
        // correct
        const a = [[1, 2], [3, 4]];
        const ws = new WeakSet(a);      // WeakSet {[1, 2], [3, 4]}

        // wrong
        const b = [3, 4];
        const ws = new WeakSet(b);
        // Uncaught TypeError: Invalid value used in weak set(…)
        因为3，4不是对象
        ```

    1. 不能遍历，因为没准啥时候就被垃圾回收了，垃圾回收的时间是不可预测的，所以也没有size
    2. 它只有add，delete和has
8. Map
   1. 任何具有 Iterator 接口、且**每个成员**都是一个**双元素**的数组的数据结构都可以当作Map构造函数的参数
   2. 读取一个未知的键，则返回undefined。
   3. **只有对同一个对象的引用，Map 结构才将其视为同一个键**

        ```
        const map = new Map();

        map.set(['a'], 555);
        map.get(['a']) // undefined
        ```
        这是两个不同的数组实例，内存地址是不一样的,因此get方法无法读取该键，返回undefined。
    1. 一个属性size
    2. 5个操作方法
       1. set(val)
       2. get(val)
       3. delete(val)
       4. has(val)
       5. clear()
    3. 4个遍历方法
       1. keys()
       2. values()
       3. entries()
       4. forEach()
       5.  Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。map[Symbol.iterator] === map.entries // true
9. WeakMap
   1.  只接受**对象**作为键名
   2.  没有遍历操作，也没有size
   3.  无法清空，即不支持clear方法
   4.  WeakMap只有四个方法可用：get()、set()、has()、delete()。