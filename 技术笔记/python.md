[TOC]

# Python

**注意：**
    
    * 不要使用python的内置函数当参数名

## Python基础(大小写敏感)

1. '\' 转义字符
2. r'' 整体转义
3. '''......''' 可以表示多行，不需要\n

    例如：

        >>> print('''line1
            ... line2
            ... line3''')
            line1
            line2
            line3

4. and、or、not
5. encode()编码、decode()解码
6. 有些时候，字符串里面的%是一个普通字符怎么办，这个时候就需要转义，用%%来表示一个%
7. 定义的不是tuple，是1这个数！这是因为括号()既可以表示tuple，又可以表示数学公式中的小括号，这就产生了歧义，因此，Python规定，这种情况下，按小括号进行计算，计算结果自然是1。
所以，只有1个元素的tuple定义时必须加一个逗号,，来消除歧义：

    例如：

        >>> t = (1)
        >>> t
        1
        >>> t = (1,)
        >>> t
        (1,)

8.  定义默认参数要牢记一点：默认参数必须指向不变对象！Python函数在定义的时候，默认参数L的值就被计算出来了，即[]，因为默认参数L也是一个变量，它指向对象[]，每次调用该函数，如果改变了L的内容，则下次调用时，默认参数的内容就变了，不再是函数定义时的[]了

## 函数

9.  **可变参数**

    定义可变参数和定义一个list或tuple参数相比，仅仅在参数前面加了一个*号。在函数内部，参数numbers接收到的是一个tuple，因此，函数代码完全不变。(与上边进行对比，收到的是tuple而不是list，所以默认参数不会随着调用而被更改。如果默认参数被更改，那么每次调用函数时，得到的返回参数不一样。)

10. Python允许你在list或tuple前面加一个*号，把list或tuple的元素变成可变参数传进去

    例如：

        >>> nums = [1, 2, 3]
        >>> calc(nums[0], nums[1], nums[2])
        14
        >>> nums = [1, 2, 3]
        >>> calc(*nums)
        14

11. **关键字参数**

    可变参数允许你传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个tuple。而关键字参数允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict。请看示例：

        def person(name, age, **kw):
            print('name:', name, 'age:', age, 'other:', kw)

    函数person除了必选参数name和age外，还接受关键字参数kw。在调用该函数时，可以只传入必选参数：

        >>> person('Michael', 30)
        name: Michael age: 30 other: {}

    也可以传入任意个数的关键字参数：

        >>> person('Bob', 35, city='Beijing')
        name: Bob age: 35 other: {'city': 'Beijing'}
        >>> person('Adam', 45, gender='M', job='Engineer')
        name: Adam age: 45 other: {'gender': 'M', 'job': 'Engineer'}

    关键字参数有什么用？它可以**扩展函数**的功能。比如，在person函数里，我们保证能接收到name和age这两个参数，但是，如果调用者愿意提供更多的参数，我们也能收到。试想你正在做一个用户注册的功能，**除了用户名和年龄是必填项外，其他都是可选项，利用关键字参数来定义这个函数就能满足注册的需求。**

    和可变参数类似，也可以先组装出一个dict，然后，把该dict转换为关键字参数传进去：

        >>> extra = {'city': 'Beijing', 'job': 'Engineer'}
        >>> person('Jack', 24, city=extra['city'], job=extra['job'])
        name: Jack age: 24 other: {'city': 'Beijing', 'job': 'Engineer'}

    当然，上面复杂的调用可以用简化的写法：

        >>> extra = {'city': 'Beijing', 'job': 'Engineer'}
        >>> person('Jack', 24, **extra)
        name: Jack age: 24 other: {'city': 'Beijing', 'job': 'Engineer'}

    \*\*extra表示把extra这个dict的所有key-value用关键字参数传入到函数的\*\*kw参数，kw将获得一个dict，注意kw获得的dict是extra的一份拷贝，对kw的改动不会影响到函数外的extra。

12. 命名关键字参数

    如果要限制关键字参数的名字，就可以用命名关键字参数，例如，只接收city和job作为关键字参数。这种方式定义的函数如下：

        def person(name, age, *, city, job):
            print(name, age, city, job)

    和关键字参数**kw不同，命名关键字参数需要一个特殊分隔符*，*后面的参数被视为命名关键字参数。

    调用方式如下：

        >>> person('Jack', 24, city='Beijing', job='Engineer')
        Jack 24 Beijing Engineer
    
    如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不再需要一个特殊分隔符*了：

        def person(name, age, *args, city, job):
            print(name, age, args, city, job)
    
    命名关键字参数必须传入参数名，这和位置参数不同。如果没有传入参数名，调用将报错：

        >>> person('Jack', 24, 'Beijing', 'Engineer')
        Traceback (most recent call last):
          File "<stdin>", line 1, in <module>
        TypeError: person() takes 2 positional arguments but 4 were given
    
    由于调用时缺少参数名city和job，Python解释器把这4个参数均视为位置参数，但person()函数仅接受2个位置参数。

    命名关键字参数可以有缺省值，从而简化调用：

        def person(name, age, *, city='Beijing', job):
            print(name, age, city, job)
    
    由于命名关键字参数city具有默认值，调用时，可不传入city参数：

        >>> person('Jack', 24, job='Engineer')
        Jack 24 Beijing Engineer
    
    使用命名关键字参数时，要特别注意，如果没有可变参数，就必须加一个*作为特殊分隔符。如果缺少*，Python解释器将无法识别位置参数和命名关键字参数：

        def person(name, age, city, job):
            # 缺少 *，city和job被视为位置参数
            pass

13. **关于\*args与\*\*kw**

    \*args是可变参数，args接收的是一个tuple；  
    \*\*kw是关键字参数，kw接收的是一个dict。

