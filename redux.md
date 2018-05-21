# redux源码分析
相信各位第一次接触redux时，都会被redux各种新概念给吓一跳吧。文档又是那么的长，相比于文档，redux源码就要友好很多了，突出一个精简。
## 目录
- [createStore](#createStore)  
### createStore
首先从redux的核心函数，createStore来分析
```jsx
export default function createStore(reducer, preloadedState, enhancer) {
  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }
  function getState() {
    return currentState
  }
  function subscribe(listener) {

    let isSubscribed = true

    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }
  function dispatch(action) {
    isDispatching = true
    currentState = currentReducer(currentState, action)

    const listeners = currentListeners = nextListeners
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }
  
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }
}
```
把相关的类型校验去掉后，可以看到createStore只有短短的50行代码。
* getState
  > getState最简单，直接返回currentState
* dispatch
  > dipatch函数有两个作用：1、调用reducer，获取新的state。2、遍历listeners，并调用
* subscribe
  > 在listeners中加入监听函数，并返回注销函数
* replaceReducer
  > 直接替换掉当前的reducer
* enhancer
  > 若果传入enhancer，则前面的都不起作用，所有逻辑由enhancer来处理
### applyMiddleware
既然createStore这么简单，那redux在文档上花了长篇大论来描述的中间件是否会复杂点呢，令人没想到的是更简单。
```jsx
function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```
```jsx
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```
虽然代码少，但并不代表他的逻辑简单。  
applyMiddleware函数接受中间件数组，并返回一个enhancer函数，可creatstore为参数。
在createStore中，调用enhancer，直接执行了两次
```jsx
return enhancer(createStore)(reducer, preloadedState)
```
从compose函数里面的迭代，可以看出，前面的迭代结果是以后一个参数为回掉函数的，直到最后一个中间件，既b(...args)是a的next，这里的...args，即是actions
来个简单的例子
```jsx
let a = store => next => action => {
  console.log('a', action)
  return next(action)
}
let b = store => next => action => {
  console.log('b', action)
  return next(action)
}
let enhancer = applyMiddle([a, b])
let store = createStore(reducer, initState, enhancer)
```
在这个过程中，a和b首先收到了middlewareAPI这个模拟的api，接下来被compose调用。  这里可以看出，b是a的next，store.dispatch是b的next。
这里函数科里话次数有点多，逻辑也比较难，如果有兴趣的，可以多看几遍再研究一下。
