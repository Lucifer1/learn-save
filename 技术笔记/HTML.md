1. 元信息类标签

  * 定义：指描述自身的信息。元信息类标签，就是 HTML 用于描述文档自身的一类标签。通常出现在 head 标签中，一般来说都不会被页面显示出来。（与此相对应的是，其他的标签，比如语义类标签，描述的是业务）。元信息多数情况下是给浏览器、搜索引擎来阅读的，而不是给我们人类阅读的（大多数时候）。
  * 标签分类：
    * head标签：它不携带任何信息，知识其他标签的容器。
      * head标签规定了它必须时html标签的第一个标签
      * 里边必须有一个title标签，最多有一个base标签(基本不用)
      * 如果为iframe或者通过其他方式定义了标题，允许不包括title标签
    * title标签：表示文档的标题。title 作为元信息，可能会被用在浏览器收藏夹、微信推送卡片、微博等应用场景，这个时候往往是上下文缺失的。所以 title 应该包含完整的网页内容。
    * base标签：base 标签实际上基本都不用，它是一个历史遗留的标签，作用是给页面上的相对 URL 提供一个 base url。实际开发中，都是使用 javascript 来代替 base 标签。
  * **meta标签：** meta 标签是一组 key-value 对，它通常是一种元信息表示标签。在 head 中可以出现任意多个 meta 标签。
    1. 一般的 meta标签由 name 和 content 两个属性来定义。name 表示元信息的名字，content 则表示元信息的值。

      ```
      <meta name=application-name content="IsForums">
      ```
      HTTP标准规定了一些标准的name值，也鼓励自定义name

      * **name为viewport的meta:** meta 标签可以被自由定义，只要写入和读取的双方约定好 name 和 content 的格式就可以了。viewport它没有在 HTML 标准中定义，却是移动端开发的事实标准。meta 的 name 属性为 viewport，它的 content 是一个复杂结构，是用逗号分隔的键值对，键值对的格式是 key=value。**viewport 标签只对移动端浏览器有效，对 PC 端浏览器是无效的**

        ```
        <meta name="viewport" content="width=500, initial-scale=1">
        ```

        物理像素与css像素：
        1. 物理像素（设备像素，device pixels）：指的是设备屏幕的物理像素，任何设备的物理像素数量都是固定的。
        2. css像素：是 CSS 和 JS 中使用的一个抽象概念。它**和物理像素之间的比例取决于屏幕的特性**（是否为高密度）以及用户进行的缩放，由浏览器自行换算。

        [布局视口、视觉视口和理想视口三个概念](https://juejin.cn/post/6844903687240810509),**当缩放比例为 100% 时，dip 宽度 = CSS 像素宽度 = 理想视口的宽度 = 布局视口的宽度**

        这里只指定了两个属性，宽度和缩放，实际上 viewport 能控制的更多，它能表示的全部属性如下：
        1. width：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。可以分别用window.innerWidth和document.document.clientWidth查看
        2. height：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。
        3. initial-scale：初始缩放比例。
        4. minimum-scale：最小缩放比例。
        5. maximum-scale：最大缩放比例。
        6. user-scalable：是否允许用户缩放。**即使设置了 user-scalable = no，在 Android Chrome 浏览器中也可以强制启用手动缩放**
        7. target-densitydpi：值可以为一个数值或 high-dpi 、 medium-dpi、 low-dpi、 device-dpi 这几个字符串中的一个。安卓中支持，当 target-densitydpi=device-dpi 时， css中的1px会等于物理像素中的1px。
        8. [viewport-fit](https://juejin.cn/post/6844903712268222471)：用于解决IOS的安全区域问题
           1. contain: 可视窗口完全包含网页内容
           2. cover：网页内容完全覆盖可视窗口
           3. auto：默认值，跟 contain 表现一致

        9.  **单独设置 initial-scale 或 width 都会有兼容性问题，所以设置布局视口为理想视口的最佳方法是同时设置这两个属性**

        对于已经做好了移动端适配的网页，应该把用户缩放功能禁止掉，宽度设为设备宽度，一个标准的 meta 如下：

        ```
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
        ```

      * name为其他值时：

        1. author: 页面作者。
        2. description：页面描述，这个属性可能被用于搜索引擎或者其它场合。
        3. generator: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 meta。
        4. keywords: 页面关键字，对于 SEO 场景非常关键。
        5. referrer: 跳转策略，是一种安全考量。
        6. theme-color: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）

        content中放他们的value


    2. 具有charset属性的meta，规定了整个文档的编码格式，一般http头里会规定编码格式，如果没有http头时，这个属性就很重要了

      ```
      使用 http-equiv 已经不是规定 HTML 文档的字符集的唯一方式：

      HTML 4.01： <meta http-equiv="content-type" content="text/html; charset=UTF-8">
      HTML5： <meta charset="UTF-8">
      ```
    3. http-equiv一般设置的都是与http头部相关的信息，设置的值会关联到http头部。也就是说浏览器在请求服务器获取html的时候，**服务器会将html中设置的meta放在响应头中返回给浏览器**。常见的类型比如content-type, expires, refresh, set-cookie, window-target, charset， pragma等等。
    4. 具有http-equiv属性的meta，相当于http头的作用，它可以向浏览器传回一些有用信息，meta标签的http-equiv属性语法格式是：

      ```
      <meta http-equiv="参数"content="参数变量值">；
      ```
      相关属性：
      1. Expires：设置一个网页的到期时间。如果网页过了设置的时间期限，网页就会过期，必须重新上传
          ```
          <meta http-equiv="expires" content="Wed,10 Apr 2017 16:34:59 GMT">
          ```

      2. Pragma：无法用浏览器从本地缓存中调用次网页内容。同时，访问者无法脱机浏览页面

          ```
          <meta http-equiv="Param" content="no-cache">
          ```

      3. Refresh：自动刷新页面到制定的页面

          ```
          <meta http-equiv="Refresh" content="2;URL=https://www.baidu.com">
          ```

      4. Set-Cookie：如果网页过期，则缓存中的cookie也会删除

          ```
          <meta http-equiv="Set-Cookie" content = "cookievalue=xxx;expires=Wed,10 Apr 2017 16:44:59 GMT;path=/">
          ```

      5. Window-target：强制页面在当前窗口以独立页面显示

          ```
          <meta http-equiv="Window-target" content="_top">
          ```

      6. content-Type：设定页面的字符集

          ```
          <meta http-equiv="content-Type" content="text/html;charset=gb2312">
          ```

      7. Pics-label:网页等级评定(小白我还用过)

          ```
          <meta http-equiv="Pics-label" content="">
          ```

      8. Page_Enter、Page_Exit：设置进入、退出页面的效果

          ```
          <meta http-equiv="Page-Enter" content="revealTrans(duration=1.0,transtion =10)">
          <meta http-equiv="Page-Exit" content="revealTrans(duration=1.0,transtion =10)">

          duration：网页动态过渡时间（单位：秒）

          transition：过渡方式。0~23分别代表不同的过渡方式

          0:盒状收缩      1:盒状放射      2:圆形收缩      3:圆形放射
          4:由下往上      5:由上往下      6:从左至右      7:从右至左
          8:垂直百叶窗    9:水平百叶窗   10:水平格状百叶窗
          11:垂直格状百叶窗           12:随意溶解
          13:从左右两端向中间展开      14:从中间向左右两端展开
          15:从上下两端向中间展开      16:从中间向上下两端展开
          17:从右上角向左下角展开      18:从右下角向左上角展开
          19:从左上角向右下角展开      20:从左下角向右上角展开
          21:水平线状展开             22:垂直线状展开
          23:随机产生一种过渡方式
          ```
      9. cache-control：清除缓存

          ```
          <meta http-equiv="cache-control" content="no-cache">
          ```

      10. keywords、description：关键字、描述

          ```
          <meta http-equiv="keywords" content="keyword，keywords，keywords">
          <meta http-equiv="description" content="this is description">
          ```

      **注意：** 通常情况下：

          ```
          <meta http-equiv="Pragma" content="no-cache">
          <meta http-equiv="Cache-Control" content="no-cache">
          <meta http-equiv="Expires" content="0">
          ```

        是合在一起用的，这样可以清理缓存，再次访问该页面会重新加载。