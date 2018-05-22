# react-saga源码分析 
> 相比于redux和react-redux源码的简单和精炼，redux-saga源码分析会复杂很多，我也会尽量写的细致点。
> 本文中所有源码，为了方便分析，均为简化版，如想看完整版源码，请访问[redux-saga](https://github.com/redux-saga/redux-saga)
## 目录
- [Middleware](#Middleware)  
- [channel](#channel)
- [asap](#asap)  
- [runSata](#runSaga)
- [proc](#proc)
    - [next](#next)
    - [digestEffect](#digestEffect)
    - [runEffect](#runEffect)
        - [resolveIterator](#resolveIterator)
        - [runTakeEffect](#runTakeEffect)
        - [runPutEffect](#runPutEffect)
        - [runCallEffect](#runCallEffect)
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
> 该函数主要是针对put和fork，确保子任务和父任务的执行顺序，源码比较简单，难点在使用时的逻辑
> 源码注释已经比较详细了，如果兴趣，可访问[scheduler.js](https://github.com/redux-saga/redux-saga/blob/master/packages/core/src/internal/scheduler.js)
## runSaga
> runSaga一般用于注册监听函数，是saga执行任务的起点
```jsx
export function runSaga(options, saga, ...args) {
  // 获得对应的generator的遍历器
  const iterator = saga(...args)
  // saga的中间件，和redux中间件类似
  const middleware = effectMiddlewares && compose(...effectMiddlewares)
  // 执行iterator的逻辑位于proc中
  const task = proc(
    ...
  )

  return task
}
```
## proc
> proc用于遍历对应的generator生成iterator（遍历器）
> proc源码很长，这里会挑几个关键性的地方来讲解
### next
> 用于遍历iterator
```jsx
  function next(arg, isErr) {
    try {
      let result = iterator.next(arg)
      if (!result.done) {
        // 将获得的saga指令派发给对应的执行函数，详解见下方
        digestEffect(result.value, parentEffectId, '', next)
      } else {
        // 遍历完成，关闭任务
        mainTask.isMainRunning = false
        mainTask.cont && mainTask.cont(result.value)
      }
    } catch (error) {
      if (mainTask.isCancelled) {
        logError(error)
      }
      mainTask.isMainRunning = false
      mainTask.cont(error, true)
    }
  }
```
### digestEffect
> 生成用于下次执行的回调函数，并在执行saga的任务逻辑前，做些准备
```jsx
function digestEffect(effect, parentEffectId, label = '', cb) {
    const effectId = nextEffectId()

    let effectSettled
    // 在下次next前，封装了一些额外的功能
    function currCb(res, isErr) {
      ...
      cb(res, isErr)
    }
    currCb.cancel = noop
    // 用于关闭回调的执行
    cb.cancel = () => {
      ...
    }
    // saga中间件相关逻辑，很少用到，不深究
    if (is.func(middleware)) {
      middleware(eff => runEffect(eff, effectId, currCb))(effect)
      return
    }
    // 执行effect逻辑
    runEffect(effect, effectId, currCb)
  }
```
### runEffect
> 根据effect类型的不同，选择对应的执行方式
> is的作用是判断类型，asEffect有两个作用：1、判断是否是对应的effect。2、解析对应的数据类型，并返回数据
```jsx
function runEffect(effect, effectId, currCb) {
    let data
    return (
      /**
        判断effect的类别，一共有17种类别，接下去分析下iterator、take、put、call作为代表
      **/
        is.promise(effect)                      ? resolvePromise(effect, currCb)
      : is.iterator(effect)                     ? resolveIterator(effect, effectId, meta, currCb)
      : (data = asEffect.take(effect))          ? runTakeEffect(data, currCb)
      : (data = asEffect.put(effect))           ? runPutEffect(data, currCb)
      : (data = asEffect.all(effect))           ? runAllEffect(data, effectId, currCb)
      : (data = asEffect.race(effect))          ? runRaceEffect(data, effectId, currCb)
      : (data = asEffect.call(effect))          ? runCallEffect(data, effectId, currCb)
      : (data = asEffect.cps(effect))           ? runCPSEffect(data, currCb)
      : (data = asEffect.fork(effect))          ? runForkEffect(data, effectId, currCb)
      : (data = asEffect.join(effect))          ? runJoinEffect(data, currCb)
      : (data = asEffect.cancel(effect))        ? runCancelEffect(data, currCb)
      : (data = asEffect.select(effect))        ? runSelectEffect(data, currCb)
      : (data = asEffect.actionChannel(effect)) ? runChannelEffect(data, currCb)
      : (data = asEffect.flush(effect))         ? runFlushEffect(data, currCb)
      : (data = asEffect.cancelled(effect))     ? runCancelledEffect(data, currCb)
      : (data = asEffect.getContext(effect))    ? runGetContextEffect(data, currCb)
      : (data = asEffect.setContext(effect))    ? runSetContextEffect(data, currCb)
      : /* anything else returned as is */        currCb(effect)
    )
  }
```
#### resolveIterator
> 处理类型为iterator的effect
```jsx
// 直接通过proc，执行嵌套的iterator
function resolveIterator(iterator, effectId, meta, cb) {
  proc(iterator, stdChannel, dispatch, getState, taskContext, options, effectId, meta, cb)
}
```
#### runTakeEffect
> 处理类型为take的effect，用于监听
```jsx
function runTakeEffect({ channel = stdChannel, pattern, maybe }, cb) {
  // 在回调函数外面包一层proxy
  const takeCb = input => {
    if (input instanceof Error) {
      cb(input, true)
      return
    }
    if (isEnd(input) && !maybe) {
      cb(CHANNEL_END)
      return
    }
    cb(input)
  }
  // 把监听函数存储在channel中，等待被唤醒
  try {
    channel.take(takeCb, is.notUndef(pattern) ? matcher(pattern) : null)
  } catch (err) {
    cb(err, true)
    return
  }
  cb.cancel = takeCb.cancel
}
```
#### runPutEffect
> 处理类型为put的effect，用于消耗监听函数
```jsx
function runPutEffect({ channel, action, resolve }, cb) {
  // 所有的put需要经由asap，以便控制流程
  asap(() => {
    let result
    try {
      // 执行channel中的put，消耗对应的监听函数，正常情况下，不会动用channel，会直接dispatch
      // 此处的dispatch也是经过包装的，并不是直接store.dispatch，详情见下方
      result = (channel ? channel.put : dispatch)(action)
    } catch (error) {
      cb(error, true)
      return
    }

    if (resolve && is.promise(result)) {
      resolvePromise(result, cb)
    } else {
      cb(result)
      return
    }
  })
}
```
```jsx
// 通过put触发的dispatch，会带有标记，说明已经在队列中排过了，不需要再等待
wrapSagaDispatch = dispatch => action =>
  dispatch(Object.defineProperty(action, SAGA_ACTION, { value: true }))
  ...
  dipatch = wrapSagaDispatch(dispatch)
```
#### runFork
> 处理fork类型的effect，执行嵌套的子任务
```jsx
  function runForkEffect({ context, fn, args, detached }, effectId, cb) {
    const taskIterator = createTaskIterator({ context, fn, args })
    const meta = getIteratorMetaInfo(taskIterator, fn)
    try {
      // 标记，暂停消耗监听函数
      // 注意，此处task的执行并不是完全阻塞的，当task里面遇到put时，会将put先保存起来，然后继续执行下去
      suspend()
      const task = proc(
        taskIterator,
        stdChannel,
        dispatch,
        getState,
        taskContext,
        options,
        effectId,
        meta,
        detached ? null : noop,
      )

      if (detached) {
        cb(task)
      } else {
        if (taskIterator._isRunning) {
          taskQueue.addTask(task)
          // 继续执行当前任务
          cb(task)
        } else if (taskIterator._error) {
          taskQueue.abort(taskIterator._error)
        } else {
          cb(task)
        }
      }
    } finally {
      // 释放监听锁
      flush()
    }
    // Fork effects are non cancellables
  }
```
#### runCallEffect
> 处理类型为call的effect，比较简单，可直接看源码
```jsx
function runCallEffect({ context, fn, args }, effectId, cb) {
  let result
  // catch synchronous failures; see #152
  try {
    result = fn.apply(context, args)
  } catch (error) {
    cb(error, true)
    return
  }
  return is.promise(result)
    ? resolvePromise(result, cb)
    : is.iterator(result) ? resolveIterator(result, effectId, getMetaInfo(fn), cb) : cb(result)
}
```