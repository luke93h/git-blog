# react源码分析-事件系统分析
![原型图](https://raw.githubusercontent.com/luke93h/git-blog/master/imgs/event.png)

## 目录
- [前言](#前言)
- [注册](#注册)
  - [trapBubbledEvent](#trapBubbledEvent)
- [触发](#触发)
  - [dispatchInteractiveEvent](#dispatchInteractiveEvent)
  - [dispatchEvent](#dispatchEvent)
  - [handleTopLevel](#handleTopLevel)
  - [runExtractedEventsInBatch](#runExtractedEventsInBatch)
  - [SyntheticEvent](#SyntheticEvent)
  - [traverseTwoPhase](#traverseTwoPhase)
  - [executeDispatchesInOrder](#executeDispatchesInOrder)

## 前言

在开发react项目时，是否有过这样的困惑：
1. react每次render后，会在dom上重新注册事件监听函数吗？
2. 事件监听函数里面的event是原生的event吗？如果不是，是如何生成的呢？


## 注册

## trapBubbledEvent

监听冒泡事件,由用户触发的事件绑定的监听函数为dispatchInteractiveEvent

## 触发

## dispatchInteractiveEvent

调用dispatchEvent

## dispatchEvent

在createInstance时，会在对应的dom对象上保存对应的fiber实例，dispatchEvent就是从dom实例上获取对应的fiber信息的
```jsx
function precacheFiberNode(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}
```

booking中保存有4个信息：
1. ancestors: 祖先元素
2. nativeEvent: 原生event对象
3. targetInst: target对应的fiber
4. topLevelType: 事件类型

## handleTopLevel

handleTopLevel接受booking作为参数，在此步骤中会填充ancestors对象

## runExtractedEventsInBatch

runExtractedEventsInBatch里面分为两个步骤，一是生成事件对象，而是触发事件

## SyntheticEvent

生成react的事件对象时，最终要的就是SyntheticEvent这个构造函数了。
接下来来分析下SyntheticEvent构造函数调用时所作的事情，以及一些方法

### 构造函数

会根据Interface上的内容，将原生对象上的属性拷贝到当前实例上

### preventDefault、stopPropagation

模拟原生的方法，并调用原生的方法，但只能组织到document一层，因为事件函数注册在document上，调用后会在event上标记变量

### persist

标记isPersistent为true

### destructor

将当前实例上的属性清空

### SyntheticEvent.Interface

接口，event上需要哪些数据

### SyntheticEvent.extend

扩展Interface，并生成新的构造函数

### addEventPoolingTo

EventConstructor的扩展功能，有三个属性
1. eventPool：用于保存废弃的event
2. getPooled: 获取旧的event引用
3. release: 初始化并保存event实例

## traverseTwoPhase
towPhase是指捕获阶段和冒泡阶段。

通过listenerAtPhase获取监听函数，然后在event上保存linstener和instance
```jsx
function accumulateDirectionalDispatches(inst, phase, event) {
  var listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }
}
```

## listenerAtPhase

通过node[internalEventHandlersKey]获取属性，然后获得相应的监听函数，该属性在createInstance阶段被保存在dom对象上

## executeDispatch

从event上获得instance和listener

## ReactErrorUtils.invokeGuardedCallbackAndCatchFirstError

创建一个fakeDom，在fakeDom上绑定事件，并处罚事件，在事件监听函数中调用listener

## 后续

在执行完事件监听函数后，流程跳转至performWorkOnRoot，会更新react tree


## 相关


- [react源码分析-reactDom.render](https://github.com/luke93h/git-blog/issues/11)
- [事件系统分析](https://github.com/luke93h/git-blog/issues/10)
