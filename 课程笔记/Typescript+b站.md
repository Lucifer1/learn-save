### 学习笔记

[课程地址](https://www.bilibili.com/video/BV1F7411c7m5)


### symbol

1. 就像两个人，两个人都可以起相同的名字，但是确实不同的两个人，很精准
2. symbol不需要使用new
3. symbol的参数是string，放入其他类型的数据，会调用对应的tostring()方法
4. Symbol.for会在全局范围内搜索，全局范围包括
   1. 全局环境
   2. iframe
   3. services worker里边

### 函数

1. 函数重载：
   1. 多个重载函数必须放在一起，如果重载函数与之间之间有其他的变量或者函数会报错，官方说法是：函数实现缺失或未立即出现在声明之后。


### 泛型

#### 泛型约束

1. 想要限制函数传入的值必须有length属性

    ```js
    interface IValueWithLenth {
      length: number
    }

    type GetArray = <T extends IValueWithLenth>(value: T, times: number) => T[]

    const getArray: GetArray = <T extends IValueWithLenth>(value: T, times: number) => {
      return Array(times).fill(value)
    }

    getArray(1, 5)  // 报错，因为number没有length
    getArray([1, 2], 5)
    getArray(['abc', 5)
    ```

#### 泛型约束中使用类型参数

1. 使用情况：定义一个对象，只能访问对象存在的属性做要求时，就可以使用类型参数
2. <T, K extends keyof T>：keyof会返回后边对象所有存在属性名组成的一个数组

### 类

1. constructor中也可以return，但是自己定义return后，new出来的实例就不是这个类的实例了，可以理解为，constructor默认return了this，自己定义return后覆盖了原有的return
2. new.target

    ```ts
    class Parent {
      constructor () {
        console.log(new.target)
      }
    }

    const parent = new Parent()
    // 输出
    // class Parent {
    //   constructor () {
    //     console.log(new.target)
    //   }
    // }

    class Children extends Parent {
      constructor () {
        super()
      }
    }

    const parent = new Children()
    // 输出
    // class Children extends Parent {
    //   constructor () {
    //     super()
    //   }
    // }
    ```
    有可能的使用方式
    ```ts
    class Parent {
      constructor () {
        if (new.target === Parent) {
          console.log('不能实例化父类')
        }
      }
    }

    class Children extends Parent {
      constructor () {
        super()
      }
    }
    ```

### 类 进阶

1. super
   1. 作为函数使用，它代表父类的constructor，es6中子类的构造函数中必须调用super之后才能使用this
   2. 作为对象
      1. 在普通方法中，指向父类的原型对象
      2. 在静态方法中，指向的是父类
   3. 只能以上边两种方式使用，单独使用会报错的，比如console.log(super)会报错

2. __proto__

    ```ts
    class Parent {
      constructor() {
        if (new.target === Parent) {
          console.log('不能实例化父类')
        }
      }
    }

    class Children extends Parent {
      constructor() {
        super()
      }
    }
    ```

   1. 子类的__proto__指向父类本身

      ```ts
      console.log(Children.__proto__ === Parent) // true
      ```

   2. 子类的prototype属性的__proto__指向父类的prototype，其实也就是子类实例的__proto__指向父类的prototype

      ```ts
      console.log(Children.prototype.__proto__ === Parent.prototype) // true
      ```

   3. 实例的__proto__属性的__proto__指向父类实例的__proto__

3. es5 与 es6 继承的区别
   1. es5是先创建子构造函数的实例this再把父类的属性方法添加到this上
   2. es6是先从父类取到实例this，然后再调用super函数之后再将子类的属性方法加到this上
