[TOC]
### Typescript

#### 基础

##### 原始数据类型

###### 1. 布尔值

* Typescript中使用boolean来定义布尔值，而不是Boolean，其他的基础类型也是一样
* 例如：

    ```
    let isDone: boolean = false;       // 编译通过

    let createdByNewBoolean: boolean = new Boolean(1);  // 不通过
    ```

    因为使用构造函数`Boolean`创造的对象**不是**布尔值，`new Boolean()`事实上返回的是一个`Boolean`对象，如果改成：

    ```
    let createdByNewBoolean: Boolean = new Boolean(1);  // 通过
    ```

    此外，直接调用Boolean()也可以返回一个boolean类型：

    ```
    let createdByBoolean: boolean = Boolean(1);
    ```

###### 2. 空值

* JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：

    ```
    function alertName(): void {
        alert('My name is Tom');
    }
    ```

* 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null

###### 3. Null Undefined

* 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

    ```
    let u: undefined = undefined;
    let n: null = null;
    ```

    与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

    ```
    // 这样不会报错
    let num: number = undefined;
    // 这样也不会报错
    let u: undefined;
    let num: number = u;
    ```

    而 void 类型的变量不能赋值给 number 类型的变量：

    ```
    let u: void;
    let num: number = u;

    // Type 'void' is not assignable to type 'number'.
    ```

##### 任意值(Any)

###### 1. 什么是任意值类型

* 任意值：一个普通类型在定义完之后，是不允许被赋值为其他类型的：

    ```
    let myFavoriteNumber: string = 'seven';
    myFavoriteNumber = 7;

    // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
    ```

    只有当它为任意值时，才可以赋值为其他类型：

    ```
    let myFavoriteNumber: any = 'seven';
    myFavoriteNumber = 7;
    ```

###### 2. 任意值的属性和方法

* 任意值可以访问任何属性，也可以调用任何方法

###### 3. 未声明类型的变量

* 在ts中，如果没有给变量定义类型，那么它默认为`任意值`类型

    ```
    let something;
    something = 'seven';
    something = 7;

    something.setName('Tom');
    ```

##### 类型推论

* 如果没有明确指出，那么TS会依照类型推论原则，推断出一个类型： 

    ```
    let myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;

    // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
    ```

    根据类型推论，它等价于：

    ```
    let myFavoriteNumber: string = 'seven';
    myFavoriteNumber = 7;

    // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
    ```

* 如果定义时没有赋值，不管之后有没有赋值，都会被推断成`any`类型，不会被类型检查：

    ```
    let myFavoriteNumber;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    ```

##### 联合类型

###### 1. 定义

* 联合类型（Union Types）表示取值可以为多种类型中的一种:

    ```
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    ```
    ```
    let myFavoriteNumber: string | number;
    myFavoriteNumber = true;

    // index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
    //   Type 'boolean' is not assignable to type 'number'.
    ```

###### 2. 访问联合类型的属性或方法

* 在使用联合类型时，因为`typescript`不确定使用的是哪种类型，所以在调用变量的方式时，只能调用所有联合类型共有的方法：

    ```
    function getLength(something: string | number): number {
        return something.length;
    }

    // index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
    //   Property 'length' does not exist on type 'number'.
    ```

###### 3. 联合属性的赋值

* 联合类型在被赋值时，会根据类型推论的规则推断出一个类型：

    ```
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    console.log(myFavoriteNumber.length); // 5
    myFavoriteNumber = 7;
    console.log(myFavoriteNumber.length); // 编译时报错

    // index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
    ```
    上例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。  
    而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。

##### 接口

###### 1. 什么是接口

* 定义：TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
* 简单实例

    ```
    interface Person {
        name: string;
        age: number;
    }

    let tom: Person = {
        name: 'Tom',
        age: 25
    };
    ```
    注意：变量类型为接口的变量的形状必须与接口一致，多属性或者少属性都是不允许的，都会报错

###### 2. 可选属性

* 可选属性：希望不用完全匹配时，使用可选属性（但是只能使用定义好的可选属性，还是不能随意添加）

    ```
    interface Person {
        name: string;
        age?: number;
    }

    let tom: Person = {
        name: 'Tom'
    };
    ```
    ```
    interface Person {
        name: string;
        age?: number;
    }

    let tom: Person = {
        name: 'Tom',
        age: 25
    };
    ```

###### 3. 任意属性