14. 列表生成式

        >>> [x * x for x in range(1, 11)]
        [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

## 高级特性

15. **生成器**

    1. 要创建一个generator，有很多种方法。第一种方法很简单，只要把一个列表生成式的[]改成()，就创建了一个generator：

        >>> L = [x * x for x in range(10)]
        >>> L
        [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
        >>> g = (x * x for x in range(10))
        >>> g
        <generator object <genexpr> at 0x1022ef630>

    2. 定义generator的另一种方法。如果一个函数定义中包含yield关键字，那么这个函数就不再是一个普通函数，而是一个generator：

        def fib(max):
        n, a, b = 0, 0, 1
        while n < max:
            yield b
            a, b = b, a + b
            n = n + 1
        return 'done'

    *注意：*这里，最难理解的就是generator和函数的执行流程不一样。函数是顺序执行，遇到return语句或者最后一行函数语句就返回。而变成generator的函数，在每次调用next()的时候执行，遇到yield语句返回，再次执行时从上次返回的yield语句处继续执行。

    举个简单的例子，定义一个generator，依次返回数字1，3，5：

        def odd():
            print('step 1')
            yield 1
            print('step 2')
            yield(3)
            print('step 3')
            yield(5)

    调用该generator时，首先要生成一个generator对象，然后用next()函数不断获得下一个返回值：

        >>> o = odd()
        >>> next(o)
        step 1
        1
        >>> next(o)
        step 2
        3
        >>> next(o)
        step 3
        5
        >>> next(o)
        Traceback (most recent call last):
          File "<stdin>", line 1, in <module>
        StopIteration

16. 迭代器 Interator

    凡是可作用于for循环的对象都是Iterable类型；

    凡是可作用于next()函数的对象都是Iterator类型，它们表示一个惰性计算的序列；

    集合数据类型如list、dict、str等是Iterable但不是Iterator，不过可以通过iter()函数获得一个Iterator对象

## 函数式编程

17. 高级函数：可以以函数作为参数的函数

    * map()函数：接收两个参数，一个是函数，一个是Iterable，map将传入的函数依次作用到序列的每个元素，并把结果作为新的Iterator返回。
    举例说明，比如我们有一个函数f(x)=x2，要把这个函数作用在一个list [1, 2, 3, 4, 5, 6, 7, 8, 9]上，就可以用map()实现如下：

        >>> def f(x):
        ...     return x * x
        ...
        >>> r = map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])
        >>> list(r)
        [1, 4, 9, 16, 25, 36, 49, 64, 81]

    * reduce()函数：reduce把一个函数作用在一个序列[x1, x2, x3, ...]上，这个函数必须接收两个参数，reduce把结果继续和序列的下一个元素做累积计算，其效果就是：

        reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)
    
    比方说对一个序列求和，就可以用reduce实现：

        >>> from functools import reduce
        >>> def add(x, y):
        ...     return x + y
        ...
        >>> reduce(add, [1, 3, 5, 7, 9])
        25

    * sorted()函数：也是一个高阶函数，它还可以接收一个key函数来实现自定义的排序，例如按绝对值大小排序：

        >>> sorted([36, 5, -12, 9, -21], key=abs)
        [5, 9, -12, -21, 36]

    key指定的函数将作用于list的每一个元素上，并根据key函数返回的结果进行排序。对比原始的list和经过key=abs处理过的list：

        list = [36, 5, -12, 9, -21]
        keys = [36, 5,  12, 9,  21]

    要进行反向排序，不必改动key函数，可以传入第三个参数reverse=True：

        >>> sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True)
        ['Zoo', 'Credit', 'bob', 'about']

18. **闭包**

        def lazy_sum(*args):
        def sum():
            ax = 0
            for n in args:
                ax = ax + n
            return ax
        return sum

    当我们调用lazy_sum()时，返回的并不是求和结果，而是求和函数：

        >>> f = lazy_sum(1, 3, 5, 7, 9)
        >>> f
        <function lazy_sum.<locals>.sum at 0x101c6ed90>

    注意到返回的函数在其定义内部引用了局部变量args，所以，当一个函数返回了一个函数后，其内部的局部变量还被新函数引用，所以，闭包用起来简单，实现起来可不容易。

    另一个需要注意的问题是，返回的函数并没有立刻执行，而是直到调用了f()才执行。我们来看一个例子：

        def count():
            fs = []
            for i in range(1, 4):
                def f():
                     return i*i
                fs.append(f)
            return fs

        f1, f2, f3 = count()

    在上面的例子中，每次循环，都创建了一个新的函数，然后，把创建的3个函数都返回了。

    你可能认为调用f1()，f2()和f3()结果应该是1，4，9，但实际结果是：

        >>> f1()
        9
        >>> f2()
        9
        >>> f3()
        9

    全部都是9！原因就在于返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了3，因此最终结果为9。

    **返回闭包时牢记一点：返回函数不要引用任何循环变量，或者后续会发生变化的变量。**

    如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变：

        def count():
            def f(j):
                def g():
                    return j*j
                return g
            fs = []
            for i in range(1, 4):
                fs.append(f(i)) # f(i)立刻被执行，因此i的当前值被传入f()
            return fs

    再看看结果：

        >>> f1, f2, f3 = count()
        >>> f1()
        1
        >>> f2()
        4
        >>> f3()
        9
    缺点是代码较长，可利用lambda函数缩短代码。

19. **匿名函数**
    
    当我们在传入函数时，有些时候，不需要显式地定义函数，直接传入匿名函数更方便。

    在Python中，对匿名函数提供了有限支持。还是以map()函数为例，计算f(x)=x2时，除了定义一个f(x)的函数外，还可以直接传入匿名函数：

        >>> list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
        [1, 4, 9, 16, 25, 36, 49, 64, 81]
    
    通过对比可以看出，匿名函数lambda x: x * x实际上就是：

        def f(x):
            return x * x

    关键字lambda表示匿名函数，冒号前面的x表示函数参数。

    匿名函数有个限制，就是只能有一个表达式，不用写return，返回值就是该表达式的结果。

    用匿名函数有个好处，因为函数没有名字，不必担心函数名冲突。此外，匿名函数也是一个函数对象，也可以把匿名函数赋值给一个变量，再利用变量来调用该函数：

        >>> f = lambda x: x * x
        >>> f
        <function <lambda> at 0x101c6ef28>
        >>> f(5)
        25

    同样，也可以把匿名函数作为返回值返回，比如：

        def build(x, y):
            return lambda: x * x + y * y 

