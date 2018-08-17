# redux插件原理详解


## 前言

redux本身代码量十分精简，出去注释，代码量也就100多行，大部分逻辑页非常好动。唯一有点难处的就是它的插件机制。

本文目标便是帮助给为彻底理解redux的插件机制

## 背景

1. 本文介绍基于[redux-4.0.0](https://github.com/reduxjs/redux)
2. 本文分析源码的源码文件为：
  - [createStore.js](https://github.com/reduxjs/redux/blob/master/src/createStore.js)
  - [applyMiddleware.js](https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.js)
  - [compose.js](https://github.com/reduxjs/redux/blob/master/src/createStore.js)

## 使用方法

```jsx
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import middleware from './middleware'

function logger(store) {
  return (next) => (action) => {
    let returnValue = next(action)
    return returnValue
  }
}

let store = createStore(
  reducer,
  [ 'Use Redux' ],
  applyMiddleware(middleware)
)
```

可以看到createStore接受三个参数，第一个参数为reducer，第二个参数为state的初始值，第三个参数为enhancer。

接下来就让我们从createStore走进middleware。

## createStore

```jsx
createStore(reducer, preloadedState, enhancer) {

  // enhancer必须为函数，直接返回由enhancer生成的store
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }

  ...
}
```

可以看到一旦给createStore传入enhancer后，整个store都将由enhancer来生成，接下来我们来走进redux应用插件的enhancer，也就是前面的applyMiddleware(middleware)

## applyMiddleware

```jsx
import compose from './compose'

export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    // 通过传进来的createStore生成store
    const store = createStore(...args)
    // 构建middleware期间禁止调用dispatch
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    // 将要传给middleware的api
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 此处传入store
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

```

以上就是applymiddleWare的全部代码了，最后再来了解下compose

## compose

```jsx
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  // 注册时从左往右执行，
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

```
嗯，没错compose的代码更少，如果middleWare为[fn1, fn2, fn3],则compose后的顺序为fn1(fn2(fn3(dispatch)))