## XML 笔记

1. **简介**

     * XML和HTML的区别
       * XML被设计用来传输和存储数据
       * HTML被设计用来显示数据
       * XML不是HTML的替代，HTML旨在显示信息，XML旨在传输信息
     * XML是没有任何行为的

        ```
        <note>
        <to>George</to>
        <from>John</from>
        <heading>Reminder</heading>
        <body>Don't forget the meeting!</body>
        </note>
        ```
       * 它只是用来结构化信息，它仅仅是**纯文本信息**，只有在我们的软件或者程序中，它才可以传输接收和显示

2. **XML 语法**

      * XML标签对大小写敏感
      * XML必须有一个根元素，也就是说必须有一个有元素是所有元素的父元素
      * 特殊符号：
        * \&lt;	<	小于
        * \&gt;	>	大于
        * \&amp;	&	和号
        * \&apos;	'	单引号
        * \&quot;	"	引号
      * 注释 \<!-- -->
      * 在 XML 中，空格会被保留,HTML会合并
      * XML 以 LF 存储换行

3. **XML 元素**

      * XML 元素必须遵循以下命名规则：
        * 名称可以含字母、数字以及其他的字符
        * 名称不能以数字或者标点符号开始
        * 名称不能以字符 “xml”（或者 XML、Xml）开始
        * 名称不能包含空格
        * 可使用任何名称，没有保留的字词。
        * 非英语的字母比如 éòá 也是合法的 XML 元素名，不过需要留意当软件开发商不支持这些字符时可能出现的问题。
      * 命名习惯：
        * 避免 "-" 字符。如果您按照这样的方式进行命名："first-name"，一些软件会认为你需要提取第一个单词。
        * 避免 "." 字符。如果您按照这样的方式进行命名："first.name"，一些软件会认为 "name" 是对象 "first" 的属性。
        * 避免 ":" 字符。冒号会被转换为命名空间来使用
      * XML 元素 vs 属性

        ```
        <person sex="female">
          <firstname>Anna</firstname>
          <lastname>Smith</lastname>
        </person>

        <person>
          <sex>female</sex>
          <firstname>Anna</firstname>
          <lastname>Smith</lastname>
        </person>
        ```
        * 第一个例子中，sex 是一个属性。在第二个例子中，sex 则是一个子元素。两个例子均可提供相同的信息。
        * 在 HTML 中，属性用起来很便利，但是在 XML 中，应该尽量避免使用属性。如果信息感觉起来很像数据，那么使用子元素

4. **XML 验证**

      * 通过DTD来验证XML的合法性
      * 形式良好的 XML 文档
        * “形式良好”或“结构良好”的 XML 文档拥有正确的语法。“形式良好”（Well Formed）的 XML 文档会遵守前几章介绍过的 XML 语法规则：
          * XML 文档必须有根元素
          * XML 文档必须有关闭标签
          * XML 标签对大小写敏感
          * XML 元素必须被正确的嵌套
          * XML 属性必须加引号
      * 验证 XML 文档
        * 合法的 XML 文档是“形式良好”的 XML 文档，同样遵守文档类型定义 (DTD) 的语法规则

          ```
          <!DOCTYPE note SYSTEM "Note.dtd">
          ```
      * XML DTD:
        * DTD 的作用是定义 XML 文档的结构。它使用一系列合法的元素来定义文档结构
        * 可以自己手动定义，也可以导入外部文档

5. **XML 验证器**

      * XML 文档中的错误会终止你的 XML 程序