* 任意属性：允许接口有任意属性时，使用该属性
    - 注意：使用任意属性时，确定属性和可选属性的类型都必须是任意属性的子类型
    - 一个接口中只能拥有**一个**任意属性，需要使用多个类型是，可以使用联合类型

    ```
    interface Person {
        name: string;
        age?: number;
        [propName: string]: any;
    }

    let tom: Person = {
        name: 'Tom',
        gender: 'male'
    };
    ```
    错误例子：
    ```
    interface Person {
        name: string;
        age?: number;
        [propName: string]: string;
    }

    let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };

    // index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
    // index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
    //   Index signatures are incompatible.
    //     Type 'string | number' is not assignable to type 'string'.
    //       Type 'number' is not assignable to type 'string'.
    ```

###### 4. 只读属性

* 只读属性：只能用来读取，不能被赋值，使用readonly来定义

    ```
    interface Person {
        readonly id: number;
        name: string;
        age?: number;
        [propName: string]: any;
    }

    let tom: Person = {
        id: 89757,
        name: 'Tom',
        gender: 'male'
    };

    tom.id = 9527;
    ```
    **注意：注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：**
    ```
    interface Person {
        readonly id: number;
        name: string;
        age?: number;
        [propName: string]: any;
    }

    let tom: Person = {
        name: 'Tom',
        gender: 'male'
    };

    tom.id = 89757;

    // index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
    //   Property 'id' is missing in type '{ name: string; gender: string; }'.
    // index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
    ```
    上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。  
    第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了。

##### 数组的类型

###### 1. 「类型 + 方括号」表示法

* 基本定义： 类型+方括号

    ```
    let fibonacci: number[] = [1, 1, 2, 3, 5];
    ```
    不允许出现其他类型的变量
    ```
    let fibonacci: number[] = [1, '1', 2, 3, 5];

    // Type 'string' is not assignable to type 'number'.
    ```
    定义好类型后，对应的数组方法的类型也会被限制
    ```
    let fibonacci: number[] = [1, 1, 2, 3, 5];
    fibonacci.push('8');

    // Argument of type '"8"' is not assignable to parameter of type 'number'.
    ```

###### 2. 数组泛型

* 数组泛型：

    ```
    let fibonacci: Array<number> = [1, 1, 2, 3, 5];
    ```

###### 3. 用接口表示数组

* 用接口表示数组：这种方法**不常用**

    ```
    interface NumberArray {
        [index: number]: number;
    }
    let fibonacci: NumberArray = [1, 1, 2, 3, 5];
    ```
    NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。  
    **不过它经常用来表示类数组**

###### 4. 类数组

* 类数组：比如说arguments

    ```
    function sum() {
        let args: number[] = arguments;
    }

    // Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
    ```
    它不能用普通的数组来表示，一般使用**接口**的方式来表示
    ```
    function sum() {
        let args: {
            [index: number]: number;
            length: number;
            callee: Function;
        } = arguments;
    }
    ```
    除了需要定义每个索引为数字时，变量也必须为数字外，还需要定义length和callee

    常用的类数组都有自己的接口定义，类似于:`IArguments`,`NodeList`,`HTMLCollection`等
    ```
    function sum() {
        let args: IArguments = arguments;
    }
    ```
    其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
    ```
    interface IArguments {
        [index: number]: any;
        length: number;
        callee: Function;
    }
    ```

###### 5. Any在数组中的应用

* any在数组中的应用：表示数组中的变量可以为任意类型

    ```
    let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
    ```

##### 函数的类型

###### 1. 函数声明与函数表达式

* 函数声明在JS中有两种方式：函数声明和函数表达式。在TS中，需要对函数的输入和输出都进行约束
    - 函数声明在TS中很简单：

        ```
        function sum(x: number, y: number): number {
            return x + y;
        }
        ```
        这时候，不允许输入多余的参数，或者输入的参数少于形参的数量
        ```
        function sum(x: number, y: number): number {
            return x + y;
        }
        sum(1, 2, 3);

        // index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
        ```
        ```
        function sum(x: number, y: number): number {
            return x + y;
        }
        sum(1);

        // index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
        ```

    - 函数表达式

        ```
        let mySum = function (x: number, y: number): number {
            return x + y;
        };
        ```
        简单来写是这样的，不过这种形式没有明面上对mySum进行约束，而是通过类型推论来推断来的，完整的写法应该是：
        ```
        let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
            return x + y;
        };
        ```
        这里的`=>`和ES6中的箭头函数不同，它只是用来说明函数的输出类型的

###### 2. 用接口定义函数的形状

