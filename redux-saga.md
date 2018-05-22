# react-saga源码分析 
> 相比于redux和react-redux源码的简单和精炼，redux-saga源码分析会复杂很多，我也会尽量写的细致点。
> 本文中所有源码，为了方便分析，均为简化版，如想看完整版源码，请访问[redux-saga](https://github.com/redux-saga/redux-saga)
## 目录
- [Middleware](#Middleware)  
- [channel](#channel)
- [asap](#asap)  
## Middleware  
> redux-saga作为redux的中间件，所以我们从它的入口作为起点来开始分析
```jsx
// middleWare构造函数，在生成的middleWarezhong可以加入一些自定义参数，一般用不到。
function sagaMiddlewareFactory({ context = {}, ...options } = {}) {
  // 真正的middleware,可直接用redux，获取的storeApi有getState、 dispatch
  function sagaMiddleware({ getState, dispatch }) {
    // channel,是redux-saga用于控制流程的，下面会详解
    const channel = stdChannel()
    channel.put = (options.emitter || identity)(channel.put)
    // 用于新增新的saga监听函数
    sagaMiddleware.run = runSaga.bind(null, {
      ...
    })
    // 中间件
    return next => action => {
      if (sagaMonitor && sagaMonitor.actionDispatched) {
        sagaMonitor.actionDispatched(action)
      }
      const result = next(action) // hit reducers
      // 执行saga逻辑放在next后面，保证先执行reducer逻辑，后执行saga
      channel.put(action)
      return result
    }
  }
  sagaMiddleware.setContext = props => {
    object.assign(context, props)
  }

  return sagaMiddleware
}
```
## channel
> channel是一个监听池，通过take来增加可消耗的监听函数，通过put消耗对应的监听函数
```jsx
function stdChannel() {
  const chan = multicastChannel()
  const { put } = chan
  chan.put = input => {
    // 如果，action来自于内部的put，则说明已经asap过了，防止重复
    if (input[SAGA_ACTION]) {
      put(input)
      return
    }
    // 此处说明，action直接来源于store.dispatch，asap后面会有详解
    asap(() => put(input))
  }
  return chan
}
```
```jsx
function multicastChannel() {
  let takers = []

  return {
    // 遍历takers，找出符合类型的taker，并消耗
    put(input) {
      for (let i = 0; i < takers.length; i++) {
        const taker = takers[i]
        if (taker[MATCH](input)) {
          taker.cancel()
          taker(input)
        }
      }
    },
    // 在takers中加入该函数，并赋予taker一个cancel方法，用于在takers中移除
    take(cb, matcher) {
      cb[MATCH] = matcher
      takers.push(cb)

      cb.cancel = once(() => {
        remove(nextTakers, cb)
      })
    },
  }
}
```
## asap
> asap用于控制流程，确保redux-saga一次只执行一次流程，流程控制可以说是redux-saga中最难理解的一个点