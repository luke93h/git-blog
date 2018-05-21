# [react-redux](https://github.com/reduxjs/react-redux)源码分析 

## 目录
[Provider](#Povider) 

[connect](#connect)
- [match](#match)
- [selector](#selector)
- [connectHoc](#connectHoc)
### Povider
Provider源码比较简单，功能也比较明了：
* 获取store，并在react的context中保存store

```jsx
class Provider extends Component {
  getChildContext() {
    return { 
      [storeKey]: this[storeKey], [subscriptionKey]: null 
    }
  }

  constructor(props, context) {
    super(props, context)
    this[storeKey] = props.store;
  }

  render() {
    return Children.only(this.props.children)
  }

  Provider.childContextTypes = {
    [storeKey]: storeShape.isRequired,
    [subscriptionKey]: subscriptionShape,
  }
}
```
### connect
connect相对而言会复杂一点，可分为三块:
* [match](#match)
* [selector](#selector)
* [connectHoc](#connectHoc)
#### match
match函数的作用主要预处理mapDispatchToProps、mapStateToProps、mergeProps这三个函数 
预处理主要做了两件事：
* 如果参数未定义，则赋予默认值
* 如果参数为函数，则在外面包装一层函数，决定是否传入ownProps
```jsx

function match(arg, factories, name) {
  for (let i = factories.length - 1; i >= 0; i--) {
    const result = factories[i](arg)
    if (result) return result
  }

  return (dispatch, options) => {
    throw new Error(`Invalid value of type ${typeof arg} for ${name} argument when connecting component ${options.wrappedComponentName}.`)
  }
}
```
```jsx
export function createConnect({
  mapStateToPropsFactories = defaultMapStateToPropsFactories,
  ...
} = {}){
  function connect(
    mapStateToProps,
    ...
  ) {
    const initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps')
    ...
  }
}
``` 
### selector
预处理完用户传入的参数后，变可以进行下一步骤了,
selsector的作用是调用mapDispatchToProps、mapStateToProps两个个参数，并通过mergeProps将两个方法的结果合并
```jsx
...

function handleNewPropsAndNewState() {
  stateProps = mapStateToProps(state, ownProps)

  if (mapDispatchToProps.dependsOnOwnProps)
    dispatchProps = mapDispatchToProps(dispatch, ownProps)

  mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
  return mergedProps
}
...
```
### connectHoc
终于到最核心的connectHoc了。
connectHoc主要做了两件事
* 获取store
* 监听变化，并传递props
```jsx
function makeSelectorStateful(sourceSelector, store) {
  const selector = {
    run: function runComponentSelector(props) {
      try {
        const nextProps = sourceSelector(store.getState(), props)
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true
          selector.props = nextProps
          selector.error = null
        }
      } catch (error) {
        selector.shouldComponentUpdate = true
        selector.error = error
      }
    }
  }

  return selector
}
  componentWillReceiveProps(nextProps) {
    this.selector.run(nextProps)
  }

```