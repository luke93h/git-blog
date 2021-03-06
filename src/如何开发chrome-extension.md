# chrome extension简介

## chrome extension是什么

1. chrome extension开发成本低，由一些文件（包括 HTML、CSS、JavaScript、图片以及其他任何您需要的文件）经过 zip 打包得到，本质上是网页。
2. chrome extension不仅可以利用[浏览器为网页提供的所有 API](https://crxdoc-zh.appspot.com/extensions/api_other)，还可以用[chrome为扩展程序提供了许多专用 API](https://crxdoc-zh.appspot.com/extensions/api_index)。

## 为什么要用chrome extension

1. 有些场景下，我们并不是网页的开发者，但想要为网站添加更多的功能，这时候也可以用chrome extension来解决。
2. chrome extension拥有比网页更加丰富的api

## chrome扩展能做什么

1. 代理：[Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)
2. 开发者工具: [react](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)、[redux](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
3. 广告过滤：[AdGuard 广告拦截器](https://chrome.google.com/webstore/detail/adguard-adblocker/bgnkhhnnamicmpeenaelnjfhikgbkllg)
4. 抢票软件：[台湾高铁抢票插件](https://chrome.google.com/webstore/detail/%E5%8F%B0%E6%B9%BE%E9%AB%98%E9%93%81%E6%8A%A2%E7%A5%A8%E6%8F%92%E4%BB%B6/nfkfaajobpcjpmcmpcacncimfmjppgoj)
5. 视频下载: [优酷一键通](https://chrome.google.com/webstore/detail/%E4%BC%98%E9%85%B7%E4%B8%80%E9%94%AE%E9%80%9A/alddjbjplgobbllfolehibiclbhmomla)
6. 等等

## 开发与调试

1. 加载扩展文件：扩展程序页面（chrome://extensions），开启开发者模式，点击“加载已解压的扩展程序”
2. 更新：扩展程序页面（chrome://extensions），点击“更新”
3. 调试popup.js：右击扩展图标，点击“审核弹出内容”

## 文件组成

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

## 用户界面网页-popup

popup是点击browser_action或者page_action图标时打开的一个小窗口网页，焦点离开网页就立即关闭。
一般用于和用户的交互，并把信息传递给content-scripts或者backgorund.js，实现功能的交互。

![popup](https://github.com/luke93h/git-blog/blob/master/imgs/popup.png?raw=true)

配置方式：

```jsx
{
	"browser_action":
	{
		"default_icon": "img/icon.png",
		// 图标悬停时的标题，可选
		"default_title": "这是一个示例Chrome插件",
		"default_popup": "popup.html"
	}
}
```

## content-scripts

所谓content-scripts，其实就是Chrome插件中向页面注入脚本的一种形式（虽然名为script，其实还可以包括css的），借助content-scripts我们可以实现通过配置的方式轻松向指定页面注入JS和CSS（如果需要动态注入，可以参考下文），最常见的比如：广告屏蔽、页面CSS定制，等等。

示例配置：
```jsx
{
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
		}
	],
}
```

## background

后台（姑且这么翻译吧），是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在background里面。

配置： 

```jsx
{
	// 会一直常驻的后台JS或后台页面
	"background":
	{
		// 2种指定方式，如果指定JS，那么会自动生成一个背景页
		"page": "background.html"
		//"scripts": ["js/background.js"]
	},
}
```

## event-pages

这里顺带介绍一下event-pages，它是一个什么东西呢？鉴于background生命周期太长，长时间挂载后台可能会影响性能，所以Google又弄一个event-pages，在配置文件上，它与background的唯一区别就是多了一个persistent参数：

配置： 

```jsx
{
	"background":
	{
		"scripts": ["event-page.js"],
		"persistent": false
	},
}
```

# devtools扩展

每打开一个开发者工具窗口，都会创建devtools页面的实例，F12窗口关闭，页面也随着关闭，所以devtools页面的生命周期和devtools窗口是一致的。devtools页面可以访问一组特有的DevTools API以及有限的扩展API，这组特有的DevTools API只有devtools页面才可以访问，background都无权访问，这些API包括：

配置
```jsx
{
	// 只能指向一个HTML文件，不能是JS文件
	"devtools_page": "devtools.html"
}
```

## 4种类型的JS对比

|         JS种类       |  可访问的API                                   |  DOM访问情况	     |  JS访问情况   |  直接跨域  |
|   ------            |  ----------                                    |  -----------      |  ----------  |  -------   |
|   content script    |  只能访问 extension、runtime等部分API            |  可以访问	     |  不可以       |  不可以    |
|   popup js          |  可访问绝大部分API，除了devtools系列              |  不可直接访问	  |  不可以       |  可以      |
|   background js     |  可访问绝大部分API，除了devtools系列              |  不可直接访问	  |  不可以       |  直接跨域  |
|   devtools js       |  只能访问 devtools、extension、runtime等部分API  |  可以	         |  可以         |  不可以    |

## 消息通信

|         JS种类       |  content-script                                   |  popup.js	     |  background.js   |
|   ------            |  ----------                                    |  -----------      |  ----------  |
|   content script    |  -            |  chrome.runtime.sendMessage、chrome.runtime.connect	     |  chrome.runtime.sendMessage 、chrome.runtime.connect       |
|   popup.js          |  chrome.tabs.sendMessage 、 chrome.tabs.connect             |  -	  |  chrome.extension. getBackgroundPage()       |
|   background.js     |  chrome.tabs.sendMessage chrome.tabs.connect              |  chrome.extension.getViews	  |  -       |
|   devtools.js       |  -  |  chrome.runtime.sendMessage	         |  chrome.runtime.sendMessage         |


##  chrome.* API 

Chrome 浏览器为扩展程序提供了许多专用 API，例如 chrome.runtime 与 chrome.alarms。
参考[文档](https://crxdoc-zh.appspot.com/extensions/api_index)

## 参考
[官方文档](https://developer.chrome.com/extensions/getstarted)
[中文文档(非官方)](https://crxdoc-zh.appspot.com/extensions/getstarted)
[Chrome插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)
[sxei的博客](https://github.com/sxei/chrome-plugin-demo)