20. **装饰器**

    由于函数也是一个对象，而且函数对象可以被赋值给变量，所以，通过变量也能调用该函数。

        >>> def now():
        ...     print('2015-3-25')
        ...
        >>> f = now
        >>> f()
        2015-3-25

    函数对象有一个__name__属性，可以拿到函数的名字：

        >>> now.__name__
        'now'
        >>> f.__name__
        'now'

    现在，假设我们要增强now()函数的功能，比如，在函数调用前后自动打印日志，但又不希望修改now()函数的定义，这种在代码运行期间动态增加功能的方式，称之为“装饰器”（Decorator）。

    本质上，decorator就是一个返回函数的高阶函数。所以，我们要定义一个能打印日志的decorator，可以定义如下：

        def log(func):
            def wrapper(*args, **kw):
                print('call %s():' % func.__name__)
                return func(*args, **kw)
            return wrapper

    观察上面的log，因为它是一个decorator，所以接受一个函数作为参数，并返回一个函数。我们要借助Python的@语法，把decorator置于函数的定义处：

        @log
        def now():
            print('2015-3-25')

    调用now()函数，不仅会运行now()函数本身，还会在运行now()函数前打印一行日志：

        >>> now()
        call now():
        2015-3-25

    把@log放到now()函数的定义处，相当于执行了语句：

        now = log(now)

    以上两种decorator的定义都没有问题，但还差最后一步。因为我们讲了函数也是对象，它有__name__等属性，但你去看经过decorator装饰之后的函数，它们的__name__已经从原来的'now'变成了'wrapper'：

        >>> now.__name__
        'wrapper'

    因为返回的那个wrapper()函数名字就是'wrapper'，所以，需要把原始函数的__name__等属性复制到wrapper()函数中，否则，有些依赖函数签名的代码执行就会出错。

    不需要编写wrapper.__name__ = func.__name__这样的代码，Python内置的functools.wraps就是干这个事的，所以，一个完整的decorator的写法如下：

        import functools

        def log(func):
            @functools.wraps(func)
            def wrapper(*args, **kw):
                print('call %s():' % func.__name__)
                return func(*args, **kw)
            return wrapper

    或者针对带参数的decorator：

        import functools

        def log(text):
            def decorator(func):
                @functools.wraps(func)
                def wrapper(*args, **kw):
                    print('%s %s():' % (text, func.__name__))
                    return func(*args, **kw)
                return wrapper
            return decorator

    import functools是导入functools模块。模块的概念稍候讲解。现在，只需记住在定义wrapper()的前面加上**\@functools.wraps(func)**即可。

21. 偏函数

    functools.partial就是帮助我们创建一个偏函数的，不需要我们自己定义int2()，可以直接使用下面的代码创建一个新的函数int2：

        >>> import functools
        >>> int2 = functools.partial(int, base=2)
        >>> int2('1000000')
        64
        >>> int2('1010101')
        85

    所以，简单总结functools.partial的作用就是，把一个函数的某些参数给固定住（也就是设置默认值），返回一个新的函数，调用这个新函数会更简单。