* 用接口的形状来定义函数：

    ```
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }

    let mySearch: SearchFunc;
    mySearch = function(source: string, subString: string) {
        return source.search(subString) !== -1;
    }
    ```
    采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

###### 3. 可选参数

* 可选参数：它的用法和接口中很类似，都是使用`?`来定义

    ```
    function buildName(firstName: string, lastName?: string) {
        if (lastName) {
            return firstName + ' ' + lastName;
        } else {
            return firstName;
        }
    }
    let tomcat = buildName('Tom', 'Cat');
    let tom = buildName('Tom');
    ```
    **注意，可选参数后边不能再接必需参数**
    ```
    function buildName(firstName?: string, lastName: string) {
        if (firstName) {
            return firstName + ' ' + lastName;
        } else {
            return lastName;
        }
    }
    let tomcat = buildName('Tom', 'Cat');
    let tom = buildName(undefined, 'Tom');

    // index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
    ```

###### 4. 参数默认值

* 参数默认值：ES6中允许给函数添加默认值，TS中会把添加了默认值的参数识别成**可选参数**

    ```
    function buildName(firstName: string, lastName: string = 'Cat') {
        return firstName + ' ' + lastName;
    }
    let tomcat = buildName('Tom', 'Cat');
    let tom = buildName('Tom');
    ```
    **此时就不再受可选参数必需在必需参数之后的约束了**
    ```
    function buildName(firstName: string = 'Tom', lastName: string) {
        return firstName + ' ' + lastName;
    }
    let tomcat = buildName('Tom', 'Cat');
    let cat = buildName(undefined, 'Cat');
    ```

###### 5. 剩余参数

* 剩余参数：ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数），事实上，...rest是一个数组。所以我们可以用数组的类型来定义它：

    ```
    function push(array: any[], ...items: any[]) {
        items.forEach(function(item) {
            array.push(item);
        });
    }

    let a = [];
    push(a, 1, 2, 3);
    ```

###### 6. 重载

* 重载：**重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。**  
    比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。

    利用联合类型，我们可以这么实现：

    ```
    function reverse(x: number | string): number | string {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }
    ```
    然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。

    这时，我们可以使用重载定义多个 reverse 的函数类型：

    ```
    function reverse(x: number): number;
    function reverse(x: string): string;
    function reverse(x: number | string): number | string {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }
    ```
    上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

    注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

##### 类型断言
**类型断言（Type Assertion）可以用来手动指定一个值的类型。**

###### 1. 语法

* 语法： 

    ```
    值 as 类型
    ```
    或
    ```
    <类型>值
    ```
    在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 值 as 类型。  

    形如 <Foo> 的语法在 tsx 中表示的是一个 ReactNode，在 ts   中除了表示类型断言之外，也可能是表示一个泛型。  

    故建议大家在使用类型断言时，统一使用 值 as 类型 这样的语法  

###### 2. 断言的用途

* 断言的用途：
    - 将一个联合类型断言为其中一个类型

        因为ts在联合类型时，没有确定是哪个类型时，只能使用联合类型共有的方法，但是有时我们需要提前使用，这时候就可以使用断言

            ```
            function isFish(animal: Cat | Fish) {
                if (typeof (animal as Fish).swim === 'function') {
                    return true;
                }
                return false;
            }
            ```

    - 将一个父类断言为更加具体的子类
        ```
        class ApiError extends Error {
            code: number = 0;
        }
        class HttpError extends Error {
            statusCode: number = 200;
        }

        function isApiError(error: Error) {
            if (typeof (error as ApiError).code === 'number') {
                return true;
            }
            return false;
        }
        ```

    - 将任何一个类型断言为any

        理想情况下，TypeScript 的类型系统运转良好，每个值的类型都具体而精确。

        当我们引用一个在此类型上不存在的属性或方法时，就会报错：
        ```
        const foo: number = 1;
        foo.length = 1;

        // index.ts:2:5 - error TS2339: Property 'length' does not exist on type 'number'.
        ```
        上面的例子中，数字类型的变量 foo 上是没有 length 属性的，故 TypeScript 给出了相应的错误提示。

        这种错误提示显然是非常有用的。

        但有的时候，我们非常确定这段代码不会出错，比如下面这个例子：

        ```
        window.foo = 1;
        

        // index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
        ```
        上面的例子中，我们需要将 window 上添加一个属性 foo，但 TypeScript 编译时会报错，提示我们 window 上不存在 foo 属性。

        此时我们可以使用 as any 临时将 window 断言为 any 类型：
        ```
        (window as any).foo = 1;
        ```
        在 any 类型的变量上，访问任何属性都是允许的。

        **需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。**

        **它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。**

        上面的例子中，我们也可以通过[扩展 window 的类型（TODO）][]解决这个错误，不过如果只是临时的增加 foo 属性，as any 会更加方便。

        总之，一方面不能滥用 as any，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一），才能发挥出 TypeScript 最大的价值。

    - 将any断言为一个具体的类型

        比如遇见历史遗留问题时，别人的写的代码全是any，我们为了明确类型，可以对变量或者返回值进行断言然后返回，这样提高代码的可维护性

            ```
            function getCacheData(key: string): any {
                return (window as any).cache[key];
            }

            interface Cat {
                name: string;
                run(): void;
            }

            const tom = getCacheData('tom') as Cat;
            tom.run();
            ```

