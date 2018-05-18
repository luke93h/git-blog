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
match函数的作用主要