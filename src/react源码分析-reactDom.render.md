# react源码分析-ReactDom.render流程总览
![原型图](https://raw.githubusercontent.com/luke93h/git-blog/master/imgs/reactDom.png)

## 目录
- [前言](#前言)
- [ReactDom.render](#ReactDom.render)
- [legacyCreateRootFromDOMContainer](#legacyCreateRootFromDOMContainer)
- [Fiber](#Fiber)
- [小技巧](#小技巧)
- [参考](#参考)

## 前言

距离react16发布已经过去很久了，facebook开发团队耗时2年多，究竟做了什么呢。

## ReactDom.render

将react元素渲染到真实dom中。

```jsx
ReactDOM.render(
  element,
  container,
  [callback]
)
```
[在线尝试](https://codesandbox.io/s/v629p1y197)

## legacyCreateRootFromDOMContainer

这个方法除主要做了两件事：
1. 清除dom容器元素的子元素
```jsx
while ((rootSibling = container.lastChild)) {
    container.removeChild(rootSibling);
}
```
2. 创建ReactRoot对象

## Fiber



## ExpirationTime
在react16中，随处可见expirationTime这个值，这个值的含义是：  
- 所谓的到期时间（ExpirationTime），是相对于调度器初始调用的起始时间而言的一个时间段；调度器初始调用后的某一段时间内，需要调度完成这项更新，这个时间段长度值就是到期时间值。  
- 本篇分析将略过这点，以便更好的理解react的整体架构
## Fiber

react在进行组件渲染时，从setState开始到渲染完成整个过程是同步的（“一气呵成”）。如果需要渲染的组件比较庞大，js执行会占据主线程时间较长，会导致页面响应度变差，使得react在动画、手势等应用中效果比较差。
为了解决这个问题，react团队经过两年的工作，重写了react中核心算法——reconciliation。并在v16版本中发布了这个新的特性。为了区别之前和之后的reconciler，通常将之前的reconciler称为stack reconciler，重写后的称为fiber reconciler，简称为Fiber。

## 小技巧

- 阅读源码时，可以在本地用create-react-app新建一下小demo项目，然后直接在node_modules中的react-dom.development.js和react.development.js两个文件里的对应方法打断点。![原型图](https://raw.githubusercontent.com/luke93h/git-blog/master/imgs/breakPoint.png)

## 参考

- [React16.2源码解析](https://juejin.im/post/5b1b4daff265da6e0f70b5a9)
- [React 16 Fiber源码速览](http://zxc0328.github.io/2017/09/28/react-16-source/)
- [react官方文档](https://reactjs.org/docs/react-dom.html)
- [React Fiber](https://juejin.im/post/5ab7b3a2f265da2378403e57)
