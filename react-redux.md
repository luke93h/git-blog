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
}
```
### connect
connect相对而言会复杂一点，可分为三块:
* [match](#match)
* [selector](#selector)
* [connectHoc](#connectHoc)
#### match
match函数的作用主要预处理mapDispatchToProps、mapStateToProps、mergeProps这三个函数
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
接下来以mapStateToProps为代表来看下matach究竟是如何来预处理这些方法的。
用户传入的函数首先会被传入mapStateToPropsFactories,通过判断传入的mapStateToProps来执行不同的操作，
* 若是函数，执行whenMapStateToPropsIsFunction，返回一个包含mapStateToProps的代理函数
* 若是undefinded，则赋予默认值
```jsx
export default [
  whenMapStateToPropsIsFunction,
  whenMapStateToPropsIsMissing
]
```
赋予默认值比较简单，接下来我们来继续深入whenMapStateToPropsIsFunction
