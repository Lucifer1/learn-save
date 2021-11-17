## Chrome Extentions

### manifest.json

1. manifest_version:选择基本都写2了，不带双引号，涉及到chrome版本问题
2. version:版本号，自己随便写，当然是有命名规则的，可以了解
3. icon：支持的格式PNG、BMP、GIF、ICO、JPEG(自己试了一下jpeg貌似不行)，可以配置16，48，128

    ```
    "icons":
    {
      "16": "img/icon.png",
      "48": "img/icon.png",
      "128": "img/icon.png"
    },
    ```
4. browser_action与page_action:

    * browser_action:配置该项的插件可以适用于任何页面，图标位于地址栏外右侧
    * page_action:配置该项的插件只能作用于某一页面，当页面打开时在地址栏内部右侧显示插件图标。

5. background: 一个在后台持续运行的JS或者后台页面，可以使一个html也可以是一个js文件

    ```
    "background":
    {
      "page": "background.html"
    }
    ```

6. browser_action: 用于设置插件的tile，icon和popup等，该文件中，browser_actiopn、page_action以及app必须三选一

    ```
    "browser_action":
    {
      "default_icon": "img/icon.png",
      // 图标悬停时的标题，可选
      "default_title": "这是一个示例Chrome插件",
      "default_popup": "popup.html"
    },
    ```

7. content_script: 需要直接注入页面的JS或CSS。它其实就是插件向页面注入脚本的一种形式。

    * matches
    * 默认情况下，它在网页加载完与页面脚本执行完之后，页面处于空闲情况(Document Idel)时运行，不过这个可以设置

    ```
    "content_scripts":
    [
      {
        //"matches": ["http://*/*", "https://*/*"],
        // "<all_urls>" 表示匹配所有地址
        "matches": ["<all_urls>"],
        // 多个JS按顺序注入
        "js": ["js/jquery-1.8.3.js", "js/content-script.js"],
        // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
        "css": ["css/custom.css"],
        // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
        "run_at": "document_start"
      }
    ],
    ```


8. permissions: 权限申请，即允许插件做什么事情，访问哪些网站。
9. options_page: 配置选项的网页，content_scripts如果想获得options页面数据只能通过消息机制