###### 3. 类型断言的限制

* 明确一点：**并不是任何一个类型都可以被断言为任何另一个类型，**具体来说，若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。

###### 4. 双重断言

* 因为任何类型都可以被断言为any，any 可以被断言为任何类型，所以使用双重断言`as any as Foo`就可以将任何一个类型转换为任何另一个类型
* 若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。**除非迫不得已，千万别用双重断言。**

###### 5. 类型断言 vs 类型转换

*  类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：

    ```
    function toBoolean(something: any): boolean {
        return something as boolean;
    }


    toBoolean(1);
    ```
    // 返回值为 1
    在上面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：

    ```
    function toBoolean(something) {
        return something;
    }

    toBoolean(1);
    // 返回值为 1
    ```

    所以类型断言不是类型转换，它不会真的影响到变量的类型。

    若要进行类型转换，需要直接调用类型转换的方法：

    ```
    function toBoolean(something: any): boolean {
        return Boolean(something);
    }

    toBoolean(1);
    // 返回值为 true
    ```

###### 6. 类型断言 vs 类型声明

* 他们两个的区别主要体现在兼容性上
* animal 断言为 Cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
* animal 赋值给 tom，需要满足 Cat 兼容 Animal 才行
* **类型声明是比类型断言更加严格的。**所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅。

###### 7. 类型断言 vs 泛型

##### 声明文件
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

###### 1. 什么是声明语句

###### 2. 什么是声明文件

* 声明语句放到一个单独的文件中，这就是声明文件

###### 3. 书写声明文件

* 在不同的场景下，声明文件的内容和使用方式会有所区别。库的使用场景主要有以下几种：
    - 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
    - npm 包：通过 `import foo from 'foo'` 导入，符合 ES6 模块规范
    - UMD 库：既可以通过 `<script>` 标签引入，又可以通过 import 导入
    - 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构
    - 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
    - 模块插件：通过 `<script>` 或 import 导入后，改变另一个模块的结构

###### 4. 全局变量

* 全局变量的声明文件主要有以下几种语法：
    - declare var 声明全局变量
        + 它能够用来定义一个全局变量的类型。与其类似的，还有 declare let 和 declare const，使用 let 与使用 var 没有什么区别：

            ```
            // src/jQuery.d.ts

            declare let jQuery: (selector: string) => any;
            ```
            ```
            // src/index.ts

            jQuery('#foo');
            // 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
            jQuery = function(selector) {
                return document.querySelector(selector);
            };
            ```
        
            使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了,一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let。**需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现**

            ```
            declare const jQuery = function(selector) {
                return document.querySelector(selector);
            };
            // ERROR: An implementation cannot be declared in ambient contexts.
            ```

    - declare function 声明全局方法
        + `declare function` 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义：

            ```
            // src/jQuery.d.ts

            declare function jQuery(selector: string): any;
            ```
            ```
            // src/index.ts

            jQuery('#foo');
            ```

            在函数类型的声明语句中，函数重载也是支持的

            ```
            // src/jQuery.d.ts

            declare function jQuery(selector: string): any;
            declare function jQuery(domReadyCallback: () => any): any;
            ```
            ```
            // src/index.ts

            jQuery('#foo');
            jQuery(function() {
                alert('Dom Ready!');
            });
            ```

    - declare class 声明全局类
        + 当全局变量是一个类的时候，我们用 `declare class` 来定义它的类型

            ```
            // src/Animal.d.ts

            declare class Animal {
                name: string;
                constructor(name: string);
                sayHi(): string;
            }
            ```
            ```
            // src/index.ts

            let cat = new Animal('Tom');
            ```

            同样的，declare class 语句也只能用来定义类型，**不能用来定义具体的实现**，比如定义 sayHi 方法的具体实现则会报错：

            ```
            // src/Animal.d.ts

            declare class Animal {
                name: string;
                constructor(name: string);
                sayHi() {
                    return `My name is ${this.name}`;
                };
                // ERROR: An implementation cannot be declared in ambient contexts.
            }
            ```

    - declare enum 声明全局枚举类型
    - declare namespace 声明（含有子属性的）全局对象
    - interface 和 type 声明全局类型
    
