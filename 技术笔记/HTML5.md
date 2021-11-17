### HTML5

1. **HTML 视频**
    * HTML5规定了一种通过video元素来包含视频的标准方法，当前video元素支持三种视频格式：
        + Ogg：带有 Theora 视频编码和 Vorbis 音频编码的 Ogg 文件
        + MPEG 4：带有 H.264 视频编码和 AAC 音频编码的 MPEG 4 文件
        + WebM：带有 VP8 视频编码和 Vorbis 音频编码的 WebM 文件

    * 使用方式：

            <video src="movie.ogg" controls="controls">
            </video>

        + controls 属性供添加播放、暂停和音量控件。
        + video标签之间插入的内容是供不支持 video 元素的浏览器显示的

                <video src="movie.ogg" width="320" height="240" controls="controls">
                Your browser does not support the video tag.
                </video>

        + 要确保适用于 Safari 浏览器，视频文件必须是 MPEG4 类型。
        + video 元素允许多个source元素。source元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式：


2. **Input 类型**
    * color:color 类型用在input字段主要用于选取颜色
    * email:在提交表单时，会自动验证 email 域的值是否合法有效
    * number:number 类型用于应该包含数值的输入域。
        - input type="number" name="quantity" min="1" max="5"
    * range
        - input type="range" name="points" min="1" max="10"
        - 请使用下面的属性来规定对数字类型的限定：
        - max - 规定允许的最大值
        - min - 规定允许的最小值
        - step - 规定合法的数字间隔
        - value - 规定默认值
    * input属性
        - input autofocus 属性：autofocus属性是一个boolean属性.autofocus属性规定在页面加载时，域自动地获得焦点。

                First name:<input type="text" name="fname" autofocus>

        - input form 属性：form 属性规定输入域所属的一个或多个表单。提示:如需引用一个以上的表单，请使用空格分隔的列表。

                <form action="demo-form.php" id="form1">
                  First name: <input type="text" name="fname"><br>
                  <input type="submit" value="提交">
                </form>

                Last name: <input type="text" name="lname" form="form1">

        - input formaction 属性：The formaction 属性用于描述表单提交的URL地址.The formaction 属性会覆盖<form> 元素中的action属性.注意: The formaction 属性用于 type="submit" 和 type="image".

                <form action="demo-form.php">
                  First name: <input type="text" name="fname"><br>
                  Last name: <input type="text" name="lname"><br>
                  <input type="submit" value="提交"><br>
                  <input type="submit" formaction="demo-admin.php"
                  value="提交">
                </form>

        - input formenctype 属性：formenctype 属性描述了表单提交到服务器的数据编码 (只对form表单中 method="post" 表单)，formenctype 属性覆盖 form 元素的 enctype 属性。主要: 该属性与 type="submit" 和 type="image" 配合使用。

                <form action="demo-post_enctype.php" method="post">
                  First name: <input type="text" name="fname"><br>
                  <input type="submit" value="提交">
                  <input type="submit" formenctype="multipart/form-data"
                  value="以 Multipart/form-data 提交">
                </form>

        - input formmethod 属性:formmethod 属性定义了表单提交的方式。formmethod 属性覆盖了 <form> 元素的 method 属性。注意: 该属性可以与 type="submit" 和 type="image" 配合使用。

                <form action="demo-form.php" method="get">
                  First name: <input type="text" name="fname"><br>
                  Last name: <input type="text" name="lname"><br>
                  <input type="submit" value="提交">
                  <input type="submit" formmethod="post" formaction="demo-post.php"
                  value="使用 POST 提交">
                </form>

        - input height 和 width 属性:height 和 width 属性规定用于 image 类型的 <input> 标签的图像高度和宽度。
        - input list 属性：list 属性规定输入域的 datalist。datalist 是输入域的选项列表。

                <input list="browsers">
                <datalist id="browsers">
                  <option value="Internet Explorer">
                  <option value="Firefox">
                  <option value="Chrome">
                  <option value="Opera">
                  <option value="Safari">
                </datalist>

        - input min 和 max 属性：min、max 和 step 属性用于为包含数字或日期的 input 类型规定限定（约束）。注意: min、max 和 step 属性适用于以下类型的 <input> 标签：date pickers、number 以及 range。

                Enter a date before 1980-01-01:
                <input type="date" name="bday" max="1979-12-31">

                Enter a date after 2000-01-01:
                <input type="date" name="bday" min="2000-01-02">

                Quantity (between 1 and 5):
                <input type="number" name="quantity" min="1" max="5">

        - **input pattern 属性**:pattern 属性描述了一个正则表达式用于验证 <input> 元素的值。注意:pattern 属性适用于以下类型的 <input> 标签: text, search, url, tel, email, 和 password.
        - input-placeholder属性：placeholder属性提供一种提示（hint），描述输入域所期待的值。
        - input required 属性：required属性是一个boolean属性.required属性规定必须在提交之前填写输入域（不能为空）。
        - input-step属性：step属性为输入域规定合法的数字间隔。如果step="3"，则合法的数是 -3,0,3,6 等

3. Web 存储
    * 不管是 localStorage，还是 sessionStorage，可使用的API都相同
        - 保存数据：localStorage.setItem(key,value);
        - 读取数据：localStorage.getItem(key);
        - 删除单个数据：localStorage.removeItem(key);
        - 删除所有数据：localStorage.clear();
        - 得到某个索引的key：localStorage.key(index);

4. 直接使用canvas.toDataURL()指令，图片模糊的问题
    1.  原因：这个方法可以在0-1范围内选择图片质量，默认为0.92
    2.  解决方法：
        1.  将第二个参数设置为1，级canvas.toDataURL('image/png', 1)
        2.  画一个很大的图，然后缩小