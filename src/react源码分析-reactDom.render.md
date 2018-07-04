# react源码分析-ReactDom.render
![原型图](https://github.com/luke93h/git-blog/blob/master/imgs/reactDom.png)
## ReactDom.render
```jsx
ReactDOM.render(
  element,
  container,
  [callback]
)
```
渲染一个React元素，添加到位于提供的container里的DOM元素中，并返回这个组件的一个 引用 (或者对于无状态组件返回null).  
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
## ExpirationTime
在react16中，随处可见expirationTime这个值，这个值的含义是：  
- 所谓的到期时间（ExpirationTime），是相对于调度器初始调用的起始时间而言的一个时间段；调度器初始调用后的某一段时间内，需要调度完成这项更新，这个时间段长度值就是到期时间值。  
- 本篇分析将略过这点，以便更好的理解react的整体架构
## FiberNode
FiberNode即平时所说的virtual-dom，上面保存了对应节点的一系列信息。
## 参考
[React16.2源码解析](https://juejin.im/post/5b1b4daff265da6e0f70b5a9)
[react中文文档](https://doc.react-china.org/docs/react-dom.html#render)
