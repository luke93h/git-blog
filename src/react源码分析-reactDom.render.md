# react源码分析-ReactDom.render流程总览
![原型图](https://raw.githubusercontent.com/luke93h/git-blog/master/imgs/reactDom.png)

## 目录
- 前言
  - [背景](#背景)
  - [优化内容](#优化内容)
- [调和阶段](#调和-reconciliation)
  - [ReactDom.render](#ReactDom.render)
  - [legacyCreateRootFromDOMContainer](#legacyCreateRootFromDOMContainer)
  - [Fiber](#Fiber)
- 更新阶段

- [小技巧](#小技巧)
- [参考](#参考)

## 背景

距离react16发布已经过去很久了，facebook开发团队耗时2年多，究竟做了什么呢。从下面两张图中可以很直观的看出，react16带来的性能优化
![animation1](/luke93h/git-blog/blob/master/imgs/animation1.gif?raw=true)

![animation2](/luke93h/git-blog/blob/master/imgs/animation2.gif?raw=true)

造成这样的现象主要是因为：单个网页由js、UI渲染线程、浏览器事件触发线程、http请求线程、EventLoop轮询的处理线程等线程组成，其中js引擎线程和ui渲染线程是互斥的，也就是说在处理js任务时，页面将停止渲染，一旦js占用时间过长，造成页面每秒渲染的帧数过低，就会给用造成很明显的卡顿感。

## 优化内容

1. 新增了Portals、Fragments的组件类型，新增了componentDidCatch、static getDerivedStateFromProps、getSnapshotBeforeUpdate声明周期，componentWillMount、componentWillReceiveProps、componentWillUpdate将会在未来被移除，支持自定义的dom属性，扩展了render函数可返回的类型

2. 引入异步架构，优化了包括动画，布局和手势的性能。
  - 把可中断的工作拆分成小任务
  - 对正在做的工作调整优先次序、重做、复用上次（做了一半的）成果

3. 项目体积大幅度缩小，相比前一个大版本，react + react-dom的体积从161.kb（49.8kb gzipped）缩减到了109kb（34.8 kb gzipped），优化幅度高达30%。


## 调和-reconciliation

React算法，用于计算新旧树上需要更新的部分

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
- [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
