# react源码分析-setState分析

![原型图](https://raw.githubusercontent.com/luke93h/git-blog/master/imgs/setState.png)

## 前言

是否有过这样的疑问：

1. setState做了什么？
2. setState是如何触发ui变化的？

## isWorking

如果此时isWorking为true，react将不会立即执行更新操作，而是把更新操作交给正在working的任务。（例如：由onClick触发的working）

如果此时没有其他任务在执行，则自己主动申请执行任务（如setTimeout或ajax触发）

## 结尾语

没错，setState的逻辑就是这么简单。如果想了解requestWork阶段的内容，请访问[react源码分析-reactDom.render](https://github.com/luke93h/git-blog/issues/7)

## 相关

- [react源码分析-reactDom.render](https://github.com/luke93h/git-blog/issues/7)
- [事件系统分析](https://github.com/luke93h/git-blog/issues/10)
