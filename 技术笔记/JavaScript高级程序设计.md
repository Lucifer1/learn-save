#[TOC]

# JavaScript 高级程序设计
### 注意：
* TypeError: Cannot read property '0' of undefined：很有可能是数组越界
* switch在涉及逻辑判断时，速度会下降特别多，所以说不如直接多写几个case。例：

        for(let i = 1; i< s.length; i ++){
            console.log(myArr)
            switch(true){
                case s[i] == "(" || s[i] == "[" || s[i] == "{":
                    myArr.push(s[i]);
                    break;
                case s[i] == ")":
                    if(myArr[myArr.length - 1] == "("){
                        myArr.pop()
                    }else{
                        myArr.push(s[i])
                    }
                    break;
                case s[i] == "]":
                    if(myArr[myArr.length - 1] == "["){
                        myArr.pop()
                    }else{
                        myArr.push(s[i])
                    }
                    break;
                case s[i] == "}":
                    if(myArr[myArr.length - 1] == "{"){
                        myArr.pop()
                    }else{
                        myArr.push(s[i])
                    }
                    break;
            }
        }

        for(let i = 1; i< s.length; i ++){
            switch(s[i]){
                case "(":
                    myArr.push(s[i]);
                    break;
                case "[":
                    myArr.push(s[i]);
                    break;
                case "{":
                    myArr.push(s[i]);
                    break;
                case ")":
                    if(myArr[myArr.length - 1] == "("){
                        myArr.pop()
                    }else{
                        myArr.push(s[i])
                    }
                    break;
                case "]":
                    if(myArr[myArr.length - 1] == "["){
                        myArr.pop()
                    }else{
                        myArr.push(s[i])
                    }
                    break;
                case "}":
                    if(myArr[myArr.length - 1] == "{"){
                        myArr.pop()
                    }else{
                        myArr.push(s[i])
                    }
                    break;
            }
        }

    这两个代码，速度差**7倍**！


### 第5章：引用类型

#### 5.2 Array 类型

* 1. instanceof:类型检测函数 value instanceof Array 检测value是否是Array
* 2. valueOf: 返回数组本身 str.valueOf()
* 3. toString： 将数组连成字符串以‘，’分隔 str.toString()
* 4. push: 在数据末尾按顺序添加任意变量 str.push()，返回值为添加后的长度
* 5. pop: 在末尾弹出一项 str.pop(),返回值为弹出的那一项变量
* 6. push和pop可以组成栈的效果
* 7. shift: 弹出数组中的第一项，返回值为弹出的变量， str.shift()
* 8. unshift: 在前端添加任意项，并返回长度
* 9. sort: 排序算法，有1个参数：比较函数，比较函数可以接受2个参数，如果第一个参数应该位于第二个参数之前就返回一个负数，相等为0，反之为正数。 str.sort(compare(value1, value2))
* 10. reverse： 对数组取反，str.reverse()
* 11. concat： 数组连接函数，将接受到的参数添加到数组的末尾。 str.concat(str1, [str2, str3])
* 12. slice: 切片函数，参数为2个，起始位置和结束位置。
* 13. splice: 参数为3个：起始位置，删除的数量，要添加的项。三个变量结合可以做到删除，插入，替换的效果
* 14. indexOf和lastIndexOf: 找到则返回对应的下标，找不到返回-1。一个从前边开始找，一个是从末尾开始找，返回的都是从开始位置到目标参数的下标，返回符合条件的第一个下标

        numbers = [1,2,3,4,5,4,3,2,1]
        numbers.indexOf(4)   //返回下标为3
        numbers.lastIndexOf(4) //5

* 15. 迭代方法：参数为2个，对每一项要运行的函数和（可选的）运行该函数的作用域对象--影响this的值。
    - every(): 对数组中的每一项运行给定函数，如果该函数的每一项都返回true，则返回true
    - some(): 对数组中的每一项运行给定函数，如果任意一项返回true，则返回true
    - every和some用来判断数组中是否满足某个条件
    - filter(): 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组
    - forEach(): 对数组中的每一项运行给定函数，和执行for循环差不多，没有返回值
    - map(): 对数组中的每一项运行给定函数，返回函数调用的结果组成的数组。

* 16. reduce: 参数为2个，在每一项上要调用的函数和(可选的)作为归并的基础的初始值。要调用的函数有4个参数：
前一个值、当前值、项的索引和数组对象

        values = [1,2,3,4,5]
        sum = values.reduce(function(prev, cur, index, array){
            return prev + cur
        })
        alert(sum) //15

    第一次执行回调函数，prev为1，cur为2，第二次prev为3（1+2），cur为3，知道把所有项访问一遍返回结果

* 17. reduceRight: 通reduce，不过他是从最后一项开始


### 第二章：在HTML中使用JavaScript

* 