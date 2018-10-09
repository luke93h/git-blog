# 如何开发chrome extension

## 为什么要用chrome extension

1. chrome extension开发成本低，由一些文件（包括 HTML、CSS、JavaScript、图片以及其他任何您需要的文件）经过 zip 打包得到，本质上是网页。
2. chrome extension不仅可以利用[浏览器为网页提供的所有 API](https://crxdoc-zh.appspot.com/extensions/api_other)，还可以用[chrome为扩展程序提供了许多专用 API](https://crxdoc-zh.appspot.com/extensions/api_index)。
3. 有些场景下，我们并不是网页的开发者，但想要为网站添加更多的功能，这时候也可以用chrome extension来解决。

## 文件

1. [清单文件-manifest.json](#manifest)
2. 一个或多个 HTML 文件（除非扩展程序是一个主题背景）
3. 可选：一个或多个 JavaScript 文件
4. 可选：您的扩展程序需要的任何其他文件，例如图片

## 引用文件

1. 先对路径
```
<img src="images/myimage.png">
```
2. 绝对路径，使用浏览器访问
```
chrome-extension://<扩展程序标识符>/<文件路径>
```

## 清单文件-manifest.json

[完整清单文件格式](https://crxdoc-zh.appspot.com/extensions/manifest)
```jsx
{
    // 清单文件的版本，这个必须写，而且必须是2
    "manifest_version": 2,
    // 插件的名称
    "name": "demo",
    // 插件的版本
    "version": "1.0.0",
    // 插件描述
    "description": "简单的Chrome扩展demo",
    // 图标，一般偷懒全部用一个尺寸的也没问题
    "icons":
    {
        "16": "img/icon.png",
        "48": "img/icon.png",
        "128": "img/icon.png"
    },
    // 会一直常驻的后台JS或后台页面
    "background":
    {
        // 2种指定方式，如果指定JS，那么会自动生成一个背景页
        "page": "background.html"
        //"scripts": ["js/background.js"]
    },
    // 浏览器右上角图标设置，browser_action、page_action、app必须三选一
    "browser_action": 
    {
        "default_icon": "img/icon.png",
        // 图标悬停时的标题，可选
        "default_title": "这是一个示例Chrome插件",
        "default_popup": "popup.html"
    },
    // 当某些特定页面打开才显示的图标
    /*"page_action":
    {
        "default_icon": "img/icon.png",
        "default_title": "我是pageAction",
        "default_popup": "popup.html"
    },*/
    // 需要直接注入页面的JS
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
        },
        // 这里仅仅是为了演示content-script可以配置多个规则
        {
            "matches": ["*://*/*.png", "*://*/*.jpg", "*://*/*.gif", "*://*/*.bmp"],
            "js": ["js/show-image-content-size.js"]
        }
    ],
    // 权限申请
    "permissions":
    [
        "contextMenus", // 右键菜单
        "tabs", // 标签
        "notifications", // 通知
        "webRequest", // web请求
        "webRequestBlocking",
        "storage", // 插件本地存储
        "http://*/*", // 可以通过executeScript或者insertCSS访问的网站
        "https://*/*" // 可以通过executeScript或者insertCSS访问的网站
    ],
    // 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
    "web_accessible_resources": ["js/inject.js"],
    // 插件主页，这个很重要，不要浪费了这个免费广告位
    "homepage_url": "https://www.baidu.com",
    // 覆盖浏览器默认页面
    "chrome_url_overrides":
    {
        // 覆盖浏览器默认的新标签页
        "newtab": "newtab.html"
    },
    // Chrome40以前的插件配置页写法
    "options_page": "options.html",
    // Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个
    "options_ui":
    {
        "page": "options.html",
        // 添加一些默认的样式，推荐使用
        "chrome_style": true
    },
    // 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
    "omnibox": { "keyword" : "go" },
    // 默认语言
    "default_locale": "zh_CN",
    // devtools页面入口，注意只能指向一个HTML文件，不能是JS文件
    "devtools_page": "devtools.html"
}
```

## 参考
[官方文档](https://developer.chrome.com/extensions/getstarted)
[中文文档(非官方)](https://crxdoc-zh.appspot.com/extensions/getstarted)
[Chrome插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)