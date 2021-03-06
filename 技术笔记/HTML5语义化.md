# [语义化](https://rainylog.com/post/ife-note-1/)

### 为什么要语义化

* 易于维护，易于修改
* 无障碍阅读支持
* 搜索引擎友好，有利于SEO
* 面向未来的HTML，浏览器在未来可能提供更丰富的支持。（**不是很理解**）

### 结构语义化

语义元素其实他对页面不会有任何更改，他只是让页面更加规范化，通过见词知意的标签，下图为经典语义化页面结构。

![经典语义化页面结构](../img/经典语义化页面结构.png)

* 基本上分为header、main和footer，有aside的加aside
* header可以出现在很多地方，不光网页的头部，article里边也应该拥有header
* main就是页面的主要结构，他不能包含在页面的其他区块元素中，通常是body的子元素，或者全局div的子元素
* footer，标准规定footer标签仅仅可以包含版权、来源信息、法律限制等等之类的文本或链接信息。如果想要在页脚中包含其它内容，可以使用div。
* aside不仅仅是侧栏，还可以用来标识与它周围文本没有密切关系的内容
  * 常用于与页面主体，也就是main并且的小块，广告啥的
  * 独立性的内容，清单表单啥的
  * **下边的不是很理解**
  * 分组内容，如 CMS 系统中的文章分类区块。
  * 比较长文档的一部分，可能仅仅是为了正确规定页面大纲。
* **div这个标签依然是可以使用的，当你觉得使用其它标签都不太合适的时候。新的语义元素出现之前，我们总是这么干的！**

### [div、section与article的区别](https://blog.csdn.net/anmoran/article/details/48517105)

* div嘛，没什么特殊的意义，普普通通块级元素，没有语义
* section：带有语义的div，举些例子，比如文章的章节啊，或者说主页划分为几个部分啊，这些部分都可以用section，如果只是单纯的为了添加样式，或者方便js操作，那么还是使用div更加合理，section之间通常会有上下文之间的关系。
* article：它是特殊的section，它拥有比section更加明确的语义，通常带有header，有时也会有footer，section是带有主题的一块内容，article就是一个独立的主体，应用程序中可以独立被外部引用的内容
  * 文章中包含插图时，使用新的语义元素figure标签。
  * figcaption标签包含了关于插图的详细解释，则img的alt属性可以略去。