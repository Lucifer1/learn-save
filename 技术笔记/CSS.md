1. **[基础总结](https://juejin.cn/post/6941206439624966152)**
2. 根据部分属性值选择

    如果需要根据属性值中的词列表的某个词进行选择，则需要使用波浪号（~）。

    假设您想选择 class 属性中包含 important 的元素，可以用下面这个选择器做到这一点：
    ```
    p[class~="important"] {color: red;}
    ```
    如果忽略了波浪号，则说明需要完成完全值匹配。

    部分值属性选择器与点号类名记法的区别
    该选择器等价于我们在类选择器中讨论过的点号类名记法。

    也就是说，p.important 和 p[class="important"] 应用到 HTML 文档时是等价的。

    那么，为什么还要有 "~=" 属性选择器呢？因为它能用于任何属性，而不只是 class。

    例如，可以有一个包含大量图像的文档，其中只有一部分是图片。对此，可以使用一个基于 title 文档的部分属性选择器，只选择这些图片：

    img[title~="Figure"] {border: 1px solid gray;}
    这个规则会选择 title 文本包含 "Figure" 的所有图像。没有 title 属性或者 title 属性中不包含 "Figure" 的图像都不会匹配。

3. 子串匹配属性选择器
   1. [abc^="def"]	选择 abc 属性值以 "def" 开头的所有元素
   2. [abc$="def"]	选择 abc 属性值以 "def" 结尾的所有元素
   3. [abc*="def"]	选择 abc 属性值中包含子串 "def" 的所有元素

4. 特定属性选择类型

    ```
    *[lang|="en"] {color: red;}
    ```
    上面这个规则会选择 lang 属性等于 en 或以 en- 开头的所有元素。因此，以下示例标记中的前三个元素将被选中，而不会选择后两个元素

5. 只有普通文档流中块框的垂直外边距才会发生外边距合并。行内框、浮动框或绝对定位之间的外边距不会合并。
6. postcss
   1. 它在vue中的用法有三种，分别是配置在vue.config.js、.postcssrx.js和postcss.config.js三种方法，其中

    ```
    vue.config.js > .postcssrx.js > postcss.config.js
    ```

  1. 配置示例

      vue.config.js
      ```
      module.exports = {
          //...其他配置
          css: {
            loaderOptions: {
              postcss: {
                plugins: [
                  require('postcss-pxtorem')({
                    rootValue: 192,
                    minPixelValue: 2,
                    propList: ['*'],
                  })
                ]
              }
            }
          },
        }
      ```
      .postcssrx.js
      ```
      module.exports = {
          plugins: {
              'postcss-pxtorem': {
                  rootValue: 16,
                  minPixelValue: 2,
                  propList: ['*'],
              }
          }
      }
      ```
      postcss.config.js
      ```
      module.exports = {
        plugins: {
          'postcss-pxtorem': {
            rootValue: 192,
            minPixelValue: 2,
            propList: ['*'],
          }
        }
      }

      ```
  2. 公司的postcss.config.js配置

      ```
      module.exports = {
        plugins: {
          autoprefixer: {},
          'postcss-pxtorem': {
            rootValue: 100,
            unitPrecision: 5,
            propWhiteList: [],
            selectorBlackList: ['className'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 2
          }
        }
      }
      ```
      首先，autoprefixer这里也可以加单引号，没区别，plugins下边单引号的属性就是你要使用的插件名称，postcss有200多个插件，想用哪个，引哪个。然后各个插件下的具体配置去查对应的文档

7. 希望得到一个高和宽和可视高度相同的div，通过css方式实现

        ```
        .test {
            position:fixed;
            left:0;
            right:0;
            top:0;
            bottom:0;
        }
        ```

8. 如果希望部分px单位不被转换成rem或者rpx，做法就是把px中任意一个字母大写就ok了，就会被插件忽略
9. 隐藏滚动条：
    1. 第一种：
       1. 在需要滚动的区域外边加一个div，并且设置overflow:hidden

           ```
           <div 添加的div>
               <div class='scrollWarpper'>
                   ...滚动内容
               </div>
           </div>
           ```
       2. 然后wrapper设置为positon，个给需要滚动的区域设置为scroll，x设置x，y设置y
       3. 利用top和padding-bottom将滚动条盖住，隐藏
    2. 第二种：
       1. 也是在最外边嵌套一层overflow:hidden
       2. 给子元素设置padding-bottom为正值，margin-bottom为负值，也可以隐藏滚动条
10. 合理的利用margin的负值来调整div的位置
11. css问题

        ```
        .TrBubble:after{
            content:"";
            position:absolute;
            bottom:0;
            left:50%;
            border:34px solid #0094ff;
            /*border-top-color:#0094ff;*/
            /*border-bottom:0;*/
            /*margin:0 0 -34px -34px;*/
            margin-top: -10px;    // 无效
            margin-bottom: -10px   // 有效
        }
        ```
    原因：设置了bottom:0,所以top无效，其他三个方向都有效

12. 气泡框是向：
    1.  原理：两个相同的三角，叠加，上下移动来完成视觉效果
    2.  [网址](https://blog.csdn.net/Eternal_Blue/article/details/104413810)
13. css文本不换行white-space:nowrap
14. .border-1px(#E9E9E9);  less定义了一个方法交border-1px
15. css 图片底部多出空白
    1.  原因：图片的display属性默认inline,而这个属性的vertical-align的默认值是baseline.所以现图片底部出现一块小留白
    2.  解决： 给图片加上 vertical-align：middle或bottom属性，来调整对齐方式。
16. css 给子元素设置margin-top影响父元素边缘，
    1.  原因：父子元素外边距合并，直白点说就是子元素的margin-top如果不碰到有效的border或者padding就会一层一层的上传，影响外边父元素的margin，
    2.  解决办法，父元素设置padding或者border，或者设置overflow，或者将元素设置为bfc
17. 使用component动态组件，想给其中一个组件设置样式，可以通过less的方式设置，例如

        ```
        .vip-introduction {
            background: #f4f6f8 url("../../assets/vip/bg.png") no-repeat;
            background-size: 100vw auto;
            background-position: left top;
            padding-bottom: 226px;
            margin-bottom: constant(safe-area-inset-bottom);
            margin-bottom: env(safe-area-inset-bottom);

            .vip-icon {
                background: linear-gradient(134deg, #FFF9EE 0%, #FFD99B 100%);;
            }
        }
        ```
    想给div.vip-introduction里，class为vip-icon设置一个背景颜色，那么只需要在该class下设置相同的class名即可

18. background

        ```
        ~"right 154px top 45% / 221px 92px no-repeat  url('../../../assets/rank/bg-clouds-right.png')",
        ```
    解释： top bottom left right就是background-position，规定背景图片的初始位置，/后边的就是规定图片的大小，no-reapeat是否重复，图片地址

19. bfc:
    1.  内部的Box会在垂直方向，一个接一个地放置。
    2.  Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
    3.  每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
    4.  BFC的区域不会与float box重叠。
    5.  BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
    6.  计算BFC的高度时，浮动元素也参与计算
    7.  一般兄弟元素间解决margin合并的办法都是单独给一个元素加margin，不要两个一起加，没用使用bfc的，bfc一般用来解决父子间的margin塌陷
    8.  float可以解决margin合并，overflow:hidden可以解决父子间的margin合并，也就是margin塌陷，不能解决兄弟间的

20.  兄弟间的叫margin合并，父子间的叫margin塌陷
21.  标准盒模型与怪异盒模型
     1.   标准盒模型：width和height指的是content的宽高
          1.   整个盒模型的大小 = content(width) + padding + border + margin
     2.   怪异盒模型（IE标准的盒子模型）: width与height指的是，content + padding + border的宽高
          1.   整个盒模型的大小 = width（content + padding + border） + margin
     3.   何时触发
          1.   如果定义了完整的DOCTYPE，那么就会触发标准模式，那么在浏览器中都会默认使用标准盒模型
          2.   如果没有定义DOCTYPE，那么在IE9之前的浏览器(IE6,IE7,IE8)，就会触发混杂模式，也成为怪异模式，使用怪异盒模型
          3.   其他浏览器默认使用标准模式
          4.   在IE8+的浏览器当中，可以通过**box-sizing**来设置标准和怪异，
          5.   content-box为标准盒模型，默认值
          6.   border-box为怪异盒模型
          7.   padding-box，这个模式把padding算入width，不算border，**找不到对应的定义**
     4.   标准模式与混杂模式
          1.   严格模式：又称标准模式，是指浏览器按照 W3C 标准解析代码。
          2.   混杂模式：又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码。
          3.   通过DTD（Document Type Definition）来区分，DTD声明始终以!DOCTYPE开头
          4.   \<!DOCTYPE> 声明位于文档中的最前面，处于`<html>`标签之前。告知浏览器的解析器， 用什么文档类型 规范来解析这个文档。
22.  css选择器
     1. id选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul > li）、后代选择器（li a）、通配符选择器（*）、属性选择器（a[rel="external"]）、伪类选择器（a:hover, li:nth-child）
     2. 权重
        1. 10000：!important；
        2. 01000：内联样式；
        3. 00100：ID 选择器；
        4. 00010：类选择器、伪类选择器、属性选择器；
        5. 00001：元素选择器、伪元素选择器；
        6. 00000：通配选择器、后代选择器、兄弟选择器；
     3. !important>行内样式>ID选择器 > 类选择器 | 属性选择器 | 伪类选择器 > 元素选择器 | 伪元素选择器
     4. **继承得到的样式的优先级最低。**
     5. 介绍
        1. !important;
        2. 行内样式;
        3. ID选择器, 权重:100;
        4. class,属性选择器和伪类选择器，权重:10;
           1. 属性选择器指的是:根据元素的属性及属性值来选择元素，比如button的type属性等。
           2. 伪类选择器: :active :focus等选项.
        5. 标签选择器和伪元素选择器，权重:1;
           1. 伪元素选择器： :before :after
     6. **不推荐使用!important**，因为!important根本没有结构与上下文可言，并且很多时候权重的问题，就是因为不知道在哪里定义了一个!important而导致的。
        1. 一定要优先考虑使用样式规则的优先级来解决问题而不是 !important；
        2. 只有在需要覆盖全站或外部 CSS 的特定页面中使用 !important；
        3. 永远不要在你的插件中使用 !important；
        4. 永远不要在全站范围的 CSS 代码中使用 !important；
     7. 覆盖important:!important 优先级最高，但也会被权重高的important所覆盖，**虽然不推荐使用，但是也要学会怎么覆盖它**

        ```
        //!important 优先级最高，但也会被权重高的important所覆盖
            <button id="a" class="a">aaa</button>
            #a{
              background: blue  !important;  /* id的important覆盖class的important*/
            }
            .a{
              background: red  !important;
            }
        ```

      1. 如果两个权重不同的选择器作用在同一元素上，权重值高的css规则生效
      2. 如果两个相同权重的选择器作用在同一元素上：以后面出现的选择器为最后规则
      3. 权重相同时，与元素距离近的选择器生效

          ```
          #content h1 { // css样式表中
                padding: 5px;
              }
              <style type="text/css">
                #content h1 { // html头部 因为html头部离元素更近一点，所以生效
                  padding: 10px;
                }
              </style>
          ```
      4. [例子](https://juejin.cn/post/6988423658683236383)
23. [CSS继承](https://juejin.cn/post/6844903997459922958)
    1. css 的继承很简单，分为默认继承的和默认不继承的，但所有属性**都可以**通过设置 inherit 实现继承。
    2. 默认继承的 ("Inherited: Yes") 的属性：
       1. **所有元素默认继承：visibility、cursor**
       2. 文本属性默认继承：letter-spacing、word-spacing、**white-space**、**line-height**、**color**、font、 font-family、**font-size**、font-style、font-variant、**font-weight**、text-indent、**text-align**、text-shadow、text-transform、direction
       3. 列表元素默认继承：list-style、list-style-type、list-style-position、list-style-image
       4. 表格元素默认继承：border-collapse
    3. 默认不继承的("Inherited: No") 的属性：
       1. **所有元素默认不继承：all、display、overflow、contain**
       2. **文本属性默认不继承：vertical-align、text-decoration、text-overflow**
       3. **盒子属性默认不继承：width、height、padding、margin、border、min-width、min-height、max-width、max-height**， 正常流中，子元素设置了height时，块级子元素width继承父元素属性，行内元素不继承父元素宽度
       4. **背景属性默认不继承：background、background-color、background-image、background-repeat、background-position、background-attachment**
       5. **定位属性默认不继承：float、clear、position、top、right、bottom、left、z-index**
       6. 内容属性默认不继承：content、counter-reset、counter-increment
       7. 轮廓属性默认不继承：outline-style、outline-width、outline-color、outline
       8. 页面属性默认不继承：size、page-break-before、page-break-after
       9. 声音属性默认不继承：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during
    4.  总结：只需要记住那些默认继承的，剩下的都是默认不继承的。而默认继承的元素除了文本相关的哪些，只有 visibility、cursor 比较常用了，也是比较容易记得的。
    5.  设置的值
        1.  inherit：继承父元素对应属性的计算值；
        2.  initial：应用该属性的默认值，比如 color 的默认值是 #000；
        3.  unset：如果属性是默认可以继承的，则取 inherit 的效果，否则同 initial；
        4.  revert：效果等同于 unset，兼容性差。

24. @规则
    1.  @namespace 告诉 CSS 引擎必须考虑XML命名空间。
    2.  @media, 如果满足媒体查询的条件则条件规则组里的规则生效。
    3.  @page, 描述打印文档时布局的变化.
    4.  @font-face, 描述将下载的外部的字体。
    5.  @keyframes, 描述 CSS 动画的关键帧。
    6.  @document, 如果文档样式表满足给定条件则条件规则组里的规则生效。 (推延至 CSS Level 4 规范)
    7.  @charset:用于定义样式表使用的字符集。它必须是样式表中的第一个元素。如果有多个 @charset 被声明，只有第一个会被使用，而且不能在HTML元素或HTML页面的 \<style\> 元素内使用。平常css里边都不会标识这个，浏览器的默认顺序为
        1. 文件开头的 Byte order mark 字符值，不过一般编辑器并不能看到文件头里的 BOM 值；
        2. HTTP 响应头里的 content-type 字段包含的 charset 所指定的值
        3. CSS 文件头里定义的 @charset 规则里指定的字符编码；
        4. \<link\> 标签里的 charset 属性，该条已在 HTML5 中废除；
        5. 默认是 UTF-8。
    8.  @import
    9.  @supports:@supports 用于查询特定的 CSS 是否生效，可以结合 not、and 和 or 操作符进行后续的操作。

        ```
        /* 如果支持自定义属性，则把 body 颜色设置为变量 varName 指定的颜色 */
        @supports (--foo: green) {
            body {
                color: var(--varName);
            }
        }
        ```

25. link 和 @import 都能导入一个样式文件，区别：
    1.  link 是 HTML 标签，除了能导入 CSS 外，还能导入别的资源，比如图片、脚本和字体等；而 @import 是 CSS 的语法，只能用来导入 CSS；
    2.  link 导入的样式会在页面加载时同时加载，@import 导入的样式需等页面加载完成后再加载；
    3.  link 没有兼容性问题，@import 不兼容 ie5 以下；
    4.  link 可以通过 JS 操作 DOM 动态引入样式表改变样式，而@import不可以。
26. display的block、inline、inline-block
    1.  block
        1.  占满一行，默认继承父元素的宽度；多个块元素将从上到下进行排列；
        2.  设置 width/height 将会生效；
        3.  设置 padding 和 margin 将会生效；
    2.  inline
        1.  不会占满一行，宽度随着内容而变化；多个 inline 元素将按照从左到右的顺序在一行里排列显示，如果一行显示不下，则自动换行；
        2.  设置 width/height 将不会生效；
        3.  设置竖直方向上的 padding 和 margin 将不会生效；
    3.  inline-block
        1.  是行内块元素，不单独占满一行，可以看成是能够在一行里进行左右排列的块元素；
        2.  设置 width/height 将会生效；
        3.  设置 padding 和 margin 将会生效；

27. 居中：利用IFC
    1.  水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过 text-align 则可以使其水平居中。
    2.  垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其 vertical-align: middle，其他行内元素则可以在此父元素下垂直居中。

28. z-index生效条件：position 属性值不是 static
29. 在 JS 中 100vw = window.innerWidth，100vh = window.innerHeight。
30. vmin：取 vw 和 vh 中值较小的；vmax：取 vw 和 vh 中值较大的；
31. transparent 是 rgba(0,0,0,0) 的简写。
32. [css画三角](https://juejin.cn/post/6844903567795421197)，[代码](https://www.cnblogs.com/chengxs/p/11406278.html)
33. CSS关键字
    1.  transparent：透明色
    2.  currentColor：会取当前元素继承父级元素的文本颜色值或声明的文本颜色值，即 computed 后的 color 值。

        ```
        该元素的边框颜色会是 red：

        .btn {
            color: red;
            border: 1px solid currentColor;
        }
        ```
34. 配色：RGBA、HSLA(色相(hue)-饱和度(saturation)-亮度(lightness))，HEX(就是我们常用的#ffffff)
35. 媒体查询@media：
    1.  设置改css对什么设备生效

      ```
      <link rel="stylesheet" src="styles.css" media="screen" />
      <link rel="stylesheet" src="styles.css" media="print" />


      @media screen and (min-width:960px) and (max-width:1200px){
          body{background:yellow;}
      }
      ```

       1. all：适用于所有设备；
       2. print：适用于在打印预览模式下在屏幕上查看的分页材料和文档；
       3. screen：主要用于屏幕；
       4. speech：主要用于语音合成器。
    2. 让 CSS 规则在特定的条件下才能生效：@media (min-width: 1000px) {}
       1. and：查询条件都满足的时候才生效；
       2. not：查询条件取反；
       3. only：整个查询匹配的时候才生效，常用语兼容旧浏览器，使用时候必须指定媒体类型；
       4. 逗号或者 or：查询条件满足一项即可匹配；
    3. 复杂使用：@media (min-height: 680px), screen and (orientation: portrait) {}
36. margin: auto,常用来水平居中,auto可以表示两种情况：占用可用空间或0 px
   1. 不适用于浮动和内联元素。并且它本身也不能用于绝对和固定定位元素。
   2. W3C规范：“如果”margin-top“或”margin-bottom“为”auto“，则其使用值为0”
   3. 对于绝对定位元素，当摄者top、bottom、left、right都为0时，设置margin为auto，该绝对定位元素将水平垂直居中，如果只设置了top和bottom，那么将垂直居中，如果只设置了left和right，将水平居中，auto自动占用了可用空间
37. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性-webkit-text-size-adjust: none; 解决。
38. 为什么要css初始化：因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。
39. CSS里的visibility:collapse属性值,在不同浏览器下的区别
   4.  当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。
   5.  chrome中，使用collapse值和使用hidden没有区别。
   6.  firefox，opera和IE，使用collapse值和使用display：none没有什么区别。
40. 元素浮动后，会自动变成display:block
41. min-width与max-width的使用，height同理
    1.  如果元素是响应式的，设置这个属性就是无论浏览器怎么方法和缩小，它都有最大和最小宽度
42. vue + ts时，使用混入的页面，无法拿到混入中定义的变量，目前使用的是在混入文件中更改的变量都用vuex存储，后边可以找一下对应的解决办法
43. 客服页面，ipad的bug，因为template.html中，对于rem的定义的问题，最大的根元素的font-size是55.2，但是在pad中是远远大于这个数的，所以要进行适配，这个bug是通过给背景图片宽度100vw，高度自适应，然后获取图片高度，根据比例来确定下方元素到顶部的距离来解决的，没有使用默认的rem
44. display:flex时
     1.   1.float(浮动)会失效
     2.   2.clear(清除)会失效
     3.   text-align(文本排列)会失效
     4.   单一元素右对齐，margin-left:auto
45.  less 使用js，因为 Less 是由 JS 编写，所以 Less 有一得天独厚的特性：代码中使用 Javascript 。

            ```
            /* Less */
            @content:`"aaa".toUpperCase()`;
            #randomColor{
            @randomColor: ~"rgb(`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`)";
            }
            #wrap{
            width: ~"`Math.round(Math.random() * 100)`px";
            &:after{
                content:@content;
            }
            height: ~"`window.innerHeight`px";
            alert:~"`alert(1)`";
            #randomColor();
            background-color: @randomColor;
            }
            /* 生成后的 CSS */

            // 弹出 1
            #wrap{
            width: 随机值（0~100）px;
            height: 743px;//由电脑而异
            background: 随机颜色;
            }
            #wrap::after{
            content:"AAA";
            }
46.  Less
     1.   定义变量

            ```
            @test: 我是test;
            @test2: 2;
            ```

            ```
            @mySelector: #wrap
            @test2: wrap

            @{mySelector} {}
            .@{test2} {}

            编译后

            #wrap {}
            .wrap {}
            ```

    1. 嵌套

            ```
            .a {
                .b {
                    .c{}
                }
                .d {}
            }

            .test {
                &.a{}
                &:after
            }
            编译后
            .a .b {}
            .a .d {}
            .a .b .c{}

            .test.a {} 同时拥有test 和 a两个class的元素
            .test:after
            ```

    2. 方法

            ```
            .test()

            .testFunc(@a, @b) {
                width: @a;
                height: @b;
            }

            .testFunc2(@a:20px, @b:30px) { // 也可以有默认值
                width: @a;
                height: @b;
            }

            #main {
                .test or .test()都可以，建议第二种
                .testFunc(100px, 200px) // 必须带单位
            }
            ```

    3. 导入文件：@import 'test.css or test.less'
    4. 有很多可以直接使用的函数，ceil()、floor()....

47. less 避免编译

            ```
            /* Less */
            #main{
            width:~'calc(300px-30px)';
            }

            /* 生成后的 CSS */
            #main{
            width:calc(300px-30px);
            }

48. CSS里的visibility:collapse属性值,在不同浏览器下的区别
   1.  当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。
   2.  chrome中，使用collapse值和使用hidden没有区别。
   3.  firefox，opera和IE，使用collapse值和使用display：none没有什么区别。
49. 元素浮动后，会自动变成display:block
50. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性-webkit-text-size-adjust: none; 解决。
51. margin: auto,常用来水平居中,auto可以表示两种情况：占用可用空间或0 px
   1. 不适用于浮动和内联元素。并且它本身也不能用于绝对和固定定位元素。
   2. W3C规范：“如果”margin-top“或”margin-bottom“为”auto“，则其使用值为0”
   3. 对于绝对定位元素，当摄者top、bottom、left、right都为0时，设置margin为auto，该绝对定位元素将水平垂直居中，如果只设置了top和bottom，那么将垂直居中，如果只设置了left和right，将水平居中，auto自动占用了可用空间
52.postcss
   1. 它在vue中的用法有三种，分别是配置在vue.config.js、.postcssrx.js和postcss.config.js三种方法，其中

    ```
    vue.config.js > .postcssrx.js > postcss.config.js
    ```

  2. 配置示例

      vue.config.js
      ```
      module.exports = {
          //...其他配置
          css: {
            loaderOptions: {
              postcss: {
                plugins: [
                  require('postcss-pxtorem')({
                    rootValue: 16,   //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
                    minPixelValue: 2,
                    propList: ['*'],
                  })
                ]
              }
            }
          },
        }
      ```
      .postcssrx.js
      ```
      module.exports = {
          plugins: {
              'postcss-pxtorem': {
                  rootValue: 16,
                  minPixelValue: 2,
                  propList: ['*'],
              }
          }
      }
      ```
      postcss.config.js
      ```
      module.exports = {
        plugins: {
          'postcss-pxtorem': {
            rootValue: 192,
            minPixelValue: 2,
            propList: ['*'],
          }
        }
      }

      ```
  3. 公司的postcss.config.js配置

      ```
      module.exports = {
        plugins: {
          autoprefixer: {},
          'postcss-pxtorem': {
            rootValue: 100,
            unitPrecision: 5,
            propWhiteList: [],
            selectorBlackList: ['className'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 2
          }
        }
      }
      ```
      首先，autoprefixer这里也可以加单引号，没区别，plugins下边单引号的属性就是你要使用的插件名称，postcss有200多个插件，想用哪个，引哪个。然后各个插件下的具体配置去查对应的文档

53. display与visibility、opacity的区别
    * display: none
        - DOM 结构：浏览器不会渲染 display 属性为 none 的元素，不占据空间；
        - 事件监听：无法进行 DOM 事件监听；
        - 性能：动态改变此属性时会引起重排，性能较差；
        - 继承：不会被子元素继承，毕竟子类也不会被渲染；
        - transition：transition 不支持 display。
    * visibility: hidden
        - DOM 结构：元素被隐藏，但是会被渲染不会消失，占据空间；
        - 事件监听：无法进行 DOM 事件监听；
        - 性 能：动态改变此属性时会引起重绘，性能较高；
        - 继 承：会被子元素继承，子元素可以通过设置 visibility: visible; 来取消隐藏；
        - transition：transition 支持 visibility。
    * opacity: 0
        - DOM 结构：透明度为 100%，元素隐藏，占据空间；
        - 事件监听：可以进行 DOM 事件监听；
        - 性 能：提升为合成层，不会触发重绘，性能较高；
        - 继 承：会被子元素继承,且，子元素并不能通过 opacity: 1 来取消隐藏；
        - transition：transition 支持 opacity。

54. CSS优化
    1.  首推的是合并css文件，如果页面加载10个css文件，每个文件1k，那么也要比只加载一个100k的css文件慢。
    2.  减少css嵌套，最好不要套三层以上。
    3.  不要在ID选择器前面进行嵌套，ID本来就是唯一的而且人家权值那么大，嵌套完全是浪费性能。
    4.  建立公共样式类，把相同样式提取出来作为公共类使用，比如我们常用的清除浮动等。
    5.  减少通配符*或者类似[hidden="true"]这类选择器的使用，挨个查找所有...这性能能好吗？当然重置样式这些必须 的东西是不能少的。
    6.  巧妙运用css的继承机制，如果父节点定义了，子节点就无需定义。
    7.  拆分出公共css文件，对于比较大的项目我们可以将大部分页面的公共结构的样式提取出来放到单独css文件里， 这样一次下载后就放到缓存里，当然这种做法会增加请求，具体做法应以实际情况而定。
    8.  不用css表达式，表达式只是让你的代码显得更加炫酷，但是他对性能的浪费可能是超乎你的想象的。
    9.  少用css rest，可能你会觉得重置样式是规范，但是其实其中有很多的操作是不必要不友好的，有需求有兴趣的 朋友可以选择normolize.css
    10. cssSprite，合成所有icon图片，用宽高加上bacgroud-position的背景图方式显现出我们要的icon图，这是一种 十分实用的技巧，极大减少了http请求。
    11. 当然我们还需要一些善后工作，CSS压缩(这里提供一个在线压缩 YUI Compressor ，当然你会用其他工具来压缩是十 分好的)，
    12. GZIP压缩，Gzip是一种流行的文件压缩算法，详细做法可以谷歌或者百度。
    13. 减少使用@import
55. 如何触发bfc
    1.  float的值不是none。
    2.  position的值不是static或者relative。
    3.  display的值是inline-block、table-cell、flex、table-caption或者inline-flex
    4.  overflow的值不是visible
56. 子元素有height时，会默认继承父元素的width
57. border在有的机型中失效了。原来是因为border 不可以用rem
58. 内联元素距离顶部有空白，只需要把它的父元素的font-size设置为0即可，否则该内联元素的父元素会默认继承其父元素或者根元素的font-size，导致父元素的高度被撑开，所以会有空白。
    1.  [font-size与line-height的关系](https://blog.csdn.net/weixin_43109549/article/details/100387545)