* export:
    - npm 包的声明文件与全局变量的声明文件有很大区别。在 npm 包的声明文件中，使用declare不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用export导出，然后在使用方import导入后，才会应用到这些类型声明。export的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现

        ```
        // types/foo/index.d.ts

        export const name: string;
        export function getName(): string;
        export class Animal {
            constructor(name: string);
            sayHi(): string;
        }
        export enum Directions {
            Up,
            Down,
            Left,
            Right
        }
        export interface Options {
            data: any;
        }
        ```

        对应的导入和使用模块应该是这样：

        ```
        // src/index.ts

        import { name, getName, Animal, Directions, Options } from 'foo';

        console.log(name);
        let myName = getName();
        let cat = new Animal('Tom');
        let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
        let options: Options = {
            data: {
                name: 'foo'
            }
        };
        ```

        **混用 declare 和 export:**

        ```
        // types/foo/index.d.ts

        declare const name: string;
        declare function getName(): string;
        declare class Animal {
            constructor(name: string);
            sayHi(): string;
        }
        declare enum Directions {
            Up,
            Down,
            Left,
            Right
        }
        interface Options {
            data: any;
        }

        export { name, getName, Animal, Directions, Options };
        ```

* export default:
    - 在 ES6 模块系统中，使用 export default 可以导出一个默认值，使用方可以用 import foo from 'foo' 而不是 import { foo } from 'foo' 来导入这个默认值。
    - 注意，只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出
    - 针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面

* 三斜线指令
    - 类似于声明文件中的 import，它可以用来导入另一个声明文件。与 import 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 import：
        + 当我们在书写一个全局变量的声明文件时
        + 当我们需要依赖一个全局变量的声明文件时
    - 拆分声明文件
    - 当我们的全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将它们一一引入，来提高代码的可维护性。比如 jQuery 的声明文件就是这样的：

        ```
        // node_modules/@types/jquery/index.d.ts

        /// <reference types="sizzle" />
        /// <reference path="JQueryStatic.d.ts" />
        /// <reference path="JQuery.d.ts" />
        /// <reference path="misc.d.ts" />
        /// <reference path="legacy.d.ts" />

        export = jQuery;
        ```

        其中用到了 types 和 path 两种不同的指令。它们的区别是：types 用于声明对另一个库的依赖，而 path 用于声明对另一个文件的依赖。

        上例中，sizzle 是与 jquery 平行的另一个库，所以需要使用 types="sizzle" 来声明对它的依赖。而其他的三斜线指令就是将 jquery 的声明拆分到不同的文件中了，然后在这个入口文件中使用 path="foo" 将它们一一引入。

#### 进阶

##### 类型别名

###### 1. 定义

* 我们使用 type 创建类型别名。

    ```
    type Name = string;
    type NameResolver = () => string;
    type NameOrResolver = Name | NameResolver;
    function getName(n: NameOrResolver): Name {
        if (typeof n === 'string') {
            return n;
        } else {
            return n();
        }
    }
    ```

##### 字符串字面量类型

###### 1. 定义

* 字符串字面量类型用来约束取值只能是某几个字符串中的一个

    ```
    type EventNames = 'click' | 'scroll' | 'mousemove';
    function handleEvent(ele: Element, event: EventNames) {
        // do something
    }

    handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
    handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

    // index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
    ```

    上例中，我们使用 type 定了一个字符串字面量类型 EventNames，它只能取三种字符串中的一种。
    **注意，类型别名与字符串字面量类型都是使用 type 进行定义。**

##### 元组

###### 1. 定义

* 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

    ```
    定义一对值分别为 string 和 number 的元组：

    let tom: [string, number] = ['Tom', 25];
    当赋值或访问一个已知索引的元素时，会得到正确的类型：

    let tom: [string, number];
    tom[0] = 'Tom';
    tom[1] = 25;

    tom[0].slice(1);
    tom[1].toFixed(2);
    也可以只赋值其中一项：

    let tom: [string, number];
    tom[0] = 'Tom';
    ```

    但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。

    ```
    let tom: [string, number];
    tom = ['Tom', 25];
    let tom: [string, number];
    tom = ['Tom'];

    // Property '1' is missing in type '[string]' but required in type '[string, number]'.
    ```