22. **sys模块的argv变量**

    sys模块有一个argv变量，用list存储了命令行的所有参数。argv至少有一个元素，因为第一个参数永远是该.py文件的名称，例如：

    运行python3 hello.py获得的sys.argv就是['hello.py']；

    运行python3 hello.py Michael获得的sys.argv就是['hello.py', 'Michael]。

## 面向对象编程

23. 类和示例

    例如：仍以Student类为例，在Python中，定义类是通过class关键字：

        class Student(object):
            pass

    * 类名通常是大写开头的单词
    * 紧接着是(object)，表示该类是从哪个类继承下来的，通常，如果没有合适的继承类，就使用object类，这是所有类最终都会继承的类。
    
    可以自由地给一个实例变量绑定属性，比如，给实例bart绑定一个name属性（可以随时绑定属性）：

        >>> bart.name = 'Bart Simpson'
        >>> bart.name
        'Bart Simpson'

24. 访问限制（私有属性）

    如果要让内部属性不被外部访问，可以把属性的名称前加上两个下划线**__**，在Python中，实例的变量名如果以\_\_开头，就变成了一个私有变量（private），只有内部可以访问，外部不能访问，所以，我们把Student类改一改：

        class Student(object):

            def __init__(self, name, score):
                self.__name = name
                self.__score = score

            def print_score(self):
                print('%s: %s' % (self.__name, self.__score))

    改完后，对于外部代码来说，没什么变动，但是已经无法从外部访问实例变量.__name和实例变量.__score了：

        >>> bart = Student('Bart Simpson', 59)
        >>> bart.__name
        Traceback (most recent call last):
          File "<stdin>", line 1, in <module>
        AttributeError: 'Student' object has no attribute '__name'
    
    这样就确保了外部代码不能随意修改对象内部的状态，这样通过访问限制的保护，代码更加健壮。

    **注意：**  

    需要注意的是，在Python中，变量名类似__xxx__的，也就是以双下划线开头，并且以双下划线结尾的，是特殊变量，特殊变量是可以直接访问的，不是private变量，所以，不能用__name__、\_\_score\_\_这样的变量名。

    有些时候，你会看到以一个下划线开头的实例变量名，比如_name，这样的实例变量外部是可以访问的，但是，按照约定俗成的规定，当你看到这样的变量时，意思就是，“虽然我可以被访问，但是，请把我视为私有变量，不要随意访问”。

    双下划线开头的实例变量是不是一定不能从外部访问呢？其实也不是。不能直接访问__name是因为Python解释器对外把__name变量改成了_Student__name，所以，仍然可以通过_Student__name来访问__name变量：

        >>> bart._Student__name
        'Bart Simpson'
    
    但是强烈建议你不要这么干，因为不同版本的Python解释器可能会把__name改成不同的变量名。

    总的来说就是，Python本身没有任何机制阻止你干坏事，一切全靠自觉。

25. 继承和多态（Python的继承不是特别的严格！）

    **静态语言 VS 动态语言**

    对于静态语言（例如Java）来说，如果需要传入Animal类型，则传入的对象必须是Animal类型或者它的子类，否则，将无法调用run()方法。

    对于Python这样的动态语言来说，则不一定需要传入Animal类型。我们只需要保证传入的对象有一个run()方法就可以了：

        class Timer(object):
            def run(self):
                print('Start...')

    这就是动态语言的“鸭子类型”，它并不要求严格的继承体系，一个对象只要“看起来像鸭子，走起路来像鸭子”，那它就可以被看做是鸭子。

    Python的“file-like object“就是一种鸭子类型。对真正的文件对象，它有一个read()方法，返回其内容。但是，许多对象，只要有read()方法，都被视为“file-like object“。许多函数接收的参数就是“file-like object“，你不一定要传入真正的文件对象，完全可以传入任何实现了read()方法的对象。

26. isinstance()

    对于class的继承关系来说，使用type()就很不方便。我们要判断class的类型，可以使用isinstance()函数。

    我们回顾上次的例子，如果继承关系是：

    object -> Animal -> Dog -> Husky
    那么，isinstance()就可以告诉我们，一个对象是否是某种类型。先创建3种类型的对象：

        >>> a = Animal()
        >>> d = Dog()
        >>> h = Husky()
    
    然后，判断：

        >>> isinstance(h, Husky)
        True

    没有问题，因为h变量指向的就是Husky对象。

    再判断：

        >>> isinstance(h, Dog)
        True
    
    h虽然自身是Husky类型，但由于Husky是从Dog继承下来的，所以，h也还是Dog类型。换句话说，isinstance()判断的是一个对象是否是该类型本身，或者位于该类型的父继承链上。

    因此，我们可以确信，h还是Animal类型：

        >>> isinstance(h, Animal)
        True

27. **dir() 函数**：可以获得一个对象的所有属性和方法，它返回一个包含字符串的list

    类似__xxx__的属性和方法在Python中都是有特殊用途的，比如__len__方法返回长度。在Python中，如果你调用len()函数试图获取一个对象的长度，实际上，在len()函数内部，它自动去调用该对象的__len__()方法，所以，下面的代码是等价的：

        >>> len('ABC')
        3
        >>> 'ABC'.__len__()
        3
    
    我们自己写的类，如果也想用len(myObj)的话，就自己写一个__len__()方法：

        >>> class MyDog(object):
        ...     def __len__(self):
        ...         return 100
        ...
        >>> dog = MyDog()
        >>> len(dog)
        100

## 面对对象高级编程

28. \_\_slots\_\_

    但是，如果我们想要限制实例的属性怎么办？比如，只允许对Student实例添加name和age属性。

    为了达到限制的目的，Python允许在定义class的时候，定义一个特殊的__slots__变量，来限制该class实例能添加的属性：

        class Student(object):
            __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称

    然后，我们试试：

        >>> s = Student() # 创建新的实例
        >>> s.name = 'Michael' # 绑定属性'name'
        >>> s.age = 25 # 绑定属性'age'
        >>> s.score = 99 # 绑定属性'score'
        Traceback (most recent call last):
          File "<stdin>", line 1, in <module>
        AttributeError: 'Student' object has no attribute 'score'
    
    由于'score'没有被放到__slots__中，所以不能绑定score属性，试图绑定score将得到AttributeError的错误。

    使用__slots__要注意，__slots__定义的属性仅对当前类实例起作用，对继承的子类是不起作用的：

        >>> class GraduateStudent(Student):
        ...     pass
        ...
        >>> g = GraduateStudent()
        >>> g.score = 9999

    除非在子类中也定义__slots__，这样，子类实例允许定义的属性就是自身的__slots__加上父类的__slots__。

29. @property

    在绑定属性时，如果我们直接把属性暴露出去，虽然写起来很简单，但是，没办法检查参数，导致可以把成绩随便改：

        s = Student()
        s.score = 9999
    
    这显然不合逻辑。为了限制score的范围，可以通过一个set_score()方法来设置成绩，再通过一个get_score()来获取成绩，这样，在set_score()方法里，就可以检查参数：

        class Student(object):

            def get_score(self):
                 return self._score

            def set_score(self, value):
                if not isinstance(value, int):
                    raise ValueError('score must be an integer!')
                if value < 0 or value > 100:
                    raise ValueError('score must between 0 ~ 100!')
                self._score = value
    
    现在，对任意的Student实例进行操作，就不能随心所欲地设置score了：

        >>> s = Student()
        >>> s.set_score(60) # ok!
        >>> s.get_score()
        60
        >>> s.set_score(9999)
        Traceback (most recent call last):
          ...
        ValueError: score must between 0 ~ 100!
    
    但是，上面的调用方法又略显复杂，没有直接用属性这么直接简单。

    有没有既能检查参数，又可以用类似属性这样简单的方式来访问类的变量呢？对于追求完美的Python程序员来说，这是必须要做到的！

    还记得装饰器（decorator）可以给函数动态加上功能吗？对于类的方法，装饰器一样起作用。Python内置的@property装饰器就是负责把一个方法变成属性调用的：

        class Student(object):

            @property
            def score(self):
                return self._score

            @score.setter
            def score(self, value):
                if not isinstance(value, int):
                    raise ValueError('score must be an integer!')
                if value < 0 or value > 100:
                    raise ValueError('score must between 0 ~ 100!')
                self._score = value

    @property的实现比较复杂，我们先考察如何使用。把一个getter方法变成属性，只需要加上@property就可以了，此时，\@property本身又创建了另一个装饰器\@score.setter，负责把一个setter方法变成属性赋值，于是，我们就拥有一个可控的属性操作：

        >>> s = Student()
        >>> s.score = 60 # OK，实际转化为s.set_score(60)
        >>> s.score # OK，实际转化为s.get_score()
        60
        >>> s.score = 9999
        Traceback (most recent call last):
          ...
        ValueError: score must between 0 ~ 100!

    注意到这个神奇的@property，我们在对实例属性操作的时候，就知道该属性很可能不是直接暴露的，而是通过getter和setter方法来实现的。

    还可以定义只读属性，只定义getter方法，不定义setter方法就是一个只读属性：

        class Student(object):

            @property
            def birth(self):
                return self._birth

            @birth.setter
            def birth(self, value):
                self._birth = value

            @property
            def age(self):
                return 2015 - self._birth
    上面的birth是可读写属性，而age就是一个只读属性，因为age可以根据birth和当前时间计算出来。

    **总结：**这个方法就是把*方法*变成了*类*，同时通过**类名.setter**来实现对类名的验证

30. **多重继承**

    * 命名规则：

        MixIn：在设计类的继承关系时，通常，主线都是单一继承下来的，例如，Ostrich继承自Bird。但是，如果需要“混入”额外的功能，通过多重继承就可以实现，比如，让Ostrich除了继承自Bird外，再同时继承Runnable。这种设计通常称之为MixIn。

        为了更好地看出继承关系，我们把Runnable和Flyable改为RunnableMixIn和FlyableMixIn。类似的，你还可以定义出肉食动物CarnivorousMixIn和植食动物HerbivoresMixIn，让某个动物同时拥有好几个MixIn：

                class Dog(Mammal, RunnableMixIn, CarnivorousMixIn):
                    pass
31. 定制类（自己去翻教程！！）
32. 枚举类（自己去翻教程！！）

## 错误、调试和测试

33. try、except、finally

    * 如果使用了try、except、finally，不管有没有出错，**finally一定会被执行**
    * 如果没有错误发生，可以在except语句块后面加一个else，当没有错误发生时，会自动执行else语句：

        try:
            print('try...')
            r = 10 / int('2')
            print('result:', r)
        except ValueError as e:
            print('ValueError:', e)
        except ZeroDivisionError as e:
            print('ZeroDivisionError:', e)
        else:
            print('no error!')
        finally:
            print('finally...')
        print('END')

34. 记录错误

    如果不捕获错误，自然可以让Python解释器来打印出错误堆栈，但程序也被结束了。既然我们能捕获错误，就可以把错误堆栈打印出来，然后分析错误原因，同时，让程序继续执行下去。

    Python内置的logging模块可以非常容易地记录错误信息：

        # err_logging.py

        import logging

        def foo(s):
            return 10 / int(s)

        def bar(s):
            return foo(s) * 2

        def main():
            try:
                bar('0')
            except Exception as e:
                logging.exception(e)

        main()
        print('END')

    同样是出错，但程序打印完错误信息后会继续执行，并正常退出：

        $ python3 err_logging.py
        ERROR:root:division by zero
        Traceback (most recent call last):
          File "err_logging.py", line 13, in main
            bar('0')
          File "err_logging.py", line 9, in bar
            return foo(s) * 2
          File "err_logging.py", line 6, in foo
            return 10 / int(s)
        ZeroDivisionError: division by zero
        END

    通过配置，logging还可以把错误记录到日志文件里，方便事后排查。

35. **调试**可以不用print来调试的方法！！！！！！！！

    1. 凡是用print()来辅助查看的地方，都可以用断言（assert）来替代：

            def foo(s):
                n = int(s)
                assert n != 0, 'n is zero!'
                return 10 / n
                

            def main():
                foo('0')

        assert的意思是，表达式n != 0应该是True，否则，根据程序运行的逻辑，后面的代码肯定会出错。

        如果断言失败，assert语句本身就会抛出AssertionError：

            $ python err.py
            Traceback (most recent call last):
              ...
            AssertionError: n is zero!

        程序中如果到处充斥着assert，和print()相比也好不到哪去。不过，启动Python解释器时可以用-O参数来关闭assert：

            $ python -O err.py
            Traceback (most recent call last):
              ...
            ZeroDivisionError: division by zero

        关闭后，你可以把所有的assert语句当成pass来看。

## io编程

36. 文件读写

    1. 文件关闭问题

        如果文件打开成功，接下来，调用read()方法可以一次读取文件的全部内容，Python把内容读到内存，用一个str对象表示：

                >>> f.read()
                'Hello, world!'
        最后一步是调用close()方法关闭文件。文件使用完毕后必须关闭，因为文件对象会占用操作系统的资源，并且操作系统同一时间能打开的文件数量也是有限的：

                >>> f.close()
                >>> 
        由于文件读写时都有可能产生IOError，一旦出错，后面的f.close()就不会调用。所以，为了保证无论是否出错都能正确地关闭文件，我们可以使用try ... finally来实现：

                try:
                    f = open('/path/to/file', 'r')
                    print(f.read())
                finally:
                    if f:
                        f.close()

        但是每次都这么写实在太繁琐，所以，Python引入了with语句来自动帮我们调用close()方法：

                with open('/path/to/file', 'r') as f:
                    print(f.read())

        这和前面的try ... finally是一样的，但是代码更佳简洁，并且不必调用f.close()方法。

    2. 读取大小问题

        调用read()会一次性读取文件的全部内容，如果文件有10G，内存就爆了，所以，要保险起见，可以反复调用read(size)方法，每次最多读取size个字节的内容。另外，调用readline()可以每次读取一行内容，调用readlines()一次读取所有内容并按行返回list。因此，要根据需要决定怎么调用。

        如果文件很小，read()一次性读取最方便；如果不能确定文件大小，反复调用read(size)比较保险；如果是配置文件，调用readlines()最方便：

37. 二进制文件

    前面讲的默认都是读取文本文件，并且是UTF-8编码的文本文件。要读取二进制文件，比如图片、视频等等，用'rb'模式打开文件即可：

        >>> f = open('/Users/michael/test.jpg', 'rb')
        >>> f.read()
        b'\xff\xd8\xff\xe1\x00\x18Exif\x00\x00...' # 十六进制表示的字节

38. 字符编码

    要读取非UTF-8编码的文本文件，需要给open()函数传入encoding参数，例如，读取GBK编码的文件：

        >>> f = open('/Users/michael/gbk.txt', 'r', encoding='gbk')
        >>> f.read()
        '测试'

    遇到有些编码不规范的文件，你可能会遇到UnicodeDecodeError，因为在文本文件中可能夹杂了一些非法编码的字符。遇到这种情况，open()函数还接收一个errors参数，表示如果遇到编码错误后如何处理。最简单的方式是直接忽略：

        >>> f = open('/Users/michael/gbk.txt', 'r', encoding='gbk', errors='ignore')

39. 写文件

    要写入特定编码的文本文件，请给open()函数传入encoding参数，将字符串自动转换成指定编码。

    细心的童鞋会发现，以'w'模式写入文件时，如果文件已存在，会直接覆盖（相当于删掉后新写入一个文件）。如果我们希望追加到文件末尾怎么办？可以传入'a'以追加（append）模式写入。

40. file-like Object（也就是前边在*继承*那里提到的鸭子类型）

    像open()函数返回的这种有个read()方法的对象，在Python中统称为file-like Object。除了file外，还可以是内存的字节流，网络流，自定义流等等。file-like Object不要求从特定类继承，只要写个read()方法就行。

    StringIO就是在内存中创建的file-like Object，常用作临时缓冲。

41. **JSON**
    
    1. Python内置的json模块提供了非常完善的Python对象到JSON格式的转换。我们先看看如何把Python对象变成一个JSON：

        >>> import json
        >>> d = dict(name='Bob', age=20, score=88)
        >>> json.dumps(d)
        '{"age": 20, "score": 88, "name": "Bob"}'

    dumps()方法返回一个str，内容就是标准的JSON。类似的，dump()方法可以直接把JSON写入一个file-like Object。

    要把JSON反序列化为Python对象，用loads()或者对应的load()方法，前者把JSON的字符串反序列化，后者从file-like Object中读取字符串并反序列化：

        >>> json_str = '{"age": 20, "score": 88, "name": "Bob"}'
        >>> json.loads(json_str)
        {'age': 20, 'score': 88, 'name': 'Bob'}

    由于JSON标准规定JSON编码是UTF-8，所以我们总是能正确地在Python的str与JSON的字符串之间转换。

    2. 当我们想保存一个class时，内置的json是不能直接使用的，我们需要参考他的参数，以及自己制定一个转换函数

    可选参数就是让我们来定制JSON序列化。前面的代码之所以无法把Student类实例序列化为JSON，是因为默认情况下，dumps()方法不知道如何将Student实例变为一个JSON的{}对象。

    可选参数default就是把任意一个对象变成一个可序列为JSON的对象，我们只需要为Student专门写一个转换函数，再把函数传进去即可：

        def student2dict(std):
            return {
                'name': std.name,
                'age': std.age,
                'score': std.score
            }

    这样，Student实例首先被student2dict()函数转换成dict，然后再被顺利序列化为JSON：

        >>> print(json.dumps(s, default=student2dict))
        {"age": 20, "name": "Bob", "score": 88}

    不过，下次如果遇到一个Teacher类的实例，照样无法序列化为JSON。我们可以偷个懒，把任意class的实例变为dict：

        print(json.dumps(s, default=lambda obj: obj.__dict__))

    因为通常class的实例都有一个__dict__属性，它就是一个dict，用来存储实例变量。也有少数例外，比如定义了__slots__的class。

    同样的道理，如果我们要把JSON反序列化为一个Student对象实例，loads()方法首先转换出一个dict对象，然后，我们传入的object_hook函数负责把dict转换为Student实例：

        def dict2student(d):
            return Student(d['name'], d['age'], d['score'])

    运行结果如下：

        >>> json_str = '{"age": 20, "score": 88, "name": "Bob"}'
        >>> print(json.loads(json_str, object_hook=dict2student))
        <__main__.Student object at 0x10cd3c190>
    
    打印出的是反序列化的Student实例对象。

## 进程与线程（没看！！！！）

## **正则表达式**

42.  基础知识
    
    字符串是编程时涉及到的最多的一种数据结构，对字符串进行操作的需求几乎无处不在。比如判断一个字符串是否是合法的Email地址，虽然可以编程提取@前后的子串，再分别判断是否是单词和域名，但这样做不但麻烦，而且代码难以复用。

    正则表达式是一种用来匹配字符串的强有力的武器。它的设计思想是用一种描述性的语言来给字符串定义一个规则，凡是符合规则的字符串，我们就认为它“匹配”了，否则，该字符串就是不合法的。

    所以我们判断一个字符串是否是合法的Email的方法是：

    创建一个匹配Email的正则表达式；

    用该正则表达式去匹配用户的输入来判断是否合法。

    因为正则表达式也是用字符串表示的，所以，我们要首先了解如何用字符来描述字符。

    在正则表达式中，如果直接给出字符，就是精确匹配。用\d可以匹配一个数字，\w可以匹配一个字母或数字，所以：

        - '00\d'可以匹配'007'，但无法匹配'00A'；

        - '\d\d\d'可以匹配'010'；

        - '\w\w\d'可以匹配'py3'；

    .可以匹配任意字符，所以：

        * 'py.'可以匹配'pyc'、'pyo'、'py!'等等。

    **要匹配变长的字符，在正则表达式中，用*表示任意个字符（包括0个），用+表示至少一个字符，用?表示0个或1个字符，用{n}表示n个字符，用{n,m}表示n-m个字符：**

    来看一个复杂的例子：\d{3}\s+\d{3,8}。

    我们来从左到右解读一下：

        1. \d{3}表示匹配3个数字，例如'010'；

        2. \s可以匹配一个空格（也包括Tab等空白符），所以\s+表示至少有一个空格，例如匹配' '，' '等；

        3. \d{3,8}表示3-8个数字，例如'1234567'。

    综合起来，上面的正则表达式可以匹配以任意个空格隔开的带区号的电话号码。

    如果要匹配'010-12345'这样的号码呢？由于'-'是特殊字符，在正则表达式中，要用'\'转义，所以，上面的正则是\d{3}\-\d{3,8}。

    但是，仍然无法匹配'010 - 12345'，因为带有空格。所以我们需要更复杂的匹配方式。

43. **进阶**  

    要做更精确地匹配，可以用[]表示范围，比如：

    [0-9a-zA-Z\_]可以匹配一个数字、字母或者下划线；

    [0-9a-zA-Z\_]+可以匹配至少由一个数字、字母或者下划线组成的字符串，比如'a100'，'0_Z'，'Py3000'等等；

    [a-zA-Z\_][0-9a-zA-Z\_]*可以匹配由字母或下划线开头，后接任意个由一个数字、字母或者下划线组成的字符串，也就是Python合法的变量；

    [a-zA-Z\_][0-9a-zA-Z\_]{0, 19}更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）。

    A|B可以匹配A或B，所以(P|p)ython可以匹配'Python'或者'python'。

    ^表示行的开头，^\d表示必须以数字开头。

    $表示行的结束，\d$表示必须以数字结束。

    你可能注意到了，py也可以匹配'python'，但是加上^py$就变成了整行匹配，就只能匹配'py'了。

44. Python中使用正则表达式

    1. re模块

    有了准备知识，我们就可以在Python中使用正则表达式了。Python提供re模块，包含所有正则表达式的功能。由于Python的字符串本身也用\转义，所以要特别注意：

        s = 'ABC\\-001' # Python的字符串
        # 对应的正则表达式字符串变成：
        # 'ABC\-001'

    因此我们强烈建议使用Python的r前缀，就不用考虑转义的问题了：

        s = r'ABC\-001' # Python的字符串
        # 对应的正则表达式字符串不变：
        # 'ABC\-001'

    先看看如何判断正则表达式是否匹配：

        >>> import re
        >>> re.match(r'^\d{3}\-\d{3,8}$', '010-12345')
        <_sre.SRE_Match object; span=(0, 9), match='010-12345'>
        >>> re.match(r'^\d{3}\-\d{3,8}$', '010 12345')
        >>>

    match()方法判断是否匹配，如果匹配成功，返回一个Match对象，否则返回None。常见的判断方法就是：

        test = '用户输入的字符串'
        if re.match(r'正则表达式', test):
            print('ok')
        else:
            print('failed')

    2. 使用re模块进行字符串切割（如果用户输入了一组标签，用正则表达式来把不规范的输入转化成正确的数组。）

    用正则表达式切分字符串比用固定的字符更灵活，请看正常的切分代码：

        >>> 'a b   c'.split(' ')
        ['a', 'b', '', '', 'c']
    嗯，无法识别连续的空格，用正则表达式试试：

        >>> re.split(r'\s+', 'a b   c')
        ['a', 'b', 'c']
    无论多少个空格都可以正常分割。加入,试试：

        >>> re.split(r'[\s\,]+', 'a,b, c  d')
        ['a', 'b', 'c', 'd']
    再加入;试试：

        >>> re.split(r'[\s\,\;]+', 'a,b;; c  d')
        ['a', 'b', 'c', 'd']

    3. 提取子串，进行分组

    除了简单地判断是否匹配之外，正则表达式还有提取子串的强大功能。用**()**表示的就是要提取的分组（Group）。比如：

    ^(\d{3})-(\d{3,8})$分别定义了两个组，可以直接从匹配的字符串中提取出区号和本地号码：

        >>> m = re.match(r'^(\d{3})-(\d{3,8})$', '010-12345')
        >>> m
        <_sre.SRE_Match object; span=(0, 9), match='010-12345'>
        >>> m.group(0)
        '010-12345'
        >>> m.group(1)
        '010'
        >>> m.group(2)
        '12345'

    如果正则表达式中定义了组，就可以在Match对象上用group()方法提取出子串来。

    注意到group(0)永远是原始字符串，group(1)、group(2)……表示第1、2、……个子串。

    4. 贪婪匹配

    最后需要特别指出的是，正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符。举例如下，匹配出数字后面的0：

        >>> re.match(r'^(\d+)(0*)$', '102300').groups()
        ('102300', '')

    由于\d+采用贪婪匹配，直接把后面的0全部匹配了，结果0*只能匹配空字符串了。

    必须让\d+采用非贪婪匹配（也就是尽可能少匹配），才能把后面的0匹配出来，加个?就可以让\d+采用非贪婪匹配：

        >>> re.match(r'^(\d+?)(0*)$', '102300').groups()
        ('1023', '00')

## 常用内建模块

45. 常用
    
    * datetime 时间
    * collections 集合
        - 双向列表

            deque
            使用list存储数据时，按索引访问元素很快，但是插入和删除元素就很慢了，因为list是线性存储，数据量大的时候，插入和删除效率很低。

            deque是为了高效实现插入和删除操作的双向列表，适合用于队列和栈：

                >>> from collections import deque
                >>> q = deque(['a', 'b', 'c'])
                >>> q.append('x')
                >>> q.appendleft('y')
                >>> q
                deque(['y', 'a', 'b', 'c', 'x'])

            deque除了实现list的append()和pop()外，还支持appendleft()和popleft()，这样就可以非常高效地往头部添加或删除元素。

        - 计数器

            Counter是一个简单的计数器，例如，统计字符出现的个数：

                >>> from collections import Counter
                >>> c = Counter()
                >>> for ch in 'programming':
                ...     c[ch] = c[ch] + 1
                ...
                >>> c
                Counter({'g': 2, 'm': 2, 'r': 2, 'a': 1, 'i': 1, 'o': 1, 'n': 1, 'p': 1})

            Counter实际上也是dict的一个子类，上面的结果可以看出，字符'g'、'm'、'r'各出现了两次，其他字符各出现了一次。

    * Base64 是一种用64个字符来表示任意二进制数据的方法。
    * struct 解决bytes和其他二进制数据类型的转换。
    * hashlib 提供了常见的摘要算法，如MD5，SHA1等等。（**用于密码加密，用到的时候可以详细看一下[网址](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/0014319556588648dd1fb0047a34d0c945ee33e8f4c90cc000)**）
        - 什么是摘要算法呢？摘要算法又称哈希算法、散列算法。它通过一个函数，把任意长度的数据转换为一个长度固定的数据串（通常用16进制的字符串表示）。
    * hmac 与hashlib一起使用

        - 通过哈希算法，我们可以验证一段数据是否有效，方法就是对比该数据的哈希值，例如，判断用户口令是否正确，我们用保存在数据库中的password_md5对比计算md5(password)的结果，如果一致，用户输入的口令就是正确的。

        为了防止黑客通过彩虹表根据哈希值反推原始口令，在计算哈希的时候，不能仅针对原始输入计算，需要增加一个salt来使得相同的输入也能得到不同的哈希，这样，大大增加了黑客破解的难度。

        如果salt是我们自己随机生成的，通常我们计算MD5时采用md5(message + salt)。但实际上，把salt看做一个“口令”，加salt的哈希就是：计算一段message的哈希时，根据不通口令计算出不同的哈希。要验证哈希值，必须同时提供正确的口令。

        这实际上就是Hmac算法：Keyed-Hashing for Message Authentication。它通过一个标准算法，在计算哈希的过程中，把key混入计算过程中。

        和我们自定义的加salt算法不同，Hmac算法针对所有哈希算法都通用，无论是MD5还是SHA-1。采用Hmac替代我们自己的salt算法，可以使程序算法更标准化，也更安全。

        Python自带的hmac模块实现了标准的Hmac算法。

    * itertools Python的内建模块itertools提供了非常有用的用于操作迭代对象的函数。
    * contextlib
    * urllib(爬虫可能偶尔会用)
    * XML
    * HTMLPaeser


## **连接数据库MySQL**
    
46. 安装MySQL驱动

    由于MySQL服务器以独立的进程运行，并通过网络对外服务，所以，需要支持Python的MySQL驱动来连接到MySQL服务器。MySQL官方提供了mysql-connector-python驱动，但是安装的时候需要给pip命令加上参数--allow-external：

        $ pip install mysql-connector-python --allow-external mysql-connector-python

    如果上面的命令安装失败，可以试试另一个驱动：

        $ pip install mysql-connector
    
    我们演示如何连接到MySQL服务器的test数据库：

        # 导入MySQL驱动:
        >>> import mysql.connector
        # 注意把password设为你的root口令:
        >>> conn = mysql.connector.connect(user='root', password='password', database='test')
        >>> cursor = conn.cursor()
        # 创建user表:
        >>> cursor.execute('create table user (id varchar(20) primary key, name varchar(20))')
        # 插入一行记录，注意MySQL的占位符是%s:
        >>> cursor.execute('insert into user (id, name) values (%s, %s)', ['1', 'Michael'])
        >>> cursor.rowcount
        1
        # 提交事务:
        >>> conn.commit()
        >>> cursor.close()
        # 运行查询:
        >>> cursor = conn.cursor()
        >>> cursor.execute('select * from user where id = %s', ('1',))
        >>> values = cursor.fetchall()
        >>> values
        [('1', 'Michael')]
        # 关闭Cursor和Connection:
        >>> cursor.close()
        True
        >>> conn.close()
        由于Python的DB-API定义都是通用的，所以，操作MySQL的数据库代码和SQLite类似。

## Web开发（内涵MVC简单介绍）

47. CS与BS的区别（今天才知道- -）：
 
    CS架构不适合Web，最大的原因是Web应用程序的修改和升级非常迅速，而CS架构需要每个客户端逐个升级桌面App，因此，Browser/Server模式开始流行，简称BS架构。在BS架构下，客户端只需要浏览器，应用程序的逻辑和数据都存储在服务器端。浏览器只需要请求服务器，获取Web页面，并把Web页面展示给用户即可。

48. **WSGI**

    需要一个统一的接口，让我们专心用Python编写Web业务。
    这个接口就是WSGI：Web Server Gateway Interface。

        def application(environ, start_response):
        start_response('200 OK', [('Content-Type', 'text/html')])
        return [b'<h1>Hello, web!</h1>']

    上面的application()函数就是符合WSGI标准的一个HTTP处理函数，它接收两个参数：

    environ：一个包含所有HTTP请求信息的dict对象；

    start_response：一个发送HTTP响应的函数。

    在application()函数中，调用：

        start_response('200 OK', [('Content-Type', 'text/html')])
    
    就发送了HTTP响应的Header，注意Header只能发送一次，也就是只能调用一次start_response()函数。start_response()函数接收两个参数，一个是HTTP响应码，一个是一组list表示的HTTP Header，每个Header用一个包含两个str的tuple表示。

    通常情况下，都应该把Content-Type头发送给浏览器。其他很多常用的HTTP Header也应该发送。

    然后，函数的返回值b'<h1>Hello, web!</h1>'将作为HTTP响应的Body发送给浏览器。

    有了WSGI，我们关心的就是如何从environ这个dict对象拿到HTTP请求信息，然后构造HTML，通过start_response()发送Header，最后返回Body。

    整个application()函数本身没有涉及到任何解析HTTP的部分，也就是说，底层代码不需要我们自己编写，我们只负责在更高层次上考虑如何响应请求就可以了。

49. **使用模板**（这里介绍了MVC）[MVC](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/0014320129740415df73bf8f81e478982bf4d5c8aa3817a000)

## 异步IO

50. (去翻教程吧，一句两句总结不清楚)
