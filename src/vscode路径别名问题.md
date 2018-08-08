## vscode路径别名问题

最近在开发时遇到了这样一个问题，vscode是有模块跳转的功能的（一般为ctrl+左击或alt+左击），但是在设置了webpack的路径别名之后这个功能失效了。

网上查了资料后，找到了解决方式如下：

1. 在项目根位置创建一个jsconfig.json
2. 配置jsconfig.json
```jsx
{
  "include": [
    "./src/**/*"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
        "components/*": ["src/components/*"],
        "utils": ["src/utils/utils.js"],
    },
  }
}
```
3. 重启ide，搞定！