###### 2. 越界的元素
* 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
    
    ```
    let tom: [string, number];
    tom = ['Tom', 25];
    tom.push('male');
    tom.push(true);

    // Argument of type 'true' is not assignable to parameter of type 'string | number'.
    ```

##### 枚举

###### 1. 定义

* 枚举使用 enum 关键字来定义：

    ```
    enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
    ```
    枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
    ```
    enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

    console.log(Days["Sun"] === 0); // true
    console.log(Days["Mon"] === 1); // true
    console.log(Days["Tue"] === 2); // true
    console.log(Days["Sat"] === 6); // true

    console.log(Days[0] === "Sun"); // true
    console.log(Days[1] === "Mon"); // true
    console.log(Days[2] === "Tue"); // true
    console.log(Days[6] === "Sat"); // true
    ```

* 另外一个例子，结合使用：

    ```
    // 数字枚举的声明可以分为两大类，带有初始化器和不带初始化器
    // 01-不带初始化器，枚举成员默认从 0 开始，依次递增；
    enum NumEnum1 { one, two }
    NumEnum1.one => 0
    NumEnum1.two => 1
    // 02-带有初始化器，这种又可以分为两种：
    // 02-01-使用初始化器并指定初始化的常数，
    // 未使用初始化器的成员取值是在上一个成员的基础上 +1；
    enum NumEnum2 {
      one = 10,
      two,
      three = 20,
      four
    }
    NumEnum2.two => 11
    NumEnum2.four => 21
    // 02-02-使用初始化器并且初始化值是对已经声明的枚举的枚举成员的引用
    enum NumEnum3 {
      one = NumEnum2.four,
      two
    }
    NumEnum3.one => 21
    NumEnum3.two => 22
    ```

###### 2. 手动赋值

* 我们也可以给枚举项手动赋值：

    ```
    enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

    console.log(Days["Sun"] === 7); // true
    console.log(Days["Mon"] === 1); // true
    console.log(Days["Tue"] === 2); // true
    console.log(Days["Sat"] === 6); // true
    ```
    上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增。
    如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：
    ```
    enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

    console.log(Days["Sun"] === 3); // true
    console.log(Days["Wed"] === 3); // true
    console.log(Days[3] === "Sun"); // false
    console.log(Days[3] === "Wed"); // true
    ```
    上面的例子中，递增到 3 的时候与前面的 Sun 的取值重复了，但是TypeScript并没有报错，导致 Days[3] 的值先是 "Sun"，而后又被 "Wed" 覆盖了

    手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：
    ```
    enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
    var Days;
    (function (Days) {
        Days[Days["Sun"] = 7] = "Sun";
        Days[Days["Mon"] = 8] = "Mon";
        Days[Days["Tue"] = 9] = "Tue";
        Days[Days["Wed"] = 10] = "Wed";
        Days[Days["Thu"] = 11] = "Thu";
        Days[Days["Fri"] = 12] = "Fri";
        Days[Days["Sat"] = "S"] = "Sat";
    })(Days || (Days = {}));
    ```
    当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1：
    ```
    enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

    console.log(Days["Sun"] === 7); // true
    console.log(Days["Mon"] === 1.5); // true
    console.log(Days["Tue"] === 2.5); // true
    console.log(Days["Sat"] === 6.5); // true
    ```

###### 3. 常数项和计算所得项

* 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
前面我们所举的例子都是常数项，一个典型的计算所得项的例子：

    ```
    enum Color {Red, Green, Blue = "blue".length};
    ```
    上面的例子中，"blue".length 就是一个计算所得项。
    上面的例子不会报错，但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：
    ```
    enum Color {Red = "red".length, Green, Blue};

    // index.ts(1,33): error TS1061: Enum member must have initializer.
    // index.ts(1,40): error TS1061: Enum member must have initializer.
    ```

###### 4. 常数枚举

* 常数枚举是使用 const enum 定义的枚举类型：

    ```
    const enum Directions {
        Up,
        Down,
        Left,
        Right
    }
    

    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    ```
    常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
    上例的编译结果是：
    ```
    var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    ```
    假如包含了计算成员，则会在编译阶段报错：
    ```
    const enum Color {Red, Green, Blue = "blue".length};

    // index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
    ```


* 又一个小标签
